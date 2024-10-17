
export interface User {
    _id?: string; // MongoDb genera automàticament aquest camp
    username: string,
    name: string,
    email: string,
    password: string,
    actualUbication: [],
    inHome: boolean,
    admin: boolean
}
    

  