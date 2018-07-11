<template>
  <div class="integration-wrapper" ref="integrationWrapper">
    <div class="area-content">
      <div class="area-title dib fw700">所属地区:</div>
      <ul class="area-list dib">
        <li class="dib area-item"
            :class="{ active: areaActive === item.value}"
            v-for="item in areaList"
            @click="handlerClickArea(item)"
            :key="item.value">{{item.displayName}}
        </li>
      </ul>
    </div>
    <div class="department-content" :class="{ 'fixed-height': moreText}">
      <div class="department-title dib fw700">所属部门:</div>
      <ul class="department-list" ref="departmentList">
        <li class="dib department-item"
            :class="{ active: departmentActive === item.id}"
            v-for="item in departmentList"
            @click="handlerClickDepartment(item)"
            :key="item.id">{{item.displayName}}
        </li>
      </ul>
      <!--<Button type="text"-->
      <!--class="more-text"-->
      <!--@click="handlerClickChangeMoreText">{{moreText?'展开':'收起'}}-->
      <!--</Button>-->
    </div>
    <div class="list-content">
      <p class="fw700 fs15">法人服务事项列表</p>
      <!--<Input v-model="keyword"-->
      <!--placeholder="请输入事项名称进行搜索"-->
      <!--icon="ios-search"-->
      <!--class="pull-right list-input"></Input>-->
      <Table :columns="columns" :data="listData" :loading="loading"
             :height="tableHeight"
             :show-header="false"
             class="table"></Table>
      <Page class="page"
            :total="totalNum"
            :page-size='numPerPage'
            @on-change="handlerPageChange"></Page>
    </div>
  </div>
</template>

<script>
  import {tablePage} from '../common/mixed/mixed'
  import {codeMsg} from './codeMsg'
  import $ from 'jquery';

  let departmentObj = {
    gdsrmzfwz: [
      {
        displayName: '发改委',
        name: '省发展改革委',
        id: '006939756'
      },
      {
        displayName: '食药监',
        name: '省食品药品监管局',
        id: '00694124X'
      },
      {
        displayName: '公安',
        name: '省公安厅',
        id: '006940140'
      },
      {
        displayName: '工商',
        name: '省工商局',
        id: '00694001X'
      },
      {
        displayName: '农业',
        name: '省农业厅',
        id: '006939908'
      },
      {
        displayName: '国土',
        name: '省国土资源厅',
        id: '006939932'
      },
      {
        displayName: '教育',
        name: '省教育厅',
        id: '006940116'
      },
      {
        displayName: '税务',
        name: '省税务局',
        id: '006941290'
      },
      {
        displayName: '经信',
        name: '省经济和信息化委',
        id: '696453330'
      },
      {
        displayName: '林业',
        name: '省林业厅',
        id: '006939916'
      },
    ],
    bjsrmzfwz: [
      {
        displayName: '发改委',
        name: '市发展改革委',
        id: '18'
      },
      {
        displayName: '食药监',
        name: '市食品药品监管局',
        id: '52'
      },
      {
        displayName: '公安',
        name: '市公安局',
        id: '22'
      },
      {
        displayName: '工商',
        name: '市工商局',
        id: '41'
      },
      {
        displayName: '农业',
        name: '市农委',
        id: '10003'
      },
      {
        displayName: '国土',
        name: '市规划国土委（规划）',
        id: '29'
      },
      {
        displayName: '教育',
        name: '市教委',
        id: '19'
      },
      {
        displayName: '税务',
        name: '市地税局',
        id: '40'
      },
      {
        displayName: '经信',
        name: '市经济信息化委',
        id: '45'
      },
      {
        displayName: '林业',
        name: '市园林绿化局',
        id: '58'
      },
    ],
    shsrmzfwz: [
      {
        displayName: '发改委',
        name: '上海市发展和改革委员会',
        id: 'SHFGSH'
      },
      {
        displayName: '食药监',
        name: '上海市食品药品监督管理局',
        id: 'SHSPSH'
      },
      {
        displayName: '公安',
        name: '上海市公安局',
        id: 'SHGASH'
      },
      {
        displayName: '工商',
        name: '上海市工商行政管理局',
        id: 'SHGSSH'
      },
      {
        displayName: '农业',
        name: '上海市农业委员会',
        id: 'SHNYSH'
      },
      {
        displayName: '国土',
        name: '上海市规划和国土资源管理局',
        id: 'SHGHSH'
      },
      {
        displayName: '教育',
        name: '上海市教育委员会',
        id: 'SHJYSH'
      },
      {
        displayName: '税务',
        name: '上海市税务局',
        id: 'SHGDSH'
      },
      {
        displayName: '经信',
        name: '上海市经济和信息化委员会',
        id: 'SHJXSH'
      },
      {
        displayName: '林业',
        name: '上海市绿化和市容管理局',
        id: 'SHSLSH'
      },
    ],
    zjsrmzfwz: [
      {
        displayName: '发改委',
        name: '省发展改革委',
        id: '002482031'
      },
      {
        displayName: '食药监',
        name: '省食品药品监管局',
        id: '002482461'
      },
      {
        displayName: '公安',
        name: '省公安厅',
        id: '002482111'
      },
      {
        displayName: '工商',
        name: '省工商局',
        id: '002482410'
      },
      {
        displayName: '农业',
        name: '省农业厅',
        id: '002482306'
      },
      {
        displayName: '国土',
        name: '省国土资源厅',
        id: '002482437'
      },
      {
        displayName: '教育',
        name: '省教育厅',
        id: '002482082'
      },
      {
        displayName: '税务',
        name: '省税务局',
        id: '002482189'
      },
      {
        displayName: '经信',
        name: '省经济和信息化委',
        id: '002482904'
      },
      {
        displayName: '林业',
        name: '省林业厅',
        id: '002482314'
      },
    ]
  }
  let currentKey = 'bjsrmzfwz'
  export default {
    name: "Integration",
    mixins: [tablePage],
    data() {
      return {
        keyword: '',
        moreText: true,
        areaList: [
          {'displayName': '北京', 'value': 'bjsrmzfwz'},
          {'displayName': '上海', 'value': 'shsrmzfwz'},
          {'displayName': '广东', 'value': 'gdsrmzfwz'},
          {'displayName': '浙江', 'value': 'zjsrmzfwz'}
        ],
        departmentList: departmentObj[currentKey],
        areaActive: currentKey,
        departmentActive: departmentObj[currentKey][0].id,
        columns: [
          {
            title: '',
            align: 'left',
            render: (h, params) => {
              let {title, url} = params.row;
              return h('div', [
                h('a', {
                  style: {
                    paddingLeft: '40px'
                  },
                  domProps: {
                    className: 'text-overflow',
                    href: url,
                    target: '_blank',
                    title
                  }
                }, title),
              ]);
            }
          },
        ],
        listData: [],
        totalNum: 0,
        tableHeight: 0
      }
    },
    mounted() {
      let offsetHeight = this.$refs.integrationWrapper.offsetHeight
      this.tableHeight = Math.max((offsetHeight - 280), 150)
      window.onresize = () => {
        let offsetHeight = this.$refs.integrationWrapper.offsetHeight
        this.tableHeight = Math.max((offsetHeight - 280), 150)
      }
      this._getList(true)
    },
    methods: {
      _getList(loading = false) {
        let url = `https://api.internetware.cn/farenbanshi/?iw-apikey=123&iw-cmd=${this.areaActive}&page=${this.page}&bm=${this.departmentActive}`
        // let params = {
        //   'iw-apikey': '123',
        //   'iw-cmd': this.areaActive,
        //   'bm': this.departmentActive,
        //   'page': this.page,
        //   // keywords: this.keyword
        // }
        this.loading = loading

        $.ajax({
          url,
          type: "GET",
          success: (res) => {
            console.log(res)
            let {rtnCode, data, rtnMsg} = res
            if (rtnCode === '000000' || rtnCode === '0000000') {
              this.listData = data.list
              this._changeLoading()
            } else {
              this.listData = data.list
              this._changeLoading()
              if (rtnMsg) {
                this.$Message.error(rtnMsg)
              } else {
                this.$Message.error(codeMsg[rtnCode])
              }
            }
          },
          error: (data) => {
            this.loading = false
            this.$Message.error('未知错误')
          }
        });

        // this.$get(url, params)
        //   .then((res) => {
        //     let {rtnCode, data, rtnMsg} = res
        //     if (rtnCode === '000000' || rtnCode === '0000000') {
        //       this.listData = data.list
        //     } else {
        //       this.listData = data.list
        //       if (rtnMsg) {
        //         this.$Message.error(rtnMsg)
        //       } else {
        //         this.$Message.error(codeMsg[rtnCode])
        //       }
        //     }
        //   })
        //   .finally(() => {
        //     this._changeLoading()
        //   })
      },
      handlerPageChange(val) {
        this.page = val
        this._getList(true)
      },
      handlerClickArea(item) {
        this.areaActive = item.value
        this.departmentList = departmentObj[this.areaActive]
        this.departmentActive = this.departmentList[0].id
        this._getList(true)
      },
      handlerClickDepartment(item) {
        this.departmentActive = item.id
        this._getList(true)
      },
      handlerClickChangeMoreText() {
        this.moreText = !this.moreText
      }
    },
  }
</script>

<style lang="less" type="text/less">
  .integration-wrapper {
    width: 100%;
    height: 100%;
    padding: 22px 32px;
    background: #fff;
    .fw700 {
      font-weight: 700;
    }
    .fs15 {
      font-size: 15px;
    }
    .department-content,
    .area-content {
      padding: 10px 0;
      border-bottom: 2px dashed #ccc;
      min-height: 50px;
    }
    .department-item,
    .area-item {
      padding: 6px 12px;
      margin: 0px 5px;
      cursor: pointer;
      &:hover {
        background: #3385ff;
        color: #ffffff;
      }
    }
    .department-item.active,
    .area-item.active {
      background: #3385ff;
      color: #ffffff;
    }
    .area-content {
      height: 50px;
    }
    .department-content {
      padding-left: 65px;
      padding-right: 100px;
      position: relative;
    }
    .department-content.fixed-height {
      height: 50px;
      overflow: hidden;
    }
    .department-title {
      position: absolute;
      left: 0;
      top: 15px;
    }
    .department-list {

    }
    .department-item {
      margin-bottom: 6px;
    }
    .more-text {
      position: absolute;
      right: 8px;
      top: 8px;
      color: #3385ff;
    }
    .list-content {
      padding-top: 32px;
    }
    .list-input {
      width: 250px
    }
    .table {
      margin-top: 30px;
      width: 100%;
    }
    .page {
      margin-top: 20px;
    }
    .department-enter-active, .department-leave-active {
      transition: all 0.3s ease
    }

    .department-enter, .department-leave-active {
      height: 0
    }
  }
</style>
