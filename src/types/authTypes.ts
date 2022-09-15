import { User } from "@prisma/client";

export type IUserData = Omit<User, "id">;
