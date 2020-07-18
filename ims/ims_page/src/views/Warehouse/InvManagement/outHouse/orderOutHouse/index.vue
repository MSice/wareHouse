<!-- 出库管理-->
<template>
  <div>
    <div class="search">
      <!-- <input type="text" placeholder="🔍请输入搜索内容" v-model="searchdata" @keyup="searchData" /> -->
    </div>
    <div class="content">
      <H1>订单出库</H1>
      <hr />
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="o_id" label="订单编号" width="200"></el-table-column>
        <el-table-column prop="o_name" label="订单名称" width="200"></el-table-column>
        <el-table-column prop="o_SInfo" label="发货人编号" width="200"></el-table-column>
        <el-table-column prop="o_CInfo" label="收货人" width="200"></el-table-column>
        <el-table-column prop="o_GInfo" label="货物信息" width="300"></el-table-column>
        <el-table-column prop="o_Remarks" label="备注" width="150"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click.native.prevent="outOrder(scope.$index, tableData)"
              size="small"
            >出库</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="footer">
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage.currentpage"
            :page-sizes="currentPage.pagesizes"
            :page-size="currentPage.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="currentPage.total"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      tableData: [
        {
          o_id: "",
          o_name: "",
          o_SInfo: "",
          o_CInfo: "",
          o_GInfo: "",
          o_Remarks: ""
        }
      ],
      //分页数据
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      currentPage: {
        currentpage: 1,
        pagesizes: [5, 6],
        pagesize: 5,
        total: 100
      }
    };
  },
  computed: {},
  watch: {},
  methods: {
    //订单审核
    outOrder(index, info) {
      // console.log(info[index].o_id);
      this.$store.dispatch("order/deleteOrder", info[index].o_id).then(data => {
        console.log(data);
        if (data) {
          alert("出库成功！");
          this.getInfo();
        } else {
          alert("出库失败！");
        }
      });
    },
    //查询所有未审核订单
    getInfo() {
      this.$store.dispatch("order/selectCheckAll1", data => {
        // console.log(data.data);
        this.tableData = data.data;
        this.currentPage.total = this.tableData.length;
        var start =
          (this.currentPage.currentpage - 1) * this.currentPage.pagesize;
        var end = start + this.currentPage.pagesize;
        this.tableData = data.data.slice(start, end);
      });
    },
    //分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage.pagesize = val;
      this.getInfo();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage.currentpage = val;
      this.getInfo();
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getInfo();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
.footer {
  position: fixed;
  bottom: 10px;
  width: 100%;
  .block {
    display: flex;
    justify-content: center;
  }
}
</style>