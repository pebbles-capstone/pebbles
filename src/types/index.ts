export interface PastProject {
  title: string;
  supervisor: string;
  numOfStudents: number;
  description: string;
}

export type Discipline = "Computer" | "Electrical";

export type Area =
  | "Photonics and Semiconductor Physics"
  | "Electromagnetics and Energy Systems"
  | "Analog and Digital Electronics"
  | "Control, Communications and Signal Processing"
  | "Computer Hardware & Computer Networks"
  | "Software";

export interface UserData {
  name: string;
  discipline: Discipline,
  areas: Area[],
  interests: string[]
}

export interface User {
  id: string;
  email: string;
  data: UserData;
}