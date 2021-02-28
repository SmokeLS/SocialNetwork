import axios from 'axios';
import { PhotosType, ProfileType, UserType } from '../types/types';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': 'da2c9fb8-27b6-44c6-9dae-4ff6dd0b7901',
  },
});

export enum ResponseCodeType {
  Success = 0,
  Error = 1,
}

export enum ResponseCodeWithCaptchaType {
  CaptchaIsRequired = 10,
}

type GetUsersType = {
  items: Array<UserType>;
  totalCount: number;
  error: string;
};

type GetMeType = {
  id: number;
  email: string;
  login: string;
};

type StandartResponseType<D = {}> = {
  data: D;
  resultCode: ResponseCodeType;
  messages: Array<string>;
};

// type GetStatusType = {
//   Type: any;
// };

type LoginType = {
  resultCode: ResponseCodeType | ResponseCodeWithCaptchaType;
  messages: Array<string>;
  data: {
    userId: number;
  };
};

type GetCaptchaType = {
  url: string;
};

export const userAPI = {
  async getUsers(selectedPage = 1, pageSize = 5) {
    const res = await instance.get<GetUsersType>(`users?page=${selectedPage}&count=${pageSize}`);
    return res.data;
  },
  async follow(userId: number) {
    const res = await instance.post<StandartResponseType>('follow/' + userId);
    return res.data;
  },
  async unfollow(userId: number) {
    const res = await instance.delete<StandartResponseType>('follow/' + userId);
    return res.data;
  },
};

export const profileAPI = {
  async getProfile(userId: number) {
    const res = await instance.get<ProfileType>(`profile/` + userId);
    return res.data;
  },
  async getStatus(userId: number) {
    const res = await instance.get<string>('profile/status/' + userId);
    return res.data;
  },
  async setStatus(status: string) {
    const res = await instance.put<StandartResponseType>('profile/status', { status: status });
    return res.data;
  },
  async setUserAvatar(photo: File) {
    const formData = new FormData();
    formData.append('image', photo);
    const res = await instance.put<StandartResponseType<PhotosType>>('profile/photo', formData);
    return res.data;
  },
  async setUserProfileInformation(profile: ProfileType) {
    const res = await instance.put<StandartResponseType>('profile', profile);
    return res.data;
  },
};

export const authAPI = {
  async getMyProfile() {
    const res = await instance.get<StandartResponseType<GetMeType>>(`auth/me`);
    return res.data;
  },
  async login(email: string, password: string, rememberMe: boolean, captchaUrl: string | null) {
    const res = await instance.post<LoginType>(`auth/login`, { email, password, rememberMe, captcha: captchaUrl });
    return res.data;
  },
  async logout() {
    const res = await instance.delete<StandartResponseType>(`auth/login`);
    return res.data;
  },
};

export const securityAPI = {
  async getCaptcha() {
    const res = await instance.get<GetCaptchaType>(`security/get-captcha-url`);
    return res.data;
  },
};
