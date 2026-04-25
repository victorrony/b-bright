"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle, AlertCircle, Loader2, Camera, X } from "lucide-react";
import { submitMember, type MemberPayload } from "@/lib/strapi";

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function parseDateToISO(value: string): string {
  // Input date vem como YYYY-MM-DD do browser
  return value;
}

function validate(data: FormData): string | null {
  const fullName = (data.get("fullName") as string)?.trim();
  const birthDate = data.get("birthDate") as string;
  const gender = data.get("gender") as string;
  const email = (data.get("email") as string)?.trim();
  const phone = (data.get("phone") as string)?.trim();
  const address = (data.get("address") as string)?.trim();
  const terms = data.get("termsAccepted");

  if (!fullName || fullName.length < 2) return "Nome completo é obrigatório.";
  if (!birthDate) return "Data de nascimento é obrigatória.";
  if (!gender) return "Género é obrigatório.";
  if (!email || !EMAIL_RE.test(email)) return "Introduza um email válido.";
  if (!phone || phone.length < 7) return "Número de telemóvel é obrigatório.";
  if (!address || address.length < 3) return "Morada é obrigatória.";
  if (!terms) return "Deve aceitar os termos e condições para continuar.";
  return null;
}

const inputClass =
  "w-full border border-gray-300 rounded px-4 h-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
const selectClass =
  "w-full border border-gray-300 rounded px-4 h-12 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500";
const labelClass = "block text-sm font-medium text-gray-700 mb-1";

export default function MemberForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  }

  function removePhoto() {
    setPhotoFile(null);
    setPhotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);

    const validationError = validate(data);
    if (validationError) {
      setStatus("error");
      setErrorMsg(validationError);
      return;
    }

    const howHeardRaw = data.get("howHeard") as string;

    const payload: MemberPayload = {
      fullName: (data.get("fullName") as string).trim(),
      birthDate: parseDateToISO(data.get("birthDate") as string),
      gender: data.get("gender") as MemberPayload["gender"],
      email: (data.get("email") as string).trim(),
      phone: (data.get("phone") as string).trim(),
      address: (data.get("address") as string).trim(),
      church: (data.get("church") as string)?.trim() || undefined,
      howHeard: (howHeardRaw as MemberPayload["howHeard"]) || undefined,
      termsAccepted: true,
    };

    setStatus("loading");
    try {
      // Upload foto se existir
      if (photoFile) {
        const uploadForm = new FormData();
        uploadForm.append("files", photoFile);
        const uploadRes = await fetch("/api/member-upload", {
          method: "POST",
          body: uploadForm,
        });
        if (uploadRes.ok) {
          const uploaded = await uploadRes.json();
          (payload as unknown as Record<string, unknown>).photo = uploaded[0]?.id;
        }
      }

      await submitMember(payload);
      setStatus("success");
      form.reset();
      removePhoto();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Erro ao enviar registo. Tente novamente.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-6 py-16 text-center">
        <CheckCircle size={56} className="text-green-500" />
        <h2 className="font-bold text-2xl uppercase" style={{ color: "var(--color-primary)" }}>
          Registo enviado!
        </h2>
        <p className="text-gray-500 max-w-sm">
          Recebemos o seu pedido de adesão. Entraremos em contacto brevemente após revisão do registo.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm underline text-gray-500 hover:text-gray-700"
        >
          Fazer novo registo
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      {/* Foto de perfil */}
      <div className="flex flex-col items-center gap-3">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 bg-gray-100 flex items-center justify-center shrink-0">
          {photoPreview ? (
            <img src={photoPreview ?? ""} alt="Pré-visualização" className="w-full h-full object-cover" />
          ) : (
            <Camera size={28} className="text-gray-400" />
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="text-sm font-medium text-primary underline hover:opacity-70"
          >
            {photoPreview ? "Alterar foto" : "Adicionar foto de perfil"}
          </button>
          {photoPreview && (
            <button type="button" onClick={removePhoto} className="text-gray-400 hover:text-red-500">
              <X size={15} />
            </button>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handlePhotoChange}
        />
      </div>

      {/* Nome completo */}
      <div>
        <label htmlFor="fullName" className={labelClass}>
          Nome completo <span className="text-red-500">*</span>
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          required
          placeholder="Primeiro e último nome"
          className={inputClass}
        />
      </div>

      {/* Data de nascimento + Género */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="birthDate" className={labelClass}>
            Data de nascimento <span className="text-red-500">*</span>
          </label>
          <input
            id="birthDate"
            name="birthDate"
            type="date"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="gender" className={labelClass}>
            Género <span className="text-red-500">*</span>
          </label>
          <select id="gender" name="gender" required className={selectClass}>
            <option value="">Selecionar...</option>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
            <option value="prefiro_nao_dizer">Prefiro não dizer</option>
          </select>
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className={labelClass}>
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="seu@email.com"
          className={inputClass}
        />
      </div>

      {/* Telemóvel */}
      <div>
        <label htmlFor="phone" className={labelClass}>
          Telemóvel <span className="text-red-500">*</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          placeholder="+238 9xx xxx xxx"
          className={inputClass}
        />
      </div>

      {/* Morada */}
      <div>
        <label htmlFor="address" className={labelClass}>
          Morada <span className="text-red-500">*</span>
        </label>
        <input
          id="address"
          name="address"
          type="text"
          required
          placeholder="Rua, código postal, cidade"
          className={inputClass}
        />
      </div>

      {/* Igreja / Congregação */}
      <div>
        <label htmlFor="church" className={labelClass}>
          Igreja / Congregação
        </label>
        <input
          id="church"
          name="church"
          type="text"
          placeholder="Igreja de origem (opcional)"
          className={inputClass}
        />
      </div>

      {/* Como soube */}
      <div>
        <label htmlFor="howHeard" className={labelClass}>
          Como soube da GBB?
        </label>
        <select id="howHeard" name="howHeard" className={selectClass}>
          <option value="">Selecionar (opcional)...</option>
          <option value="amigo">Através de um amigo</option>
          <option value="redes_sociais">Redes sociais</option>
          <option value="evento">Num evento</option>
          <option value="outro">Outro</option>
        </select>
      </div>

      {/* Termos e condições */}
      <div className="flex items-start gap-3 pt-1">
        <input
          id="termsAccepted"
          name="termsAccepted"
          type="checkbox"
          required
          className="mt-0.5 w-4 h-4 border-gray-300 rounded focus:ring-blue-500 shrink-0"
        />
        <label htmlFor="termsAccepted" className="text-sm text-gray-600 leading-relaxed">
          Aceito a{" "}
          <span className="underline font-medium text-gray-800">política de privacidade</span>{" "}
          e autorizo o tratamento dos meus dados pessoais pela Geração B-Bright, em conformidade com o RGPD.{" "}
          <span className="text-red-500">*</span>
        </label>
      </div>

      {/* Erro */}
      {status === "error" && (
        <div
          role="alert"
          aria-live="polite"
          className="flex items-center gap-2 text-red-600 text-sm"
        >
          <AlertCircle size={16} aria-hidden="true" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Submeter */}
      <div className="pt-2 flex flex-col gap-3">
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center gap-2 rounded-full px-10 py-3.5 font-bold text-sm text-white disabled:opacity-60 transition-opacity"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          {status === "loading" ? (
            <>
              <Loader2 size={16} className="animate-spin" /> A enviar...
            </>
          ) : (
            <>
              TORNAR-ME MEMBRO <ArrowRight size={16} />
            </>
          )}
        </button>
        <p className="text-sm text-gray-400">
          Já és membro?{" "}
          <Link href="/membro" className="underline text-gray-600 hover:text-gray-800">
            Consulta o teu registo aqui
          </Link>
        </p>
      </div>
    </form>
  );
}
