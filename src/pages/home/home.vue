<!--  -->
<template>
  <div class="plane">
    <el-container>
      <!-- 头部 -->
      <el-header class="plane-head">
        <a href="javascript:;" class="anthour" @click="slider()">
          <i class="el-icon-s-fold icon-anthour"></i>牧羊少年后台管理系统
        </a>
        <div class="user-infos" @click="handleShow()">
          <el-avatar :src="circleUrl"></el-avatar>
          <span>{{isUser}}<i class="el-icon-arrow-down el-icon--right"></i></span>
          <ul class="menus" v-show="ishidden">
            <li><a href="javascript:;">个人中心</a></li>
            <li><a href="javascript:;" @click="handleQuit()">退出</a></li>
          </ul>
        </div>
      </el-header>
      <!-- 主要内容 -->
      <el-main class="plane-body">
        <div class="plane-body-left">
          <ul>
            <li><router-link to="people" exact><i class="el-icon-s-custom"></i><span v-if="show">个人简介</span></router-link></li>
            <li><router-link to="home"><i class="el-icon-s-order"></i><span v-if="show">博客列表</span></router-link></li>
            <li><router-link to="wonder"><i class="el-icon-picture"></i><span v-if="show">精彩生活</span></router-link></li>
            <li><router-link to=""><i class="el-icon-medal"></i><span v-if="show">猜你喜欢</span></router-link></li>
            <li><router-link to=""><i class="el-icon-notebook-2"></i><span v-if="show">我的留言</span></router-link></li>
          </ul>
        </div>
        <div class="plane-body-right">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="博客ID" size="medium">
              <el-input v-model="formInline.id" placeholder="请输入博客ID"></el-input>
            </el-form-item>
            <el-form-item label="作者">
              <el-input v-model="formInline.user" placeholder="请输入博客作者" size="medium"></el-input>
            </el-form-item>
            <el-form-item label="文章标题">
              <el-input v-model="formInline.title" placeholder="请输入文章标题" size="medium"></el-input>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" size="medium" @click="handlesearch()">搜索</el-button>
            <el-button type="primary" icon="el-icon-plus" size="medium" @click="addhandle()">创建博客</el-button>
          </el-form>
          <!--  -->
          <el-table :data="tableData" 
          border 
          style="width: 100%" 
          v-loading="loading"
          element-loading-text="努力加载中...">
            <el-table-column
              prop="id"
              label="序号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="author"
              label="作者"
              width="180">
            </el-table-column>
            <el-table-column
              prop="title"
              label="文章标题">
            </el-table-column>
            <el-table-column
              prop="type"
              label="所属分类">
              <template slot-scope="scope">
                <span>{{scope.row.type == 1 ? '国际': ''}}</span>
                <span>{{scope.row.type == 2 ? '国内': ''}}</span>
                <span>{{scope.row.type == 3 ? '经济': ''}}</span>
                <span>{{scope.row.type == 4 ? '体育': ''}}</span>
                <span>{{scope.row.type == 5 ? '军事': ''}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="curenttiem"
              label="发表时间">
            </el-table-column>
            <el-table-column
              prop="edit"
              label="操作">
              <template slot-scope="scope">
                <el-button type="danger" icon="el-icon-delete" @click="removehandleClick(scope.$index, scope.row)" size="medium">删除</el-button>
                <el-button type="primary" icon="el-icon-edit" size="medium" @click="handleclickdetail(scope.row)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            background
            layout="total, prev, pager, next"
            :page-size="6"
            :total="18"
            @current-change="handleCurrentChange"
            v-if="tableData.length">
          </el-pagination>
        </div>
      </el-main>
    </el-container>
    <!-- 弹窗 -->
    <el-dialog title="创建博客" :visible.sync="dialogTableVisible">
        <el-form :model="dialogform" label-width="80px">
          <el-form-item label="文章编号">
            <el-input v-model="dialogform.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="文章标题">
            <el-input v-model="dialogform.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="作者">
            <el-input v-model="dialogform.user" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="文章类型">
            <el-select v-model="dialogform.type" placeholder="请选择文章类型">
              <el-option value="1" label="国际"></el-option>
              <el-option value="2" label="国内"></el-option>
              <el-option value="3" label="财经"></el-option>
              <el-option value="4" label="体育"></el-option>
              <el-option value="5" label="军事"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="文章内容">
             <el-input type="textarea" v-model="dialogform.content" rows="5"></el-input>
          </el-form-item>
          <el-button type="primary" @click="handleSubmit()">确 定</el-button>
        </el-form>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import { gethomelist, removeitem, searchlist, addarticle, userinfo, pagelist } from '../../request/api.js'
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    circleUrl: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
    tableData: [],
    formInline: {
      title: '',
      id: '',
      user: ''
    },
    dialogform: {
      id: '',
      content: '',
      author: '',
      title: '',
      type: ''
    },
    ishidden: false, //是否显示下啦菜单
    loading: true, // 是否显示loading
    onbtn: true, // 控制导航菜单切换
    show: true,
    dialogTableVisible: false, // 是否显示弹窗
  }),
  created() {
    this.handlelist()
    this.getuserinfo()
  },
  mounted() {},
  computed: {
    isUser() {
      return this.$store.state.userinfo || ''
    }
  },
  components: {},
  methods: {
    handlelist() {
      this.loading = true
      pagelist({currentPage: 1}).then(res => {
        this.tableData = [...res.data]
        setTimeout(() => {
          this.loading = false
        }, 500)
      }).catch(error => {
        console.error()
      })
    },
    removehandleClick(index, row) {
        this.$confirm('你确定要删除这条数据？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          removeitem({id: row.id}).then((res) => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
          this.handlelist()
        })
    },
    handlesearch() {
      if (!this.formInline.id) {
        return false
      }
      this.loading = true
      searchlist({
        id: this.formInline.id
      }).then(res => {
        this.tableData = [...res.data]
          setTimeout(() => {
          this.loading = false
        }, 500)
        this.formInline = {}
      })
    },
    addhandle() {
      this.dialogTableVisible = true
    },
    handleSubmit() {
      addarticle({
        id: this.dialogform.id,
        title: this.dialogform.title,
        author: this.dialogform.user,
        type: this.dialogform.type,
        content: this.dialogform.content
      }).then(res => {
        this.dialogTableVisible = false
      })
    },
    handleclickdetail(row) {
      this.$router.push({
        path: 'homedetail',
        query: {
          articleId: row.id
        }
      })
    },
    handleShow() {
      this.ishidden =  !this.ishidden
    },
    handleQuit() {
      this.ishidden = false

      this.$router.push('/')
    },
    slider() {
      if (this.onbtn) {
        let el = document.querySelector('.plane-head')
        let els = document.querySelector('.plane-body-right')
        let elment = document.querySelector('.plane-body-left')
        el.style.marginLeft = 42 + 'px'
        els.style.marginLeft = 60 + 'px'
        elment.style.width = 50 + 'px'
        this.onbtn = false
        this.show = false
      } else {
        let el = document.querySelector('.plane-head')
        let els = document.querySelector('.plane-body-right')
        let elment = document.querySelector('.plane-body-left')
        el.style.marginLeft = ''
        els.style.marginLeft = ''
        elment.style.width = ''
        this.onbtn = true
        setTimeout(() => {
          this.show = true
        }, 60)
      }
    },
    handleCurrentChange(val) {
      pagelist({
        currentPage: val
      }).then(res => {
        this.tableData = [...res.data]
      })
    },
    getuserinfo() {
      userinfo().then(res => {
        this.$store.dispatch('saveInfo', res.data.username)
      })
    }
  }
};
</script>
<style lang="stylus" scoped>
.plane
  .el-container
    // height 100vh
    // min-height 100vh
  >>> .el-dialog
    width 38%
.plane-head,.plane-footer
  padding 0 15px
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
.plane-body
  padding: 0
  .plane-body-left
    width 190px
    position fixed
    top 0
    bottom 0
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
  .plane-body-right
    overflow hidden
    height 100%
    margin-top 20px
    margin-left 205px
    transition .2s ease-out
    >>> .el-form--inline .el-form-item
      margin-right 20px
    >>> .el-pagination
      text-align center
      margin 45px 0 0
.plane-footer
  text-align center
  color #909399
  font-size 14px
  line-height 60px
</style>