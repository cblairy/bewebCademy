import axios from "axios";
import Language from "../models/language";

const language = axios.create({
  baseURL: "http://api.bewebcademy.my/language",
});

export const getLanguage = async (id: string) => {
  try {
    const data = await language.get(`/${id}`);
    await data.data.map((data: Language) => {
      data._id = data._id.toString()
    })
    return data.data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const getLanguages = async () => {
  const languages = await language.get("/");

  return languages.data;
};

export const updateLanguage = async (id: string, formData: Language) => {
  try {
    await language.put(`/${id}`, formData);
  } catch (error: any) {
    console.log(error.message);
  }
};

export const createLanguage = async (formData: Language) => {
  try {
    await language.post('/', { formData })
  } catch (error: any) {
    console.log(error.message)
  }
}

export const deleteLanguageById = async (id: string) => {
  try {
    await language.delete(`/${id}`);
  } catch (error: any) {
    console.log(error.message);
  }
};