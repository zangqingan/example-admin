<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">后台管理系统</div>
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginRef"
        label-width="0px"
        class="ms-content">
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="username">
            <template #prepend>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="password"
            v-model="loginForm.password"
            @keyup.enter="submitForm()">
            <template #prepend>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button
            type="primary"
            @click="submitForm()"
            >登录</el-button
          >
        </div>
        <p class="login-tips">Tips : 用户名和密码随便填。</p>
      </el-form>
    </div>
  </div>
</template>
\
<script setup>
import { User, Lock } from '@element-plus/icons-vue'

const loginForm = reactive({
  username: 'admin',
  password: '123456'
})

const rules = reactive({
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    }
  ],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

// 提交登录表单
const loginRef = ref(null)
const router = useRouter()
const submitForm = () => {
  loginRef.value.validate(valid => {
    if (valid) {
      ElMessage.success('登录成功')
      localStorage.setItem('local_username', loginForm.username)
      router.push('/')
    } else {
      ElMessage.error('登录失败')
      return false
    }
  })
}
</script>

<style scoped>
.login-wrap {
  width: 100%;
  height: 100%;
  background-image: url(@/assets/images/bg.jpg);
  background-size: 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(47, 29, 29, 0.3);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>
