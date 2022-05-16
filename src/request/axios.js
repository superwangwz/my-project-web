import axios from "axios";
import cookie from "js-cookie"

axios.defaults.baseURL = "http://localhost:8081/"
axios.interceptors.request.use((config) => {

    if (cookie.get("satoken") != null) {
        // 在发送请求之前做些什么
        config.headers.common["satoken"] = cookie.get("satoken")
    }

    return config;
}, error => {
    // 对请求错误做些什么
    return Promise.reject(error);
});


//响应的问题处理
axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response) {
        switch (error.response.status) {
            // 返回401，清除token信息并跳转到登录页面
            case 404:
                alert("跳到错误页面");
                break;
            case 500:
                alert("接口调用错误")
                break;
        }
        // 返回接口返回的错误信息
        return Promise.reject(error.response.data);
    }
});

export function getuuid() {

    return Math.random().toString(36).substr(3, 6) + Date.now().toString()
}

export default axios;