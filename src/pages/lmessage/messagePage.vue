<template>
  <div class="content-block">
    <div class="jumbtion">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="留言名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="留言类型">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="国内" value="1"></el-option>
            <el-option label="国际" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="留言时间">
          <el-col>
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.date1"
              format="yyyy 年 MM 月 dd 日"
              style="width: 100%"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="留言内容">
          <el-input type="textarea" v-model="form.desc" rows="5"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit()" size="medium">提交留言</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { adduserInfo } from '@/request/api.js'
export default {
  data: () => ({
    form: {
      name: '',
      region: '',
      date1: '',
      type: [],
      resource: '',
      desc: ''
    }
  }),
  created() {},
  mounted() {},
  components: {},
  methods: {
    onSubmit() {
      if (!window.localStorage.getItem('token')) {
        this.$alert('抱歉，您还没有登录', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info'
            });
          }
        });
      } else {
        if (this.form.name == '' || this.form.desc == '' || this.form.date1 == '') {
          return false
        }
        adduserInfo({
            id: '0002',
            title: this.form.name,
            content: this.form.desc
          }).then(res => {
            if (res.status === 200) {
                this.$message({
                message: '提交成功',
                type: 'success'
              })
            }
          })
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.jumbtion
  margin-left 190px
  margin-top 20px
  .el-form
    width 520px
    max-width 520px
    margin 0 100px
    .el-select
      width 100%
</style>