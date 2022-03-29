import { User, Area, Discipline } from  "../index";
export interface UserDTO {
    userId: string,
    about: string,
    contact: string,
    discipline: string,
    area: string[],
    interests: string[],
    name: string,
    teamID: string,
}

export const userFromDto = (user: UserDTO): User => ({
    id: user?.userId,
    email: user?.contact,
    name: user?.name,
    data: {
        discipline: user?.discipline as Discipline,
        areas: user?.area as Area[],
        interests: user?.interests,
    }
  });

  export const dtoFromUser = (user: User): UserDTO => ({
    userId: user?.id,
    about: "",
    contact: user?.email,
    discipline: user?.data?.discipline as string,
    area: user?.data?.areas as string[],
    interests: user?.data?.interests as string[],
    name: user?.name,
    teamID: "-1",
  });