
declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    role: "user" | "vendor" | "admin";
  }
}
export { }

