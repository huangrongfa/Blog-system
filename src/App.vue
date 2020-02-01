<template>
  <div id="app">
    <!-- 公共头部 -->
    <el-header class="plane-head" v-show="hide">
      <a href="javascript:;" class="anthour" @click="slider()">
        <i class="el-icon-s-fold icon-anthour"></i>牧羊少年后台管理系统
      </a>
      <div class="user-infos" @click="handleShow()">
        <el-avatar icon="el-icon-user-solid"></el-avatar>
        <span>
          {{isUser}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <ul class="menus" v-show="ishidden">
          <li>
            <a href="javascript:;">个人中心</a>
          </li>
          <li>
            <a href="javascript:;" @click="handleQuit()">退出</a>
          </li>
        </ul>
      </div>
    </el-header>
    <!-- 内容 -->
    <el-main class="warper">
      <!-- 导航菜单 -->
      <div class="plane-body-left" v-show="hide">
        <ul>
          <li>
            <router-link to="people" exact>
              <i class="el-icon-s-custom"></i>
              <span v-if="show">个人简介</span>
            </router-link>
          </li>
          <li>
            <router-link to="home">
              <i class="el-icon-s-order"></i>
              <span v-if="show">博客列表</span>
            </router-link>
          </li>
          <li>
            <router-link to="wonder">
              <i class="el-icon-picture"></i>
              <span v-if="show">精彩生活</span>
            </router-link>
          </li>
          <li>
            <router-link to>
              <i class="el-icon-medal"></i>
              <span v-if="show">猜你喜欢</span>
            </router-link>
          </li>
          <li>
            <router-link to="messagePage">
              <i class="el-icon-notebook-2"></i>
              <span v-if="show">我的留言</span>
            </router-link>
          </li>
        </ul>
      </div>
      <router-view v-wechat-title="$route.meta.title"></router-view>
    </el-main>
    <!-- 公共页脚 -->
  </div>
</template>
<script>
import {userinfo} from './request/api.js';
export default {
  name: "app",
  data: () => ({
    ishidden: false,
    show: true,
    onbtn: true, // 控制导航菜单切换
    hide: false
  }),
  computed: {
    isUser() {
      return this.$store.state.userinfo || "";
    }
  },
  watch: {
    $route(to, from) {
      if (to.path !== '/' ) {
        this.hide = true
      }
    }
  },
  created() {
    this.getuserinfo()
  },
  methods: {
    handleShow() {
      this.ishidden = !this.ishidden;
    },
    handleQuit() {
      this.ishidden = false;
      this.$router.push("/");
      window.localStorage.removeItem("token");
    },
    getuserinfo() {
      userinfo().then(res => {
        this.$store.dispatch("saveInfo", res.data.username);
      });
    },
    slider() {
      if (this.onbtn) {
        let el = document.querySelector(".plane-head");
        let els = document.querySelector(".plane-body-right");
        let elment = document.querySelector(".plane-body-left");
        el.style.marginLeft = 42 + "px";
        els.style.marginLeft = 60 + "px";
        elment.style.width = 50 + "px";
        this.onbtn = false;
        this.show = false;
      } else {
        let el = document.querySelector(".plane-head");
        let els = document.querySelector(".plane-body-right");
        let elment = document.querySelector(".plane-body-left");
        el.style.marginLeft = "";
        els.style.marginLeft = "";
        elment.style.width = "";
        this.onbtn = true;
        setTimeout(() => {
          this.show = true;
        }, 60);
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
#app{
  height 100vh
}
.warper {
  padding: 0;
  .plane-body-left {
    width: 190px;
    position: fixed;
    top: 0;
    bottom: 0;
    background: #324157;
    margin-right: 15px;
    transition: 0.2s ease-out;
    a {
      display: block;
      height: 44px;
      line-height: 44px;
      font-size: 14px;
      padding-left: 15px;
      color: #bfcbd9;

      i {
        margin-right: 5px;
        font-size: 16px;
      }

      &:hover {
        background: #223041 !important;
        color: #20a0ff;
      }
    }
  }
}
.plane-head {
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  margin-left: 190px;
  border-bottom: 1px solid #dcdfe6;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  transition: 0.2s ease-out;

  .user-infos {
    span {
      color: #909399;
    }
  }

  .el-avatar--circle {
    vertical-align: middle;
    margin-right: 10px;
  }

  .anthour {
    font-size: 18px;
    color: #909399;

    .icon-anthour {
      margin-right: 5px;
    }
  }

  .menus {
    height: 100px;
    width: 120px;
    position: absolute;
    right: 15px;
    top: 72px;
    background-color: #fff;
    border: 1px solid #ebeef5;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    z-index: 5;

    li {
      margin-top: 6px;
    }

    &::before {
      position: absolute;
      display: block;
      width: 0;
      height: 0;
      border-color: transparent;
      border-style: solid;
      border-bottom-color: #ebeef5;
      content: '';
      top: -14px;
      left: 55px;
      border-width: 7px;
    }

    &::after {
      position: absolute;
      display: block;
      width: 0;
      height: 0;
      border-color: transparent;
      border-style: solid;
      border-bottom-color: #fff;
      content: '';
      top: -12px;
      left: 53px;
      margin-left: 3px;
      border-width: 6px;
    }

    a {
      display: block;
      height: 40px;
      line-height: 40px;
      text-align: center;

      &:hover {
        background-color: #ecf5ff;
        color: #66b1ff;
      }
    }
  }
}
</style>


