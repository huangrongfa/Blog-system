<!--  -->
<template>
  <div class="content-block">
    <div class="jumbtion">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="留言名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="留言类型">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="留言时间">
          <el-col>
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.date1"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="特殊资源">
          <el-radio-group v-model="form.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="留言内容">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit()">提交</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
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

    }
  }
};
</script>
<style lang="stylus" scoped>
.jumbtion
  margin-left 190px
  margin-top 20px
  .el-form
    width 480px
    max-width 480px
    margin 0 100px
    .el-select
      width 100%
</style>