<template>
  <div class="login">
    <div style="width: 400px;">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="账号" prop="account">
          <el-input type="text" v-model="ruleForm.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { bodyToParm } from '@/tools/utils';
export default {
    name: 'Login',
    data() {
        return {
            ruleForm: {
                account: '',
                password: ''
            },
            rules: {
                account: [
                    { required: true, message: '请输入账号' },
                    { min: 2, max: 32, message: '长度在 2 到 32 个字符' }
                ],
                password: [
                    { required: true, message: '请输入密码' },
                    { min: 3, max: 32, message: '长度在 3 到 32 个字符' }
                ]
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.loginUser(this.ruleForm);
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        async loginUser(data) {
            const res = await this.getRequest(this.$urlApi.testLogin, data);
            console.log(res);
        }
    }
};
</script>

<style scoped>
</style>
