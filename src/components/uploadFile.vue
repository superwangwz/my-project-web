<template>
  <div class="uploadFile">
    <h3 class="title">文件加密操作</h3>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="150px"
      class="demo-ruleForm"
    >
      <el-form-item label="加密类型" prop="sex">
        <el-radio-group v-model="ruleForm.sex">
          <el-radio label="SM3"></el-radio>
          <el-radio label="SM4"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-upload
        class="avatar-uploader"
          :headers="headers"
          :action="action"
          :data="data"
          :on-success="success"
          multiple
          :file-list="fileList"
      >
         <el-button
            style="margin-left: 150px; margin-bottom: 20px; height: 40px; align-items: center"
            type="primary"
            >上传<i class="el-icon-upload el-icon--right"></i
          ></el-button>
      </el-upload>

      <el-form-item>
        <el-button type="primary" :plain="true" @click="submitForm('ruleForm')">确定</el-button>
        <el-button type="info" :plain="true" @click="resetForm('ruleForm')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import cookie from "js-cookie";
import axios from "../request/axios";
import userRequest from "../request/user";
export default {
  data() {
    var type = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请选择加密类型"));
      } else {
        return callback();
      }
    };

    return {
      action: axios.defaults.baseURL + "file/upload",

      data: {
        dataId: Math.random().toString(36).substr(3, 6) + Date.now().toString(),
      },

       headers: {
        satoken: cookie.get("satoken"),
      },
      fileList: [],
      ruleForm: {
        type: "", //加密类型
      },
      rules: {
        type: [{ validator: type, trigger: "blur" }],
      }
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          userRequest
            .encryptFile({
              id: this.dataId,
              type: this.ruleForm.type,
            })
            .then(res => {
              if (res.data.success == true) {
                this.$message.success("操作成功!");
                this.resetForm();
              } else {
                this.$message.error(res.data.message);
              }
            });
        } else {
          this.$message.error("信息不能为空！");
          return false;
        }
      });
    },
    // 清空表单
    resetForm() {
      this.$refs.ruleForm.resetFields();
    }
  },

  created() {}
};
</script>

<style lang="scss" scoped>
.uploadFile {
  overflow: hidden;

  ::v-deep .title {
    margin: 36px;
    text-align: center;
    font-size: 20px;
  }
  ::v-deep .demo-ruleForm {
    width: 500px;
    margin: 30px auto;
  }
  ::v-deep .el-input__inner {
    height: 45px;
    font-size: 16px;
  }
  ::v-deep .el-form-item__label {
    font-size: 16px;
    position: relative;
    top: 12px;
  }
  ::v-deep .el-form-item__content {
    margin-top: 10px;
    height: 50px;
    display: flex;
  }
  ::v-deep .el-form-item__error {
    font-size: 16px;
  }

  ::v-deep .el-select-dropdown__item {
    display: flex;
    justify-content: center;
  }
  ::v-deep .el-radio-group {
    width: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: -1px;
  }
}
</style>