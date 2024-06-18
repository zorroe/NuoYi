<script setup lang="ts">
import EditModal from './EditModal.vue'
import deptApi from '~/api/dept'

definePageMeta({
  title: '部门管理',
  icon: 'i-mdi:office-building',
})

const { sys_normal_disable } = useDict('sys_normal_disable')
const searchFormRef = ref()

const searchParams = ref({
  deptName: undefined,
  status: undefined,
})

const loading = ref<boolean>(false)
const tableData = ref<any>([])
const refreshTable = ref(true)
const isExpandAll = ref(false)
const editRow = ref<any>({})
const dialogVisible = ref(false)

async function getList() {
  loading.value = true
  const params = searchParams.value
  try {
    const { data } = await deptApi.deptListApi(params)
    tableData.value = useHandleTree(data, 'deptId')
  }
  finally {
    loading.value = false
  }
}

function handleReset() {
  searchFormRef.value.resetFields()
  getList()
}

function toogleExpandAll() {
  refreshTable.value = false
  isExpandAll.value = !isExpandAll.value
  nextTick(() => {
    refreshTable.value = true
  })
}

function editDept(row: any) {
  editRow.value = row
  dialogVisible.value = true
}

function handleDeleteOne(row: any) {
  ElMessageBox.confirm(`是否确认删除部门【${row.deptName}】`, '确认', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      const { code, msg } = await deptApi.deptDeleteApi(row.deptId)
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

onMounted(() => {
  handleReset()
})
</script>

<template>
  <el-row>
    <el-col :span="24">
      <el-form ref="searchFormRef" inline :label-width="70" :model="searchParams" label-position="left">
        <el-form-item label="部门名称" prop="deptName">
          <el-input v-model="searchParams.deptName" placeholder="部门名称" clearable style="width: 220px" />
        </el-form-item>
        <el-form-item label="部门状态" prop="status">
          <el-select
            v-model="searchParams.status"
            placeholder="部门状态"
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
            plain type="danger" @click="toogleExpandAll"
          >
            <template #icon>
              <i-mdi-menu-swap />
            </template>
            展开/折叠
          </el-button>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
          <RightToolBar @refresh="getList" />
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="24" class="mt-2">
      <el-table
        v-if="refreshTable"
        v-loading="loading"
        :data="tableData"
        row-key="deptId"
        :default-expand-all="isExpandAll"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="deptName" label="部门名称" width="260" />
        <el-table-column prop="orderNum" label="排序" width="200" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <DictTag :options="sys_normal_disable" :value="scope.row.status" />
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center" prop="createTime" width="200">
          <template #default="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button circle size="small" @click="editDept(scope.row)">
                <template #icon>
                  <i-mdi-pencil />
                </template>
              </el-button>
            </el-tooltip>
            <el-tooltip content="新增" placement="top">
              <el-button circle size="small">
                <template #icon>
                  <i-mdi-plus />
                </template>
              </el-button>
            </el-tooltip>
            <el-tooltip v-if="scope.row.parentId !== 0" content="删除" placement="top">
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
  </el-row>
  <EditModal v-model:dialog-visible="dialogVisible" :data="editRow" dialog-title="编辑部门" />
</template>

<style scoped></style>
