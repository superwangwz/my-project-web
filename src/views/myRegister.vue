<template>
  <div class="register">
    <div class="login-right">
      <!-- 登录 -->
      <div class="loginBox">
        <h2 class="title">用户注册</h2>

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
          <el-form-item label="加密类型" prop="type">
            <el-radio-group v-model="ruleForm.type">
              <el-radio label="ZUC"></el-radio>
              <el-radio label="SM2"></el-radio>
              <el-radio label="SM3"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >注册</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import userRequest from "../request/user";
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
    var type = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("加密类型不能为空"));
      } else {
        return callback();
      }
    };
    return {
      ruleForm: {
        userName: "",
        passWord: "",
        type: "",
      },
      rules: {
        userName: [{ validator: userName, trigger: "blur" }],
        passWord: [{ validator: passWord, trigger: "blur" }],
        type: [{ validator: type, trigger: "blur" }],
      },
    };
  },

  methods: {
    // 注册
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          userRequest
            .addUser({
              userName: this.ruleForm.userName,
              passWord: this.ruleForm.passWord,
              type: this.ruleForm.type,
            })
            .then((res) => {
              if (res.data.success == true) {
                this.$message.success("注册成功!");
                this.resetForm();
              } else {
                this.$message.error(res.data.message);
              }
            });
        } else {
          this.$message.error("请检查信息是否完整！");
          return false;
        }
      });
    },

    // 清空表单数据
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.register {
  width: 100%;
  height: 100vh;
  background: url("../img/register.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
  display: flex;

  .login-right {
    width: 83%;

    ::v-deep .el-drawer {
      background-color: rgb(56, 55, 55);
      color: rgb(212, 209, 209);
    }
    ::v-deep .el-drawer__body {
      padding: 0 20px 0 20px;
    }
    ::v-deep .el-drawer__header {
      color: rgb(230, 230, 230);
      font-weight: 550;
      font-size: 20px;
    }

    ::v-deep .el-form-item__error {
      color: #f56c6c;
      font-size: 15px;
      line-height: 1;
      padding-top: 4px;
      position: absolute;
      top: 100%;
      left: 0;
    }

    .title {
      color: rgb(204, 199, 199);
      text-align: center;
    }

    .active {
      color: white;
      border-bottom: 1px solid rgb(44, 99, 250);
    }

    .loginBox {
      width: 500px;
      height: 400px;
      background-color: rgba($color: rgb(12, 11, 11), $alpha: 0.8);
      border-radius: 10px 10px 10px 10px;
      padding-top: 30px;
      position: relative;
      top: 20%;
      left: 45%;

      ::v-deep .demo-ruleForm {
        width: 400px;
        margin-top: 30px;
      }

      ::v-deep .el-form-item__label {
        color: white;
        font-size: 16px;
      }

      ::v-deep .el-input__inner {
        color: white;
        background-color: rgba($color: #fff, $alpha: 0.3);
        margin-bottom: 10px;
        font-size: 16px;
      }

      ::v-deep .el-button {
        width: 40%;
        justify-content: center;
      }

      ::v-deep .el-form-item__content {
        display: flex;
        margin-top: 10px;
        height: 100%;
      }

      ::v-deep .el-form-item__label {
        font-size: 16px;
        position: relative;
        top: 10px;
      }

      ::v-deep .el-radio-group {
        padding-top: 10px;
      }
    }
  }
}
</style>
