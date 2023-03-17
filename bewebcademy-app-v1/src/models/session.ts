import Badge from "./badge";
import Exercice from "./exercice";
import User from "./user";

export default interface Session {
  _id: string;
  badges: Badge[];
  exercices: Exercice[];
  user: User;
}