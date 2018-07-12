export const tablePage = {
  data() {
    return {
      loading: false,
      numPerPage: 50,
      totalNum: 0,
      pageNum: 1,
      keyword: '',
      listData: []
    }
  },
  computed: {},
  methods: {
    handlerPageChange(val) {
      this.pageNum = val
      this._getList(true)
    },
    handleSubmitCheck() {
      this._getList(true)
    },
    _changeLoading() {
      setTimeout(() => {
        this.loading = false
      }, 300)
    }
  }
}

export const modalLoading = {
  data() {
    return {
      modalLoading: true
    }
  },
  methods: {
    changeLoading() {
      this.modalLoading = false
      this.$nextTick(() => {
        this.modalLoading = true
      });
    },
  }
}

