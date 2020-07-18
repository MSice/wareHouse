<!-- 仓库管理 -->
<template>
  <div class="box">
    <h1>订单处理</h1>
    <hr>
    <div class="search">
      <input type="text" placeholder="🔍请输入搜索内容" v-model="searchdata" @keyup="searchData" />
    </div>
    <div class="content">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="o_id" label="订单编号" width="200"></el-table-column>
        <el-table-column prop="o_name" label="订单名称" width="200"></el-table-column>
        <el-table-column prop="o_SInfo" label="发货人" width="200"></el-table-column>
        <el-table-column prop="o_CInfo" label="收货人" width="200"></el-table-column>
        <el-table-column prop="o_GInfo" label="货物信息" width="200"></el-table-column>
        <el-table-column prop="o_Remarks" label="订单详情" width="300"></el-table-column>
        <el-table-column prop="o_Type" label="是否处理" width="200"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click.native.prevent="updataOrder(scope.$index, tableData)"
              size="small"
            >修改</el-button>
            <el-button
              @click.native.prevent="deleteOrder(scope.$index, tableData)"
              type="text"
              size="small"
            >移除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="updata">
      <el-dialog title="信息修改" :visible.sync="dialogFormVisible">
        <el-form :model="formInline">
          <el-form-item label="订单名" :label-width="formLabelWidth">
            <el-input v-model="formInline.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="发送人" :label-width="formLabelWidth">
            <el-input v-model="formInline.SInfo" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="接收人" :label-width="formLabelWidth">
            <el-input v-model="formInline.CInfo" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="货物信息" :label-width="formLabelWidth">
            <el-input v-model="formInline.GInfo" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="formInline.remarks" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateinfo">修 改</el-button>
        </div>
      </el-dialog>
    </div>
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
</template>

<script>
import { mapGetters } from "vuex";
export default {
  components: {},
  data() {
    return {
      //输入框
      searchdata: "",
      //修改数据
      formInline: {
        o_id: "",
        name: "",
        SInfo: "",
        CInfo: "",
        GInfo:"",
        remarks: ""
      },
      
      //表格数据
      tableData: [
        {
          o_name: "2016-05-02",
          o_id: "王小虎",
          o_SInfo: "上海",
          o_CInfo: "普陀区",
          o_GInfo: "上海市普陀区金沙江路 1518 弄",
          o_Remarks: "",
          o_Type:""
        }
      ],
      //分页数据
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      currentPage: {
          currentpage:1,
          pagesizes:[5,6],
          pagesize:5,
          total:100,
      }
    };
  },
  computed: {
    ...mapGetters(["o_id", "o_name", "o_SInfo", "o_CInfo", "o_GInfo","o_Remarks","o_Type"])
  },
  watch: {},
  methods: {
    //查询所有订单信息
    getInfo() {
      this.$store.dispatch("order/selectAll", data => {
      // console.log(data.data);
      this.tableData = data.data
      this.currentPage.total = this.tableData.length
      var start = (this.currentPage.currentpage-1)*this.currentPage.pagesize;
      var end = start+this.currentPage.pagesize;
      this.tableData = data.data.slice(start,end);
    });
    },
    //查看详情
    handleClick() {},
    //删除仓库
    deleteOrder(index, info) {
      console.log(index, info[index].o_id);
      let o_id = info[index].o_id;
      this.$store.dispatch("order/deleteOrder", o_id).then(data => {
        console.log(data);
        if (data) {
          alert("删除成功！");
         this.getInfo()
        } else {
          alert("删除失败！");
        }
      });
    },
    //模糊搜索
    searchData() {
      let search = this.searchdata;
      let result = [];
      if (search) {
        this.tableData.filter(item => {
          // console.log(item);
          if (
            item.o_id.toString().indexOf(search) !== -1 ||
            item.o_name.toString().indexOf(search) !== -1 ||
            item.o_SInfo.toString().indexOf(search) !== -1 ||
            item.o_CInfo.toString().indexOf(search) !== -1 ||
            item.o_GInfo.toString().indexOf(search) !== -1 ||
            item.o_Remarks.toString().indexOf(search) !== -1 ||
            item.o_Type.toString().indexOf(search) !== -1
          ) {
            result.push(item);
          }
        });
        this.tableData = result;
      } else {
        this.getInfo()
      }
    },
    //修改数据
    updataOrder(index, info) {
      this.dialogFormVisible = true;
      // console.log(info[index]);
      this.formInline.id = info[index].o_id;
      this.formInline.name = info[index].o_name;
      this.formInline.CInfo = info[index].o_CInfo;
      this.formInline.GInfo = info[index].o_GInfo;
      this.formInline.remarks = info[index].o_Remarks;
      this.formInline.SInfo = info[index].o_SInfo;
      // console.log(this.formInline);
    },
    //详细修改
    updateinfo() {
      this.dialogFormVisible = false;
      this.$store
        .dispatch("order/updateOrder", this.formInline)
        .then(data => {
          console.log(data);
          this.getInfo()
        });
    },
    //分页
     handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.currentPage.pagesize = val;
        this.getInfo()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage.currentpage = val;
        this.getInfo()
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
.box{
  position: relative;
}
.insert {
  margin-top: 20px;
}
.search {
  float: right;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-right: 100px;
  input {
    width: 300px;
    height: 50px;
    padding-left: 20px;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    color: #606266;
  }
  
}
.footer{
    position: fixed;
    bottom: 10px;
    width: 100%;
    .block{
    display: flex;
    justify-content: center;
    }
  }
</style>