"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { submitRegistration, type RegistrationPayload, CourseFormField } from "@/lib/strapi";
import { REGISTRATION_MIN_AGE, REGISTRATION_MAX_AGE } from "@/lib/constants";

type FormFieldConfig = {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
};

function strapiFieldToConfig(f: CourseFormField): FormFieldConfig {
  return {
    name: f.name,
    label: f.label,
    type: f.type,
    placeholder: f.placeholder,
    required: f.required,
    options: f.options ? f.options.split(",").map((o) => o.trim()).filter(Boolean) : undefined,
  };
}

interface RegistrationFormProps {
  courseDocumentId?: string;
  formFields?: CourseFormField[];
}

function DynamicField({ field, hasError }: Readonly<{ field: FormFieldConfig; hasError: boolean }>) {
  const baseClass = "w-full border border-gray-300 rounded px-4 h-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  if (field.type === "select") {
    return (
      <div>
        <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
          {field.label}{field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <select
          id={field.name}
          name={field.name}
          required={field.required}
          aria-invalid={hasError && field.required ? true : undefined}
          className={`${baseClass} bg-white text-gray-600`}
        >
          <option value="">{field.placeholder ?? field.label}</option>
          {(field.options ?? []).map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div>
        <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
          {field.label}{field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <textarea
          id={field.name}
          name={field.name}
          required={field.required}
          aria-invalid={hasError && field.required ? true : undefined}
          placeholder={field.placeholder}
          rows={3}
          className="w-full border border-gray-300 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>
    );
  }

  if (field.type === "checkbox") {
    return (
      <div className="flex items-center gap-2">
        <input
          id={field.name}
          name={field.name}
          type="checkbox"
          required={field.required}
          className="w-4 h-4 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor={field.name} className="text-sm text-gray-700">
          {field.label}{field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      </div>
    );
  }

  // text | url | email | number
  return (
    <div>
      <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
        {field.label}{field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={field.name}
        name={field.name}
        type={field.type}
        required={field.required}
        aria-invalid={hasError && field.required ? true : undefined}
        placeholder={field.placeholder}
        className={baseClass}
      />
    </div>
  );
}

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(payload: RegistrationPayload): string | null {
  if (!payload.name || payload.name.length < 2)
    return "Nome completo é obrigatório (mínimo 2 caracteres).";
  if (!payload.email || !EMAIL_RE.test(payload.email))
    return "Introduza um endereço de email válido.";
  return null;
}

export default function RegistrationForm({ courseDocumentId, formFields }: Readonly<RegistrationFormProps>) {
  const extraFields = (formFields ?? []).map(strapiFieldToConfig);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const hasError = status === "error";

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);

    const motivacao = (data.get("motivacao") as string).trim();

    const extraParts = extraFields
      .filter((f) => {
        if (f.type === "checkbox") {
          return data.get(f.name) !== null;
        }
        return Boolean(data.get(f.name));
      })
      .map((f) => {
        if (f.type === "checkbox") return `${f.label}: Sim`;
        return `${f.label}: ${(data.get(f.name) as string).trim()}`;
      });

    const message = [
      motivacao ? `Motivação: ${motivacao}` : "",
      extraParts.length > 0 ? `\n--- Campos adicionais ---\n${extraParts.join("\n")}` : "",
    ].filter(Boolean).join("\n") || undefined;

    const payload: RegistrationPayload = {
      name: (data.get("nome") as string).trim(),
      email: (data.get("email") as string).trim(),
      age: data.get("idade") ? Number(data.get("idade")) : undefined,
      sex: (data.get("sexo") as RegistrationPayload["sex"]) || undefined,
      occupation: (data.get("ocupacao") as RegistrationPayload["occupation"]) || undefined,
      message,
      course: courseDocumentId,
    };

    const validationError = validate(payload);
    if (validationError) {
      setStatus("error");
      setErrorMsg(validationError);
      return;
    }

    setStatus("loading");
    try {
      await submitRegistration(payload);
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Erro ao enviar inscrição. Tente novamente.");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white flex items-center justify-center rounded-sm" style={{ padding: "40px" }}>
        <div className="w-full max-w-md flex flex-col items-center gap-4 py-12 text-center">
          <CheckCircle size={48} className="text-green-500" />
          <h2 className="font-bold text-xl text-gray-800 uppercase">Inscrição enviada!</h2>
          <p className="text-gray-500 text-sm">
            Recebemos o seu pedido. Entraremos em contacto em breve.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-4 text-sm underline text-primary"
          >
            Fazer nova inscrição
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white flex items-center justify-center rounded-sm" style={{ padding: "40px" }}>
      <div className="w-full max-w-md">
        <h2
          className="font-bold uppercase mb-6"
          style={{ color: "var(--color-primary)", fontSize: "24px" }}
        >
          INSCRIÇÃO:
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              aria-required="true"
              aria-invalid={hasError || undefined}
              placeholder="seu@email.com"
              className="w-full border border-gray-300 rounded px-4 h-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Nome completo */}
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
              Nome completo
            </label>
            <input
              id="nome"
              name="nome"
              type="text"
              required
              aria-required="true"
              aria-invalid={hasError || undefined}
              placeholder="O seu nome completo"
              className="w-full border border-gray-300 rounded px-4 h-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Campos extras dinâmicos por curso */}
          {extraFields.map((field) => (
            <DynamicField key={field.name} field={field} hasError={hasError} />
          ))}

          {/* Three dropdowns in a row */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label htmlFor="idade" className="block text-sm font-medium text-gray-700 mb-1">
                Idade
              </label>
              <select
                id="idade"
                name="idade"
                className="w-full border border-gray-300 rounded px-2 h-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-600"
              >
                <option value="">Idade</option>
                {Array.from({ length: REGISTRATION_MAX_AGE - REGISTRATION_MIN_AGE + 1 }, (_, i) => i + REGISTRATION_MIN_AGE).map((age) => (
                  <option key={age} value={age}>{age}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="sexo" className="block text-sm font-medium text-gray-700 mb-1">
                Sexo
              </label>
              <select
                id="sexo"
                name="sexo"
                className="w-full border border-gray-300 rounded px-2 h-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-600"
              >
                <option value="">Sexo</option>
                <option value="masculino">Masc.</option>
                <option value="feminino">Fem.</option>
                <option value="outro">Outro</option>
              </select>
            </div>
            <div>
              <label htmlFor="ocupacao" className="block text-sm font-medium text-gray-700 mb-1">
                Ocupação atual
              </label>
              <select
                id="ocupacao"
                name="ocupacao"
                className="w-full border border-gray-300 rounded px-2 h-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-600"
              >
                <option value="">Ocupação</option>
                <option value="estudante">Estudante</option>
                <option value="empregado">Empregado</option>
                <option value="desempregado">Desempregado</option>
                <option value="empreendedor">Empreendedor</option>
                <option value="outro">Outro</option>
              </select>
            </div>
          </div>

          {/* Motivation textarea */}
          <div>
            <label htmlFor="motivacao" className="block text-sm font-medium text-gray-700 mb-1">
              Por que deseja participar deste workshop?
            </label>
            <textarea
              id="motivacao"
              name="motivacao"
              rows={4}
              placeholder="Partilhe a sua motivação..."
              className="w-full border border-gray-300 rounded px-4 py-3 h-28 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Error message */}
          {hasError && (
            <div
              role="alert"
              aria-live="polite"
              className="flex items-center gap-2 text-red-600 text-sm"
            >
              <AlertCircle size={16} aria-hidden="true" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Submit button */}
          <div className="mt-4">
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center gap-2 rounded-full px-8 py-3 font-bold text-sm text-white disabled:opacity-60"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> A enviar...
                </>
              ) : (
                <>
                  ENVIAR <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
