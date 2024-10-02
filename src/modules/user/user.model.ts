import type { User, UserCreate } from "./user.types";

export class UserModel {
  private static users: User[] = [];

  static async findAll(): Promise<User[]> {
    return this.users;
  }

  static async findById(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  static async create(userData: UserCreate): Promise<User> {
    const newUser: User = {
      id: crypto.randomUUID(),
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    this.users.push(newUser);
    return newUser;
  }
}
