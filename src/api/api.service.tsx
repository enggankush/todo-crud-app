import axios, { AxiosError, type Method } from "axios";

const API = "http://localhost:5000/api";

export interface RegisterData {
  name: string;
  dob: string;
  mobile: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

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

    return res.data
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

export const userProfileService = (token: string): Promise<ApiResponse> => {
  return api({ url: `/users`, method: "get", token });
};
