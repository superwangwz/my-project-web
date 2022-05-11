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
}