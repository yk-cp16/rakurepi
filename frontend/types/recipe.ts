import { User } from "./user";

export type Recipe = {
    id: number;
    title: string;
    image: string;
    description: string;
    cost: number;
    createdAt: string;
    updatedAt: string;
    isFavorite: boolean;
    user: User;
};
