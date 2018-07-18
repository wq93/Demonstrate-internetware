<template>
  <div class="zbsq-wrapper">
    <div class="rainwater-title">
      <div @click="$router.back()">
        <Icon type="chevron-left"
              class="back-icon"></Icon>
      </div>
      <h4>闸坝水情</h4>
    </div>
    <div class="content">
      <Table border stripe disabled-hover :height="tableHeight" :loading="loading" :columns="columns" :data="list"></Table>
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
            title: '水文站',
            key: 'name',
            align: 'center'
          },
          {
            title: '水位量（m）',
            align: 'center',
            children: [
              {
                title: '闸上',
                key: 'levelTop',
                width: 60,
                align: 'center',
              },
              {
                title: '闸下',
                key: 'levelBottom',
                width: 60,
                align: 'center',
              }
            ]
          },
          {
            title: '流量（m^3）',
            key: 'flow',
            align: 'center',
          },
          {
            title: '时间',
            key: 'time',
            className: 'noRightBorder',
            align: 'center',
          }
        ],
        list: [],
        loading: true
      }
    },
    methods: {
      async _getList() {
        let url = `https://api.internetware.cn/shuiwenju/?iw-apikey=123&iw-cmd=sqxx`
        let type = '闸坝水情'
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
            'name': item['水文站'],
            'levelTop': item['水位(m)闸上'],
            'levelBottom': item['水位(m)闸下'],
            'flow': item['流量(m3/s)'],
            'time': item['时间']
          }
          Object.assign(item, {...itemObj})
        })
        return list
      }
    }
  }
</script>
<style lang="less" type="text/less">
  .zbsq-wrapper {
    thead tr:first-child {
      th:last-child {
        border-right: 1px solid transparent;
      }
    }
  }
</style>
