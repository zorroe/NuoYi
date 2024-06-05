<script setup lang="ts">
import {
  Delete,
  Download,
  Edit,
  Plus,
  Rank,
  Refresh,
  RefreshRight,
  Search,
  Upload,
} from '@element-plus/icons-vue'
import type { DeptTree, SystemUser, UserParams } from '~/api/types'
import userApi from '~/api/user'
import { parseTime } from '~/utils/nuoyi'

definePageMeta({
  title: '用户管理',
  icon: 'i-material-symbols:person-outline-rounded',
})

const columns = ref([
  { key: 1, label: `用户名称`, visible: true },
  { key: 2, label: `用户昵称`, visible: true },
  { key: 3, label: `部门`, visible: true },
  { key: 4, label: `手机号码`, visible: true },
  { key: 5, label: `状态`, visible: true },
  { key: 6, label: `创建时间`, visible: true },
])

const searchParams = ref<UserParams>({
  pageSize: 10,
  pageNum: 1,
  userName: undefined,
  phonenumber: undefined,
  status: undefined,
  deptId: undefined,
})

const searchFormRef = ref<any>()
const createTime = ref<any>([])

const loading = ref(false)
const total = ref<number>(1)
const multipleSelection = ref<SystemUser[]>([])

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

function handleNodeClick(data: DeptTree) {
  searchParams.value.deptId = data.id
  getList()
}

const deptTree = ref<DeptTree[]>([])

async function getDept() {
  const { code, data } = await userApi.userDeptApi()
  if (code === 200) {
    deptTree.value = data
  }
}

async function getList() {
  loading.value = true
  const params = useCombineDataRange(searchParams.value, createTime.value)
  try {
    const { rows, total: totalVal } = await userApi.systemUserListApi(params)
    tableData.value = rows
    total.value = totalVal
  }
  finally {
    loading.value = false
  }
}

function handleSelectionChange(val: SystemUser[]) {
  multipleSelection.value = val
}

function handleDelete() {
  if (multipleSelection.value.length === 0) {
    ElMessage.warning('请选择要删除的数据')
    return
  }
  ElMessageBox.confirm('是否确认删除选中的数据项?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      const { code } = await userApi.deleteUserApi(
        unref(multipleSelection)
          .map(d => d.userId)
          .join(','),
      )
      if (code === 200) {
        ElMessage.success('删除成功')
      }
    })
    .finally(() => {
      handleReset()
    })
}

function handleDeleteOne(row: SystemUser) {
  ElMessageBox.confirm(`是否确认删除用户名称为"${row.userName}"的数据项?`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      const { code } = await userApi.deleteUserApi(row.userId)
      if (code === 200) {
        ElMessage.success('删除成功')
      }
    }).finally(() => {
      handleReset()
    })
}

function handleResetPwd(row: SystemUser) {
  ElMessageBox.prompt('请输入重置后的密码', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern: /^.{5,20}$/,
    inputErrorMessage: '用户密码长度必须介于 5 和 20 之间',
    inputValidator: (value) => {
      if (/[<>"'|\\]/.test(value)) {
        return '不能包含非法字符：< > " \' \\\ |'
      }
      return true
    },
  }).then(async ({ value }) => {
    const { code } = await userApi.resetPwdApi({ userId: row.userId, password: value })
    if (code === 200) {
      ElMessage.success('重置成功')
    }
  })
}

function handleReset() {
  searchFormRef.value.resetFields()
  searchParams.value.deptId = undefined
  createTime.value = []
  getList()
}

onMounted(() => {
  handleReset()
  getDept()
})
</script>

<template>
  <el-row :gutter="12">
    <el-col :xs="24" :sm="24" :md="24" :lg="4" :xl="4">
      <el-scrollbar>
        <el-tree :data="deptTree" @node-click="handleNodeClick" />
      </el-scrollbar>
    </el-col>
    <el-col :xs="24" :sm="24" :md="24" :lg="20" :xl="20">
      <el-row>
        <el-col :span="24">
          <el-form ref="searchFormRef" inline :label-width="80" :model="searchParams" label-position="left">
            <el-form-item label="用户名称" prop="userName">
              <el-input v-model="searchParams.userName" placeholder="用户名称" clearable style="width: 220px" />
            </el-form-item>
            <el-form-item label="手机号码" prop="phonenumber">
              <el-input v-model="searchParams.phonenumber" placeholder="手机号码" clearable style="width: 220px" />
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-select v-model="searchParams.status" placeholder="用户状态" style="width: 220px">
                <el-option
                  v-for="item in userStatusOptions" :key="item.value" :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-date-picker
                v-model="createTime" type="daterange" unlink-panels range-separator="至"
                style="width: 200px" value-format="YYYY-MM-DD" format="YYYY-MM-DD" start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
            <el-form-item>
              <el-button v-throttle :icon="Search" type="primary" @click="getList">
                搜索
              </el-button>
              <el-button v-throttle :icon="Refresh" @click="handleReset()">
                重置
              </el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="24">
          <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
              <el-button :icon="Plus" plain type="primary">
                新增
              </el-button>
              <el-button
                :icon="Delete" plain type="danger" :disabled="multipleSelection.length === 0"
                @click="handleDelete"
              >
                删除
              </el-button>
              <el-button :icon="Upload" plain type="info">
                导入
              </el-button>
              <el-button :icon="Download" plain type="warning">
                导出
              </el-button>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
              <RightToolBar @refresh="getList" />
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="24" class="mt-2">
          <el-table v-loading="loading" :data="tableData" stripe @selection-change="handleSelectionChange">
            <el-table-column type="selection" :width="50" align="center" />>
            <el-table-column
              v-if="columns[0].visible" key="userName" show-overflow-tooltip label="用户名称" align="center"
              prop="userName"
            />
            <el-table-column
              v-if="columns[1].visible" key="nickName" show-overflow-tooltip label="用户昵称" align="center"
              prop="nickName"
            />
            <el-table-column
              v-if="columns[2].visible" key="deptName" show-overflow-tooltip label="部门" align="center"
              prop="dept.deptName"
            />
            <el-table-column
              v-if="columns[3].visible" key="phonenumber" show-overflow-tooltip label="手机号码" align="center"
              prop="phonenumber" :width="120"
            />
            <el-table-column v-if="columns[4].visible" key="status" label="状态" align="center">
              <template #default="scope">
                <el-switch v-model="scope.row.status" active-value="0" inactive-value="1" />
              </template>
            </el-table-column>
            <el-table-column v-if="columns[5].visible" label="创建时间" align="center" prop="createTime" :width="180">
              <template #default="scope">
                <span>{{ parseTime(scope.row.createTime) }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="180" fixed="right">
              <template #default="scope">
                <div class="flex items-center justify-center">
                  <el-tooltip v-if="scope.row.userId !== 1" content="修改" placement="top">
                    <el-button circle :icon="Edit" size="small" />
                  </el-tooltip>
                  <el-tooltip v-if="scope.row.userId !== 1" content="删除" placement="top">
                    <el-button circle :icon="Delete" size="small" @click="handleDeleteOne(scope.row)" />
                  </el-tooltip>
                  <el-tooltip v-if="scope.row.userId !== 1" content="重置密码" placement="top">
                    <el-button circle :icon="RefreshRight" size="small" @click="handleResetPwd(scope.row)" />
                  </el-tooltip>
                  <el-tooltip v-if="scope.row.userId !== 1" content="分配角色" placement="top">
                    <el-button circle :icon="Rank" size="small" />
                  </el-tooltip>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col>
          <Pagination
            v-show="total > 0" v-model:page="searchParams.pageNum" v-model:limit="searchParams.pageSize"
            :total="total" @pagination="getList"
          />
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<style scoped></style>
