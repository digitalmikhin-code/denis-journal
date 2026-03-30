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

const STATUS_LABEL: Record<ContactStatus, string> = {
  new: "Новый",
  qualified: "Квалифицирован",
  nurturing: "Прогрев",
  offer_sent: "Оффер отправлен",
  customer: "Клиент",
  archived: "Архив"
};

export function SubscribersCrm(): JSX.Element {
  const [items, setItems] = useState<SubscriberContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [source, setSource] = useState("");
  const [tag, setTag] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

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
    if (!editing) {
      return;
    }

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
    let active = true;
    const controller = new AbortController();

    async function load(): Promise<void> {
      if (!SUBSCRIBERS_API_URL) {
        setLoading(false);
        setError("CRM API не подключён. Укажите NEXT_PUBLIC_SUBSCRIBERS_API_URL.");
        return;
      }

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
          signal: controller.signal
        });

        const payload = (await response.json()) as SubscribersResponse;
        if (!response.ok) {
          throw new Error(payload.error ?? "Не удалось загрузить контакты.");
        }

        if (active) {
          setItems(payload.items);
        }
      } catch (loadError) {
        if (!active) {
          return;
        }
        setError(
          loadError instanceof Error
            ? loadError.message
            : "Не удалось загрузить список."
        );
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
  }, [query, source, status, tag]);

  async function handleSave(): Promise<void> {
    if (!editingId) {
      return;
    }
    if (!SUBSCRIBERS_API_URL) {
      setSaveError("CRM API не подключён. Укажите NEXT_PUBLIC_SUBSCRIBERS_API_URL.");
      return;
    }

    setSaving(true);
    setSaveError(null);

    try {
      const response = await fetch(`${SUBSCRIBERS_API_URL}?id=${encodeURIComponent(editingId)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
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

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_16px_36px_rgba(15,23,42,0.06)] md:p-6">
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
            <a
              href={SUBSCRIBERS_API_URL ? `${SUBSCRIBERS_API_URL}?action=export&format=csv` : "#"}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300"
            >
              Экспорт CSV
            </a>
            <a
              href={SUBSCRIBERS_API_URL ? `${SUBSCRIBERS_API_URL}?action=export&format=json` : "#"}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300"
            >
              Экспорт JSON
            </a>
          </div>
        </div>
      </section>

      {error ? <p className="text-sm font-medium text-[#b42318]">{error}</p> : null}

      <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_16px_36px_rgba(15,23,42,0.06)] md:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="text-sm text-slate-600">
            Контактов: <span className="font-semibold text-slate-900">{loading ? "…" : items.length}</span>
          </p>
        </div>

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
                      {item.tags.length > 0 ? (
                        item.tags.map((tagValue) => (
                          <span
                            key={`${item.id}-${tagValue}`}
                            className="rounded-full bg-slate-900 px-2 py-1 text-[11px] font-semibold text-white"
                          >
                            {tagValue}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-slate-400">—</span>
                      )}
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
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-black tracking-tight text-slate-900">Редактирование контакта</h2>
            <button
              type="button"
              onClick={() => setEditingId(null)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:border-slate-300"
            >
              Закрыть
            </button>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">ФИО</span>
              <input
                value={form.fullName}
                onChange={(event) => setForm((prev) => ({ ...prev, fullName: event.target.value }))}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#6964d9] focus:bg-white"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Email</span>
              <input
                value={form.email}
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#6964d9] focus:bg-white"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Статус</span>
              <select
                value={form.status}
                onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value }))}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#6964d9] focus:bg-white"
              >
                {CONTACT_STATUSES.map((item) => (
                  <option key={item} value={item}>
                    {STATUS_LABEL[item]}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Источник</span>
              <input
                value={form.source}
                onChange={(event) => setForm((prev) => ({ ...prev, source: event.target.value }))}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#6964d9] focus:bg-white"
              />
            </label>
            <label className="block md:col-span-2">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Теги (через запятую)</span>
              <input
                value={form.tags}
                onChange={(event) => setForm((prev) => ({ ...prev, tags: event.target.value }))}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#6964d9] focus:bg-white"
              />
            </label>
            <label className="block md:col-span-2">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Заметки</span>
              <textarea
                value={form.notes}
                onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
                rows={4}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#6964d9] focus:bg-white"
              />
            </label>
          </div>

          {saveError ? <p className="mt-3 text-sm font-medium text-[#b42318]">{saveError}</p> : null}

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              disabled={saving}
              onClick={() => void handleSave()}
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Сохраняю..." : "Сохранить изменения"}
            </button>
          </div>
        </section>
      ) : null}
    </div>
  );
}
