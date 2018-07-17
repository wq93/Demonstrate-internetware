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
      <h6>全市降雨量统计(单位：mm)</h6>
      <p>{{overview}}</p>
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
            title: '市区名称',
            key: 'name',
            align:'center',
            render: (h, params) => {
              let {id, name} = params.row
              let href = ''
              if (id) {
                href = `#/rainwater/rain/site/${id}/${encodeURI(name)}`
              } else {
                href = `javascript:void(0);`
              }
              return h('div', [
                h('a', {
                  props: {
                    type: 'text',
                    size: 'small',
                  },
                  domProps: {
                    href,
                    className: ``,
                    title: name
                  },
                }, name),
              ])
            }
          },
          {
            title: '雨量',
            align:'center',
            key: 'value'
          },
        ],
        list: [],
        loading: true,
        overview: '2018-07-15 17:35至2018-07-16 17:35,全市平均降雨量为0.0mm,市平均降雨量最大为历下区(0mm),最大点雨量为历下区站(0.0mm)。'
      }
    },
    methods: {
      async _getList() {
        let url = `https://api.internetware.cn/shuiwenju/?iw-apikey=123&iw-cmd=yqxxxq&id=${this.id}`
        try {
          let res = await this.$get(url)
          if (res.rtnCode === '000000') {
            this.overview = res.data.msg[0]['概述']
            this.list = this.serializaData(res.data.msg[0].data)
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
            name: item.name,
            value: item.value,
            id: this.id,
          }
          Object.assign(item, {...itemObj})
          console.log(item)
        })
        return list
      }
    }
  }
</script>
