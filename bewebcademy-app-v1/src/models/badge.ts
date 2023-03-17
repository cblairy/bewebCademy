import Language from "./language";

export default interface Badge {
  _id: string;
  name: string;
  language: Language[];
  image: string;
  acquisition_date: Date;
  all_done: Boolean;
}