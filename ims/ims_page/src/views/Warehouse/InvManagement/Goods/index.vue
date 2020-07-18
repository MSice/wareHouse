<!-- 货物详细信息 -->
<template>
  <div class="allBox">
    <div class="img">
      <img :src="data.g_imgUrl" :alt="data.g_name" :title="data.g_name" />
    </div>
    <div class="maintext">
      <div class="title">{{data.g_name}}详情</div>
      <div class="content">
        <div class="line" data-type="名字-ID*">
          <li class="name">
            货物名:
            <span>{{data.g_name}}</span>
          </li>
          <li class="othername name">
            货物编号:
            <span>{{data.g_id}}</span>
          </li>
        </div>
        <div class="line" data-type="上次入库时间-日销量">
          <li class="data text">
            入库时间:
            <input
              type="date"
              :value="setdata(data.g_data)" 
              readonly="readonly"
              :v-model="data.g_Cdate"
              :class="['chenge',chenge?'active':'']"
            />
          </li>
          <li class="sales text">
            日销量:
            <input
              type="text"

              readonly="readonly"
              :class="['chenge',chenge?'active':'']"
              v-model="daysell"
            />
          </li>
        </div>
        <div class="line" data-type="货物单价-订购数量">
          <li class="name">
            货物单价:
            <input
              type="text"

              readonly="readonly"
              :class="['chenge',chenge?'active':'']"
              v-model="data.g_pice"
            />
          </li>
          <li class="othername name">
            订购数量:
            <input
              type="text"
              readonly="readonly"
              :class="['chenge',chenge?'active':'']"
              v-model="data.g_much"
            />
          </li>
        </div>
        <div class="line" data-type="仓库地址-货物类别">
          <li class="address">
            仓库地址:
            <input
              type="text"
              readonly="readonly"
              :class="['chenge',chenge?'active':'']"
              v-model="data.g_address"
            />
          </li>
          <li class="type">
            货物类别:
            <input
              type="text"
              readonly="readonly"
              :class="['chenge',chenge?'active':'']"
              v-model="data.g_much"
            />
          </li>
        </div>
        <div class="line" data-type="供货商姓名-供货商联系方式">
          <li class="Gphone">
            供货商联系方式:
            <input
              type="text"
              
              readonly="readonly"
              :class="['chenge',chenge?'active':'']"
              v-model="data.g_Tphone"
            />
          </li>
          <li class="Gname">
            供货商姓名:
            <span>刘宏宇</span>
          </li>
        </div>
        <div class="line" data-type="货物产地*">
          <span>货物产地:</span>
          <li class="address-h">{{data.g_address}}</li>
        </div>
        <div class="line" data-type="货物备注">
          <span>货物备注:</span>
          <li>
            <textarea
              name="a"
              style="resize: none;"
              readonly="readonly"
              :class="['chenge','Textchenge',chenge?'active':'']"
              v-model="data.g_remarks"
            ></textarea>
          </li>
        </div>
      </div>
      <div class="btn">
        <button @click="setChenge()" ref="chenge">修改</button>
        <button @click="$router.go(-1)">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      
      chenge: false,
      data: {
        g_data:"",
      },
      daysell: 0,
      data1: {
        g_Cdate: ""
      }
    };
  },
  computed: {
    good_id: function() {
      this.getALL(this.$route.params.id);
      return this.$route.params.id;
    }
  },
  watch: {
    $route: {
      params: function(val, oldVal) {
        // console.log(val.name);
        console.log(val.id, "22222");
      },
      // 深度观察监听
      deep: true
    }
  },
  methods: {
    setChenge() {
      var chenge = document.getElementsByClassName("chenge");
      let relDate = {};
      if(this.$refs.chenge.innerText == "保存"){
        
        for( var item in this.data){
          if(item == 'g_Cdate' || item == 'g_Odate' ||item =='g_imgUrl'){

          }else{
            relDate[item] = this.data[item];
          }
        }
        // console.log(relDate);
        
        this.$store.dispatch("goods/update",relDate).then(data=>{
          console.log(data);
          
        })
      }
      for (var i = 0; i < chenge.length; i++) {
        if (chenge[i]) {
          if (!this.chenge) {
            chenge[i].removeAttribute("readonly");
            chenge[i].style.border = "1px solid rgba(0, 128, 255, 0.64)";
            this.$refs.chenge.innerText = "保存";
          } else {
            chenge[i].setAttribute("readonly", "readonly");
            chenge[i].style.border = "0";
            this.$refs.chenge.innerText = "修改";
          }
        }
      }
      
      
      this.chenge = !this.chenge;
      console.log(this.$refs);
    },
    getALL(id) {
      console.log(id);
      this.$store.dispatch("goods/getInfo", id).then(res => {
        this.data = JSON.parse(JSON.stringify(res[0]));
        this.data.g_data = this.data.g_Cdate;
        // this.data.g_Cdate.match(/\d{4}-\d{2}-\d{2}/)[0].splice('-');
        console.log(this.data.g_Cdate.toString().match(/\d{4}-\d{2}-\d{2}/)[0].split('-'));
      });
    },
    setdata(dataday) {
      console.log(dataday);
      
      console.log(dataday.toString().match(/\d{4}-\d{2}-\d{2}/));
      var str = "";
      str = dataday;
      if (str != "") {
        return str.toString().match(/\d{4}-\d{2}-\d{2}/)[0];
      }
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    console.log(this.$route.params.id);
    
    this.getALL(this.$route.params.id);
    // console.log(this.$route);
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
.allBox {
  width: 100%;
  padding: 20px 40px 0;
}
.img {
  height: 630px;
  width: 40%;
  float: left;
  background-color: red;
  img {
    width: 100%;
    height: 100%;
  }
}
.maintext {
  float: left;
  width: 60%;
  height: 630px;
  position: relative;
}
.maintext .content {
  margin-left: 5%;
  margin-top: 20px;
  width: 95%;
  height: 550px;
  //   background-color: red;
  .line {
    width: 100%;
    height: 40px;
    line-height: 40px;
    margin-bottom: 10px;
    font-size: 18px;
    // background-color: rgb(0, 183, 255);
    li {
      float: left;
    }
    .address-h {
      margin-left: 10px;
    }
    .chenge {
      width: 70%;
      height: 100%;
      background-color: #ffffff00;
      border: 0;
      padding: 0 5px;
      //   border-bottom: 1px solid #000;
    }
    .name,
    .text {
      width: 47%;
      height: 100%;
    }
    .othername {
      margin-left: 6%;
    }
    .address {
      width: 55%;
    }
    .type {
      width: 40%;
      margin-left: 5%;
    }
    .sales {
      margin-left: 6%;
    }
    .Gname {
      width: 40%;
      margin-left: 5%;
      input {
        width: 50%;
        height: 100%;
      }
    }
    .Gphone {
      width: 55%;
      input {
        width: 60%;
        height: 100%;
      }
    }
  }
  .line:nth-child(6) {
    height: 80px;
    position: relative;
    span {
      position: absolute;
      left: 0;
    }
    li {
      position: absolute;
      left: 10%;
      width: 90%;
      height: 100%;
    }
  }
  .line:nth-child(7) {
    height: 140px;
    position: relative;
    span {
      position: absolute;
      top: 2%;
      left: 0;
    }
    li {
      position: absolute;
      left: 10%;
      width: 90%;
      height: 100%;
    }
    .Textchenge {
      width: 80%;
      height: 100%;
      border: 0;
      line-height: 40px;
      padding: 0 5px;
      margin-left: 10px;
    }
  }
}
.maintext .btn {
  position: absolute;
  left: 50%;
  bottom: 3%;
  width: 30%;
  transform: translateX(-50%);
  button {
    width: 30%;
    height: 35px;
    background-color: rgba(255, 255, 255, 0);
    border: 1px solid #000;
  }
  button:active {
    background-color: rgb(209, 209, 209);
  }
  button:last-child {
    margin-left: 35%;
  }
}
.maintext .title {
  width: 100%;
  height: 60px;
  text-align: center;
  line-height: 60px;
  font-size: 40px;
  font-weight: 600;
  letter-spacing: 10px;
  font-family: "";
}
.active {
  border: 1px solid rgba(0, 128, 255, 0.64);
}
</style>