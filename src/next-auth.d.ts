declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    role: "user" | "vendor" | "admin";
  }

  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "user" | "vendor" | "admin";
  }
}

export { }

