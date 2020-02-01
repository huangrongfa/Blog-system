<template>
  <div class="content-block">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="90px"
      class="demo-ruleForm"
      size="medium"
    >
      <el-form-item label="用户名" prop="name">
        <el-input type="text" v-model="ruleForm.name" autocomplete="off" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input v-model="ruleForm.pass" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="isloading" @click="submitForm('ruleForm')">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
import { getuser } from "../../request/api.js";
export default {
  data: () => ({
    ruleForm: {
      name: "",
      pass: ""
    },
    text: "",
    isloading: false,
    rules: {
      pass: [
        { required: true, message: "请输入用户密码", trigger: "blur" },
        { min: 6, max: 6, message: "密码长度最大为6位数", trigger: "blur" }
      ],
      name: [
        { required: true, message: "请输入用户名称", trigger: "blur" },
        { min: 5, max: 10, message: "长度在 3 到 20 个字符", trigger: "blur" }
      ]
    }
  }),
  created() {},
  mounted() {}, 
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.isloading = true
          let that = this
          getuser({
            username: this.ruleForm.name,
            password: this.ruleForm.pass
          }).then(res => {
            window.localStorage.setItem('token', res.data.token)
            setTimeout(function() {
              that.$router.push("home")
            }, 600)
          })
        } else {
          return false
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.warper .content-block {
  background: url('../../assets/images/small.jpeg') no-repeat center center
  background-size: cover
  position fixed
  top 0
  right 0
  bottom 0
  left 0
  z-index 99
  margin-left 0
  margin-top 0
}
.demo-ruleForm {
  max-width: 380px;
  width: 380px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid #DCDFE6;
  border-radius: 5px;
  padding-top: 50px;
  padding-right: 30px;
  box-sizing: border-box;
}

.content-block >>> .el-input__prefix, .content-block >>> .el-input__suffix {
  color: #08d711;
}
</style>
