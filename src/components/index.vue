<template>
  <div class="index">
    <div class="navigator">
      <span>EXCITED</span>
      <router-link tag="a" to="/passport"></router-link>
    </div>
    <swipe class="swipe" :speed="1000">
      <swipe-item class="slide1"></swipe-item>
      <swipe-item class="slide2"></swipe-item>
      <swipe-item class="slide3"></swipe-item>
    </swipe>
    <div class="button-group">
      <div
        :class="setting.active ? 'button button-active':'button'"
        v-for="(setting,index) in buttonSetting"
        :key="index"
        @touchstart="()=>switchCategory(index,true)"
      >{{setting.content}}
      </div>
    </div>
    <div class="panel">{{panelContent}}</div>
    <div class="list">
      <div
        class="item"
        v-for="(item ,index) in listData"
        :key="index"
        @click="jumpHandle(item.href)"
      >
        <img :src="item.src" alt="">
        <div class="container">
          <p class="title">{{item.title}}</p>
          <p class="content">{{item.source}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Swipe, SwipeItem} from 'vue-swipe'
import axios from 'axios'
const buttonSetting = [{active: false, content: '游戏'}, {active: false, content: '综艺'}, {active: false, content: '小说'}, {active: false, content: '题库'}]
export default {
  name: 'index',
  components: {
    swipe: Swipe,
    swipeItem: SwipeItem
  },
  data () {
    return {
      buttonSetting: [
        {
          active: true,
          content: '游戏'
        },
        {
          active: false,
          content: '综艺'
        },
        {
          active: false,
          content: '小说'
        },
        {
          active: false,
          content: '题库'
        }
      ],
      panelContent: '游戏',
      listData: []
    }
  },
  async mounted () {
    var result = await axios.get(`http://10.13.20.78:8808/listData?catelogry=0`)
    this.listData = result.data.list
  },
  methods: {
    async switchCategory (index, flag) {
      this.buttonSetting = JSON.parse(JSON.stringify(buttonSetting))
      this.buttonSetting[index].active = flag
      this.panelContent = this.buttonSetting[index].content
      this.listData = []
      var result = await axios.get(`http://10.13.20.78:8808/listData?catelogry=${index}`)
      this.listData = result.data.list
    },
    jumpHandle (href) {
      window.location.href = 'https://www.toutiao.com' + href
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '../common/_rem';
  @import '../common/_reset';
  @import '../common/_base';
  @import '../common/common';
  @import 'vue-swipe/dist/vue-swipe.css';

  .index {
    .navigator {
      height: px2rem(100);
      line-height: px2rem(100);
      width: 100%;
      text-align: right;
      border-bottom: px2rem(2) solid rgba(0, 0, 0, .1);
      box-shadow: rgba(0, 0, 0, .1) 0 0 px2rem(300) px2rem(1);
      -webkit-appearance: none;
      span {
        float: left;
        font-size: px2rem(38);
        margin-left: px2rem(40);
        color: #fb7299;
        font-weight: 700;
      }
      a {
        float: right;
        font-size: px2rem(30);
        color: #FFFFFF;
        width: px2rem(80);
        height: px2rem(100);
        margin-right: px2rem(40);
        display: block;
        text-align: center;
        background: bg('wx-survey/1.0.0/index/', 'user-survey.png', 1) no-repeat;
        background-size: 80%;
        background-position: 100% center;
      }
    }
    .swipe {
      height: px2rem(320);
      width: 100%;
      .mint-swipe-indicators {
        bottom: px2rem(-50);
        left: px2rem(120);
        .mint-swipe-indicator{
          width: px2rem(40);
          height: px2rem(6);
          border-radius: px2rem(10);
          background: #CCCCCC;
        }
        .is-active{
          background: #000000;
        }
      }
      -webkit-appearance: none;
      .slide1 {
        background: url('http://storage.jd.com/wx-program/wx-survey/1.0.0/wxActive/active-banner01.png');
        background-size: auto 100%;
      }
      .slide2 {
        background: url('http://storage.jd.com/wx-program/wx-survey/1.0.0/wxActive/active-banner01.png');
        background-size: auto 100%;
      }
      .slide3 {
        background: url('http://storage.jd.com/wx-program/wx-survey/1.0.0/wxActive/active-banner01.png');
        background-size: auto 100%;
      }
    }
    .button-group {
      padding: 0 px2rem(20);
      font-size: px2rem(20);
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-around;
      position: relative;
      z-index: 11;
      .button {
        width: 100%;
        height: px2rem(80);
        line-height: px2rem(80);
        border-radius: px2rem(10);
        font-size: px2rem(30);
        font-weight: 800;
        margin: px2rem(40) px2rem(10) px2rem(20) px2rem(10);
        text-align: center;
        color: #fb7299;
        background: #FFFFFF;
        border: px2rem(2) solid #fb7299;
        letter-spacing: px2rem(6);
      }
      .button-active {
        background: #fb7299;
        color: #FFFFFF;
        box-shadow: rgba(251,114,153,.1) 0 px2rem(10) px2rem(10) px2rem(0.1);
      }
    }
    .panel {
      position: relative;
      z-index: 10;
      height: px2rem(400);
      margin: 0 px2rem(30);
      color: #fb7299;
      border-radius:px2rem(10);
      font-size: px2rem(30);
      line-height: px2rem(200);
      text-align: center;
      border:px2rem(2) solid #fb7299;
    }
    .list {
      margin-top: px2rem(40);
      height: px2rem(800);
      .item{
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: start;
        height: px2rem(200);
        margin: px2rem(30);
        position: relative;
        .container{
          min-width: 70%;
          p{
            text-align: left;
            margin: px2rem(10) px2rem(20);
          }
          .title{
            font-size: px2rem(30);
            color: #333333;
            font-weight: 700;
            height: px2rem(140);
          }
          .content{
            font-size: px2rem(24);
            color: #bbbbbb;
          }
        }
        img{
          width: 30%;
          height: 100%;
        }
      }
      .item:after{
        content: ' ';
        position: absolute;
        width: 100%;
        top: auto;
        bottom: px2rem(-15);
        left: px2rem(0);
        height: px2rem(2);
        background: rgba(204,204,204,.4);
      }
    }
  }
</style>
