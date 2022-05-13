<template>
  <div class="login">
    <div class="login-right">
      <!-- 登录 -->
      <div class="loginBox">
        <h2 class="title">加密算法系统</h2>
        <div class="tab">
          <div
            class="tab-item"
            :class="activeIndex == 1 ? 'active' : ''"
            @click="handleSelect(1)"
          >
            账号密码登陆
          </div>
        </div>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          active-text-color="#fff"
        >
          <el-form-item label="账号" prop="userName">
            <el-input v-model="ruleForm.userName"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="passWord">
            <el-input
              type="passWord"
              v-model="ruleForm.passWord"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm1('ruleForm')"
              >登录</el-button
            >
            <el-button @click="register()">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import loginRequest from "../request/login";
import cookie from "js-cookie";
export default {
  data() {
    // 登录验证规则
    var userName = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("账号不能为空"));
      } else {
        return callback();
      }
    };
    var passWord = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("密码不能为空"));
      } else {
        return callback();
      }
    };
    return {
      realName: "",
      userinfo: null,
      activeIndex: "1",
      ruleForm: {
        userName: "",
        passWord: "",
      },
      rules: {
        userName: [{ validator: userName, trigger: "blur" }],
        passWord: [{ validator: passWord, trigger: "blur" }],
      },
    };
  },

  methods: {
    // tab切换开关
    handleSelect(index) {
      this.activeIndex = index;
    },
    // 注册
    register() {
      this.$router.push("/register");
    },

    // 用户登录
    submitForm1(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          loginRequest
            .userLogin({
              userName: this.ruleForm.userName,
              passWord: this.ruleForm.passWord,
            })
            .then((res) => {
              console.log(res);
              if (res.data.success == true) {
                let userinfo = res.data.result;
                // 获取token  存储在本地
                cookie.set("token", userinfo.token);
                // 获取用户信息  存储在本地
                window.localStorage.setItem(
                  "userinfo",
                  JSON.stringify(userinfo)
                );
                this.$notify({
                  title: "欢迎回来，" + this.realName,
                  type: "success",
                });
                this.$router.push({ path: "/myHome" });
              } else {
                this.$message.error(res.data.message);
              }
            });
        } else {
          this.$message.error("请检查您的账号密码!");
          return false;
        }
      });
    },
  },

  created() {
    this.userinfo = JSON.parse(window.localStorage.getItem("userinfo"));
    if (this.userinfo) {
      this.realName = this.userinfo.realName;
    }
    console.log(this.userinfo);
  },
};
</script>

<style lang="scss" scoped>
@import "../css/Login.scss";
.item {
  float: right;
  margin-top: 40px;
  margin-right: 100px;
}
</style>