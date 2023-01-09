export interface CreateUserInterface {
  id: number;
  name: string;
  email: string;
  age: number;
  avatar?: string;
  isAdmin: boolean;
}