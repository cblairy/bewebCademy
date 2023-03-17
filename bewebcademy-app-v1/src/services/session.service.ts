import axios from "axios";
import User from "../models/user";
import Session from "../models/session";
import Exercice from "../models/exercice";
import Badge from "../models/badge";

const session = axios.create({
  baseURL: "http://api.bewebcademy.my/session"
})

export const getSessionByUserId = async (id: string) => {
  try {
    const data = await session.get(`/user/${id}`)

    return data.data
  }
  catch (error: any) {
    console.log(error.message);
  }
}


export const getSessions = async () => {
  try {
    const sessions = await session.get("/");

    await sessions.data.map((session: Session) => {
      session._id = session._id.toString();
    });
    return sessions.data;
  }
  catch (error: any) {
    console.log(error);
  }
};

export const createSession = async (formData: User) => {
  const newSession = await session.post("/", {
    badges: [],
    exercices: [],
    user: formData
  })
  console.log("up");
  console.log(newSession.data);

  return newSession.data
}

export const updateSession = async (id: string, formData: Session) => {
  try {
    await session.put(`/${id}`, { formData });
  } catch (error: any) {
    console.log(error.message);
  }
}