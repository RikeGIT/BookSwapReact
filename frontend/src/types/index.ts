export interface User {
  id: number;
  email: string;
  name: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  owner: User;
}
