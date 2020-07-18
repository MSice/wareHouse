<!-- 入库管理 -->
<template>
  <div>
    <div class="text">入库管理</div>
    <div class="search">
      <button @click="inHouse">一键入库</button>
    </div>
    <div class="insert">
      <el-dialog title="信息修改" :visible.sync="dialogFormVisible">
        <el-form :model="formInline">
          <el-form-item label="货物名称" :label-width="formLabelWidth">
            <el-input v-model="formInline.g_name" autocomplete="off" placeholder="货物名称"></el-input>
          </el-form-item>
          <el-form-item label="货物类别" :label-width="formLabelWidth">
            <el-input v-model="formInline.g_type" autocomplete="off" placeholder="货物类别"></el-input>
          </el-form-item>
          <el-form-item label="货物单价" :label-width="formLabelWidth">
            <el-input v-model="formInline.g_pice" autocomplete="off" placeholder="货物单价"></el-input>
          </el-form-item>
          <el-form-item label="货物数量" :label-width="formLabelWidth">
            <el-input v-model="formInline.g_much" autocomplete="off" placeholder="货物数量"></el-input>
          </el-form-item>
          <el-form-item label="保质期" :label-width="formLabelWidth">
            <el-input v-model="formInline.g_Mdate" autocomplete="off" placeholder="保质期"></el-input>
          </el-form-item>
          <el-form-item label="所在仓库" :label-width="formLabelWidth">
            <el-input v-model="formInline.g_warehouse" autocomplete="off" placeholder="所在仓库"></el-input>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="formInline.g_remarks" autocomplete="off" placeholder="备注"></el-input>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth">
            <el-input v-model="formInline.g_address" autocomplete="off" placeholder="地址"></el-input>
          </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth">
            <el-input v-model="formInline.g_Tphone" autocomplete="off" placeholder="电话"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="insertInfo">入 库</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="content" ref="content">
      <el-table :data="tableData" border style="width: 100%" class="tableData">
        <el-table-column fixed prop="g_id" label="货物编号" width="width"></el-table-column>
        <el-table-column prop="g_name" label="货物名称" width="width"></el-table-column>
        <el-table-column prop="g_type" label="货物类别" width="width"></el-table-column>
        <el-table-column prop="g_pice" label="货物单价" width="width"></el-table-column>
        <el-table-column prop="g_much" label="货物数量" width="width"></el-table-column>
        <el-table-column fixed="right" label="操作" width="width">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click.native.prevent="lookup(scope.$index,tableData)"
            >查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      formInline: {
        g_name: "",
        g_type: "",
        g_pice: "",
        g_much: "",
        g_Mdate: "",
        g_warehouse: "",
        g_remarks: "",
        g_address: "",
        g_Tphone: ""
      },
      //输入框
      searchdata: "",
      //测试数据
      id: 1,
      //表单数据
      width: 0,
      //表格数据
      money:0,
      tableData: [
        {
          g_id: "la-10001",
          g_name: "小辣棒",
          g_type: "辣条",
          g_picec: "10",
          g_much: "10",
          g_monery: "100"
        }
      ],
      //插入弹窗
      dialogFormVisible: false,
      formLabelWidth: "120px"
    };
  },
  computed: {
   
  },
  watch: {},
  methods: {
    getGoodsInfo() {
      this.$store.dispatch("goods/getInfo").then(data => {
      console.log(data);
      this.tableData = data;
      
      // this.currentPage.total = this.goodData.length;
      // var start = (this.currentPage.currentpage-1)*this.currentPage.pagesize;
      // var end = start+this.currentPage.pagesize;
      // this.goodData = data.slice(start,end);
    }) ;
    },
    lookup(index,info){
      this.$router.push(`/good/${info[index].g_id}`)
      console.log(index,info);
      
    },
    //模糊搜索
    searchData() {},
    deleteWare() {},
    setAll() {
      this.width = this.$refs.content.clientWidth / 7;
    },
    inHouse() {
      this.dialogFormVisible = true;
    },
    insertInfo() {
      dialogFormVisible = false
      // console.log(this.formInline);
      this.$store.dispatch("goods/insertHouse", this.formInline).then(data => {
        console.log(data.data.affectedRows);
        if (data.data.affectedRows == 1) {
          this.getGoodsInfo();
          alert("添加成功！");
        } else {
          alert("添加失败！");
        }
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getGoodsInfo();
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
  button {
    color: #409eff;
    width: 80px;
    border-radius: 5px;
    height: 30px;
    border: 1px solid rgba(0, 102, 255, 0.719);
    background-color: rgba(44, 179, 241, 0);
  }
  button:active {
    background-color: rgba(204, 204, 204, 0.575);
  }
}
</style>