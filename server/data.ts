import type { User } from "~/types/user";

export const users: User[] = [
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
