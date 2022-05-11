<template>
  <div class="login">
    <div class="login-right">
      <!-- 登录 -->
      <div class="loginBox">
        <h2 class="title">账号密码登录</h2>
        <div class="tab">
          <div
            class="tab-item"
            :class="activeIndex == 1 ? 'active' : ''"
            @click="handleSelect(1)"
          >
            用户
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
          <el-form-item label="账号" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input
              type="password"
              v-model="ruleForm.pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item v-if="activeIndex == '1'">
            <el-button type="primary" @click="submitForm1('ruleForm')"
              >登录</el-button
            >
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
    var username = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("账号不能为空"));
      } else {
        return callback();
      }
    };
    var pass = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("密码不能为空"));
      } else {
        return callback();
      }
    };
    return {
      orgList: [], //部门列表
      defaultProps: {
        children: "orgs",
        label: "name",
      },
      messageList: [], //消息列表
      activeIndex: "1", //tab切换下标
      drawer: false, //消息弹窗控制
      // 登录表单数据和规则
      ruleForm: {
        username: "",
        pass: "",
      },
      rules: {
        username: [{ validator: username, trigger: "blur" }],
        pass: [{ validator: pass, trigger: "blur" }],
      },
    };
  },

  methods: {
    // tab切换开关
    handleSelect(index) {
      this.activeIndex = index;
    },
    // 部门展开开关
    handleNodeClick(data) {
      console.log(data);
    },
    // 消息窗口关闭
    handleClose() {
      this.drawer = false;
    },
    // 用户登录
    submitForm1(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          loginRequest
            .userLogin({
              userName: this.ruleForm.username,
              passWord: this.ruleForm.pass,
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
                  title: "欢迎回来，" + this.ruleForm.username,
                  type: "success",
                });
                this.$router.push({ path: "/userhome" });
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
    // 管理员登录
    submitForm2(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          loginRequest
            .adminLogin({
              userName: this.ruleForm.username,
              passWord: this.ruleForm.pass,
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
                  title: "欢迎回来，" + this.ruleForm.username,
                  type: "success",
                });
                this.$router.push({ path: "/adminhome" });
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
    // 获取部门列表
    getorgList() {
      loginRequest.getorgList({}).then((res) => {
        if (res.data.code == 200) {
          this.orgList = res.data.result;
          console.log(this.orgList, "部门列表");
        }
      });
    },
    // 获取消息列表
    getMessageList() {
      loginRequest.getMessageList({ pageNo: 0, pageSize: 0 }).then((res) => {
        if (res.data.code == 200) {
          this.messageList = res.data.result.result;
          console.log(this.messageList, "消息列表");
        }
      });
    },
  },

  created() {
    this.getorgList();
    this.getMessageList();
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