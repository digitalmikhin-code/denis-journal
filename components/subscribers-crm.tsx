"use client";

import { useEffect, useMemo, useState } from "react";
import { SUBSCRIBERS_API_URL } from "@/lib/constants";
import { CONTACT_STATUSES, type ContactStatus, type SubscriberContact } from "@/lib/subscribers";
import { formatDate } from "@/lib/utils";

type SubscribersResponse = {
  items: SubscriberContact[];
  total: number;
  error?: string;
};

const STORAGE_KEY = "dmk-crm-admin-token";

const STATUS_LABEL: Record<ContactStatus, string> = {
  new: "Новый",
  qualified: "Квалифицирован",
  nurturing: "Прогрев",
  offer_sent: "Оффер отправлен",
  customer: "Клиент",
  archived: "Архив"
};

function authHeaders(token: string): Record<string, string> {
  return {
    Authorization: `Bearer ${token}`
  };
}

export function SubscribersCrm(): JSX.Element {
  const [token, setToken] = useState("");
  const [tokenInput, setTokenInput] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);

  const [items, setItems] = useState<SubscriberContact[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [source, setSource] = useState("");
  const [tag, setTag] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [copyInfo, setCopyInfo] = useState<string | null>(null);

  const editing = useMemo(
    () => items.find((item) => item.id === editingId) ?? null,
    [editingId, items]
  );

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    status: "new",
    source: "",
    tags: "",
    notes: ""
  });

  useEffect(() => {
    const saved = window.sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      setToken(saved);
    }
  }, []);

  useEffect(() => {
    if (!editing) return;
    setForm({
      fullName: editing.fullName,
      email: editing.email,
      status: editing.status,
      source: editing.source,
      tags: editing.tags.join(", "),
      notes: editing.notes
    });
  }, [editing]);

  useEffect(() => {
    if (!token) return;
    if (!SUBSCRIBERS_API_URL) {
      setError("CRM API не подключён. Укажите NEXT_PUBLIC_SUBSCRIBERS_API_URL.");
      return;
    }

    let active = true;
    const controller = new AbortController();

    async function load(): Promise<void> {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();
        if (query.trim()) params.set("q", query.trim());
        if (status !== "all") params.set("status", status);
        if (source.trim()) params.set("source", source.trim());
        if (tag.trim()) params.set("tag", tag.trim());

        const response = await fetch(`${SUBSCRIBERS_API_URL}?${params.toString()}`, {
          cache: "no-store",
          signal: controller.signal,
          headers: authHeaders(token)
        });

        const payload = (await response.json()) as SubscribersResponse;
        if (response.status === 401 || response.status === 403) {
          throw new Error("Неверный токен доступа CRM.");
        }
        if (!response.ok) {
          throw new Error(payload.error ?? "Не удалось загрузить контакты.");
        }

        if (active) {
          setItems(payload.items);
        }
      } catch (loadError) {
        if (!active) return;
        setError(loadError instanceof Error ? loadError.message : "Не удалось загрузить список.");
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void load();
    return () => {
      active = false;
      controller.abort();
    };
  }, [query, source, status, tag, token]);

  function handleLogin(): void {
    setAuthError(null);
    const normalized = tokenInput.trim();
    if (!normalized) {
      setAuthError("Введите токен доступа CRM.");
      return;
    }
    window.sessionStorage.setItem(STORAGE_KEY, normalized);
    setToken(normalized);
    setTokenInput("");
  }

  function handleLogout(): void {
    window.sessionStorage.removeItem(STORAGE_KEY);
    setToken("");
    setItems([]);
    setEditingId(null);
  }

  async function handleSave(): Promise<void> {
    if (!editingId || !SUBSCRIBERS_API_URL || !token) return;

    setSaving(true);
    setSaveError(null);

    try {
      const response = await fetch(`${SUBSCRIBERS_API_URL}?id=${encodeURIComponent(editingId)}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(token)
        },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          status: form.status,
          source: form.source,
          tags: form.tags,
          notes: form.notes
        })
      });

      const payload = (await response.json()) as { item?: SubscriberContact; error?: string };
      if (response.status === 401 || response.status === 403) {
        throw new Error("Нет доступа. Проверьте токен CRM.");
      }
      if (!response.ok || !payload.item) {
        throw new Error(payload.error ?? "Не удалось сохранить контакт.");
      }

      setItems((prev) => prev.map((item) => (item.id === payload.item?.id ? payload.item : item)));
      setEditingId(null);
    } catch (saveErr) {
      setSaveError(saveErr instanceof Error ? saveErr.message : "Ошибка сохранения.");
    } finally {
      setSaving(false);
    }
  }

  async function handleExport(format: "csv" | "json" | "emails"): Promise<void> {
    if (!SUBSCRIBERS_API_URL || !token) return;
    const response = await fetch(`${SUBSCRIBERS_API_URL}?action=export&format=${format}`, {
      headers: authHeaders(token)
    });
    if (!response.ok) {
      setError("Экспорт не удался. Проверьте токен CRM.");
      return;
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download =
      format === "csv" ? "subscribers.csv" : format === "json" ? "subscribers.json" : "subscribers-emails.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function buildFilteredEmailList(): string {
    const normalized = items
      .map((item) => item.email.trim().toLowerCase())
      .filter((value) => value.length > 0);
    return Array.from(new Set(normalized)).join("\n");
  }

  async function handleCopyEmails(): Promise<void> {
    setCopyInfo(null);
    const emailList = buildFilteredEmailList();
    if (!emailList) {
      setCopyInfo("Нет контактов для копирования.");
      return;
    }

    try {
      await navigator.clipboard.writeText(emailList);
      setCopyInfo(`Скопировано email: ${emailList.split("\n").length}`);
    } catch {
      setCopyInfo("Не удалось скопировать. Используйте экспорт в TXT.");
    }
  }

  if (!token) {
    return (
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_16px_36px_rgba(15,23,42,0.06)] md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Доступ к CRM</p>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
          Закрытый раздел
        </h2>
        <p className="mt-3 max-w-[58ch] text-base leading-7 text-slate-600">
          Введите админ-токен CRM. Без токена список контактов, экспорт и редактирование недоступны.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <input
            type="password"
            value={tokenInput}
            onChange={(event) => setTokenInput(event.target.value)}
            placeholder="CRM admin token"
            className="min-w-[300px] rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#6964d9] focus:bg-white"
          />
          <button
            type="button"
            onClick={handleLogin}
            className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Войти в CRM
          </button>
        </div>
        {authError ? <p className="mt-3 text-sm font-medium text-[#b42318]">{authError}</p> : null}
      </section>
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_16px_36px_rgba(15,23,42,0.06)] md:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="text-sm text-slate-600">CRM доступ активен.</p>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:border-slate-300"
          >
            Выйти
          </button>
        </div>

        <div className="grid gap-4 lg:grid-cols-4">
          <label className="block lg:col-span-2">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Поиск</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="ФИО, email, тег, заметка"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#6964d9] focus:bg-white"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Статус</span>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#6964d9] focus:bg-white"
            >
              <option value="all">Все</option>
              {CONTACT_STATUSES.map((item) => (
                <option key={item} value={item}>
                  {STATUS_LABEL[item]}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Источник</span>
            <input
              value={source}
              onChange={(event) => setSource(event.target.value)}
              placeholder="homepage / article:slug"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#6964d9] focus:bg-white"
            />
          </label>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <label className="block min-w-[260px]">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Тег</span>
            <input
              value={tag}
              onChange={(event) => setTag(event.target.value)}
              placeholder="lead, consulting, webinar"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#6964d9] focus:bg-white"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => void handleExport("csv")}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300"
            >
              Экспорт CSV
            </button>
            <button
              type="button"
              onClick={() => void handleExport("json")}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300"
            >
              Экспорт JSON
            </button>
            <button
              type="button"
              onClick={() => void handleExport("emails")}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300"
            >
              Экспорт email TXT
            </button>
            <button
              type="button"
              onClick={() => void handleCopyEmails()}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300"
            >
              Скопировать email
            </button>
          </div>
        </div>
        {copyInfo ? <p className="mt-3 text-xs font-medium text-slate-600">{copyInfo}</p> : null}
      </section>

      {error ? <p className="text-sm font-medium text-[#b42318]">{error}</p> : null}

      <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_16px_36px_rgba(15,23,42,0.06)] md:p-6">
        <p className="mb-4 text-sm text-slate-600">
          Контактов: <span className="font-semibold text-slate-900">{loading ? "…" : items.length}</span>
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-2">
            <thead>
              <tr className="text-left text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                <th className="px-3 py-2">Контакт</th>
                <th className="px-3 py-2">Статус</th>
                <th className="px-3 py-2">Источник</th>
                <th className="px-3 py-2">Теги</th>
                <th className="px-3 py-2">Дата</th>
                <th className="px-3 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50/70 text-sm text-slate-700">
                  <td className="rounded-l-2xl px-3 py-3">
                    <p className="font-semibold text-slate-900">{item.fullName}</p>
                    <p className="text-xs text-slate-500">{item.email}</p>
                  </td>
                  <td className="px-3 py-3">
                    <span className="rounded-full border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700">
                      {STATUS_LABEL[item.status]}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-xs">{item.source}</td>
                  <td className="px-3 py-3">
                    <div className="flex flex-wrap gap-1">
                      {item.tags.length > 0 ? item.tags.map((tagValue) => (
                        <span key={`${item.id}-${tagValue}`} className="rounded-full bg-slate-900 px-2 py-1 text-[11px] font-semibold text-white">
                          {tagValue}
                        </span>
                      )) : <span className="text-xs text-slate-400">—</span>}
                    </div>
                  </td>
                  <td className="px-3 py-3 text-xs text-slate-500">{formatDate(item.subscribedAt)}</td>
                  <td className="rounded-r-2xl px-3 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => setEditingId(item.id)}
                      className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:border-slate-300"
                    >
                      Редактировать
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {editing ? (
        <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_16px_36px_rgba(15,23,42,0.06)] md:p-6">
          <h2 className="text-2xl font-black tracking-tight text-slate-900">Редактирование контакта</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">ФИО</span>
              <input value={form.fullName} onChange={(event) => setForm((prev) => ({ ...prev, fullName: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#6964d9] focus:bg-white" />
            </label>
            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Email</span>
              <input value={form.email} onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#6964d9] focus:bg-white" />
            </label>
            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Статус</span>
              <select value={form.status} onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#6964d9] focus:bg-white">
                {CONTACT_STATUSES.map((item) => (
                  <option key={item} value={item}>{STATUS_LABEL[item]}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Источник</span>
              <input value={form.source} onChange={(event) => setForm((prev) => ({ ...prev, source: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#6964d9] focus:bg-white" />
            </label>
            <label className="block md:col-span-2">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Теги (через запятую)</span>
              <input value={form.tags} onChange={(event) => setForm((prev) => ({ ...prev, tags: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#6964d9] focus:bg-white" />
            </label>
            <label className="block md:col-span-2">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Заметки</span>
              <textarea value={form.notes} onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))} rows={4} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#6964d9] focus:bg-white" />
            </label>
          </div>
          {saveError ? <p className="mt-3 text-sm font-medium text-[#b42318]">{saveError}</p> : null}
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" disabled={saving} onClick={() => void handleSave()} className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60">
              {saving ? "Сохраняю..." : "Сохранить изменения"}
            </button>
            <button type="button" onClick={() => setEditingId(null)} className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300">
              Отмена
            </button>
          </div>
        </section>
      ) : null}
    </div>
  );
}
