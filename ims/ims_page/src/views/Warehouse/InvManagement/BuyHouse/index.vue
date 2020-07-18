<!-- 采购管理 -->
<template>
  <div>
    <div class="text">采购管理</div>
   <!-- <div class="search">
      <input type="text" placeholder="🔍请输入搜索内容" v-model="searchdata" @keyup="searchData" />
    </div> -->
    <div class="content" ref="content">
      <el-table :data="tableData" border style="width: 100%" class="tableData">
        <el-table-column fixed prop="g_id" label="货物编号" width="width"></el-table-column>
        <el-table-column prop="g_name" label="货物名称" width="width"></el-table-column>
        <el-table-column prop="g_type" label="货物类别" width="width"></el-table-column>
        <el-table-column prop="g_pice" label="货物单价" width="width"></el-table-column>
        <el-table-column prop="g_much" label="货物数量" width="width"></el-table-column>
        <el-table-column prop="g_Mdate" label="保质期" width="width"></el-table-column>
        <el-table-column fixed="right" label="操作" width="width">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="buyHouse(scope.$index,tableData)"
              type="text"
              size="small"
            >采购</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="updata">
      <el-dialog title="采购" :visible.sync="dialogFormVisible">
        <el-form :model="formInline">
          <el-form-item label="购入数量" :label-width="formLabelWidth">
            <el-input v-model="formInline.g_much" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="buyInfo">购 入</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      //弹窗
       dialogFormVisible: false,
      formLabelWidth: "120px",
      //采购
      formInline:{
        g_much:'',
        g_id:'',
      },
      //输入框
      searchdata: "",
      //测试数据
      id: 1,
      //表单数据
      width: 0,
      //表格数据
      tableData: [],
      //数量
      much:0
    };
  },
  computed: {},
  watch: {},
  methods: {
    //模糊搜索
    searchData() {},
    deleteWare(id) {
      this.$store.dispatch("goods/Delete", id).then(res => {
        this.getALL();
      });
    },
    getALL() {
      console.log(this.$store);

      this.$store.dispatch("goods/getInfo").then(res => {
        var data = [];
        for(var item in res){
          if(res[item].g_much==0){
            data.push(res[item]);
          }
        }
        this.tableData = data;
        // console.log(res);
      });
    },
    setAll() {
      this.width = this.$refs.content.clientWidth / 7;
    },
    buyHouse(index,info){
      
      this.dialogFormVisible = true;
      console.log(info[index].g_id);
      this.formInline.g_id = info[index].g_id;
      console.log(info[index].g_much);
      
      this.much = info[index].g_much;
      console.log(typeof(this.much));
      
    },
    buyInfo(){
      console.log(this.formInline.g_much);
      this.dialogFormVisible = false
      this.formInline.g_much = Number(this.formInline.g_much) + this.much
      this.$store.dispatch("goods/buyHouse",this.formInline).then(data=>{
        console.log(data.data.affectedRows);
        if(data.data.affectedRows == 1){
          alert("采购成功！")
          this.getALL();
        }
        else{
          alert("采购失败！")
        } 
      })
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getALL();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.setAll();
  },
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
.nav {
  margin-top: 20px;
}
.text {
  float: left;
  margin: 20px 0px 20px 50px;
  height: 30px;
  line-height: 30px;
  font-size: 20px;
}
.search {
  float: right;
  margin: 20px 100px 20px 0px;
  input {
    width: 300px;
    height: 30px;
    padding-left: 20px;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    color: #606266;
  }
  .tableData::-webkit-scrollbar {
    display: none;
  }
}
</style>