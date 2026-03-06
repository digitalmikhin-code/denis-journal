"use client";

import { useEffect, useMemo, useState } from "react";
import { CATEGORY_LABELS } from "@/lib/constants";
import {
  LOCAL_ADMIN_PASSWORD,
  LOCAL_ADMIN_SESSION_KEY,
  LOCAL_POSTS_KEY,
  type LocalPost
} from "@/lib/local-posts";

const initialForm = {
  title: "",
  category: "career",
  excerpt: "",
  cover: "",
  content: ""
};

export function LocalAdmin(): JSX.Element {
  const [isAuth, setIsAuth] = useState(false);
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState("");
  const [posts, setPosts] = useState<LocalPost[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    const session = localStorage.getItem(LOCAL_ADMIN_SESSION_KEY);
    setIsAuth(session === "1");
    const raw = localStorage.getItem(LOCAL_POSTS_KEY);
    if (raw) {
      try {
        setPosts(JSON.parse(raw) as LocalPost[]);
      } catch {
        setPosts([]);
      }
    }
  }, []);

  function save(nextPosts: LocalPost[]): void {
    setPosts(nextPosts);
    localStorage.setItem(LOCAL_POSTS_KEY, JSON.stringify(nextPosts));
  }

  function login(): void {
    if (password.trim() !== LOCAL_ADMIN_PASSWORD) {
      setNotice("Неверный пароль");
      return;
    }
    localStorage.setItem(LOCAL_ADMIN_SESSION_KEY, "1");
    setIsAuth(true);
    setNotice("Вход выполнен");
  }

  function logout(): void {
    localStorage.removeItem(LOCAL_ADMIN_SESSION_KEY);
    setIsAuth(false);
  }

  function resetForm(): void {
    setForm(initialForm);
    setEditId(null);
  }

  function submit(): void {
    if (!form.title.trim() || !form.excerpt.trim() || !form.content.trim()) {
      setNotice("Заполните заголовок, описание и текст");
      return;
    }
    const now = new Date().toISOString();
    if (editId) {
      const next = posts.map((item) =>
        item.id === editId ? { ...item, ...form, updatedAt: now } : item
      );
      save(next);
      setNotice("Пост обновлён");
      resetForm();
      return;
    }

    const nextItem: LocalPost = {
      id: `${Date.now()}`,
      ...form,
      createdAt: now,
      updatedAt: now
    };
    save([nextItem, ...posts]);
    setNotice("Пост добавлен");
    resetForm();
  }

  function startEdit(item: LocalPost): void {
    setEditId(item.id);
    setForm({
      title: item.title,
      category: item.category,
      excerpt: item.excerpt,
      cover: item.cover,
      content: item.content
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function remove(id: string): void {
    const next = posts.filter((item) => item.id !== id);
    save(next);
    setNotice("Пост удалён");
  }

  const previewText = useMemo(() => {
    const paragraphs = form.content.split("\n").map((line) => line.trim()).filter(Boolean);
    return paragraphs.slice(0, 2).join(" ");
  }, [form.content]);

  if (!isAuth) {
    return (
      <section className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <h1 className="serif-display text-4xl font-semibold tracking-tight">Тест-админка</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Это локальная админка для теста UX. Пароль: <code>admin123</code>
        </p>
        <div className="mt-4 flex gap-2">
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none ring-brand/25 focus:ring dark:border-slate-700 dark:bg-slate-950"
            placeholder="Введите пароль"
          />
          <button
            type="button"
            onClick={login}
            className="rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            Войти
          </button>
        </div>
        {notice && <p className="mt-3 text-sm text-rose-600">{notice}</p>}
      </section>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="serif-display text-5xl font-semibold tracking-tight">Тест-админка</h1>
        <button
          type="button"
          onClick={logout}
          className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold hover:border-brand hover:text-brand dark:border-slate-700"
        >
          Выйти
        </button>
      </div>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-2xl font-bold tracking-tight">
            {editId ? "Редактирование поста" : "Новый пост"}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Заполни тему, описание, фото (или ссылку) и основной текст.
          </p>
          <div className="mt-4 grid gap-3">
            <input
              value={form.title}
              onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
              placeholder="Заголовок"
              className="rounded-xl border border-slate-300 px-4 py-3 outline-none ring-brand/25 focus:ring dark:border-slate-700 dark:bg-slate-950"
            />
            <select
              value={form.category}
              onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
              className="rounded-xl border border-slate-300 px-4 py-3 outline-none ring-brand/25 focus:ring dark:border-slate-700 dark:bg-slate-950"
            >
              {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <input
              value={form.excerpt}
              onChange={(event) => setForm((prev) => ({ ...prev, excerpt: event.target.value }))}
              placeholder="Короткое описание"
              className="rounded-xl border border-slate-300 px-4 py-3 outline-none ring-brand/25 focus:ring dark:border-slate-700 dark:bg-slate-950"
            />
            <input
              value={form.cover}
              onChange={(event) => setForm((prev) => ({ ...prev, cover: event.target.value }))}
              placeholder="Ссылка на фото (https://...) или оставь пустым"
              className="rounded-xl border border-slate-300 px-4 py-3 outline-none ring-brand/25 focus:ring dark:border-slate-700 dark:bg-slate-950"
            />
            <textarea
              value={form.content}
              onChange={(event) => setForm((prev) => ({ ...prev, content: event.target.value }))}
              placeholder="Текст поста..."
              className="min-h-[180px] rounded-xl border border-slate-300 px-4 py-3 outline-none ring-brand/25 focus:ring dark:border-slate-700 dark:bg-slate-950"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={submit}
                className="rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-dark"
              >
                {editId ? "Сохранить" : "Опубликовать"}
              </button>
              {editId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold hover:border-brand hover:text-brand dark:border-slate-700"
                >
                  Отмена
                </button>
              )}
            </div>
            {notice && <p className="text-sm text-emerald-600">{notice}</p>}
          </div>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-2xl font-bold tracking-tight">Визуальный превью-блок</h2>
          <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="relative aspect-[16/9] bg-gradient-to-br from-brand/20 via-cyan-200/30 to-emerald-200/30">
              {form.cover && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={form.cover} alt="" className="h-full w-full object-cover" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" />
            </div>
            <div className="space-y-2 bg-white p-4 dark:bg-slate-900">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand">
                {CATEGORY_LABELS[form.category as keyof typeof CATEGORY_LABELS] || "Рубрика"}
              </p>
              <h3 className="text-2xl font-bold leading-tight tracking-tight">
                {form.title || "Заголовок статьи"}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {form.excerpt || "Здесь будет короткое описание"}
              </p>
              {previewText && <p className="text-sm text-slate-500">{previewText}</p>}
            </div>
          </div>
        </article>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-2xl font-bold tracking-tight">Сохранённые посты</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {posts.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-brand">
                {CATEGORY_LABELS[item.category as keyof typeof CATEGORY_LABELS]}
              </p>
              <h3 className="mt-1 text-xl font-bold leading-tight">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.excerpt}</p>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => startEdit(item)}
                  className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold hover:border-brand hover:text-brand dark:border-slate-700"
                >
                  Редактировать
                </button>
                <button
                  type="button"
                  onClick={() => remove(item.id)}
                  className="rounded-lg border border-rose-300 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-50 dark:border-rose-900 dark:text-rose-300"
                >
                  Удалить
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

