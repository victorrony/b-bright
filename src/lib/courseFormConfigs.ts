export type FormFieldType = 'text' | 'url' | 'email' | 'number' | 'select' | 'textarea' | 'checkbox';

export interface FormFieldConfig {
  name: string;
  label: string;
  type: FormFieldType;
  placeholder?: string;
  required?: boolean;
  options?: string[]; // apenas para type: 'select'
}

/**
 * Mapa de campos extras por slug de curso.
 *
 * Cada chave é o slug do curso (o que aparece no URL: /cursos/SLUG).
 * O valor é uma lista de campos que aparecem no formulário desse curso,
 * logo abaixo do campo "Nome completo".
 *
 * Cursos sem entrada aqui mostram apenas os campos base (email, nome, etc).
 */
export const courseFormConfigs: Record<string, FormFieldConfig[]> = {
  // Curso: Digital Skills & ICT Fundamentals  →  /cursos/digital-skills-ict
  "digital-skills-ict": [
    // Exemplo de campo texto simples:
    { name: "empresa", label: "Empresa / Escola", type: "text", placeholder: "Nome da instituição" },

    // Exemplo de dropdown com opções:
    { name: "nivel_informatica", label: "Nível de informática", type: "select", options: ["Nenhum", "Básico", "Intermédio", "Avançado"] },
  ],

  // Curso: English & Communication Skills  →  /cursos/english-communication-skills
  "english-communication-skills": [
    // Exemplo de campo texto:
    // { name: "nivel_ingles", label: "Nível de inglês atual", type: "select", options: ["A1 - Iniciante", "A2", "B1", "B2 ou superior"] },
  ],

  // Curso: Youth Leadership & Entrepreneurship  →  /cursos/youth-leadership-entrepreneurship
  "youth-leadership-entrepreneurship": [
    // Exemplo de checkbox obrigatório:
    // { name: "tem_projeto", label: "Já tenho uma ideia de negócio", type: "checkbox" },
  ],
};
