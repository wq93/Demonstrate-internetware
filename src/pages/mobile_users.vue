<template>
  <div class="mobile-users-wrapper">
    <div class="mobile-users-header">
      <div @click="handleClickClear()">
        <Icon type="chevron-left"
              class="back-icon"></Icon>
      </div>
      通讯录
    </div>
    <div class="mobile-users-search">
      <input v-model="keyword"
             icon="ios-search"
             placeholder="搜索"
             ref="search"
             @keyup.enter="handleClickSearch"></input>
      <span class="search-btn" @click="handleClickSearch">
        <Icon type="ios-search" :size="24"></Icon>
      </span>
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
      <div class="mobile-users-list-wrapper">
        <scroll ref="userList"
                class="mobile-users-list"
                :data="userList"
                :pullup="pullup"
                :beforeScroll="beforeScroll"
                @scrollToEnd="searchMore"
                @beforeScroll="listScroll">
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
            <div style="text-align: center;margin-top: 10px" v-show='hasMore'>
              加载中...
            </div>
          </ul>
          <div v-show="!hasMore && !userList.length">
            <p style="margin-top: 40px;text-align: center">暂无数据</p>
          </div>
        </scroll>
      </div>
    </div>
  </div>
</template>

<script>
  import Scroll from '../components/scroll/scroll.vue'
  import {codeMsg} from './codeMsg'
  import $ from 'jquery';

  export default {
    name: "mobile_users",
    components: {
      Scroll,
    },
    data() {
      return {
        keyword: '',
        loading: false,
        userList: [],
        page: 1,
        pullup: true,
        hasMore: false,
        beforeScroll: true
      }
    },
    mounted() {
      this._getList(true)
    },
    watch: {
      // keyword: {
      //   handler(curVal) {
      //     this._getList()
      //   },
      // }
    },
    methods: {
      _getList(loading = false, type = 'normal') {
        let url = `https://api.internetware.cn/farenbanshi/?iw-apikey=${localStorage.getItem('userName') || '123'}&iw-cmd=txl&page=${this.page}&keywords=${this.keyword}`
        let deloy = 300
        this.loading = loading
        // if (!loading) {
        //   deloy = 0
        // }
        $.ajax({
          url,
          type: "GET",
          success: (res) => {
            let {rtnCode, rtnMsg, data} = res
            setTimeout(() => {
              if (rtnCode === "000000") {
                this.userList = this.userList.concat(data.list)
              } else if (rtnCode === "900003") {
                this.userList = []
                // this.$Message.error(rtnMsg)
              } else if (rtnCode === "900005" && type === 'scrollMore') {
                this.userList = this.userList
                // this.$Message.error(rtnMsg)
              } else {
                this.userList = []
                // if (rtnMsg) {
                //   this.$Message.error(rtnMsg)
                // } else {
                //   this.$Message.error(codeMsg[rtnCode])
                // }
              }
              this.loading = false
              this.hasMore = false
            }, deloy)
          },
          error: (data) => {
            setTimeout(() => {
              this.userList = []
              this.hasMore = false
              // this.$Message.error('未知错误')
              this.loading = false
            }, 300)
          }
        });
      },
      handleClickClear() {
        this.keyword = ''
        this.page = 1
        this._getList(true)
      },
      handleClickSearch() {
        if (this.keyword !== '') {
          this.page = 1
          this.$refs.userList.scrollTo(0, 0)
          this._getList(true)
        }
      },
      searchMore() {
        // 下拉加载更多
        console.log('下拉加载更多')
        let type = 'scrollMore'
        this.page++
        this._getList(false, type)
      },
      listScroll() {
        this.hasMore = true
        this.$refs.search.blur()
      },
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
      position: relative;
      input {
        outline: medium;
        width: 100%;
        height: 32px;
        padding-left: 12px;
        border: 0;
        border-radius: 4px;
      }
      input::-webkit-input-placeholder {
        /*text-align: center;*/
      }
      .search-btn {
        position: absolute;
        top: 10px;
        right: 22px;
        padding: 0 8px;
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
          background: #d9edf8;
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
