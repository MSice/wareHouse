<!-- 入库处理 -->
<template>
  <div>
    <div class="good-nav good">
      <li class="good-nav-ID">货物编号</li>
      <li class="good-nav-name">货物名称</li>
      <li class="good-nav-type">货物类别</li>
      <li class="good-nav-pice">货物单价</li>
      <li class="good-nav-much">货物数量</li>
      <li class="good-nav-allPice">货物总价</li>
      <li class="good-nav-btn">
        <button>一键入库</button>
      </li>
    </div>
    <div class="good-line good">
      <li class="good-line-ID">la-10001</li>
      <li class="good-line-name">小辣棒</li>
      <li class="good-line-type">辣条</li>
      <li class="good-line-pice">10元</li>
      <li class="good-line-much">10</li>
      <li class="good-line-allPice">100元</li>
      <li class="good-line-btn">
        <button @click="$router.push('/good/123456')">详情</button>
      </li>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
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
.good {
  display: flex;
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding: 0 5%;
  // background-color: red;
  li {
    flex-grow: 1;
    width: 6%;
  }
  li:nth-child(1) {
    width: 0;
    flex-grow: 1.5;
  }
  li:last-child {
    width: 5%;
  }
  button {
    border: 1px solid #000;
    background-color: #fff;
  }
  button:active {
    background-color: rgb(170, 170, 170);
  }
}
</style>