import axios from "axios";

const BASE_URL = "http://localhost:3500";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Cache-Control": "no-cache",
    Accept: "application/json",
    "Content-Type": "application/json",
    // "User-Agent": "PassaporteIndustrial/1.2.0",
  },
  withCredentials: true,
});

// Exemplo de função para realizar uma requisição GET
const get = async (url: any) => {
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error("Erro na requisição GET:", error);
    throw error;
  }
};

// Exemplo de função para realizar uma requisição POST
const post = async (url: any, data: any) => {
  try {
    const response = await axiosPrivate.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Erro na requisição POST:", error);
    throw error;
  }
};

// Exemplo de função para realizar uma requisição PUT
const put = async (url: any, data: any) => {
  try {
    const response = await axiosPrivate.put(url, data);
    return response.data;
  } catch (error) {
    console.error("Erro na requisição PUT:", error);
    throw error;
  }
};

// Exemplo de função para realizar uma requisição DELETE
const remove = async (url: any) => {
  try {
    const response = await axiosPrivate.delete(url);
    return response.data;
  } catch (error) {
    console.error("Erro na requisição DELETE:", error);
    throw error;
  }
};

export { get, post, put, remove };
