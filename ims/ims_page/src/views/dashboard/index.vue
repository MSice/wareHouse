<template>
  <div class="dashboard-container">
    <div class="title-box">
      <li class="title-text">物流仓储</li>
      <li class="title-else title-text">管理系统</li>
    </div>
    <div class="content-name">
      <li>制作成员:</li>
      <li>组长:黄文松</li>
      <li>成员:苏琪、赵子权、李嘉申</li>
    </div>
    <div class="clock"></div>
  </div>
</template>

<script>
export default {
  computed: {}
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    position: absolute;
    top: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    perspective: 100%;
    background-image: url(../../assets/bg_img/meum.png);
    background-position: center;
    background-size: cover;
  }
}
.title {
  &-box {
    margin: 20px 50px;
    width: 600px;
    height: 200px;
    // background-color: rgba(0, 247, 255, 0.267);
    position: relative;
    li {
      float: left;
    }
  }
  &-text {
    font-family: "STXingkai";
    font-size: 60px;
    letter-spacing: 15px;
  }
  &-else {
    margin-top: 20px;
    font-size: 40px;
    letter-spacing: 9px;
  }
}
.content-name {
  position: absolute;
  left: 830px;
  top: 405px;
  font-size: 25px;
  line-height: 30px;
  font-family: "STXinwei";
  li {
    margin-bottom: 10px;
  }
}
</style>
