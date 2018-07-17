<template>
  <div class="sksq-wrapper">
    <div class="rainwater-title">
      <div @click="$router.back()">
        <Icon type="chevron-left"
              class="back-icon"></Icon>
      </div>
      <h4>{{name}}雨情</h4>
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
    props: {
      id: String,
      name: String,
    },
    data() {
      return {
        columns: [
          {
            title: '站点名称',
            align:'center',
            key: 'name',
          },
          {
            title: '雨量',
            align:'center',
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
          let res = await this.$get(url)
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
