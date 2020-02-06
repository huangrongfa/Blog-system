<!--  -->
<template>
  <div class="plane">
    <el-container>
      <!-- 主要内容 -->
      <el-main class="plane-body">
        <div class="">
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
            <el-button type="primary" size="medium" @click="clickButton($event)">测试socket</el-button>
          </el-form>
          <!--  -->
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            v-loading="loading"
            element-loading-text="努力加载中..."
          >
            <el-table-column prop="id" label="序号" width="180"></el-table-column>
            <el-table-column prop="author" label="作者" width="180"></el-table-column>
            <el-table-column prop="title" label="文章标题"></el-table-column>
            <el-table-column prop="type" label="所属分类">
              <template slot-scope="scope">
                <span>{{scope.row.type == 1 ? '国际': ''}}</span>
                <span>{{scope.row.type == 2 ? '国内': ''}}</span>
                <span>{{scope.row.type == 3 ? '经济': ''}}</span>
                <span>{{scope.row.type == 4 ? '体育': ''}}</span>
                <span>{{scope.row.type == 5 ? '军事': ''}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="curenttiem" label="发表时间"></el-table-column>
            <el-table-column prop="edit" label="操作">
              <template slot-scope="scope">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="removehandleClick(scope.$index, scope.row)"
                  size="medium"
                >删除</el-button>
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="medium"
                  @click="handleclickdetail(scope.row)"
                >编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            background
            layout="total, prev, pager, next"
            :page-size="6"
            :total="totalpages"
            @current-change="handleCurrentChange"
            v-if="tableData.length"
          ></el-pagination>
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
import {
  gethomelist,
  removeitem,
  searchlist,
  addarticle,
  pagelist,
  userinfo
} from "../../request/api.js";
import { mapGetters } from "vuex"
export default {
  data: () => ({
    tableData: [],
    ids: '',
    formInline: {
      title: "",
      id: "",
      user: ""
    },
    dialogform: {
      id: "",
      content: "",
      author: "",
      title: "",
      type: ""
    },
    ishidden: false, //是否显示下啦菜单
    loading: true, // 是否显示loading
    show: true,
    total: "",
    dialogTableVisible: false, // 是否显示弹窗
    currentPage: 1
  }),
  created() {
    this.handlelist()
  },
  mounted() {
    // 接收后端返回的数据
    this.sockets.subscribe('resultInfo', (data) => {
      console.log(data)
    })
  },
  computed: {
    totalpages() {
      return parseInt(this.allPage * 6);
    }
  },
  sockets: {
    connect() {
      console.log('链接成功！')
    },
    resultInfo(data) {
      this.$notify({
        title: '新消息通知',
        message: data.message,
        position: 'bottom-right',
        duration: 1000
      })
    }
  },
  components: {},
  methods: {
    // 传递数据到后端websocket
    clickButton(event) {
      let vals = event.target.innerText
      this.$socket.emit('login', vals)
    },
    handlelist() {
      this.loading = true;
      pagelist({ currentPage: this.currentPage })
        .then(res => {
          this.tableData = [...res.data];
          this.allPage = res.totalPage;
          setTimeout(() => {
            this.loading = false;
          }, 500);
        })
        .catch(error => {
          console.error();
        });
    },
    removehandleClick(index, row) {
      this.$confirm("你确定要删除这条数据？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        removeitem({ id: row.id }).then(res => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        });
        this.handlelist();
      });
    },
    handlesearch() {
      if (!this.formInline.id) {
        return false;
      }
      this.loading = true;
      searchlist({
        id: this.formInline.id
      }).then(res => {
        this.tableData = [...res.data];
        setTimeout(() => {
          this.loading = false;
        }, 500);
        this.formInline = {};
      });
    },
    addhandle() {
      this.dialogTableVisible = true;
    },
    handleSubmit() {
      if (!this.dialogform.title || !this.dialogform.id) return false
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
        path: "homedetail",
        query: {
          articleId: row.id
        }
      })
    },
    handleCurrentChange(val) {
      pagelist({
        currentPage: val
      }).then(res => {
        this.tableData = [...res.data]
      });
    }
  },
  // 进入路由的时候要做什么事情
  // beforeRouteEnter(to, from, next) {
  //   // console.log("进入该路由时执行");
  //   // next()
  // },
  // 离开的时候要做什么事情
  // beforeRouteLeave(to, from, next) {
  //   console.log("离开该路由时执行");
  // }
};
</script>
<style lang="stylus" scoped>
.plane {
  .el-container {
    // height 100vh
    // min-height 100vh
  }

  >>> .el-dialog {
    width: 38%;
  }
}

.plane-head, .plane-footer {
  padding: 0 15px;
}

.plane-body {
  padding: 0;
}
.plane-footer {
  text-align: center;
  color: #909399;
  font-size: 14px;
  line-height: 60px;
}
</style>