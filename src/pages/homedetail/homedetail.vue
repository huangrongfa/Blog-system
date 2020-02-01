<!--  -->
<template>
  <div class="jumbtion">
    <div class="main">
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
</style>