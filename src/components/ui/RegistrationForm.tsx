import { ArrowRight } from "lucide-react";

export default function RegistrationForm() {
  return (
    <div className="bg-white flex items-center justify-center rounded-sm" style={{ padding: "40px" }}>
      <div className="w-full max-w-md">
        <h2
          className="font-bold uppercase mb-6"
          style={{ color: "#0769B9", fontSize: "24px" }}
        >
          INSCRIÇÃO:
        </h2>
        <form className="flex flex-col gap-4">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="seu@email.com"
              className="w-full border border-gray-300 rounded px-4 h-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Nome completo */}
          <div>
            <label
              htmlFor="nome"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nome completo
            </label>
            <input
              id="nome"
              name="nome"
              type="text"
              placeholder="O seu nome completo"
              className="w-full border border-gray-300 rounded px-4 h-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Three dropdowns in a row */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label
                htmlFor="idade"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Idade
              </label>
              <select
                id="idade"
                name="idade"
                className="w-full border border-gray-300 rounded px-2 h-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-600"
              >
                <option value="">Idade</option>
                {Array.from({ length: 43 }, (_, i) => i + 15).map((age) => (
                  <option key={age} value={age}>
                    {age}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="sexo"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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
              <label
                htmlFor="ocupacao"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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
            <label
              htmlFor="motivacao"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
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

          {/* Submit button */}
          <div className="mt-4">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3 font-bold text-sm text-white"
              style={{ backgroundColor: "#0769B9" }}
            >
              ENVIAR <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
