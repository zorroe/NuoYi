<script setup lang="ts">
import roleApi from '~/api/role'

definePageMeta({
  title: '角色管理',
  icon: 'i-mdi:account-group',
})

const { sys_normal_disable } = useDict('sys_normal_disable')
const tableRef = ref<any>()
const searchFormRef = ref()

const searchParams = ref({
  pageNum: 1,
  pageSize: 10,
  roleName: undefined,
  roleKey: undefined,
  status: undefined,
})

const createTime = ref<any>([])
const loading = ref<boolean>(false)
const tableData = ref<any>([])
const total = ref(0)

const multipleSelection = ref<any>([])

async function getList() {
  loading.value = true
  const params = useCombineDataRange(searchParams.value, createTime.value)
  try {
    const { rows, total: totalVal } = await roleApi.systemRoleListApi(params)
    tableData.value = rows
    total.value = totalVal
  }
  finally {
    loading.value = false
  }
}

function handleReset() {
  searchFormRef.value.resetFields()
  createTime.value = []
  getList()
}

function handleDelete() {
  const ids = multipleSelection.value.map((item: any) => item.roleId)
  if (ids.length === 0) {
    ElMessage.warning('请选择需要删除的角色')
    return
  }
  ElMessageBox.confirm(
      `是否删除选中的${ids.length}个角色`,
      '确认',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      },
  ).then(async () => {
    const { code, msg } = await roleApi.deleteSystemRoleApi(ids.join(','))
    if (code === 200) {
      ElMessage.success('删除成功')
    }
    else {
      ElMessage.error(msg)
    }
  }).finally(() => {
    getList()
  })
}

function handleUpdateOne(row: any) {
  console.log(row)
}

function handleDeleteOne(row: any) {
  ElMessageBox.confirm(
      `是否删除角色【${row.roleName}】`,
      '确认',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      },
  ).then(async () => {
    const { code, msg } = await roleApi.deleteSystemRoleApi(row.roleId)
    if (code === 200) {
      ElMessage.success('删除成功')
    }
    else {
      ElMessage.error(msg)
    }
  }).finally(() => {
    getList()
  })
}

function handleSelectionChange(val: any) {
  multipleSelection.value = val
}

function handleStatusChange(row: any) {
  const data = {
    roleId: row.roleId,
    status: row.status,
  }
  ElMessageBox.confirm(
      `是否${row.status === '0' ? '启用' : '停用'}角色【${row.roleName}】`,
      '确认',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      },
  ).then(async () => {
    const { code, msg } = await roleApi.roleChangeStatusApi(data)
    if (code === 200) {
      ElMessage.success('操作成功')
    }
    else {
      row.status = row.status === '0' ? '1' : '0'
      ElMessage.error(msg)
    }
  }).catch(() => {
    row.status = row.status === '0' ? '1' : '0'
  })
}

onMounted(() => {
  handleReset()
})
</script>

<template>
  <el-row>
    <el-col :span="24">
      <el-form ref="searchFormRef" inline :label-width="70" :model="searchParams" label-position="left">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="searchParams.roleName" placeholder="角色名称" clearable style="width: 220px" />
        </el-form-item>
        <el-form-item label="权限字符" prop="roleKey">
          <el-input v-model="searchParams.roleName" placeholder="角色名称" clearable style="width: 220px" />
        </el-form-item>
        <el-form-item label="角色状态" prop="status">
          <el-select
            v-model="searchParams.status"
            placeholder="角色状态"
            style="width: 220px"
          >
            <el-option
              v-for="item in sys_normal_disable"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间" prop="createTime">
          <el-date-picker
            v-model="createTime" type="daterange" unlink-panels range-separator="至"
            style="width: 200px" value-format="YYYY-MM-DD" format="YYYY-MM-DD" start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item>
          <el-button v-throttle type="primary" @click="getList">
            搜索
            <template #icon>
              <i-mdi-search />
            </template>
          </el-button>
          <el-button v-throttle @click="handleReset">
            <template #icon>
              <i-mdi-refresh />
            </template>
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="24">
      <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
          <el-button plain type="primary">
            <template #icon>
              <i-mdi-plus />
            </template>
            新增
          </el-button>
          <el-button
            plain type="danger" :disabled="multipleSelection.length === 0"
            @click="handleDelete"
          >
            <template #icon>
              <i-mdi-delete />
            </template>
            删除
          </el-button>
          <el-button plain type="warning">
            <template #icon>
              <i-mdi-download />
            </template>
            导出
          </el-button>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
          <RightToolBar @refresh="getList" />
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="24" class="mt-2">
      <el-table
        ref="tableRef" v-loading="loading" :data="tableData"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="50" />
        <el-table-column prop="roleId" label="角色编号" width="110" />
        <el-table-column prop="roleName" label="角色名称" />
        <el-table-column prop="roleKey" label="权限字符" />
        <el-table-column prop="roleSort" label="显示顺序" width="100" />
        <el-table-column prop="status" label="角色状态" width="100">
          <template #default="scope">
            <el-switch
              v-model="scope.row.status"
              active-value="0"
              inactive-value="1"
              @change="handleStatusChange(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column label="操作" width="220">
          <template #default="scope">
            <el-tooltip v-if="scope.row.userId !== 1" content="修改" placement="top">
              <el-button circle size="small" @click="handleUpdateOne(scope.row)">
                <template #icon>
                  <i-mdi-edit />
                </template>
              </el-button>
            </el-tooltip>

            <el-tooltip v-if="scope.row.userId !== 1" content="数据权限" placement="top">
              <el-button circle size="small">
                <template #icon>
                  <i-mdi-eye />
                </template>
              </el-button>
            </el-tooltip>
            <el-tooltip v-if="scope.row.userId !== 1" content="分配用户" placement="top">
              <el-button circle size="small">
                <template #icon>
                  <i-mdi-account />
                </template>
              </el-button>
            </el-tooltip>
            <el-tooltip v-if="scope.row.userId !== 1" content="删除" placement="top">
              <el-button circle size="small" @click="handleDeleteOne(scope.row)">
                <template #icon>
                  <i-mdi-delete />
                </template>
              </el-button>
            </el-tooltip>
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
</template>

<style scoped></style>
