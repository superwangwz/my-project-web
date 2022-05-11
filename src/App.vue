<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
/*主页面（公共样式）*/
* {
  margin: 0;
  padding: 0;
}
/* 单行省略 */
.ellipsis {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
/* 多行省略 */
.clamp {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  /* -webkit-line-clamp: 2; */
}
/* 清除浮动 */
.clearfix:after {
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
</style>
<script>
export default {
  data() {
    return {
      data: {}
    };
  },
  methods: {
    //生命周期（页面加载时执行）
    created() {}
  }
};
</script>
