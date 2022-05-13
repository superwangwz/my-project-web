<template>
  <div class="myHome">
    <div class="header">
        <h1>主页！！！！</h1>
    </div>
  </div>
</template>

<script>
import cookie from "js-cookie";
export default {
  data() {
    return {
     
    };
  },

 

  methods: {
   
    // 退出登录
    exit() {
      window.localStorage.removeItem("userinfo");
      cookie.remove("satoken");
      this.$router.go();
      this.$message.success("注销成功!");
    },
  
  },

  created() {
    
  },
};
</script>

<style lang="scss" scoped>
</style>