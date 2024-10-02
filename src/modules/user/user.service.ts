import { UserModel } from "./user.model";
import { User, UserCreate } from "./user.types";


export class UserService {
    static async getAll(): Promise<User[]> {
        return UserModel.findAll();
    }

    static async getById(id: string): Promise<User | undefined> {
        return UserModel.findById(id);
    }

    static async create(userData: UserCreate): Promise<User> {
        return UserModel.create(userData);
    }
}