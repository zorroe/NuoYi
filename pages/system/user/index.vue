<template>
  <el-row :gutter="12">
    <el-col :xs="24" :sm="24" :md="24" :lg="4" :xl="4">
      <el-scrollbar>
        <el-tree :data="data" @node-click="handleNodeClick" />
      </el-scrollbar>
    </el-col>
    <el-col :xs="24" :sm="24" :md="24" :lg="20" :xl="20">
      <el-row>
        <el-col :span="24">
          <el-form inline :label-width="80" :model="searchParams" ref="searchFormRef" label-position="left">
            <el-form-item label="用户名称" prop="userName">
              <el-input v-model="searchParams.userName" placeholder="用户名称" clearable style="width: 200px" />
            </el-form-item>
            <el-form-item label="手机号码" prop="phonenumber">
              <el-input v-model="searchParams.phonenumber" placeholder="手机号码" clearable style="width: 200px" />
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-select v-model="searchParams.status" placeholder="用户状态" style="width: 200px">
                <el-option v-for="item in userStatusOptions" :key="item.value" :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-date-picker v-model="createTime" type="daterange" unlink-panels range-separator="至"
                style="width: 180px" value-format="YYYY-MM-DD" format="YYYY-MM-DD" start-placeholder="开始日期"
                end-placeholder="结束日期" />
            </el-form-item>
            <el-form-item>
              <el-button :icon="Search" type="primary" @click="getList" v-throttle>搜索</el-button>
              <el-button :icon="Refresh" @click="handleReset()" v-throttle>重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="24">
          <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
              <el-button :icon="Plus" plain type="primary">新增</el-button>
              <el-button :icon="Delete" plain type="danger" :disabled="multipleSelection.length === 0"
                @click="handleDelete">删除</el-button>
              <el-button :icon="Upload" plain type="info">导入</el-button>
              <el-button :icon="Download" plain type="warning">导出</el-button>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
              <RightToolBar @refresh="getList" />
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="24" class="mt-2">
          <el-table :data="tableData" v-loading="loading" @selection-change="handleSelectionChange" stripe>
            <el-table-column type="selection" :width="50" align="center" />>
            <el-table-column show-overflow-tooltip label="用户名称" align="center" key="userName" prop="userName"
              v-if="columns[0].visible" />
            <el-table-column show-overflow-tooltip label="用户昵称" align="center" key="nickName" prop="nickName"
              v-if="columns[1].visible" />
            <el-table-column show-overflow-tooltip label="部门" align="center" key="deptName" prop="dept.deptName"
              v-if="columns[2].visible" />
            <el-table-column show-overflow-tooltip label="手机号码" align="center" key="phonenumber" prop="phonenumber"
              v-if="columns[3].visible" :width="120" />
            <el-table-column label="状态" align="center" key="status" v-if="columns[4].visible">
              <template #default="scope">
                <el-switch v-model="scope.row.status" active-value="0" inactive-value="1"></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="创建时间" align="center" prop="createTime" v-if="columns[5].visible" :width="180">
              <template #default="scope">
                <span>{{ parseTime(scope.row.createTime) }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="180" fixed="right">
              <template #default="scope">
                <div class="flex items-center justify-center">
                  <el-tooltip content="修改" placement="top" v-if="scope.row.userId !== 1">
                    <el-button circle :icon="Edit" size="small"></el-button>
                  </el-tooltip>
                  <el-tooltip content="删除" placement="top" v-if="scope.row.userId !== 1">
                    <el-button circle :icon="Delete" size="small" @click="handleDeleteOne(scope.row)"></el-button>
                  </el-tooltip>
                  <el-tooltip content="重置密码" placement="top" v-if="scope.row.userId !== 1">
                    <el-button circle :icon="RefreshRight" size="small" @click="handleResetPwd(scope.row)"></el-button>
                  </el-tooltip>
                  <el-tooltip content="分配角色" placement="top" v-if="scope.row.userId !== 1">
                    <el-button circle :icon="Rank" size="small"></el-button>
                  </el-tooltip>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col>
          <Pagination v-show="total > 0" :total="total" v-model:page="searchParams.pageNum"
            v-model:limit="searchParams.pageSize" @pagination="getList" />
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
  Edit,
  RefreshRight,
  Refresh,
  Rank,
} from '@element-plus/icons-vue'
import type { UserParams, SystemUser } from '~/api/types'
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

interface Tree {
  label: string
  children?: Tree[]
}

const handleNodeClick = (data: Tree) => {
  console.log(data)
}

const data: Tree[] = [
  {
    label: 'Level one 1',
    children: [
      {
        label: 'Level two 1-1',
        children: [
          {
            label: 'Level three 1-1-1-1-1-1-1-1-1-1-1-1-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Level one 2',
    children: [
      {
        label: 'Level two 2-1',
        children: [
          {
            label: 'Level three 2-1-1',
          },
        ],
      },
      {
        label: 'Level two 2-2',
        children: [
          {
            label: 'Level three 2-2-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Level one 3',
    children: [
      {
        label: 'Level two 3-1',
        children: [
          {
            label: 'Level three 3-1-1',
          },
        ],
      },
      {
        label: 'Level two 3-2',
        children: [
          {
            label: 'Level three 3-2-1',
          },
        ],
      },
    ],
  },
]


const getList = async () => {
  loading.value = true
  const params = useCombineDataRange(searchParams.value, createTime.value)
  try {
    const { rows, total: totalVal } = await userApi.systemUserListApi(params)
    tableData.value = rows
    total.value = totalVal
  } finally {
    loading.value = false
  }
}

const handleSelectionChange = (val: SystemUser[]) => {
  multipleSelection.value = val
}

const handleDelete = () => {
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
          .join(',')
      )
      if (code === 200) {
        ElMessage.success('删除成功')
      }
    })
    .finally(() => {
      handleReset()
    })
}

const handleDeleteOne = (row: SystemUser) => {
  ElMessageBox.confirm('是否确认删除用户名称为"' + row.userName + '"的数据项?', '警告', {
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

const handleResetPwd = (row: SystemUser) => {
  ElMessageBox.prompt('请输入重置后的密码', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern: /^.{5,20}$/,
    inputErrorMessage: "用户密码长度必须介于 5 和 20 之间",
    inputValidator: (value) => {
      if (/<|>|"|'|\||\\/.test(value)) {
        return "不能包含非法字符：< > \" ' \\\ |"
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

const handleReset = () => {
  searchFormRef.value.resetFields()
  createTime.value = []
  getList()
}

onMounted(() => {
  handleReset()
})
</script>

<style scoped></style>
