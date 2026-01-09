import axios, { AxiosError, type Method } from "axios";

const API = "http://localhost:5000/api";

export interface User {
  _id: string;
  name: string;
  dob: string;
  mobile: string;
  email: string;
  password: string;
  confirm_password: string;
}

export type RegisterData = Omit<User, "_id">; // Remove from User

export type LoginData = Pick<User, "email" | "password">; // Only keep from User

export type UserData = Omit<User, "password" | "confirm_password">;

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  msg: string;
}

type ApiType = {
  url: string;
  method: Method;
  data?: any;
  token?: string;
};

const api = async (pl: ApiType) => {
  try {
    const { url, method, data, token } = pl;
    const res = await axios({
      method,
      url: API + url,
      data,
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });

    return res.data;
  } catch (error) {
    const err = error as AxiosError<any>;
    console.log("API Error : ", { err });

    const e = err.response?.data?.errors ?? err.response?.data?.msg;
    const msg = typeof e === "string" ? e : e?.length ? e[0]?.msg : null;

    return { success: false, data: null, msg: msg ?? "Something went wrong" };
  }
};

export const registerUserService = async (
  data: RegisterData
): Promise<ApiResponse> => {
  return api({ url: `/auth/register`, method: "post", data });
};

export const loginUserService = async (
  data: LoginData
): Promise<ApiResponse> => {
  return api({ url: `/auth/login`, method: "post", data });
};

export const userProfileService = async (t?: string) => {
  const token = t ?? localStorage.getItem("token") as string;
  const res = await api({ url: `/users`, method: "get", token });
  if (res.success && res.data) {
    localStorage.setItem("currentUser", JSON.stringify(res.data));
  }
};

export const getUser = (): UserData | null => {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
};

export const isLoggedIn = () => {
  const t = localStorage.getItem("token");
  return t ? true : false;
};
