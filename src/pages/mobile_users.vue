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
    <div class="mobile-users-list-wrapper">
      <scroll ref="userList" :data="userList" class="mobile-users-list">
        <ul ref="list">
          <li class="user-item" v-for="item in userList" :key="item.tel">
            <Row>
              <Col span="6" class="user-item-avatar">
                <Avatar shape="square" icon="person" size="large"/>
              </Col>
              <Col span="18">
                <div class="user-item-detail">
                  <span class="name">{{item.name}}</span>
                  <span>{{item.ip}}</span>
                  <p>{{item.tel}}</p>
                  <p>{{item.email}}</p>
                </div>
              </Col>
            </Row>
          </li>
        </ul>
      </scroll>
      <div></div>
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
        userList: [
          {
            'name': '胡军',
            'ip': '营销中心·北京',
            'tel': '13051633148',
            'email': 'zhangsu@internetware.cn'
          },
          {
            'name': '胡军1',
            'ip': '营销中心·北京2',
            'tel': '13051853519',
          },
          {
            'name': '胡军2',
            'ip': '营销中心·北京1',
            'tel': '135124785935',
          },
          {
            'name': '胡军2',
            'ip': '营销中心·北京1',
            'tel': '131244785935',
          },
          {
            'name': '胡军2',
            'ip': '营销中心·北京1',
            'tel': '131243785935',
          },
          {
            'name': '胡军2',
            'ip': '营销中心·北京1',
            'tel': '131247825935',
          },
          {
            'name': '胡军2',
            'ip': '营销中心·北京1',
            'tel': '131247815935',
          },
          {
            'name': '胡军2',
            'ip': '营销中心·北京1',
            'tel': '1131247815935',
          },
          {
            'name': '胡军2',
            'ip': '营销中心·北京1',
            'tel': '1312478159353',
          }
        ]
      }
    }
  }
</script>

<style lang="less" type="text/less">
  .mobile-users-wrapper {
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
      height: 88px;
      border-bottom: 1px solid #ccc;
      .user-item-avatar {
        padding-top: 24px;
        .ivu-avatar {
          display: block;
          margin: 0 auto;
        }
      }
      .user-item-detail {
        padding-top: 22px;
      }
    }
  }
</style>
