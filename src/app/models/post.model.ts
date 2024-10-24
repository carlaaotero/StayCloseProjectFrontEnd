import { User } from "./user.model";

export interface Post {
    _id?: string,
    author: string,
    postType: string,
    content: string,
    image: string,
    postDate: Date
}
