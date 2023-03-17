import axios from "axios";
import BeforeDraft from "../models/beforeDraft"
import User from "../models/user";

const beforeDraft = axios.create({
  baseURL: "http://api.bewebcademy.my/before-draft",
});

export const getBeforeDrafts = async () => {
  try {
    const data = await beforeDraft.get("/");

    await data.data.map((data: BeforeDraft) =>{
        data._id = data._id.toString()
      } )
    return data.data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const getBeforeDraftById = async (id: string) => {
  try {
    const data = await beforeDraft.get(`/${id}`);
    return data.data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const createBeforeDraft = async (formData: BeforeDraft) => {
  try {
    await beforeDraft.post("/", { formData });

  } catch (error: any) {
    console.log(error.message);
  }
};

export const deleteBeforeDraftById = async (id: string) => {
  try {
    await beforeDraft.delete(`/${id}`);

  } catch (error: any) {
    console.log(error.message);
  }
};

export const updateBeforeDraft = async (id: string, formData: BeforeDraft) => {
  console.log(formData)
  try {
    await beforeDraft.put(`/${id}`, {formData} );
  } catch (error: any) {
    console.log(error.message);
  }
};

// check draft open or not and return boolean
export const checkDreaftOpen = async () => {
  const res = await beforeDraft.get("/draft/check");
  return res.data;
}

export const addUsersToPreselect = async (id: string, user: User) => {
  try {
    await beforeDraft.put(`/pre-select/${id}/`, user);
  } catch (error: any) {
    console.log(error.message);
  }
};

export const addUsersToDraft = async (id: string, user: User) => {
  try {
    await beforeDraft.put(`/select/${id}/`, user);
  } catch (error: any) {
    console.log(error.message);
  }
};
