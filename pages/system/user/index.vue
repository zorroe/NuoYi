<template>
  <el-row :gutter="12">
    <el-col
      :xs="24"
      :sm="24"
      :md="24"
      :lg="4"
      :xl="4"
      >> 树状结构
    </el-col>
    <el-col
      :xs="24"
      :sm="24"
      :md="24"
      :lg="20"
      :xl="20">
      <el-row>
        <el-col :span="24">
          <el-form
            inline
            :label-width="80"
            :model="searchParams"
            ref="searchFormRef">
            <el-form-item
              label="用户名称"
              prop="userName">
              <el-input
                v-model="searchParams.userName"
                placeholder="用户名称"
                clearable />
            </el-form-item>
            <el-form-item
              label="手机号码"
              prop="phonenumber">
              <el-input
                v-model="searchParams.phonenumber"
                placeholder="手机号码"
                clearable />
            </el-form-item>
            <el-form-item
              label="状态"
              prop="status">
              <el-select
                v-model="searchParams.status"
                placeholder="用户状态"
                style="width: 240px">
                <el-option
                  v-for="item in userStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-date-picker
                v-model="createTime"
                type="daterange"
                unlink-panels
                range-separator="至"
                value-format="YYYY-MM-DD"
                format="YYYY-MM-DD"
                start-placeholder="开始日期"
                end-placeholder="结束日期" />
            </el-form-item>
            <el-form-item>
              <el-button
                :icon="Search"
                type="primary"
                @click="getList"
                >搜索</el-button
              >
              <el-button
                :icon="Refresh"
                @click="handleReset()"
                >重置</el-button
              >
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="24">
          <el-row>
            <el-col
              :xs="24"
              :sm="24"
              :md="24"
              :lg="16"
              :xl="16">
              <el-button
                :icon="Plus"
                plain
                type="primary"
                >新增</el-button
              >
              <el-button
                :icon="Delete"
                plain
                type="danger"
                >删除</el-button
              >
              <el-button
                :icon="Upload"
                plain
                type="info"
                >导入</el-button
              >
              <el-button
                :icon="Download"
                plain
                type="warning"
                >导出</el-button
              >
            </el-col>
            <el-col
              :xs="24"
              :sm="24"
              :md="24"
              :lg="8"
              :xl="8">
              <RightToolBar />
            </el-col>
          </el-row>
        </el-col>
        <el-col
          :span="24"
          class="mt-2">
          <el-table
            :data="tableData"
            stripe>
            <el-table-column
              type="selection"
              :width="50"
              align="center" />>
            <el-table-column
              show-overflow-tooltip
              label="用户名称"
              align="center"
              key="userName"
              prop="userName"
              v-if="columns[0].visible" />
            <el-table-column
              show-overflow-tooltip
              label="用户昵称"
              align="center"
              key="nickName"
              prop="nickName"
              v-if="columns[1].visible" />
            <el-table-column
              show-overflow-tooltip
              label="部门"
              align="center"
              key="deptName"
              prop="dept.deptName"
              v-if="columns[2].visible" />
            <el-table-column
              show-overflow-tooltip
              label="手机号码"
              align="center"
              key="phonenumber"
              prop="phonenumber"
              v-if="columns[3].visible"
              :width="120" />
            <el-table-column
              label="状态"
              align="center"
              key="status"
              v-if="columns[4].visible">
              <template #default="scope">
                <el-switch
                  v-model="scope.row.status"
                  active-value="0"
                  inactive-value="1"></el-switch>
              </template>
            </el-table-column>
            <el-table-column
              label="创建时间"
              align="center"
              prop="createTime"
              v-if="columns[5].visible"
              :width="180">
              <template #default="scope">
                <span>{{ parseTime(scope.row.createTime) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
              width="180"
              fixed="right">
              <template #default="scope">
                <div class="flex items-center justify-center">
                  <el-tooltip
                    content="修改"
                    placement="top"
                    v-if="scope.row.userId !== 1">
                    <el-button
                      circle
                      :icon="Edit"
                      size="small"></el-button>
                  </el-tooltip>
                  <el-tooltip
                    content="删除"
                    placement="top"
                    v-if="scope.row.userId !== 1">
                    <el-button
                      circle
                      :icon="Delete"
                      size="small"></el-button>
                  </el-tooltip>
                  <el-tooltip
                    content="重置密码"
                    placement="top"
                    v-if="scope.row.userId !== 1">
                    <el-button
                      circle
                      :icon="RefreshRight"
                      size="small"></el-button>
                  </el-tooltip>
                  <el-tooltip
                    content="分配角色"
                    placement="top"
                    v-if="scope.row.userId !== 1">
                    <el-button
                      circle
                      :icon="Rank"
                      size="small"></el-button>
                  </el-tooltip>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col>
          <Pagination
            v-show="total > 0"
            :total="total"
            v-model:page="searchParams.pageNum"
            v-model:limit="searchParams.pageSize"
            @pagination="getList" />
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

const total = ref<number>(1)

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

const getList = async () => {
  const params = useCombineDataRange(searchParams.value, createTime.value)
  const { rows } = await userApi.systemUserListApi(params)
  tableData.value = rows
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
