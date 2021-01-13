import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "da2c9fb8-27b6-44c6-9dae-4ff6dd0b7901"
    }
});
    
export const userAPI = {
    getUsers(selectedPage = 1, pageSize = 5) {
        return instance.get(`users?page=${selectedPage}&count=${pageSize}`)
                 .then((response) => {
                    return response.data;
                 });
    }
}
