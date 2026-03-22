export interface CourseDetail {
  label: string;
  value: string;
}

export interface Course {
  slug: string;
  image: string;
  title: string;
  organizer: string;
  trainer: string;
  credentials: string[];
  description: string;
  extraText?: string;
  details: CourseDetail[];
}

export const courses: Course[] = [
  {
    slug: "gestao-de-liquidez",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&q=80",
    title: "WORKSHOP: GESTÃO DE LIQUIDEZ E TESOURARIA",
    organizer: "Geração B-Bright",
    trainer: "José Carlos Teixeira",
    credentials: [
      "Doutorado em Economia pela Universidade de Évora",
      "Professor Adjunto Convidado na área de Finanças – ISCAL / Instituto Politécnico de Lisboa",
    ],
    description:
      "Este workshop é uma iniciativa da Geração B-Bright que visa capacitar jovens e profissionais em técnicas de gestão de liquidez e tesouraria, fundamentais para a sustentabilidade financeira de negócios e projetos.",
    details: [
      { label: "Local", value: "Palácio do Governo (sala de conferências)" },
      { label: "Data", value: "4 de agosto de 2025" },
      { label: "Horário", value: "Das 10h às 12h" },
    ],
  },
  {
    slug: "comunicacao-e-oratoria",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
    title: "COMUNICAÇÃO E ORATÓRIA COM EVELISE CARVALHO",
    organizer: "Geração B-Bright",
    trainer: "Evelise Carvalho",
    credentials: [],
    description:
      "A Geração B-Bright promove a formação de Comunicação e Oratória, com o objetivo de fortalecer as competências de comunicação, expressão pública e liderança entre jovens.",
    extraText:
      "Durante 2 semanas intensivas, os participantes irão desenvolver técnicas práticas de oratória, gestão de nervosismo e comunicação persuasiva aplicadas a contextos profissionais e cívicos.",
    details: [
      { label: "Duração", value: "2 semanas" },
      { label: "Horário", value: "16h00 – 18h00" },
      { label: "Formadora", value: "Evelise Carvalho" },
    ],
  },
];

export const coursesBySlug = Object.fromEntries(
  courses.map((c) => [c.slug, c])
);
