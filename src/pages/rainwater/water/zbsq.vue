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
      <Table border stripe disabled-hover :height="tableHeight" :loading="loading" :columns="columns"
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
                width: 50,
                key: 'levelTop',
                align: 'center',
              },
              {
                title: '闸下',
                width: 50,
                key: 'levelBottom',
                align: 'center',
              }
            ]
          },
          {
            title: '流量(m^3)',
            width: 42,
            className: 'lh22',
            key: 'flow',
            align: 'center',
          },
          {
            title: '时间',
            key: 'time',
            width: 86,
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
        let url = `http://39.104.175.8/shuiwenju/?iw-apikey=123&iw-cmd=sqxx`
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
    .lh22 {
      line-height: 22px;
    }
  }
</style>
