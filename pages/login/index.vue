<script setup lang="ts">
import loginApi from '~/api/login'

definePageMeta({
  layout: 'login',
  icon: 'i-mdi:login',
  title: '登录',
  hidden: true,
})

const loginForm = ref({
  username: 'admin',
  password: 'admin123',
  code: '',
  uuid: '',
})

const codeImg = ref('')
const loginFormRef = ref()

const formRules = ref({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
})

async function handleLogin() {
  const valid = await loginFormRef.value.validate()
  if (!valid)
    return
  const data = {
    ...loginForm.value,
    uuid: loginForm.value.uuid,
  }
  const { code } = await loginApi.loginApi(data)
  if (code === 200) {
    await getInfo()
    ElMessage.success('登录成功')
    navigateTo('/')
  }
  else {
    loadCaptchaImage()
    loginFormRef.value.resetFields()
  }
}

async function loadCaptchaImage() {
  const { img, uuid } = await loginApi.captchaApi()
  codeImg.value = `data:image/gif;base64,${img}`
  loginForm.value.uuid = uuid
}

async function getInfo() {
  const data = await loginApi.getInfoApi()
  return data
}

onMounted(() => {
  loadCaptchaImage()
})
</script>

<template>
  <div class="lg:grid lg:min-h-screen lg:grid-cols-12">
    <section class="relative flex h-32 items-end lg:col-span-5 lg:h-full xl:col-span-6">
      <img
        alt=""
        src="~/assets/images/login.jpg"
        class="absolute inset-0 h-full w-full object-cover opacity-80"
      >
    </section>
    <main class="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
      <div class="max-w-xl lg:max-w-3xl">
        <el-form ref="loginFormRef" :model="loginForm" label-position="right" :rules="formRules" style="width: 500px">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="用户名" size="large">
              <template #prefix>
                <div class="i-mdi:account w-1em h-1em" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" type="password" placeholder="密码" size="large">
              <template #prefix>
                <div class="i-mdi:lock w-1em h-1em" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="code">
            <div class="flex gap-4 w-full">
              <el-input v-model="loginForm.code" size="large">
                <template #prefix>
                  <div class="i-mdi:code w-1em h-1em" />
                </template>
              </el-input>
              <el-image style="height: 40px" :src="codeImg" @click="loadCaptchaImage" />
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleLogin">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </main>
  </div>
</template>

<style scoped></style>
