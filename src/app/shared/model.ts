export interface User {
    id?:string,
    email?:string,
    name:string,
    age:number,
    friends?:Friend[],
    games?:Game[],
    requests?:Friend[]
}

export interface Game{
    id:string,
    name:string,
    price:number,
    description:string,
    genre?:string
}

export interface Friend{
    id:string,
    name:string
}