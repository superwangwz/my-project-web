<template>
  <div class="notfound">
    <el-button @click="gotohome" icon="el-icon-s-home">回到首页</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

 
};
</script>

<style lang="scss" scoped>
.notfound {
  width: 100%;
  height: 100vh;
  background: url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0122c657aab0090000018c1b18918d.jpg%401280w_1l_2o_100sh.png&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650258909&t=59b3d9abb62f3c1a33a9599d3243fdb3");
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .el-button {
  margin-top: 250px;
}
</style>
