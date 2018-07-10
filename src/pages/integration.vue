<template>
  <div class="integration-wrapper">
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
      <ul class="department-list">
        <li class="dib department-item"
            :class="{ active: departmentActive === item.value}"
            v-for="item in departmentList"
            @click="handlerClickDepartment(item)"
            :key="item.value">{{item.displayName}}
        </li>
      </ul>
      <Button type="text"
              class="more-text"
              @click="handlerClickChangeMoreText">{{moreText?'展开':'收起'}}
      </Button>
    </div>
    <div class="list-content">
      <p class="fw700 fs15">法人服务事项列表（合计：{{totalNum}}）</p>
      <Input v-model="keyword"
             placeholder="请输入事项名称进行搜索"
             icon="ios-search"
             class="pull-right list-input"></Input>
      <Table :columns="columns" :data="listData" :loading="loading"
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

  export default {
    name: "Integration",
    mixins: [tablePage],
    data() {
      return {
        areaActive: 'Guangzhou',
        departmentActive: '0',
        keyword: '',
        moreText: false,
        areaList: [
          {'displayName': '广州', 'value': 'Guangzhou'},
          {'displayName': '北京', 'value': 'Beijing'},
          {'displayName': '上海', 'value': 'Shanghai'},
          {'displayName': '浙江', 'value': 'Zhejiang'}
        ],
        departmentList: [
          {'displayName': '全部', 'value': '0'},
          {'displayName': '市公安局', 'value': '1'},
          {'displayName': '市AA局', 'value': '2'},
          {'displayName': '市BB局', 'value': '3'},
          {'displayName': '市cc局', 'value': '4'},
          {'displayName': '市dd局', 'value': '5'},
          {'displayName': '市dd局1', 'value': '35'},
          {'displayName': '市dd局2', 'value': '53'},
          {'displayName': '市dd局3', 'value': '54'},
          {'displayName': '市dd局5', 'value': '5777'},
          {'displayName': '市dd局5', 'value': '577'},
          {'displayName': '市dd局5', 'value': '5177'},
          {'displayName': '市dd局5', 'value': '5727'},
          {'displayName': '市dd局5', 'value': '57777'},

        ],
        columns: [
          {
            title: '',
            align: 'left',
            render: (h, params) => {
              let {displayName, name} = params.row;
              return h('div', [
                h('p', {
                  style: {}
                }, displayName),
                h('p', {
                  style: {}
                }, name)
              ]);
            }
          },
        ],
        listData: [
          {'displayName': '中小学地方课程教材审定', 'name': '上海·市教委', 'value': '1'},
          {'displayName': '上报国家发展改革委审批的进口设备免税确认书初审', 'name': '上海·市发展改革', 'value': '2'},
          {'displayName': '企业、事业单位、社会团体等投资建设的固定资产投资项目核准(不含工业和信息化投资项目', 'name': '上海·市发展改革委', 'value': '3'},
          {'displayName': '城市基础设施专项建设资金减免缓审批（含城市基础设施建设费减免缓）', 'name': '上海·市发展改革委', 'value': '4'},
          {'displayName': '举办外国的和香港特别行政区、澳门特别行政区及台湾地区的文艺表演团体、个人参加的营业性演出审批', 'name': '上海·市文化局', 'value': '5'},
        ],
        totalNum: 0
      }
    },
    created() {
      this._getList(true);
    },
    methods: {
      _getList(showLoading) {

      },
      handlerPageChange(val) {
        this.pageNum = val
        this._getList(true)
      },
      handlerClickArea(item) {
        this.areaActive = item.value
      },
      handlerClickDepartment(item) {
        this.departmentActive = item.value
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
      margin-top: 12px;
    }
    .department-enter-active, .department-leave-active {
      transition: all 0.3s ease
    }

    .department-enter, .department-leave-active {
      height: 0
    }
  }
</style>
