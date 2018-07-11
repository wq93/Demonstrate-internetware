<template>
  <div class="mobile-users-wrapper">
    <div class="mobile-users-header">
      <div @click="$router.push('/mobile')">
        <Icon type="chevron-left"
              class="back-icon"></Icon>
      </div>
      通讯录
    </div>
    <div class="mobile-users-search">
      <Input v-model="keyword" icon="ios-search" placeholder="搜索" style="width: 100%"></Input>
    </div>
    <Row v-if="loading">
      <Col class="demo-spin-col" span="8">
        <Spin fix>
          <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
          <div>Loading</div>
        </Spin>
      </Col>
    </Row>
    <div v-else>
      <div class="mobile-users-list-wrapper" v-if="userList.length>0">
        <scroll ref="userList" :data="userList" class="mobile-users-list">
          <ul ref="list">
            <li class="user-item" v-for="item in userList" :key="item.tel">
              <Row>
                <Col span="6" class="user-item-avatar">
                  <Avatar shape="square" icon="person" size="large"/>
                </Col>
                <Col span="18">
                  <div class="user-item-detail">
                    <span class="name">{{item.xm}}</span>
                    <span>{{item.bm}}</span>
                    <p>{{item.dh}}</p>
                    <p>{{item.yx}}</p>
                  </div>
                </Col>
              </Row>
            </li>
          </ul>
        </scroll>
        <div></div>
      </div>
      <div v-else>
        <p style="margin-top: 40px;text-align: center">暂无数据</p>
      </div>
    </div>
  </div>
</template>

<script>
  import Scroll from '../components/scroll/scroll.vue'

  export default {
    name: "mobile_users",
    components: {
      Scroll,
    },
    data() {
      return {
        keyword: '',
        loading: false,
        userList: []
      }
    },
    mounted() {
      this._getList()
    },
    watch: {
      keyword: {
        handler(curVal) {
          this._getList()
        },
      }
    },
    methods: {
      _getList() {
        let url = ``
        let params = {
          'iw-apikey': localStorage.getItem('userName') || '',
          'iw-cmd': 'txl',
          'page': 1,
          keywords: this.keyword
        }
        this.loading = true
        this.$get(url, params)
          .then((res) => {
            let {rtnCode, rtnMsg, data} = res
            setTimeout(() => {
              if (rtnCode === "000000") {
                this.userList = data.list
              } else {
                this.userList = data.list
                this.$Message.error(rtnMsg)
              }
            }, 300)
          })
          .finally(() => {
            setTimeout(() => {
              this.loading = false
            }, 300)
          })
      }
    }
  }
</script>

<style lang="less" type="text/less">
  .mobile-users-wrapper {
    .ivu-avatar-large {
      width: 56px;
      height: 56px;
      line-height: 56px;
    }
    .ivu-avatar-large.ivu-avatar-icon {

    }
    .demo-spin-icon-load {
      animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
      from {
        transform: rotate(0deg);
      }
      50% {
        transform: rotate(180deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
    .demo-spin-col {
      width: 100%;
      margin-top: 150px;
      position: relative;
    }
    .mobile-users-header {
      padding: 0 44px;
      height: 44px;
      line-height: 44px;
      font-size: 18px;
      background: #3385ff;
      color: #fff;
      text-align: center;
      position: relative;
      .back-icon {
        position: absolute;
        left: 16px;
        top: 12px;
      }
    }
    .mobile-users-search {
      padding: 6px 12px;
      height: 44px;
      background: #eee;
      input::-webkit-input-placeholder {
        text-align: center;
      }
    }
    .mobile-users-list-wrapper {
      position: fixed;
      top: 88px;
      bottom: 0;
      width: 100%
    }
    .mobile-users-list {
      height: 100%;
      overflow: hidden
    }
    .user-item {
      height: 98px;
      border-bottom: 1px solid #ccc;
      .user-item-avatar {
        padding-top: 21px;
        .ivu-avatar {
          display: block;
          margin: 0 auto;
        }
      }
      .user-item-detail {
        padding-top: 18px;
        .name {
          display: inline-block;
          margin-right: 36px;
          font-size: 16px;
          color: black;
          font-weight: 500;
          font-family: 'Microsoft YaHei';
          margin-bottom: 4px;
        }
        p {
          line-height: 20px;
        }
      }
    }
  }
</style>
