import axios from "axios";

const API = "http://localhost:5000/api";

const api = async (url, method, data) => {
  try {
    const res = await axios[method](API+url, data);
    return { status: true, data: res.data?.data };
  } catch (err) {
    console.log({err})

    const e = err.response?.data?.errors ?? err.response?.data?.msg;
    const msg = typeof e == "string" ? e : e.length ? e[0]?.msg : null;

    return { status: false, msg: msg ?? "Something went wrong"};
  }
};

export const registerUserService = (data) => {
  return api(`/auth/register`, "post", data);
};

export const loginUserService = (data) => {
  return api(`/auth/login`, "post", data);
};


