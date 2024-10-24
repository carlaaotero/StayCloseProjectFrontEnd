import { User } from "./user.model";

export interface Post {
    _id?: string,
    author: User,
    postType: string,
    content: string,
    image: string,
    postDate: Date
}
