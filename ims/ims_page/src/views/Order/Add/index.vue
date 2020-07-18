<!-- 仓库管理 -->
<template>
  <div class="box">
    <div class="insert">
      <h1>添加新订单</h1>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="订单名">
          <el-input v-model="formInline.o_name" placeholder="订单名"></el-input>
        </el-form-item>
        <el-form-item label="订单号">
          <el-input v-model="formInline.o_id" placeholder="订单号"></el-input>
        </el-form-item>
        <el-form-item label="发送人ID">
          <el-input v-model="formInline.o_SInfo" placeholder="发送人ID"></el-input>
        </el-form-item>
        <el-form-item label="接收人信息">
          <el-input v-model="formInline.o_CInfo" placeholder="接收人信息"></el-input>
        </el-form-item>
         <el-form-item label="货物Id">
          <el-input v-model="formInline.o_GInfo" placeholder="货物Id"></el-input>
        </el-form-item>
         <el-form-item label="备注">
          <el-input v-model="formInline.o_Remarks" placeholder="备注"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <hr/>
    <!-- <div class="search">
      <input type="text" placeholder="🔍请输入搜索内容" v-model="searchdata" @keyup="searchData" />
    </div> -->
    <div class="content">
      <h1>全部货物信息</h1>
      <el-table :data="goodData" border style="width: 100%">
        <el-table-column prop="g_Tphone" label="提供者电话" width="200"></el-table-column>
        <el-table-column prop="g_id" label="货物ID" width="200"></el-table-column>
        <el-table-column prop="g_Odate" label="出库时间" width="200"></el-table-column>
        <el-table-column prop="g_Cdate" label="入库时间" width="200"></el-table-column>
        <el-table-column prop="g_name" label="货物名称" width="200"></el-table-column>
        <el-table-column prop="g_much" label="货物数量" width="200"></el-table-column>
        <el-table-column prop="g_remarks" label="货物详情" width="200"></el-table-column>
        <el-table-column prop="g_warehouse" label="货物所在仓库" width="200"></el-table-column>
        <el-table-column prop="g_Mdate" label="保质期" width="200"></el-table-column>
      </el-table>
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
      //货物列表
      goodData:[{
        g_Tphone:"",
        g_id:"",
        g_Odate:"",
        g_Cdate:"",
        g_name:"",
        g_much:"",
        g_remarks:"",
        g_warehouse:"",
        g_Mdate:""
      }],
      // //输入框
      // searchdata: "",
      //添加数据
      formInline: {
        o_name: "",
        o_id: "",
        o_SInfo: "",
        o_CInfo: "",
        o_GInfo:"",
        o_Remarks: ""
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      // //分页数据
      currentPage: {
          currentpage:1,
          pagesizes:[5,6],
          pagesize:5,
          total:100,
      }
    };
  },
  computed: {
  },
  watch: {},
  methods: {
    //查询所有货物信息
    getGoodsInfo() {
      this.$store.dispatch("goods/getInfo").then(data => {
      console.log(data);
      this.goodData = data;
      this.currentPage.total = this.goodData.length;
      var start = (this.currentPage.currentpage-1)*this.currentPage.pagesize;
      var end = start+this.currentPage.pagesize;
      this.goodData = data.slice(start,end);
    }) ;
    },
    //添加订单
    onSubmit() {
      // console.log(this.formInline.remarks);
      if (
        this.formInline.o_Remarks == "" ||
        this.formInline.o_id == "" ||
        this.formInline.o_SInfo == "" ||
        this.formInline.o_CInfo == "" ||
        this.formInline.o_name == "" ||
        this.formInline.o_GInfo == "" 
      ) {
        alert("提交内容不能为空");
      } else {
        this.$store
          .dispatch("order/insertOrder", this.formInline)
          .then(data => {
            console.log(data.data.affectedRows);
            if (data.data.affectedRows == 1) {
              this.getGoodsInfo()
              alert("添加成功！");
            } else {
              alert("添加失败！");
            }
          });
      }
    },
    // //模糊搜索
    // searchData() {
    //   let search = this.searchdata;
    //   let result = [];
    //   if (search) {
    //     this.tableData.filter(item => {
    //       // console.log(item);
    //       if (
    //         item.w_id.toString().indexOf(search) !== -1 ||
    //         item.w_aid.toString().indexOf(search) !== -1 ||
    //         item.w_content.toString().indexOf(search) !== -1 ||
    //         item.w_remarks.toString().indexOf(search) !== -1 ||
    //         item.w_snumber.toString().indexOf(search) !== -1
    //       ) {
    //         result.push(item);
    //       }
    //     });
    //     this.tableData = result;
    //   } else {
    //     this.getInfo()
    //   }
    // },
    //分页
     handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.currentPage.pagesize = val;
        this.getGoodsInfo()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage.currentpage = val;
        this.getGoodsInfo()
      }
  },

  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getGoodsInfo();
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