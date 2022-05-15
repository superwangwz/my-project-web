import axios from "./axios"

export default {

    // 用户注册
    addUser: (data) => {
        return axios({
            method: "post",
            url: "/user/addOrUpdate",
            data
        })
    },

    // 文件列表
    getFileList: (data) => {
        return axios({
            method: "get",
            url: "/file/toPage",
            params: {
                "pageNo": data.pageNo,
                "pageSize": data.pageSize,
                "name": data.name
            }
        })
    },

    // 删除文件
     // 删除文件
     deleteFile: (id) =>{
        return axios({
            method: "delete",
            url: "/file/deleteFile/" + id,
        })
    },
 
    // 加密文件
    encryptFile: (data) =>{
        return axios({
            method: "post",
            url: "/file/encryptFile",
            data
        })
    },


}
