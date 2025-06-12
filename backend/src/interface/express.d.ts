import { Request } from "@types/express";
import User  from "../Model/User.Model";

declare global {
  namespace Express {
    interface Request {
      user?: User | null;
    }
  }
}