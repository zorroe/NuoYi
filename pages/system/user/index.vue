<template>
  <el-row :gutter="12">
    <el-col :xs="24" :sm="24" :md="24" :lg="4" :xl="4">> 树状结构
    </el-col>
    <el-col :xs="24" :sm="24" :md="24" :lg="20" :xl="20">
      <el-row>
        <el-col :span="24">
          <el-form inline :label-width="80" :model="searchParams" ref="searchFormRef">
            <el-form-item label="用户名称" prop="userName">
              <el-input v-model="searchParams.userName" placeholder="用户名称" clearable />
            </el-form-item>
            <el-form-item label="手机号码" prop="phonenumber">
              <el-input v-model="searchParams.phonenumber" placeholder="手机号码" clearable />
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-select v-model="searchParams.status" placeholder="用户状态" style="width: 240px">
                <el-option v-for="item in userStatusOptions" :key="item.value" :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-date-picker v-model="createTime" type="daterange" unlink-panels range-separator="至"
                value-format="YYYY-MM-DD" format="YYYY-MM-DD" start-placeholder="开始日期" end-placeholder="结束日期" />
            </el-form-item>
            <el-form-item>
              <el-button :icon="Search" type="primary" @click="handleSearch">搜索</el-button>
              <el-button :icon="Refresh" @click="handleReset()">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="24">
          <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
              <el-button :icon="Plus" plain type="primary">新增</el-button>
              <el-button :icon="Delete" plain type="danger">删除</el-button>
              <el-button :icon="Upload" plain type="info">导入</el-button>
              <el-button :icon="Download" plain type="warning">导出</el-button>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
              <RightToolBar />
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="24">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="userId" label="用户编号" />
            <el-table-column prop="userName" label="用户名称" />
            <el-table-column prop="nickName" label="用户昵称" />
            <el-table-column prop="dept.deptName" label="部门" />
            <el-table-column prop="phonenumber" label="手机号码" />
            <el-table-column prop="status" label="状态" />
            <el-table-column prop="createTime" label="创建时间" />
            <el-table-column fixed="right" label="操作" width="120" />
          </el-table>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import {
  Plus,
  Delete,
  Upload,
  Download,
  Search,
  Refresh,
} from '@element-plus/icons-vue'
import type { UserParams, SystemUser } from '~/api/types';
import userApi from "~/api/user"

definePageMeta({
  title: '用户管理',
  icon: 'i-material-symbols:person-outline-rounded',
})

const searchParams = ref<UserParams>({
  pageSize: 10,
  pageNum: 1,
  userName: undefined,
  phonenumber: undefined,
  status: undefined,
})

const searchFormRef = ref<any>()
const createTime = ref<any>([])

const userStatusOptions = ref([
  {
    label: '启用',
    value: '1',
  },
  {
    label: '禁用',
    value: '0',
  },
])

const tableData = ref<SystemUser[]>([])

const handleSearch = async () => {
  const params = useCombineDataRange(searchParams.value, createTime.value)
  const { rows } = await userApi.systemUserListApi(params)
  tableData.value = rows
}

const handleReset = () => {
  searchFormRef.value.resetFields()
  createTime.value = []
  handleSearch()
}

onMounted(() => {
  handleReset()
})
</script>

<style scoped></style>
