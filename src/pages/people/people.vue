<template>
  <div class="people-block">
    <el-main>
      <div class="pelple-body">
        <div class="planes">
          <img src="" alt="">
          <ul>
            <li><img src="../../assets/images/guard.gif" alt="" srcset="" class="img-responsive"></li>
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
import { mapState } from 'vuex'
export default {
  data: () => ({
    show: true,
    ishidden: false,
    circleUrl: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
  }),
  created() {},
  mounted() {},
  components: {},
  methods: {
    handleShow() {
      this.ishidden = !this.ishidden
    },
    handleQuit() {
      this.$router.push('handleQuit')
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
.img-responsive
  height 120px
  width 120px
  display block
</style>