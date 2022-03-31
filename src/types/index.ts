export interface PastProject {
  title: string;
  supervisor: string;
  numOfStudents: number;
  description: string;
  interests?: number[];
}

export interface CurrentProject {
  title: string;
  supervisor: string;
  description: string;
}

export interface OtherUser {
  name: string;
  email: string;
}

export interface Supervisor {
  name: string;
  email: string;
  interests: string;
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
  discipline: Discipline;
  areas: Area[];
  interests: string[];
  interestVector?: number[];
  projectCount?: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  data: UserData;
}

export interface AuthPage {
  user: User;
}

export interface RecData {
  profRec: Supervisor[],
  userRec: User[],
  projectRec: PastProject[],
}
