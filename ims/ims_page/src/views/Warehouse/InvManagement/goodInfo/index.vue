<!-- 货物清单 -->
<template>
  <div>
    <div class="text">货物清单</div>
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
              type="text"
              size="small"
              @click.native.prevent="$router.push('/good/'+tableData[scope.$index].g_id)"
            >查看</el-button>
            <el-button
              @click.native.prevent="deleteWare(tableData[scope.$index].g_id)"
              type="text"
              size="small"
            >移除</el-button>
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
      //输入框
      searchdata: "",
      //测试数据
      id: 1,
      //表单数据
      width: 0,
      //表格数据
      tableData: []
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
        this.tableData = res;
        console.log(res);
      });
    },
    setAll() {
      this.width = this.$refs.content.clientWidth / 7;
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