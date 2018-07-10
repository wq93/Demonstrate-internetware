<template>
  <div class="mobile-login-wrapper">
    <div class="mobile-login-icon"></div>
    <div class="mobile-login-form">
      <Row class="user-row">
        <Col span="6"
             style="padding-left: 20px;color: black">用户名
        </Col>
        <Col span="18">
          <input type="text" v-model="userName" class="user-inp" placeholder="请输入用户名或手机号">
        </Col>
      </Row>
      <Row class="password-row">
        <Col span="6"
             style="padding-left: 20px;color: black">密码
        </Col>
        <Col span="18">
          <input type="password"
                 v-model="password"
                 class="password-inp"
                 placeholder="请输入密码"
                 @keyup.enter="handleClickLogin">
        </Col>
      </Row>
      <div class="login-btn">
        <Button type="primary"
                :loading="loading"
                @click="handleClickLogin"
                class="btn">
          <span v-if="!loading">登录</span>
          <span v-else>Loading...</span>
        </Button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        userName: localStorage.getItem('userName') || '',
        password: '',
        loading: false
      }
    },
    methods: {
      handleClickLogin() {
        if (this.password.trim() === '' || this.userName.trim() === '') {
          console.log(this.password)
          console.log(this.userName)
          this.loading = true
          this.$Message.error(`用户名或密码不能为空`)
          setTimeout(() => {
            this.loading = false
          }, 300)
          return false
        }
        let url = `/iQuickerLogin`
        let params = {
          password: this.password,
          userName: this.userName,
          'iw-apikey': this.userName,
          'iw-cmd': 'iQuickerLogin'
        }
        this.loading = true
        this.$get(url, params)
          .then((res) => {
            let {rtnCode, data} = res
            let {state} = data
            if (rtnCode === "000000") {
              this.$Message.success({
                content: '登录成功',
                duration: 2
              });
              this.$router.push('/mobile/users')
              localStorage.setItem('userName', this.userName)
            } else {
              this.$Message.error(state)
            }
          }).finally(() => {
          this.loading = false
        })
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
    .password-inp,
    .user-inp {
      outline:medium;
      width: 100%;
      padding-left: 20px;
      height: 41px;
      border: 0;
    }
    .user-row,
    .password-row {
      height: 45px;
      line-height: 45px;
      font-size: 16px;
    }
    .password-row {
      border: 1px solid #ccc;
      border-left: 0;
      border-right: 0;
    }
    .login-btn {
      width: 100%;
      height: 80px;
      padding: 20px 10px;

      .btn {
        width: 100%;
        height: 100%;
        font-size: 14px;
      }
    }
  }
</style>
