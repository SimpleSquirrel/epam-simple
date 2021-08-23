export interface User 
{
    id?:string,
    email?:string,
    name?:string,
    age?:number,
    password?:string,
    friends?:User[],
    games?:Game[],
    requests?:FriendRequest[]
}

export interface Game
{
    id?:string,
    name:string,
    description?:string,
    rating?:number
    genre?:string,
    price?:number,
    author?:string,
}

export interface FriendRequest
{
    whoSendId:string,
}