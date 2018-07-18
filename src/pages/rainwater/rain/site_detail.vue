<template>
  <div class="site-detail-wrapper">
    <div class="rainwater-title">
      <div @click="$router.back()">
        <Icon type="chevron-left"
              class="back-icon"></Icon>
      </div>
      <h4>{{name}}雨情</h4>
    </div>
    <div class="content">
      <Table border :height="tableHeight" :loading="loading" :columns="columns" :data="list"></Table>
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
    props: {
      id: String,
      name: String,
    },
    data() {
      return {
        tableHeight: 0,
        columns: [
          {
            title: '站点名称',
            align: 'center',
            key: 'name',
          },
          {
            title: '雨量',
            align: 'center',
            className: 'noRightBorder',
            key: 'value'
          },
        ],
        list: [],
        loading: true,
      }
    },
    methods: {
      async _getList() {
        let url = `https://api.internetware.cn/shuiwenju/?iw-apikey=123&iw-cmd=yqxxxq&id=${this.id}`
        try {
          let res = await this.$ajax_get(url)
          if (res.rtnCode === '000000') {
            this.list = this.serializaData(res.data.msg[0].data)
          }
        } catch (e) {
          console.log(e)
        } finally {
          this.loading = false
        }
      },
      serializaData(list) {
        let result = []
        list.forEach(item => {
          if (this.name === item.name) {
            result = item.data
          }
        })
        return result
      }
    }
  }
</script>
<style lang="less" type="text/less">
  .site-detail-wrapper {
    thead tr th:last-child {
      border-right: 1px solid transparent;
    }
  }
</style>
