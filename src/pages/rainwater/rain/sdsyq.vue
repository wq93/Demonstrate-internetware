<template>
  <div class="sdsyq-wrapper">
    <div class="rainwater-title">
      <div @click="$router.back()">
        <Icon type="chevron-left"
              class="back-icon"></Icon>
      </div>
      <h4>山东雨情</h4>
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
    data() {
      return {
        tableHeight: 0,
        columns: [
          {
            title: '政区名称',
            key: 'name',
            align: 'center',
            render: (h, params) => {
              let {id, name} = params.row
              let href = ''
              let className = ''
              if (id) {
                href = `#/rainwater/rain/area/${id}/${encodeURI(name)}`
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
            title: '平均雨量(mm)',
            align: 'center',
            key: 'rainfall'
          },
          {
            title: '最大点雨量站',
            align: 'center',
            key: 'maxRainfallStation'
          },
          {
            title: '最大点雨量(mm)',
            align: 'center',
            className: 'noRightBorder',
            key: 'maxRainfall'
          }
        ],
        list: [],
        loading: true
      }
    },
    methods: {
      async _getList() {
        let url = `https://api.internetware.cn/shuiwenju/?iw-apikey=123&iw-cmd=yqxxlb`
        try {
          let res = await this.$get(url)
          if (res.rtnCode === '000000') {
            this.list = this.serializaData(res.data.list)
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
            'name': item['政区名称'],
            'rainfall': item['平均雨量(mm)'],
            'maxRainfallStation': item['最大点雨量站'],
            'maxRainfall': item['最大点雨量(mm)'],
          }
          Object.assign(item, {...itemObj})
        })
        return list
      }
    }
  }
</script>
<style lang="less" type="text/less">
  .sdsyq-wrapper {
    .normal {
      font-size: 14px;
      font-weight: normal;
      color: rgba(0, 0, 0, 0.65);
    }
    .normal:link, a:visited {
      text-decoration: none;
    }
    thead tr th:last-child {
      border-right: 1px solid transparent;
    }
  }
</style>
