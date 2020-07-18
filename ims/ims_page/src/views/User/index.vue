<!-- 用户管理 -->
<template>
  <div class="box">
    <!-- <div @click="getInfo">仓库管理</div>
    <div>{{w_id}}--{{w_aid}}--{{w_content}}--{{w_remarks}}--{{w_snumber}}</div>-->
    <h1>用户信息管理</h1>
    <hr>
    <div class="search">
      <input type="text" placeholder="🔍请输入搜索内容" v-model="searchdata" @keyup="searchData" />
    </div>
    <div class="content">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="u_id" label="用户账号" width="200"></el-table-column>
        <el-table-column prop="u_name" label="用户名" width="200"></el-table-column>
        <el-table-column prop="u_sex" label="用户性别" width="200"></el-table-column>
        <el-table-column prop="u_address" label="用户地址" width="200"></el-table-column>
        <el-table-column prop="u_phone" label="用户电话" width="500"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click.native.prevent="updataWare(scope.$index, tableData)"
              size="small"
            >修改</el-button>
            <el-button
              @click.native.prevent="deleteWare(scope.$index, tableData)"
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
          <el-form-item label="管理员ID" :label-width="formLabelWidth">
            <el-input v-model="formInline.aid" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="仓库容量" :label-width="formLabelWidth">
            <el-input v-model="formInline.content" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="剩余空间" :label-width="formLabelWidth">
            <el-input v-model="formInline.snumber" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="仓库详情" :label-width="formLabelWidth">
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
      //添加数据
      formInline1: {
        aid: "",
        id: "",
        content: "",
        snumber: "",
        remarks: ""
      },
      //修改数据
      formInline: {
        aid: "",
        id: "",
        content: "",
        snumber: "",
        remarks: ""
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      //表格数据
      tableData: [
        {
          w_id: "2016-05-02",
          w_aid: "王小虎",
          w_content: "上海",
          w_snumber: "普陀区",
          w_remarks: "上海市普陀区金沙江路 1518 弄"
        }
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
    ...mapGetters(["w_id", "w_aid", "w_content", "w_remarks", "w_snumber"])
  },
  watch: {},
  methods: {
    //查询所有仓库信息
    getInfo() {
      this.$store.dispatch("warehouse/getUser", data => {
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
      console.log(this.formInline1.remarks);
      if (
        this.formInline1.remarks == "" ||
        this.formInline1.aid == "" ||
        this.formInline1.content == "" ||
        this.formInline1.snumber == ""
      ) {
        alert("提交内容不能为空");
      } else {
        this.$store
          .dispatch("warehouse/insertWare", this.formInline1)
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
    deleteWare(index, info) {
      console.log(index, info[index].w_id);
      let w_id = info[index].w_id;
      this.$store.dispatch("warehouse/deleteWare", w_id).then(data => {
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
            item.w_id.toString().indexOf(search) !== -1 ||
            item.w_aid.toString().indexOf(search) !== -1 ||
            item.w_content.toString().indexOf(search) !== -1 ||
            item.w_remarks.toString().indexOf(search) !== -1 ||
            item.w_snumber.toString().indexOf(search) !== -1
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
    updataWare(index, info) {
      this.dialogFormVisible = true;
      // console.log(info[index]);
      this.formInline.id = info[index].w_id;
      this.formInline.aid = info[index].w_aid;
      this.formInline.content = info[index].w_content;
      this.formInline.remarks = info[index].w_remarks;
      this.formInline.snumber = info[index].w_snumber;
      console.log(this.formInline);
    },
    //详细修改
    updateinfo() {
      this.dialogFormVisible = false;
      this.$store
        .dispatch("warehouse/updateWare", this.formInline)
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