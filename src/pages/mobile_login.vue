<template>
  <div class="mobile-login-wrapper">
    <div class="mobile-login-icon"></div>
    <div class="mobile-login-form">
      <Row>
        <Col span="6">用户名:</Col>
        <Col span="18">
          <Input v-model="value" placeholder="Enter something..." style="width: 300px"></Input>
        </Col>
      </Row>
      <Row>
        <Col span="6">密码:</Col>
        <Col span="18">
          <Input v-model="value" placeholder="Enter something..." style="width: 300px"></Input>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        formItem: {
          user: '',
          password: '',
        }
      }
    }
  }
</script>
<style lang="less" type="text/less">
  .mobile-login-wrapper {
    .mobile-login-icon {
      background-size: 60% 150px;
      background-color: #eee;
      background-image: url("../common/image/iquicker.svg");
      background-repeat: no-repeat;
      background-position: center center;
      width: 100%;
      height: 150px;
      display: inline-block;
    }
  }
</style>
