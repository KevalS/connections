import axios from "axios";

const axiosInstance = axios.create();

const get = async (URL: string) => {
  try {
    const result = await axiosInstance.get(URL);
    return result.data;
  } catch (e) {
    throw new Error("Something went wrong. Please try again later.");
  }
};

const post = async (URL: string, PAYLOAD: any = {}) => {
  try {
    const result = await axiosInstance.post(URL, PAYLOAD);
    return result.data;
  } catch (e) {
    throw new Error("Something went wrong. Please try again later.");
  }
};

const patch = async (URL: string, PAYLOAD: any = {}) => {
  try {
    const result = await axiosInstance.patch(URL, PAYLOAD);
    return result.data;
  } catch (e) {
    throw new Error("Something went wrong. Please try again later.");
  }
};

const deleteMethod = async (URL: string, PAYLOAD: any = {}) => {
  try {
    const result = await axiosInstance.delete(URL, PAYLOAD);
    return result.data;
  } catch (e) {
    throw new Error("Something went wrong. Please try again later.");
  }
};

export { get, post, patch, deleteMethod };
