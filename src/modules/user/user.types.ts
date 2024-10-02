export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

export interface UserCreate {
    name: string;
    email: string;
    password: string;
    role: string;
}