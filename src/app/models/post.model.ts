import { User } from "./user.model";

export interface Post {
    _id?: string; // Asegúrate de incluir esto si usas MongoDB
    author: User,
    postType: string,
    content: string,
    image: string,
    postDate: Date
}
