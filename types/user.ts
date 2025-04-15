// todo: deprecate
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
