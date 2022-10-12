import { User } from "../models/user";

let USERS: User[] = [];

export const getUsers = (): User[] => USERS;

export const createUser = (user: User): User => {
    USERS.push(user);
    return user;
};

export const updateUser = (user: User): User => {
    for (let  i = 0; i < USERS.length; i++) {
        if ( USERS[i].id === user.id) {
            USERS[i] = user;
            return USERS[i];
        }
    }

    return null;
}


export const deleteUser = (userId: number): void => {
    USERS = USERS.filter((user: User) => user.id != userId);
}