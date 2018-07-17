<template>
  <div class="sksq-wrapper">
    <h4 class="rainwater-title">水库水情</h4>
    <Table :columns="columns" :data="list"></Table>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        columns: [
          {
            title: '名称',
            key: 'name'
          },
          {
            title: '蓄水量（10^4 m^3）',
            children: [
              {
                title: '大型',
                key: 'age',
              },
              {
                title: '中型',
                key: 'age',
              },
              {
                title: '合计',
                key: 'age',
              },
            ]
          },
          {
            title: '超限座数',
            key: 'address'
          }
        ],
        list: []
      }
    }
  }
</script>
