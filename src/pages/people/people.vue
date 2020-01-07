<!--  -->
<template>
  <div class="people-block">
  <!-- 头部 -->
    <el-header class="plane-head">
      <a href="javascript:;" class="anthour">
        <i class="el-icon-s-fold icon-anthour"></i>牧羊少年后台管理系统
      </a>
      <div class="user-infos" @click="handleShow()">
        <el-avatar :src="circleUrl"></el-avatar>
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
    <el-main>
      <!-- 左侧导航菜单 -->
      <div class="slider-menus">
        <ul>
          <li>
            <router-link to>
              <i class="el-icon-s-custom"></i>
              <span v-if="show">个人简介</span>
            </router-link>
          </li>
          <li>
            <router-link to="/home">
              <i class="el-icon-s-order"></i>
              <span v-if="show">博客列表</span>
            </router-link>
          </li>
          <li>
            <router-link to>
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
            <router-link to>
              <i class="el-icon-notebook-2"></i>
              <span v-if="show">我的留言</span>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="pelple-body">
        <div class="planes">
          <img src="" alt="">
          <ul>
            <li>姓名：牧羊少年</li>
            <li>籍贯：中国-河南</li>
            <li>电话：130****4310</li>
            <li>邮箱：7600******@qq.com</li>
            <li>专业技能：Css/Vue.js/mySql/Redis/Node.js</li>
            <li>人生格言：你是要当一辈子的懦夫,还是要当英雄?哪怕只有几分钟,你需要的不仅仅是勇气,来自心底的革命呐喊,只为惊醒少数人!</li>
          </ul>
        </div>
      </div>
    </el-main>
    <el-footer class="plane-footer">牧羊少年科技有限责任公司©️版权所有</el-footer>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data: () => ({
    show: true,
    ishidden: false,
    circleUrl: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
  }),
  created() {},
  mounted() {},
  components: {},
  computed: {
    isUser() {
      return this.$store.state.userinfo
    }
  },
  methods: {
    handleShow() {

    },
    handleQuit() {

    }
  }
};
</script>
<style lang="stylus" scoped>
.plane-head
  background #fff
  display flex
  justify-content space-between
  align-items center
  cursor pointer
  font-size 14px
  margin-left 190px
  border-bottom 1px solid #dcdfe6
  box-shadow 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04)
  transition .2s ease-out
  .user-infos
    span 
      color #909399
  .el-avatar--circle
    vertical-align middle
    margin-right 10px
  .anthour
    font-size 18px
    color #909399
    .icon-anthour
      margin-right 5px
  .menus
    height 100px
    width 120px
    position absolute
    right 15px
    top 72px
    background-color #fff
    border 1px solid #ebeef5
    border-radius 4px
    box-shadow 0 2px 12px 0 rgba(0,0,0,.1)
    z-index 5
    li
      margin-top 6px
    &::before
      position: absolute
      display: block
      width: 0
      height: 0
      border-color: transparent
      border-style: solid
      border-bottom-color: #ebeef5
      content ''
      top -14px
      left 55px
      border-width: 7px
    &::after
      position: absolute
      display: block
      width: 0
      height: 0
      border-color: transparent
      border-style: solid
      border-bottom-color: #fff
      content ''
      top -12px
      left 53px
      margin-left 3px
      border-width: 6px
    a
      display block
      height 40px
      line-height 40px
      text-align center
      &:hover
        background-color #ecf5ff
        color #66b1ff
      &.active
        background-color #ecf5ff
        color #66b1ff
.slider-menus
    width 190px
    position fixed
    top 0
    bottom 0
    left 0
    background #324157
    margin-right 15px
    transition .2s ease-out
    a
      display block
      height 44px
      line-height 44px
      font-size 14px
      padding-left 15px
      color #bfcbd9
      i
        margin-right 5px
        font-size 16px
      &:hover
        background #223041!important
        color #20a0ff
.plane-footer
  text-align center
  color #909399
  font-size 14px
  line-height 60px
  position fixed
  bottom 0
  width 100%
.pelple-body
  margin-left 200px
  .planes
    max-width 520px
    margin 110px auto 
    li
      margin-bottom 20px
      color #545555
      line-height 28px
</style>