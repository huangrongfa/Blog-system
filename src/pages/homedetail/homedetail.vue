<!--  -->
<template>
  <div class="jumbtion">
    <!-- 头部 -->
    <el-header class="plane-head">
      <a href="javascript:;" class="anthour">
        <i class="el-icon-s-fold icon-anthour"></i>牧羊少年后台管理系统
      </a>
      <div class="user-infos" @click="handleShow()">
        <el-avatar :src="circleUrl"></el-avatar>
        <span class="users">
          {{user}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <!--  -->
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
    <div class="main">
      <div class="slider-menus">
        <ul>
          <li>
            <router-link to>
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
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="文章ID">
          <el-input v-model="form.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="文章作者">
          <el-input v-model="form.author" disabled></el-input>
        </el-form-item>
        <el-form-item label="文章标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="文章内容">
          <el-input type="textarea" v-model="form.content" rows="5"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="goblack()" size="medium">返回</el-button>
          <el-button type="primary" @click="onSubmit()" size="medium">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-footer class="plane-footer">牧羊少年科技有限责任公司©️版权所有</el-footer>
  </div>
</template>

<script type="text/ecmascript-6">
import { getblogdetail, editblog } from "../../request/api.js"
import { mapState } from 'vuex'
export default {
  data: () => ({
    form: {
      id: "",
      title: "",
      author: "",
      content: ""
    },
    ishidden: false,
    circleUrl: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
    show: true
  }),
  created() {
    this.form.id = this.$route.query.articleId;
    this.getdetailsdata();
  },
  mounted() {},
  computed: {
    user() {
      return window.localStorage.getItem('userinfo')
    }
  },
  components: {},
  methods: {
    goblack() {
      this.$router.push("home");
    },
    handleShow() {
      this.ishidden = !this.ishidden
    },
    getdetailsdata() {
      getblogdetail({
        id: this.$route.query.articleId
      }).then(res => {
        this.form = res.data[0];
      });
    },
    onSubmit() {
      editblog({
        id: this.$route.query.articleId,
        title: this.form.title
      }).then(res => {
        this.$message({
          message: res.meassge,
          type: "success"
        });
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.plane-head, .plane-footer {
  padding: 0 15px;
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
  .users{
    color: #909399
  }
  .user-infos, .el-avatar--circle {
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
}

.main {
  max-width: 900px;
  width: 900px;
  margin: 50px auto;
}

.plane-footer {
  text-align: center;
  color: #909399;
  font-size: 14px;
  line-height: 60px;
  position: fixed;
  bottom: 0;
  width: 100%;
}
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
</style>