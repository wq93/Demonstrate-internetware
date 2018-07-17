<template>
  <div class="rainwater-wrapper">
    <embed src="../../common/image/banner.swf" wi/>
    <h4 class="rainwater-title">水情</h4>
    <ul>
      <li v-for="water in waterList"
          :key="water.key"
          class="item-li"
          @click="handleClick(water)">{{water.value}}
      </li>
    </ul>
    <h4 class="rainwater-title">雨情</h4>
    <ul>
      <li v-for="rain in rainList"
          :key="rain.key"
          class="item-li"
          @click="handleClick(rain)">{{rain.value}}
      </li>
    </ul>
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
            key: 'sdssq',
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
    .item-li {
      height: 44px;
      line-height: 44px;
      border-bottom: 1px solid #cccccc;
    }
  }
</style>
