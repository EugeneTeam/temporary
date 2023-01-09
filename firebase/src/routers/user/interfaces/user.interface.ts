export interface UserInterface {
  id: number;
  name: string;
  email: string;
  age: number;
  avatar?: string;
  isAdmin: boolean;
  childData?: any;
}