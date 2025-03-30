type Education = {
  name: string;
  degree: string;
  startDate: string;
  endDate: string;
};

type WorkExperience = {
  companyName: string;
  jobName: string;
  location: string;
  startDate: string;
  endDate: string;
  occupationType: string;
  description: string;
};

type Skill = {
  skillName: string;
  proficiency: number;
};

type Contact = {
  type: string;
  contact: string;
};

export type User = {
  id: string;
  name: string;
  education: Education[];
  workExperience: WorkExperience[];
  skills: Skill[];
  contacts: Contact[];
};

const users: User[] = [
  {
    id: "ArtyomShvetsov",
    name: "Артём Швецов",
    education: [
      {
        name: "ИТМО",
        degree: "Бакалавр КТ",
        startDate: "2021",
        endDate: "2026",
      },
    ],
    workExperience: [
      {
        companyName: "Яндекс",
        jobName: "Разработчик интерфейсов",
        location: "Москва, Россия",
        startDate: "Февраль 2025",
        endDate: "Настоящее время",
        occupationType: "Полная занятость",
        description: "Разрабатываю интерфейсы, подключаю геймпады",
      },
    ],
    skills: [
      {
        skillName: "TypeScript",
        proficiency: 200,
      },
      {
        skillName: "Вёрстка",
        proficiency: 200,
      },
      {
        skillName: "Бытие сильнейшим",
        proficiency: 200,
      },
    ],
    contacts: [
      {
        type: "Email",
        contact: "shvetsovart55@gmail.com",
      },
    ],
  },
  {
    id: "awakywaky",
    name: "Александра Шипилова",
    education: [],
    workExperience: [],
    skills: [],
    contacts: [],
  },
  {
    id: "kirat_0",
    name: "Артемий Казаков",
    education: [],
    workExperience: [],
    skills: [],
    contacts: [],
  },
  {
    id: "mgvts",
    name: "Влад Целиков",
    education: [],
    workExperience: [],
    skills: [],
    contacts: [],
  },
];

export default defineEventHandler((event) => {
  const userId = event.context.params?.id;

  const user = users.find((user) => user.id === userId);

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: "User not found",
    });
  }

  return user;
});
