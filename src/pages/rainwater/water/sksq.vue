<template>
  <div class="sksq-wrapper">
    <div class="rainwater-title">
      <div @click="$router.back()">
        <Icon type="chevron-left"
              class="back-icon"></Icon>
      </div>
      <h4>水库水情</h4>
    </div>
    <div class="content">
      <Table border :loading="loading" :columns="columns" :data="list" :height="tableHeight"></Table>
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
        columns: [
          {
            title: '名称',
            key: 'name',
            align: 'center'
          },
          {
            title: '蓄水量（10^4 m^3）',
            align: 'center',
            children: [
              {
                title: '大型',
                key: 'large',
                align: 'center',
              },
              {
                title: '中型',
                key: 'medium',
                align: 'center',
              },
              {
                title: '合计',
                key: 'total',
                align: 'center',
              },
            ]
          },
          {
            title: '超限座数',
            key: 'oversizedSeat',
            className: 'noRightBorder',
            align: 'center',
          }
        ],
        list: [],
        loading: true,
        tableHeight: 0
      }
    },
    methods: {
      async _getList() {
        let url = `https://api.internetware.cn/shuiwenju/?iw-apikey=123&iw-cmd=sqxx`
        let type = '水库水情'
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
            name: item['名称'],
            oversizedSeat: item['超限座数'],
            large: item['蓄水量(104m3)大型'],
            medium: item['蓄水量(104m3)中型'],
            total: item['蓄水量(104m3)合计'],
          }
          Object.assign(item, {...itemObj})
        })
        return list
      }
    }
  }
</script>
<style lang="less" type="text/less">
  .sksq-wrapper {
    thead tr:first-child {
      th:last-child {
        border-right: 1px solid transparent;
      }
    }
  }
</style>
