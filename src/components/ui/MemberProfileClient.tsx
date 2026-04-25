"use client";

import { useState } from "react";
import { CheckCircle, Clock, XCircle, Loader2, AlertCircle, Edit2, Trash2, Save, X } from "lucide-react";

type MemberStatus = "pendente" | "aprovado" | "rejeitado";

interface MemberData {
  documentId: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  church?: string;
  birthDate: string;
  gender: string;
  howHeard?: string;
  status: MemberStatus;
  createdAt: string;
  photo?: { url: string } | null;
}

const STATUS_CONFIG: Record<MemberStatus, { label: string; icon: React.ReactNode; className: string }> = {
  pendente: {
    label: "Pedido em análise",
    icon: <Clock size={20} />,
    className: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
  aprovado: {
    label: "Membro aprovado",
    icon: <CheckCircle size={20} />,
    className: "bg-green-50 text-green-700 border-green-200",
  },
  rejeitado: {
    label: "Pedido rejeitado",
    icon: <XCircle size={20} />,
    className: "bg-red-50 text-red-600 border-red-200",
  },
};

const GENDER_LABELS: Record<string, string> = {
  masculino: "Masculino",
  feminino: "Feminino",
  prefiro_nao_dizer: "Prefiro não dizer",
};

const HOW_HEARD_LABELS: Record<string, string> = {
  amigo: "Através de um amigo",
  redes_sociais: "Redes sociais",
  evento: "Num evento",
  outro: "Outro",
};

const inputClass =
  "w-full border border-gray-300 rounded px-4 h-11 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
const labelClass = "block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide";

export default function MemberProfileClient() {
  const [email, setEmail] = useState("");
  const [searching, setSearching] = useState(false);
  const [member, setMember] = useState<MemberData | null>(null);
  const [searchError, setSearchError] = useState("");

  const [editing, setEditing] = useState(false);
  const [editPhone, setEditPhone] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [editChurch, setEditChurch] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteMsg, setDeleteMsg] = useState("");
  const [deleted, setDeleted] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setSearchError("");
    setMember(null);
    setDeleted(false);
    if (!email.trim()) return;

    setSearching(true);
    try {
      const res = await fetch(`/api/member-profile?email=${encodeURIComponent(email.trim())}`);
      const json = await res.json();
      if (!res.ok) {
        setSearchError(json.error ?? "Erro ao procurar registo.");
        return;
      }
      const m = json.data;
      setMember({
        documentId: m.documentId,
        fullName: m.fullName,
        email: m.email,
        phone: m.phone,
        address: m.address,
        church: m.church ?? "",
        birthDate: m.birthDate,
        gender: m.gender,
        howHeard: m.howHeard,
        status: m.status ?? "pendente",
        createdAt: m.createdAt,
        photo: m.photo ?? null,
      });
    } catch {
      setSearchError("Erro de ligação. Tenta novamente.");
    } finally {
      setSearching(false);
    }
  }

  function startEdit() {
    if (!member) return;
    setEditPhone(member.phone);
    setEditAddress(member.address);
    setEditChurch(member.church ?? "");
    setEditing(true);
    setSaveMsg("");
  }

  function cancelEdit() {
    setEditing(false);
    setSaveMsg("");
  }

  async function handleSave() {
    if (!member) return;
    setSaving(true);
    setSaveMsg("");
    try {
      const res = await fetch("/api/member-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentId: member.documentId,
          phone: editPhone,
          address: editAddress,
          church: editChurch,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setSaveMsg(json.error ?? "Erro ao guardar.");
        return;
      }
      setMember((prev) => prev ? { ...prev, phone: editPhone, address: editAddress, church: editChurch } : prev);
      setEditing(false);
      setSaveMsg("Dados atualizados com sucesso.");
    } catch {
      setSaveMsg("Erro de ligação. Tenta novamente.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!member) return;
    setDeleting(true);
    setDeleteMsg("");
    try {
      const res = await fetch("/api/member-delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documentId: member.documentId, email: member.email }),
      });
      const json = await res.json();
      if (!res.ok) {
        setDeleteMsg(json.error ?? "Erro ao eliminar.");
        return;
      }
      setDeleted(true);
      setMember(null);
      setConfirmDelete(false);
    } catch {
      setDeleteMsg("Erro de ligação. Tenta novamente.");
    } finally {
      setDeleting(false);
    }
  }

  if (deleted) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
        <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
        <h2 className="font-bold text-xl mb-2">Dados eliminados</h2>
        <p className="text-gray-500 text-sm">
          Os seus dados pessoais foram eliminados da nossa base de dados, em conformidade com o RGPD.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Search form */}
      <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">
        <label htmlFor="searchEmail" className="block text-sm font-medium text-gray-700">
          Email de registo
        </label>
        <div className="flex gap-3">
          <input
            id="searchEmail"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            className={inputClass + " flex-1"}
          />
          <button
            type="submit"
            disabled={searching}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm text-white disabled:opacity-60 transition-opacity shrink-0"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            {searching ? <Loader2 size={15} className="animate-spin" /> : "Consultar"}
          </button>
        </div>
        {searchError && (
          <div className="flex items-center gap-2 text-red-600 text-sm">
            <AlertCircle size={15} />
            <span>{searchError}</span>
          </div>
        )}
      </form>

      {/* Member card */}
      {member && (
        <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-6">
          {/* Status badge */}
          {(() => {
            const cfg = STATUS_CONFIG[member.status] ?? STATUS_CONFIG.pendente;
            return (
              <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border font-semibold text-sm ${cfg.className}`}>
                {cfg.icon}
                {cfg.label}
              </div>
            );
          })()}

          {/* Header */}
          <div className="flex items-center gap-4">
            {member.photo?.url ? (
              <img
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337"}${member.photo.url}`}
                alt={member.fullName}
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 shrink-0"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-100 border-2 border-gray-200 flex items-center justify-center shrink-0">
                <span className="text-gray-400 font-bold text-xl">
                  {member.fullName.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div>
              <h2 className="font-bold text-lg text-gray-800">{member.fullName}</h2>
              <p className="text-gray-500 text-sm">{member.email}</p>
              <p className="text-gray-400 text-xs mt-1">
                Registo em {new Date(member.createdAt).toLocaleDateString("pt-PT", { day: "numeric", month: "long", year: "numeric" })}
              </p>
            </div>
          </div>

          {/* Fields */}
          {editing ? (
            <div className="flex flex-col gap-4 border-t border-gray-100 pt-4">
              <p className="text-sm font-medium text-gray-700">Editar dados de contacto</p>
              <div>
                <label className={labelClass}>Telemóvel</label>
                <input
                  type="tel"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Morada</label>
                <input
                  type="text"
                  value={editAddress}
                  onChange={(e) => setEditAddress(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Igreja / Congregação</label>
                <input
                  type="text"
                  value={editChurch}
                  onChange={(e) => setEditChurch(e.target.value)}
                  className={inputClass}
                />
              </div>
              {saveMsg && (
                <p className="text-red-600 text-sm">{saveMsg}</p>
              )}
              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm text-white disabled:opacity-60"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                  Guardar
                </button>
                <button
                  onClick={cancelEdit}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm text-gray-600 border border-gray-300 hover:border-gray-400"
                >
                  <X size={14} />
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <div className="border-t border-gray-100 pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className={labelClass}>Telemóvel</p>
                  <p className="text-sm text-gray-800">{member.phone}</p>
                </div>
                <div>
                  <p className={labelClass}>Género</p>
                  <p className="text-sm text-gray-800">{GENDER_LABELS[member.gender] ?? member.gender}</p>
                </div>
                <div>
                  <p className={labelClass}>Data de nascimento</p>
                  <p className="text-sm text-gray-800">
                    {new Date(member.birthDate).toLocaleDateString("pt-PT")}
                  </p>
                </div>
                <div>
                  <p className={labelClass}>Igreja / Congregação</p>
                  <p className="text-sm text-gray-800">{member.church || "—"}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className={labelClass}>Morada</p>
                  <p className="text-sm text-gray-800">{member.address}</p>
                </div>
                {member.howHeard && (
                  <div>
                    <p className={labelClass}>Como soube da GBB</p>
                    <p className="text-sm text-gray-800">{HOW_HEARD_LABELS[member.howHeard] ?? member.howHeard}</p>
                  </div>
                )}
              </div>

              {saveMsg && (
                <p className="text-green-600 text-sm mt-3">{saveMsg}</p>
              )}

              <button
                onClick={startEdit}
                className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm border border-gray-300 text-gray-600 hover:border-gray-400 transition-colors"
              >
                <Edit2 size={14} />
                Editar dados de contacto
              </button>
            </div>
          )}

          {/* RGPD section */}
          <div className="border-t border-gray-100 pt-4">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-3">
              Privacidade e RGPD
            </p>
            {!confirmDelete ? (
              <button
                onClick={() => { setConfirmDelete(true); setDeleteMsg(""); }}
                className="inline-flex items-center gap-2 text-sm text-red-500 hover:text-red-700 font-medium"
              >
                <Trash2 size={14} />
                Eliminar os meus dados pessoais
              </button>
            ) : (
              <div className="flex flex-col gap-3 p-4 bg-red-50 rounded-xl border border-red-200">
                <p className="text-sm text-red-700 font-medium">
                  Tens a certeza? Esta ação é irreversível. Todos os teus dados serão eliminados permanentemente.
                </p>
                {deleteMsg && (
                  <p className="text-red-600 text-sm">{deleteMsg}</p>
                )}
                <div className="flex gap-3">
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm text-white bg-red-600 hover:bg-red-700 disabled:opacity-60"
                  >
                    {deleting ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                    Eliminar dados
                  </button>
                  <button
                    onClick={() => setConfirmDelete(false)}
                    className="px-4 py-2 rounded-full font-bold text-sm text-gray-600 border border-gray-300 hover:border-gray-400"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
