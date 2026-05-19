export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

export interface UserRow extends User {
  hashedPassword: string;
  createdAt: Date;
  updatedAt: Date;
}
