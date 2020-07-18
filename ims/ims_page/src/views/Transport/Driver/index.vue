<!-- 仓库管理 -->
<template>
  <div class="box">
    <!-- <div @click="getInfo">仓库管理</div>
    <div>{{w_id}}--{{w_aid}}--{{w_content}}--{{w_remarks}}--{{w_snumber}}</div>-->
    <div class="insert">
      <h1>添加新司机</h1>
      <el-form :inline="true" :model="formInline1" class="demo-form-inline">
        
        <el-form-item label="司机姓名">
          <el-input v-model="formInline1.name" placeholder="司机姓名"></el-input>
        </el-form-item>
        <el-form-item label="司机电话">
          <el-input v-model="formInline1.phone" placeholder="司机电话"></el-input>
        </el-form-item>
       
        <el-form-item>
          <el-button type="primary" @click="onSubmit">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <hr/>
    <div class="search">
      <input type="text" placeholder="🔍请输入搜索内容" v-model="searchdata" @keyup="searchData" />
    </div>
    <div class="content">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="d_id" label="司机编号" width="300"></el-table-column>
        <el-table-column prop="d_name" label="司机姓名" width="300"></el-table-column>
        <el-table-column prop="d_phone" label="司机电话" width="300"></el-table-column>
        <el-table-column prop="d_state" label="司机状态" width="300"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click.native.prevent="updataDriver(scope.$index, tableData)"
              size="small"
            >修改</el-button>
            <el-button
              @click.native.prevent="deleteDriver(scope.$index, tableData)"
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
          <el-form-item label="司机姓名" :label-width="formLabelWidth">
            <el-input v-model="formInline.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="司机电话" :label-width="formLabelWidth">
            <el-input v-model="formInline.phone" autocomplete="off"></el-input>
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
      //添加数据
      formInline1: {
        did: "",
        name: "",
        phone: "",
        state: "",
      },
      //修改数据
      formInline: {
        name: "",
        phone: "",
        id: "",
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      //表格数据
      tableData: [ 
      ],
      //分页数据

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
    //查询所有仓库信息
    getInfo() {
      this.$store.dispatch("driver/selectAll", data => {
      console.log(data.data);
      this.tableData = data.data
      this.currentPage.total = this.tableData.length
      var start = (this.currentPage.currentpage-1)*this.currentPage.pagesize;
      var end = start+this.currentPage.pagesize;
      this.tableData = data.data.slice(start,end);
    });
    },
    //添加仓库
    onSubmit() {
      
      if (
        this.formInline1.name == "" ||
        this.formInline1.phone == "" 
      ) {
        alert("提交内容不能为空");
      } else {
        this.$store
          .dispatch("driver/insertDriver", this.formInline1)
          .then(data => {
            console.log(data.data.affectedRows);
            if (data.data.affectedRows == 1) {
              this.getInfo()
              alert("添加成功！");
            } else {
              alert("添加失败！");
            }
          });
      }
    },
    //查看详情
    handleClick() {},
    //删除仓库
    deleteDriver(index, info) {
      console.log(index, info[index].w_id);
      let d_id = info[index].d_id;
      this.$store.dispatch("driver/deleteDriver", d_id).then(data => {
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
            item.d_id.toString().indexOf(search) !== -1 ||
            item.d_name.toString().indexOf(search) !== -1 ||
            item.d_phone.toString().indexOf(search) !== -1 ||
            item.d_state.toString().indexOf(search) !== -1
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
    updataDriver(index, info) {
      this.dialogFormVisible = true;
      // console.log(info[index]);
      this.formInline.id = info[index].d_id;
      this.formInline.name = info[index].d_name;
      this.formInline.phone = info[index].d_phone;
      console.log(this.formInline);
    },
    //详细修改
    updateinfo() {
      this.dialogFormVisible = false;
      this.$store
        .dispatch("driver/updateDriver", this.formInline)
        .then(data => {
          console.log(data);
          if(data){
            alert("修改成功！")
          }
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