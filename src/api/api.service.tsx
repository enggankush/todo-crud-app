import axios, { AxiosError } from "axios";

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

// define return type
export interface ApiResponse<T = any> {
  status: boolean;
  data?: T;
  msg?: string;
}

// Register API service (TS)
export const registerUserService = async (
  data: RegisterData
): Promise<ApiResponse> => {
  try {
    const res = await axios.post(`${API}/auth/register`, data);
    return { status: true, data: res.data };
  } catch (error) {
    const err = error as AxiosError<any>;
    console.log({ err });

    const e = err.response?.data?.errors ?? err.response?.data?.msg;
    const msg = typeof e === "string" ? e : e?.length ? e[0]?.msg : null;

    return { status: false, msg: msg ?? "Something went wrong" };
  }
};

export const loginUserService = async (
  data: LoginData
): Promise<ApiResponse> => {
  try {
    const res = await axios.post(`${API}/auth/login`, data);
    return { status: true, data: res.data };
  } catch (error) {
    const err = error as AxiosError<any>;
    console.log({ err });

    const e = err.response?.data?.errors ?? err.response?.data?.msg;
    const msg = typeof e === "string" ? e : e?.length ? e[0]?.msg : null;

    return { status: false, msg: msg ?? "Something went wrong" };
  }
};
