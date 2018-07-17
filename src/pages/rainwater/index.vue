<template>
  <div class="rainwater-wrapper">
    <div class="banner"></div>
    <div class="rainwater-content">
      <h4 class="rainwater-title">水情</h4>
      <ul>
        <li v-for="water in waterList"
            :key="water.key"
            class="item-li"
            @click="handleClick(water)">
          <div class="item-li-avator">
            <Icon type="stop"></Icon>
          </div>
          <p class="item-li-text">{{water.value}}</p>
          <div class="item-li-icon">
            <Icon type="chevron-right"></Icon>
          </div>
        </li>
      </ul>
      <h4 class="rainwater-title">雨情</h4>
      <ul>
        <li v-for="rain in rainList"
            :key="rain.key"
            class="item-li"
            @click="handleClick(rain)">
          <div class="item-li-avator">
            <Icon type="stop"></Icon>
          </div>
          <p class="item-li-text">{{rain.value}}</p>
          <div class="item-li-icon">
            <Icon type="chevron-right"></Icon>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        waterList: [
          {
            value: '水库水情',
            key: 'sksq',
            type: 'water'
          },
          {
            value: '东平湖水情',
            key: 'dphsq',
            type: 'water'
          },
          {
            value: '南四湖水情',
            key: 'nshsq',
            type: 'water'
          },
          {
            value: '河道水情',
            key: 'hdsq',
            type: 'water'
          },
          {
            value: '闸坝水情',
            key: 'zbsq',
            type: 'water'
          },
        ],
        rainList: [
          {
            value: '山东省雨情',
            key: 'sdsyq',
            type: 'rain'
          }
        ]
      }
    },
    methods: {
      handleClick(water) {
        let {type, key} = water
        this.$router.push(`/rainwater/${type}/${key}`)
      }
    }
  }
</script>

<style lang="less" type="text/less">
  .rainwater-wrapper {
    ul {
      padding: 0 8px;
    }
    .banner {
      background-size: 100% 166px;
      background-color: #eee;
      background-image: url("../../common/image/banner.png");
      background-repeat: no-repeat;
      background-position: center center;
      width: 100%;
      height: 166px;
      display: inline-block;
    }
    .rainwater-content {
      margin-top: -2px;
    }
    .item-li {
      position: relative;
      height: 44px;
      padding-left: 52px;
      border-bottom: 1px solid #cccccc;
      .item-li-avator {
        position: absolute;
        top: 5px;
        left: 8px;
        color: #bbbec4;
        font-size: 34px;
      }
      .item-li-text {
        font-weight: 500;
        line-height: 44px;
        font-size: 16px;
      }
      .item-li-icon {
        position: absolute;
        top: 12px;
        right: 12px;
        font-size: 18px;
      }
      &:last-child {
        border-bottom: 1px solid transparent;
      }
    }
    .rainwater-title {
      height: 44px;
      background: #3385ff;
      color: #fff;
      font-weight: 500;
      line-height: 44px;
      font-size: 16px;
      text-align: center;
    }
  }
</style>
