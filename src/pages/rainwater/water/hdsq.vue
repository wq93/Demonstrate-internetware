<template>
  <div class="hdsq-wrapper">
    <div class="rainwater-title">
      <div @click="$router.back()">
        <Icon type="chevron-left"
              class="back-icon"></Icon>
      </div>
      <h4>河道水情</h4>
    </div>
    <div class="content">
      <Table border :loading="loading" :columns="columns" :data="list"></Table>
    </div>
  </div>
</template>
<script>
  export default {
    mounted() {
      this._getList()
    },
    data() {
      return {
        columns: [
          {
            title: '河名',
            align:'center',
            key: 'name'
          },
          {
            title: '水文站',
            align:'center',
            key: 'station'
          },
          {
            title: '水位(m)',
            align:'center',
            key: 'level'
          },
          {
            title: '流量(m3/s)',
            align:'center',
            key: 'flow'
          },
          {
            title: '时间',
            align:'center',
            key: 'time'
          }
        ],
        list: [],
        loading: true
      }
    },
    methods: {
      async _getList() {
        let url = `https://api.internetware.cn/shuiwenju/?iw-apikey=123&iw-cmd=sqxx`
        let type = '河道水情'
        try {
          let res = await this.$get(url)
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
            'name': item['河名'],
            'station': item['水文站'],
            'level': item['水位(m)'],
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
