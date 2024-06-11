<script setup lang="ts">
import roleApi from '~/api/role'

definePageMeta({
  title: '部门管理',
  icon: 'i-mdi:office-building',
})

const { sys_normal_disable } = useDict('sys_normal_disable')
const tableRef = ref<any>()
const searchFormRef = ref()

const searchParams = ref({
  pageNum: 1,
  pageSize: 10,
  deptName: undefined,
  status: undefined,
})

const createTime = ref<any>([])
const loading = ref<boolean>(false)
const tableData = ref<any>([])
const total = ref(0)

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

onMounted(() => {
  handleReset()
})
</script>

<template>
  <el-row>
    <el-col :span="24">
      <el-form ref="searchFormRef" inline :label-width="70" :model="searchParams" label-position="left">
        <el-form-item label="部门名称" prop="roleName">
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
            plain type="danger"
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
      <div>占位</div>
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
