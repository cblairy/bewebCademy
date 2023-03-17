import axios from "axios";
import Language from "../models/language";
import BeforeDraft from "../models/beforeDraft";
import Session from "../models/session";

const archive = axios.create({
  baseURL: "http://api.bewebcademy.my/archive",
});

/*_____LANGUAGE______ */
export const getLanguages = async () => {
  const languages = await archive.get("/language");

  await languages.data.map((language: Language) => {
    language._id = language._id.toString();
  });
  return languages.data;
};

export const getLanguageById = async (id: string) => {
  try {
    const data = await archive.get(`/language/${id}`);
    console.log(data);
    return data.data;
  } catch (error: any) {
    console.log(error.message);
  }
};

/*____BeforeDraft____ */

export const getBeforeDraft = async () => {
  const beforeDraft = await archive.get("/beforedraft");

  await beforeDraft.data.map((beforeDraft: BeforeDraft) => {
    beforeDraft._id = beforeDraft._id.toString();
  });
  return beforeDraft.data;
};

export const getBeforeDraftById = async (id: string) => {
  try {
    const data = await archive.get(`/beforedraft/${id}`);
    console.log(data);
    return data.data;
  } catch (error: any) {
    console.log(error.message);
  }
};
/*____Session______ */

export const getSessionById = async (id: string) => {
  try {
    const data = await archive.get(`/session/${id}`);
    console.log(data);
    return data.data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const getSessions = async () => {
  const Sessions = await archive.get("/session");

  await Sessions.data.map((session: Session) => {
    session._id = session._id.toString();
  });
  return Sessions.data;
};


/*____USER______ */

