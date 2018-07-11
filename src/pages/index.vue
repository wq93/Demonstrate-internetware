<template>
  <div>
    <header class="header-content">
      <img src="../common/image/header_logo.png" alt="" style="vertical-align: top">
      <h2 class="dib">重点省份行政服务事项综合办理平台</h2>
    </header>
    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
  export default {
    name: "index"
  }
</script>

<style lang="less" type="text/less">
  .header-content {
    position: absolute;
    top: 0;
    height: 64px;
    width: 100%;
    padding-left: 120px;
    padding-top: 19px;
    background: #fff;
    border-bottom: 1px solid #ccc;
    z-index: 2;
    h2 {
      color: rgba(0, 0, 0, .65);
      line-height: 27px;
      margin-left: 32px;
    }
  }

  .main-content {
    position: absolute;
    width: 100%;
    height: 100%;
    border-top: 64px solid transparent;
    padding: 32px 120px;
    background: #f5f5f5;
  }
</style>
