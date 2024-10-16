import { User } from "./user.model";

export interface Post {
    author: User,
    postType: string,
    content: string,
    image: string,
    postDate: Date
}
