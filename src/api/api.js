import * as axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': 'da2c9fb8-27b6-44c6-9dae-4ff6dd0b7901',
  },
});

export const userAPI = {
  getUsers(selectedPage = 1, pageSize = 5) {
    return instance.get(`users?page=${selectedPage}&count=${pageSize}`).then((response) => {
      return response.data;
    });
  },
  follow(userId) {
    return instance.post('follow/' + userId);
  },
  unfollow(userId) {
    return instance.delete('follow/' + userId);
  },
  getProfile(userId) {
    console.warn('this method is obsolete, please use profileAPI');
    return profileAPI.getProfile(userId);
  },
};

export const profileAPI = {
  getProfile(userId) {
    return instance.get(`profile/` + userId);
  },
  getStatus(userId) {
    return instance.get('profile/status/' + userId);
  },
  setStatus(status) {
    return instance.put('profile/status', { status: status });
  },
};

export const authAPI = {
  getMyProfile() {
    return instance.get(`auth/me`);
  },
  login(email, password, rememberMe) {
    return instance.post(`auth/login`, { email, password, rememberMe });
  },
  logout() {
    return instance.delete(`auth/login`);
  },
};
