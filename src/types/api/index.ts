import { User, Area, Discipline, PastProject } from "../index";
export interface UserDTO {
  userId: string;
  about: string;
  contact: string;
  discipline: string;
  area: string[];
  interests: number[];
  name: string;
  teamId: string;
  projectCount: number;
}

export interface ProjectDTO {
  "Project Title": string;
  TagBVector: number[];
  Supervisor: string;
  Year: string;
  "Project Description": string;
  Students: string;
  Status: string;
  ID: string;
  id: string;
  TagB: string;
  TagA: string;
}

export const oldProjFromDto = (proj: ProjectDTO): PastProject => ({
  title: proj["Project Title"],
  supervisor: proj["Supervisor"],
  numOfStudents: proj["Students"]?.split(",")?.length,
  description: proj["Project Description"],
  interests: proj["TagBVector"],
});

export const userFromDto = (user: UserDTO): User => {
  console.log(user);
  return {
    id: user?.userId,
    email: user?.contact,
    name: user?.name,
    data: {
      discipline: user?.discipline as Discipline,
      areas: user?.area as Area[],
      interestVector: user?.interests,
      interests: [""],
      projectCount: !!user?.projectCount ? user?.projectCount : 0,
    },
  };
};

export const dtoFromUser = (user: User): UserDTO => ({
  userId: user?.id,
  about: "",
  contact: user?.email,
  discipline: user?.data?.discipline as string,
  area: user?.data?.areas as string[],
  interests: user?.data?.interestVector!,
  projectCount: !!user?.data?.projectCount ? user?.data?.projectCount : 0,
  name: user?.name,
  teamId: "-1",
});
