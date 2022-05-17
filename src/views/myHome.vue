<template>
  <div class="myHome">
    <div class="header">
      <h3 class="title">加密算法系统</h3>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        background-color="rgb(245, 244, 244)"
      >
        <el-menu-item index="1" @click="tabchange('1')">文件管理</el-menu-item>
        <el-menu-item index="2" @click="tabchange('2')">上传文件</el-menu-item>
      </el-menu>
      <!-- 个人信息 -->
      <el-dropdown>
        <span class="el-dropdown-link">
          当前用户：{{ username }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-button
            :plain="true"
            style="border: none; width: 70px; height: 35px"
            @click="exit()"
            >退出</el-button
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="main">
      <!-- 文件列表 -->
      <div class="content-box" v-if="activeIndex == '1'">
        <div class="searchBtn" style="display: flex">
          <el-input v-model="search" size="big" placeholder="请输入文件名" />
          <el-button
            size="small"
            icon="el-icon-search"
            style="height: 40px; display: flex; align-items: center"
            @click="getFileList()"
          ></el-button>
        </div>
        <el-table :data="list" stripe style="width: 100%" v-loading="loading">
          <el-table-column prop="name" label="文件名" width="180">
          </el-table-column>
          <el-table-column prop="suffix" label="文件类型" width="180">
          </el-table-column>
          <el-table-column prop="type" label="加密类型" width="180">
          </el-table-column>
          <el-table-column prop="dataId" label="哈希值" width="180">
          </el-table-column>
          <el-table-column prop="createTime" label="上传时间" width="180">
          </el-table-column>
          <el-table-column prop="status" label="文件状态" width="180">
            <template slot-scope="scope">
              <el-tag type="danger" v-if="scope.row.status == '1'"
                >已加密</el-tag>
                <el-tag type="success" v-if="scope.row.status == '0'"
                >未加密</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="right">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.status=='1'"
                type="success"
                icon="el-icon-unlock"
                @click="decodeFile(scope.row)"
                >解密</el-button
              >
              <el-button
                v-if="scope.row.status=='0'"
                type="primary"
                icon="el-icon-download"
                @click="downFile(scope.row)"
                >下载</el-button
              >
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="deleteFile(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          @current-change="getFileList"
          :current-page.sync="pageNo"
          :page-size="pageSize"
          :total="total"
          layout="total, prev, pager, next"
        ></el-pagination>

        <el-dialog
          :visible.sync="dialogVisible"
          width="50%"
          @close="clearComp()"
        >
        </el-dialog>
      </div>

       <div class="content-right" v-if="activeIndex == 2">
        <upload-File></upload-File>
      </div>
    </div>
  </div>
</template>

<script>
import cookie from "js-cookie";
import axios from "../request/axios";
import uploadFile from "../components/uploadFile"
import userRequest from "../request/user";
export default {
  data() {
    return {
      userinfo: null,
      username: "",
      activeIndex: "1",
      search: "",
      loading: false,
      dialogVisible: false, 
      showComp: true, 

      list: [],
      pageNo: "",
      pageSize: 10,
      total: null
      
    
    };
  },

  components: {
    uploadFile,
  },

  methods: {
    // 菜单切换
    tabchange(index) {
      this.activeIndex = index;
      this.loading = true;
      this.getFileList();
    },

    // 退出
    exit() {
      window.localStorage.removeItem("userinfo");
      cookie.remove("satoken");
      this.$router.push({ path: "/" });
      this.$message.success("注销成功!");
    },

    downFile(item) {
      window.location.href =
        axios.defaults.baseURL + "file/download/" + item.id;
    },

    // 关闭对话框
    clearComp() {
      this.dialogVisible = false;
      this.showComp = false;
    },


    // 文件列表
    getFileList(page = 1){
      this.pageNo = page;
      userRequest
        .getFileList({
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          name: this.search,
        })
        .then((res) => {
          if (res.data.code === 200) {
            const result = res.data.result;
            this.total = result.total;
            this.list = result.records;
            setTimeout(() => {
              this.loading = false;
            }, 500);
          }
        });
    },

    // 删除文件
    deleteFile(item) {
    this.$confirm("确定删除?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        userRequest.deleteFile(item.id).then((res) => {
          if (res.data.code == 200) {
            this.$message.success("删除成功");
            this.getFileList();
          }
        });
      })
      .catch(() => {});
  },
  
  },

  created() {
    this.userinfo = JSON.parse(window.localStorage.getItem("userinfo"));
    if (
      this.userinfo == null ||this.userinfo == "" 
    ) {
      window.localStorage.removeItem("userinfo");
      cookie.remove("satoken");
      this.$router.push({ path: "/" });
      this.$notify({
        title: "未登录，无法访问",
        type: "warning",
      });
    } else {
      this.username = this.userinfo.realName;
    }
    this.getFileList();
  },
};
</script>

<style lang="scss" scoped>
@import "../css/myHome.scss";
</style>