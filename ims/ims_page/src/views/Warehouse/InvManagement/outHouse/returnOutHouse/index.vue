<!-- 换货出库 -->
<template>
  <div>
    <div class="tui">
      <h1>换货出库</h1>
      <hr />
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="r_id" label="订单编号" width="300"></el-table-column>
        <el-table-column prop="g_name" label="货物名称" width="300"></el-table-column>
        <el-table-column prop="g_id" label="货物编号" width="300"></el-table-column>
        <el-table-column prop="r_type" label="类型" width="300"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click.native.prevent="changeInfo(scope.$index, tableData)"
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
    <!-- <div class="huan">
      <h1>换货</h1>
      <hr>
    </div>-->
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      tableData: [
        {
          g_id: "",
          g_name: "",
          r_id: "",
          r_type: ""
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
    //退换货处理
    changeInfo(index, info) {
      console.log(info[index]);
      let infor = info[index];
        this.$store.dispatch("order/returnGoods", infor).then(data => {
          console.log(data);
          if (data) {
            alert("出库成功！");
            this.getReturnInfo();
          } else {
            alert("出库失败！");
          }
        });
      
        
      // this.$store
      //   .dispatch("order/checkOrder", info[index].o_id)
      //   .then(data => {
      //     console.log(data);
      //     this.getReturnInfo()
      //   });

    },
    //查询所有未审核订单
    getReturnInfo() {
      this.$store.dispatch("order/getReturnInfo", data => {
        var result = data.data;
        var dataresult = [];
        result.map((item)=>{
          console.log(item);
          
          if(item.r_type == "处理中"){
            dataresult.push(item);
          }
        })
        this.tableData = dataresult;
        this.currentPage.total = this.tableData.length;
        var start =
          (this.currentPage.currentpage - 1) * this.currentPage.pagesize;
        var end = start + this.currentPage.pagesize;
        this.tableData = dataresult.slice(start, end);
      });
    },
    //分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage.pagesize = val;
      this.getReturnInfo();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage.currentpage = val;
      this.getReturnInfo();
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getReturnInfo();
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