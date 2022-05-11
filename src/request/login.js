import axios from "./axios"

export default {
    // 用户登录
    userLogin: (data) => {
        return axios({
            method: "post",
            url: "user/login",
            data
        })
    },
    // admin登录
    adminLogin: (data) => {
        return axios({
            method: "post",
            url: "admin/login",
            data
        })
    },

}