<template>
  <div class="nshsq-wrapper">
    <div class="rainwater-title">
      <div @click="$router.back()">
        <Icon type="chevron-left"
              class="back-icon"></Icon>
      </div>
      <h4>南四湖水情</h4>
    </div>
    <div class="content">
      <Table border :loading="loading" :columns="columns" stripe disabled-hover
             :height="tableHeight"
             :data="list"></Table>
    </div>
  </div>
</template>
<script>
  export default {
    mounted() {
      let offsetHeight = document.documentElement.clientHeight
      this.tableHeight = (offsetHeight - 44)
      window.onresize = () => {
        offsetHeight = document.documentElement.clientHeight
        this.tableHeight = (offsetHeight - 44)
      }
      this._getList()
    },
    data() {
      return {
        tableHeight: 0,
        columns: [
          {
            title: '站名',
            align: 'center',
            key: 'name'
          },
          {
            title: '平均水位',
            align: 'center',
            key: 'level'
          },
          {
            title: '蓄水量（10^4 m^3）',
            align: 'center',
            key: 'storage'
          }
        ],
        list: [],
        loading: true
      }
    },
    methods: {
      async _getList() {
        let url = `https://api.internetware.cn/shuiwenju/?iw-apikey=123&iw-cmd=sqxx`
        let type = '南四湖水情'
        try {
          let res = await this.$ajax_get(url)
          if (res.rtnCode === '000000') {
            this.list = this.serializaData(res.data[type])
          }
        } catch (e) {
          console.log(e)
        } finally {
          this.loading = false
        }
      },
      serializaData(list) {
        list.forEach(item => {
          let itemObj = {
            'name': item['站名'],
            'level': item['平均水位'],
            'storage': item['蓄水量(104m3)']
          }
          Object.assign(item, {...itemObj})
        })
        return list
      }
    }
  }
</script>
<style lang="less" type="text/less">
  .nshsq-wrapper {
    thead tr th:last-child {
      border-right: 1px solid transparent;
    }
  }
</style>
