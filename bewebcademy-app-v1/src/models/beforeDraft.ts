import User from "./user";

export default interface BeforeDraft {
  _id: string;
  name: string;
  start_date: Date;
  end_date: Date;
  pre_select: User[];
  select: User[];
}