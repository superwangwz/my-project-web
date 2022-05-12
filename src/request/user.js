import axios from "./axios"

export default {

    // 用户注册
    addUser: (data) => {
        return axios({
            method: "post",
            url: "",
            data
        })
    },

}
