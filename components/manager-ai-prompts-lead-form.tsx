"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import { LEADS_API_URL, TELEGRAM_CONSULT_URL } from "@/lib/constants";
import { ALL_MANAGER_PROMPTS, MANAGER_AI_PROMPTS, type ManagerPrompt } from "@/lib/manager-ai-prompts";

type LeadForm = {
  fullName: string;
  email: string;
  company: string;
  role: string;
  telegram: string;
};

type Status = "idle" | "sending" | "success" | "error";

export function ManagerAiPromptsLeadForm(): JSX.Element {
  const [form, setForm] = useState<LeadForm>({
    fullName: "",
    email: "",
    company: "",
    role: "",
    telegram: ""
  });
  const [status, setStatus] = useState<Status>("idle");
  const [isUnlocked, setIsUnlocked] = useState(false);

  async function submitLead(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setStatus("sending");

    try {
      if (LEADS_API_URL) {
        const response = await fetch(LEADS_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: form.fullName,
            email: form.email,
            company: form.company,
            role: form.role,
            telegram: form.telegram,
            source: "lead-magnet-50-manager-ai-prompts",
            result: "Запросил лид-магнит: 50 промтов для руководителя",
            leadMagnet: MANAGER_AI_PROMPTS.fullTitle,
            pageUrl: window.location.href
          })
        });

        if (!response.ok) {
          throw new Error("Lead API request failed");
        }
      }

      setStatus("success");
      setIsUnlocked(true);
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
      <div className="rounded-[2rem] border border-[#ec9a48] bg-[linear-gradient(135deg,#fff0df_0%,#fff8e8_100%)] p-6 shadow-soft md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9a4d00]">
          PDF-лид-магнит
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
          Получить 50 промтов
        </h2>
        <p className="mt-4 text-base leading-8 text-slate-700">
          Оставьте контакты, и заявка уйдет Денису в Telegram. После отправки на странице откроется
          полный набор промтов с задачами, сценариями применения и ожидаемым результатом.
        </p>

        <form onSubmit={submitLead} className="mt-6 space-y-3">
          <LeadInput label="Имя" value={form.fullName} required onChange={(value) => setForm((prev) => ({ ...prev, fullName: value }))} />
          <LeadInput label="Email" type="email" value={form.email} required onChange={(value) => setForm((prev) => ({ ...prev, email: value }))} />
          <div className="grid gap-3 sm:grid-cols-2">
            <LeadInput label="Компания" value={form.company} onChange={(value) => setForm((prev) => ({ ...prev, company: value }))} />
            <LeadInput label="Должность" value={form.role} onChange={(value) => setForm((prev) => ({ ...prev, role: value }))} />
          </div>
          <LeadInput label="Telegram" value={form.telegram} onChange={(value) => setForm((prev) => ({ ...prev, telegram: value }))} />

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full rounded-2xl bg-slate-950 px-6 py-4 text-base font-black text-white shadow-[0_7px_0_0_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-wait disabled:opacity-70"
          >
            {status === "sending" ? "Отправляем..." : "Получить PDF"}
          </button>
        </form>

        {status === "success" ? (
          <p className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
            Заявка отправлена. Подборка промтов открыта ниже.
          </p>
        ) : null}
        {status === "error" ? (
          <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
            Не удалось отправить заявку. Проверьте соединение или напишите Денису в Telegram.
          </p>
        ) : null}
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Структура PDF
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
          Что внутри подборки
        </h2>
        <div className="mt-5 grid gap-3">
          {[
            "Введение: где ИИ реально помогает руководителю.",
            "Как пользоваться промтами и адаптировать их под контекст.",
            "Промты для анализа ситуации и подготовки решений.",
            "Промты для совещаний, проектов, продаж, HR и команды.",
            "Промты для стратегии и финальный CTA на курс или консультацию."
          ].map((item, index) => (
            <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">
                0{index + 1}
              </p>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-800">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {isUnlocked ? (
        <div className="lg:col-span-2">
          <UnlockedPrompts />
        </div>
      ) : null}
    </section>
  );
}

function LeadInput({
  label,
  value,
  onChange,
  type = "text",
  required = false
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}): JSX.Element {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-bold text-slate-700">{label}</span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900"
      />
    </label>
  );
}

function UnlockedPrompts(): JSX.Element {
  const [pdfStatus, setPdfStatus] = useState<"idle" | "generating" | "success" | "error">("idle");

  async function downloadPdf(): Promise<void> {
    setPdfStatus("generating");

    try {
      await generateManagerPromptsPdf();
      setPdfStatus("success");
    } catch {
      setPdfStatus("error");
    }
  }

  return (
    <section className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft md:p-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Материал открыт
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
          {MANAGER_AI_PROMPTS.fullTitle}
        </h2>
        <p className="mt-4 max-w-4xl text-base leading-8 text-slate-700">
          {MANAGER_AI_PROMPTS.intro}
        </p>
      </div>

      <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Как пользоваться
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {MANAGER_AI_PROMPTS.howToUse.map((item) => (
            <p key={item} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700">
              {item}
            </p>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {MANAGER_AI_PROMPTS.sections.map((section) => (
          <section key={section.title} className="space-y-3">
            <h3 className="text-2xl font-black tracking-tight text-slate-900">{section.title}</h3>
            <div className="grid gap-3">
              {section.prompts.map((prompt) => {
                const index = ALL_MANAGER_PROMPTS.findIndex((item) => item.prompt === prompt.prompt) + 1;
                return (
                  <article key={prompt.prompt} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-black text-white">
                        {index}
                      </span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                        {prompt.task}
                      </span>
                    </div>
                    <p className="mt-3 rounded-xl bg-slate-50 p-4 text-sm font-semibold leading-7 text-slate-800">
                      {prompt.prompt}
                    </p>
                    <div className="mt-3 grid gap-3 md:grid-cols-2">
                      <p className="text-sm leading-6 text-slate-600">
                        <span className="font-bold text-slate-900">Когда применять: </span>
                        {prompt.whenToUse}
                      </p>
                      <p className="text-sm leading-6 text-slate-600">
                        <span className="font-bold text-slate-900">Результат: </span>
                        {prompt.expectedResult}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <div className="rounded-[1.75rem] border border-[#ec9a48] bg-[#fff0df] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9a4d00]">
          Следующий шаг
        </p>
        <p className="mt-3 text-sm leading-7 text-slate-700">{MANAGER_AI_PROMPTS.courseCta}</p>
        <p className="mt-3 text-sm leading-7 text-slate-700">{MANAGER_AI_PROMPTS.afterDownloadMessage}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={downloadPdf}
            disabled={pdfStatus === "generating"}
            className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-50"
          >
            {pdfStatus === "generating" ? "Формируем PDF..." : "Скачать PDF"}
          </button>
          <Link
            href="https://stepik.org/course/243614/promo"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-50"
          >
            Смотреть курс
          </Link>
          <Link
            href={TELEGRAM_CONSULT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            Обсудить внедрение ИИ
          </Link>
        </div>
        {pdfStatus === "success" ? (
          <p className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
            PDF сформирован и скачан.
          </p>
        ) : null}
        {pdfStatus === "error" ? (
          <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
            Не удалось сформировать PDF. Попробуйте обновить страницу и скачать файл еще раз.
          </p>
        ) : null}
      </div>
    </section>
  );
}

async function generateManagerPromptsPdf(): Promise<void> {
  const pages = renderManagerPromptsPages();
  const pdfBytes = buildImagePdf(pages);
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "50-promtov-dlya-rukovoditelya.pdf";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

type PdfCanvasPage = {
  width: number;
  height: number;
  data: Uint8Array;
};

function renderManagerPromptsPages(): PdfCanvasPage[] {
  const width = 1240;
  const height = 1754;
  const margin = 86;
  const pages: PdfCanvasPage[] = [];
  let canvas = createPdfCanvas(width, height);
  let context = getCanvasContext(canvas);
  let y = margin;
  let pageNumber = 1;

  function finishPage(): void {
    drawPageFooter(context, width, height, pageNumber);
    pages.push({
      width,
      height,
      data: dataUrlToBytes(canvas.toDataURL("image/jpeg", 0.92))
    });
    pageNumber += 1;
  }

  function nextPage(): void {
    finishPage();
    canvas = createPdfCanvas(width, height);
    context = getCanvasContext(canvas);
    y = margin;
  }

  function ensureSpace(requiredHeight: number): void {
    if (y + requiredHeight > height - margin - 48) {
      nextPage();
    }
  }

  drawCover(context, width, height);
  finishPage();

  canvas = createPdfCanvas(width, height);
  context = getCanvasContext(canvas);
  y = margin;

  y = drawSectionTitle(context, "Как пользоваться промтами", y, margin);
  MANAGER_AI_PROMPTS.howToUse.forEach((item, index) => {
    const lines = wrapCanvasText(context, item, width - margin * 2 - 58, "30px Arial");
    const blockHeight = 44 + lines.length * 38;
    ensureSpace(blockHeight + 18);
    drawNumberBadge(context, margin, y + 2, index + 1);
    drawWrappedText(context, item, margin + 58, y, width - margin * 2 - 58, {
      font: "30px Arial",
      color: "#334155",
      lineHeight: 38
    });
    y += blockHeight;
  });

  y += 28;
  let promptIndex = 1;
  MANAGER_AI_PROMPTS.sections.forEach((section) => {
    ensureSpace(120);
    y = drawSectionTitle(context, section.title, y, margin);

    section.prompts.forEach((prompt) => {
      const requiredHeight = measurePromptCard(context, prompt);
      ensureSpace(requiredHeight + 28);
      drawPromptCard(context, prompt, promptIndex, y, margin, width - margin * 2, requiredHeight);
      y += requiredHeight + 28;
      promptIndex += 1;
    });
  });

  ensureSpace(280);
  y = drawSectionTitle(context, "Следующий шаг", y, margin);
  y += drawWrappedText(context, MANAGER_AI_PROMPTS.courseCta, margin, y, width - margin * 2, {
    font: "30px Arial",
    color: "#334155",
    lineHeight: 40
  });
  y += 22;
  drawWrappedText(context, MANAGER_AI_PROMPTS.afterDownloadMessage, margin, y, width - margin * 2, {
    font: "30px Arial",
    color: "#334155",
    lineHeight: 40
  });

  finishPage();
  return pages;
}

function createPdfCanvas(width: number, height: number): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = getCanvasContext(canvas);
  context.fillStyle = "#fffaf2";
  context.fillRect(0, 0, width, height);
  context.fillStyle = "#ffffff";
  roundRect(context, 44, 44, width - 88, height - 88, 42);
  context.fill();
  return canvas;
}

function getCanvasContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Canvas context is not available");
  }
  return context;
}

function drawCover(context: CanvasRenderingContext2D, width: number, height: number): void {
  context.fillStyle = "#101820";
  roundRect(context, 44, 44, width - 88, height - 88, 42);
  context.fill();

  context.strokeStyle = "rgba(242,193,78,0.45)";
  context.lineWidth = 26;
  context.beginPath();
  context.arc(width - 190, 190, 150, 0, Math.PI * 2);
  context.stroke();

  context.strokeStyle = "rgba(124,207,255,0.38)";
  context.lineWidth = 24;
  context.beginPath();
  context.arc(170, height - 180, 120, 0, Math.PI * 2);
  context.stroke();

  context.fillStyle = "#f2c14e";
  context.font = "bold 28px Arial";
  context.fillText("PDF-лид-магнит", 92, 150);

  drawWrappedText(context, MANAGER_AI_PROMPTS.fullTitle, 92, 250, width - 184, {
    font: "bold 70px Arial",
    color: "#ffffff",
    lineHeight: 82
  });

  drawWrappedText(context, MANAGER_AI_PROMPTS.promise, 92, 620, width - 220, {
    font: "34px Arial",
    color: "rgba(255,255,255,0.78)",
    lineHeight: 48
  });

  ["50 промтов", "7 разделов", "для управления, проектов, продаж, HR и стратегии"].forEach((fact, index) => {
    const x = 92;
    const y = 1040 + index * 104;
    context.fillStyle = "rgba(255,255,255,0.08)";
    roundRect(context, x, y, width - 184, 74, 24);
    context.fill();
    context.fillStyle = "#ffffff";
    context.font = "bold 30px Arial";
    context.fillText(fact, x + 28, y + 47);
  });

  context.fillStyle = "rgba(255,255,255,0.66)";
  context.font = "28px Arial";
  context.fillText("Денис Михин · media.dmikhin.ru", 92, height - 130);
}

function drawPageFooter(context: CanvasRenderingContext2D, width: number, height: number, pageNumber: number): void {
  context.fillStyle = "#94a3b8";
  context.font = "22px Arial";
  context.fillText("media.dmikhin.ru", 86, height - 58);
  context.textAlign = "right";
  context.fillText(String(pageNumber), width - 86, height - 58);
  context.textAlign = "left";
}

function drawSectionTitle(context: CanvasRenderingContext2D, title: string, y: number, margin: number): number {
  context.fillStyle = "#f2c14e";
  roundRect(context, margin, y, 84, 12, 6);
  context.fill();
  context.fillStyle = "#0f172a";
  context.font = "bold 46px Arial";
  context.fillText(title, margin, y + 74);
  return y + 112;
}

function drawNumberBadge(context: CanvasRenderingContext2D, x: number, y: number, number: number): void {
  context.fillStyle = "#0f172a";
  roundRect(context, x, y, 42, 42, 14);
  context.fill();
  context.fillStyle = "#ffffff";
  context.font = "bold 20px Arial";
  context.textAlign = "center";
  context.fillText(String(number).padStart(2, "0"), x + 21, y + 28);
  context.textAlign = "left";
}

function measurePromptCard(context: CanvasRenderingContext2D, prompt: ManagerPrompt): number {
  const contentWidth = 1240 - 86 * 2 - 52;
  const promptLines = wrapCanvasText(context, prompt.prompt, contentWidth, "28px Arial");
  const whenLines = wrapCanvasText(context, `Когда применять: ${prompt.whenToUse}`, contentWidth, "25px Arial");
  const resultLines = wrapCanvasText(context, `Результат: ${prompt.expectedResult}`, contentWidth, "25px Arial");
  return 126 + promptLines.length * 36 + whenLines.length * 32 + resultLines.length * 32;
}

function drawPromptCard(
  context: CanvasRenderingContext2D,
  prompt: ManagerPrompt,
  index: number,
  y: number,
  x: number,
  width: number,
  height: number
): void {
  context.fillStyle = "#f8fafc";
  roundRect(context, x, y, width, height, 28);
  context.fill();
  context.strokeStyle = "#e2e8f0";
  context.lineWidth = 2;
  roundRect(context, x, y, width, height, 28);
  context.stroke();

  drawNumberBadge(context, x + 26, y + 26, index);
  context.fillStyle = "#334155";
  context.font = "bold 28px Arial";
  context.fillText(prompt.section, x + 86, y + 58);
  context.fillStyle = "#0f172a";
  context.font = "bold 34px Arial";
  context.fillText(prompt.task, x + 26, y + 116);

  let cursor = y + 166;
  cursor += drawWrappedText(context, prompt.prompt, x + 26, cursor, width - 52, {
    font: "28px Arial",
    color: "#1e293b",
    lineHeight: 36
  });
  cursor += 20;
  cursor += drawWrappedText(context, `Когда применять: ${prompt.whenToUse}`, x + 26, cursor, width - 52, {
    font: "25px Arial",
    color: "#475569",
    lineHeight: 32
  });
  cursor += 10;
  drawWrappedText(context, `Результат: ${prompt.expectedResult}`, x + 26, cursor, width - 52, {
    font: "25px Arial",
    color: "#475569",
    lineHeight: 32
  });
}

function drawWrappedText(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  options: { font: string; color: string; lineHeight: number }
): number {
  const lines = wrapCanvasText(context, text, maxWidth, options.font);
  context.font = options.font;
  context.fillStyle = options.color;
  lines.forEach((line, index) => {
    context.fillText(line, x, y + index * options.lineHeight);
  });
  return lines.length * options.lineHeight;
}

function wrapCanvasText(context: CanvasRenderingContext2D, text: string, maxWidth: number, font: string): string[] {
  context.font = font;
  const words = text.replace(/\s+/g, " ").trim().split(" ");
  const lines: string[] = [];
  let currentLine = "";

  words.forEach((word) => {
    const nextLine = currentLine ? `${currentLine} ${word}` : word;
    if (context.measureText(nextLine).width <= maxWidth || !currentLine) {
      currentLine = nextLine;
      return;
    }
    lines.push(currentLine);
    currentLine = word;
  });

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

function roundRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
): void {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + radius);
  context.lineTo(x + width, y + height - radius);
  context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  context.lineTo(x + radius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
  context.closePath();
}

function dataUrlToBytes(dataUrl: string): Uint8Array {
  const base64 = dataUrl.split(",")[1] ?? "";
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

function buildImagePdf(pages: PdfCanvasPage[]): Uint8Array {
  const encoder = new TextEncoder();
  const chunks: Uint8Array[] = [];
  const offsets: number[] = [0];
  let position = 0;
  let objectId = 1;

  function appendBytes(bytes: Uint8Array): void {
    chunks.push(bytes);
    position += bytes.length;
  }

  function appendString(value: string): void {
    appendBytes(encoder.encode(value));
  }

  function addObject(content: Array<string | Uint8Array>): number {
    const id = objectId;
    objectId += 1;
    offsets[id] = position;
    appendString(`${id} 0 obj\n`);
    content.forEach((item) => {
      if (typeof item === "string") {
        appendString(item);
      } else {
        appendBytes(item);
      }
    });
    appendString("\nendobj\n");
    return id;
  }

  appendString("%PDF-1.4\n%\u00ff\u00ff\u00ff\u00ff\n");

  const catalogId = objectId;
  objectId += 1;
  const pagesId = objectId;
  objectId += 1;
  const pageIds: number[] = [];

  pages.forEach((page, index) => {
    const imageId = addObject([
      `<< /Type /XObject /Subtype /Image /Width ${page.width} /Height ${page.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${page.data.length} >>\nstream\n`,
      page.data,
      "\nendstream"
    ]);
    const content = `q\n595 0 0 842 0 0 cm\n/Im${index + 1} Do\nQ\n`;
    const contentId = addObject([`<< /Length ${content.length} >>\nstream\n${content}endstream`]);
    const pageId = addObject([
      `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 595 842] /Resources << /XObject << /Im${index + 1} ${imageId} 0 R >> >> /Contents ${contentId} 0 R >>`
    ]);
    pageIds.push(pageId);
  });

  offsets[pagesId] = position;
  appendString(`${pagesId} 0 obj\n`);
  appendString(`<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`);
  appendString("\nendobj\n");

  offsets[catalogId] = position;
  appendString(`${catalogId} 0 obj\n`);
  appendString(`<< /Type /Catalog /Pages ${pagesId} 0 R >>`);
  appendString("\nendobj\n");

  const xrefPosition = position;
  appendString(`xref\n0 ${objectId}\n`);
  appendString("0000000000 65535 f \n");
  for (let id = 1; id < objectId; id += 1) {
    appendString(`${String(offsets[id]).padStart(10, "0")} 00000 n \n`);
  }
  appendString(`trailer\n<< /Size ${objectId} /Root ${catalogId} 0 R >>\nstartxref\n${xrefPosition}\n%%EOF`);

  const result = new Uint8Array(position);
  let offset = 0;
  chunks.forEach((chunk) => {
    result.set(chunk, offset);
    offset += chunk.length;
  });
  return result;
}
