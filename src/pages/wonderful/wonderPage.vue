<!--  -->
<template>
  <div class="people-block">
    <el-main>
      <div class="pelple-body">
      <div class="upload-content">
        <el-upload
        class="upload-demo"
        drag
        action="http://localhost:8080/api/upload"
        multiple
        name="imgurl"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      </div>
        <div class="wonder-planes">
          <ul>
            <li v-for="items in imgdata" :key="items.id">
              <img :src="items.url" alt="">
            </li>
          </ul>
        </div>
      </div>
    </el-main>
    <el-footer class="plane-footer">牧羊少年科技有限责任公司©️版权所有</el-footer>
  </div>
</template>

<script type="text/ecmascript-6">
import { uploadImg } from '../../request/api.js'
export default {
  data: () => ({
    show: true,
    ishidden: false,
    circleUrl: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
    imgdata: [
      {
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        id: '001'
      },
      {
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        id: '002'
      },
            {
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        id: '003'
      },
      {
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        id: '004'
      }],
      limitNum: 2, // 允许上传图片最大数
  }),
  created() {},
  mounted() {

  },
  components: {

  },
  computed: {
    isUser() {
      return window.localStorage.getItem('userinfo')
    }
  },
  methods: {
    // 图片上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      if (!isJPG && !isPNG) {
        this.$message({
          title: '警告',
          message: `上传头像图片只能是JPG和PNG的格式`
        })
      }
      const fileSize = file.size / 1024 / 1024 / 2
      if (fileSize > 2) {
        this.$message({
          title: '警告',
          message: `图片大小必须小于2M，请重新上传`
        })
      }
    },
    handleAvatarSuccess(res, file) {
      alert('上传成功')
    },
    handleShow() {

    },
    handleQuit() {
      this.$router.push('/')
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
  .wonder-planes
    li
      margin-bottom 20px
      color #545555
      line-height 28px
      width 23.33%
      float left
      margin-right 15px
      img 
        width 100%
        max-width 100%
        display block
  .upload-content
    max-width 360px
    width 360px
    margin-bottom 20px
</style>