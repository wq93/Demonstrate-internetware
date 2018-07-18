<template>
  <div class="area-detail-wrapper">
    <div class="rainwater-title">
      <div @click="$router.back()">
        <Icon type="chevron-left"
              class="back-icon"></Icon>
      </div>
      <h4>{{name}}雨情</h4>
    </div>
    <div class="content">
      <h6 class="total-title">全市降雨量统计(单位：mm)</h6>
      <p class="total-overview">{{overview}}</p>
      <Table border :height="tableHeight" :loading="loading" :columns="columns" :data="list"></Table>
    </div>
  </div>
</template>
<script>
  export default {
    mounted() {
      let offsetHeight = document.documentElement.clientHeight
      this.tableHeight = (offsetHeight - 177)
      window.onresize = () => {
        offsetHeight = document.documentElement.clientHeight
        this.tableHeight = (offsetHeight - 177)
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
            title: '市区名称',
            key: 'name',
            align: 'center',
            render: (h, params) => {
              let {id, name, data} = params.row
              let href = ''
              let className = ''
              if (data) {
                href = `#/rainwater/rain/site/${id}/${encodeURI(name)}`
              } else {
                href = `javascript:void(0);`
                className = 'normal'
              }
              return h('div', [
                h('a', {
                  props: {
                    type: 'text',
                    size: 'small',
                  },
                  domProps: {
                    href,
                    className,
                    title: name
                  },
                }, name),
              ])
            }
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
        overview: ''
      }
    },
    methods: {
      async _getList() {
        this.list = []
        let url = `https://api.internetware.cn/shuiwenju/?iw-apikey=123&iw-cmd=yqxxxq&id=${this.id}`
        try {
          let res = await this.$ajax_get(url)
          if (res.rtnCode === '000000') {
            let firstItem = []
            firstItem[0] = {
              name: '全市',
              value: res.data.msg[0]['全市'],
              id: this.id,
            }
            this.overview = res.data.msg[0]['概述']
            this.list = firstItem
            this.list = this.list.concat(this.serializaData(res.data.msg[0].data))
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
<style lang="less" type="text/less">
  .area-detail-wrapper {
    thead tr th:last-child {
      border-right: 1px solid transparent;
    }
    .normal {
      font-size: 14px;
      font-weight: normal;
      color: rgba(0, 0, 0, 0.65);
    }
    .normal:link, a:visited {
      text-decoration: none;
    }
    .total-title {
      text-align: center;
      line-height: 66px;
      font-size: 16px;
      font-weight: 700;
    }
    .total-overview {
      padding: 0 22px;
      height: 67px;
      font-size: 14px;
      line-height: 18px;
      padding-bottom: 12px;
      border-bottom: 1px solid #e8e8e8;
    }
  }
</style>
