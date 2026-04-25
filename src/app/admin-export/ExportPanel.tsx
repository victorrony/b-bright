"use client";

import { useState } from "react";
import { Download, Loader2, Lock, Users, BookOpen } from "lucide-react";

interface Course {
  documentId: string;
  title: string;
}

interface ExportPanelProps {
  courses: Course[];
}

type ExportStatus = "idle" | "loading" | "error";

function useExport() {
  const [status, setStatus] = useState<ExportStatus>("idle");
  const [error, setError] = useState("");

  async function doExport(params: Record<string, string>) {
    setError("");
    setStatus("loading");
    try {
      const qs = new URLSearchParams(params).toString();
      const res = await fetch(`/api/export?${qs}`);
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error((json as { error?: string }).error ?? "Erro ao exportar.");
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const cd = res.headers.get("content-disposition") ?? "";
      const match = cd.match(/filename="([^"]+)"/);
      a.href = url;
      a.download = match?.[1] ?? "export.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setStatus("idle");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Erro desconhecido.");
    }
  }

  return { status, error, doExport };
}

export default function ExportPanel({ courses }: Readonly<ExportPanelProps>) {
  const [password, setPassword] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [memberStatus, setMemberStatus] = useState("todos");

  const registrationsExport = useExport();
  const membersExport = useExport();

  const inputClass = "w-full border border-gray-300 rounded-lg px-4 h-11 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white";
  const btnClass = "inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-white disabled:opacity-50 transition-opacity";

  return (
    <div className="flex flex-col gap-6">
      {/* Password */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Lock size={18} className="text-gray-500" />
          <h2 className="font-bold text-gray-700">Autenticação</h2>
        </div>
        <div>
          <label htmlFor="password" className="block text-sm text-gray-600 mb-1">
            Palavra-passe de administrador
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className={inputClass}
          />
        </div>
      </div>

      {/* Exportar inscritos */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen size={18} className="text-gray-500" />
          <h2 className="font-bold text-gray-700">Inscritos em Cursos</h2>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="course" className="block text-sm text-gray-600 mb-1">
              Filtrar por curso (opcional)
            </label>
            <select
              id="course"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className={inputClass}
            >
              <option value="">Todos os cursos</option>
              {courses.map((c) => (
                <option key={c.documentId} value={c.documentId}>{c.title}</option>
              ))}
            </select>
          </div>
          {registrationsExport.error && (
            <p className="text-sm text-red-600">{registrationsExport.error}</p>
          )}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => registrationsExport.doExport({
                type: "registrations",
                password,
                ...(selectedCourse ? { courseId: selectedCourse } : {}),
              })}
              disabled={!password || registrationsExport.status === "loading"}
              className={btnClass}
              style={{ backgroundColor: "var(--color-primary-dark)" }}
            >
              {registrationsExport.status === "loading" ? (
                <><Loader2 size={15} className="animate-spin" /> A gerar...</>
              ) : (
                <><Download size={15} /> {selectedCourse ? "Exportar Curso (.xlsx)" : "Exportar Todos (.xlsx)"}</>
              )}
            </button>
            {selectedCourse && (
              <button
                onClick={() => registrationsExport.doExport({
                  type: "registrations",
                  password,
                })}
                disabled={!password || registrationsExport.status === "loading"}
                className={btnClass}
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                <><Download size={15} /> Exportar Todos os Cursos (.xlsx)</>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Exportar membros */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Users size={18} className="text-gray-500" />
          <h2 className="font-bold text-gray-700">Membros da Comunidade</h2>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="memberStatus" className="block text-sm text-gray-600 mb-1">
              Filtrar por estado
            </label>
            <select
              id="memberStatus"
              value={memberStatus}
              onChange={(e) => setMemberStatus(e.target.value)}
              className={inputClass}
            >
              <option value="todos">Todos</option>
              <option value="pendente">Pendente</option>
              <option value="aprovado">Aprovado</option>
              <option value="rejeitado">Rejeitado</option>
            </select>
          </div>
          {membersExport.error && (
            <p className="text-sm text-red-600">{membersExport.error}</p>
          )}
          <button
            onClick={() => membersExport.doExport({
              type: "members",
              password,
              status: memberStatus,
            })}
            disabled={!password || membersExport.status === "loading"}
            className={btnClass}
            style={{ backgroundColor: "var(--color-primary-dark)" }}
          >
            {membersExport.status === "loading" ? (
              <><Loader2 size={15} className="animate-spin" /> A gerar...</>
            ) : (
              <><Download size={15} /> Exportar Membros (.xlsx)</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
