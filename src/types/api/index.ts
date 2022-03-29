import { User, Area, Discipline, PastProject } from  "../index";
export interface UserDTO {
    userId: string,
    about: string,
    contact: string,
    discipline: string,
    area: string[],
    interests: number[],
    name: string,
    teamID: string,
}

export interface ProjectDTO {
  "Project Title": string,
  "TagBVector": number[],
  "Supervisor": string,
  "Year": string,
  "Project Description": string,
  "Students": string,
  "Status": string,
  "ID": string,
  "id": string,
  "TagB": string,
  "TagA": string,
}

export const oldProjFromDto = (proj: ProjectDTO): PastProject => ({
  title: proj["Project Title"],
  supervisor: proj["Supervisor"],
  numOfStudents: proj["Students"]?.split(",")?.length,
  description: proj["Project Description"],
  interests: proj["TagBVector"],
});

export const userFromDto = (user: UserDTO): User => ({
    id: user?.userId,
    email: user?.contact,
    name: user?.name,
    data: {
        discipline: user?.discipline as Discipline,
        areas: user?.area as Area[],
        interestVector: user?.interests,
        interests: [""],
    }
  });

  export const dtoFromUser = (user: User): UserDTO => ({
    userId: user?.id,
    about: "",
    contact: user?.email,
    discipline: user?.data?.discipline as string,
    area: user?.data?.areas as string[],
    interests: user?.data?.interestVector!,
    name: user?.name,
    teamID: "-1",
  });