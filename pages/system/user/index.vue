<script setup lang="ts">
import type { DeptTree, Post, Role, SystemUser, UserParams } from '~/api/types'
import userApi from '~/api/user'
import systemApi from '~/api/system'
import { parseTime } from '~/utils/nuoyi'

// TODO 分配角色功能

definePageMeta({
  title: '用户管理',
  icon: 'i-mdi:account',
})

const { sys_normal_disable, sys_user_sex } = useDict('sys_normal_disable', 'sys_user_sex')

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

const form = ref<any>({
  status: '0',
})

const rules = ref<any>({
  userName: [{ required: true, message: '用户名称不能为空', trigger: 'blur' }, { min: 2, max: 20, message: '用户名称长度必须介于 2 和 20 之间', trigger: 'blur' }],
  nickName: [{ required: true, message: '用户昵称不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '用户密码不能为空', trigger: 'blur' }, { min: 5, max: 20, message: '用户密码长度必须介于 5 和 20 之间', trigger: 'blur' }, { pattern: /^[^<>"'|\\]+$/, message: '不能包含非法字符：< > " \' \\\ |', trigger: 'blur' }],
  email: [{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }],
  phonenumber: [{ pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }],
})

const searchFormRef = ref<any>()
const userRef = ref<any>()
const createTime = ref<any>([])

const loading = ref(false)
const total = ref<number>(1)
const multipleSelection = ref<SystemUser[]>([])

const userStatusOptions = ref<any>([])
const userSexOptions = ref<any>([])
const dialogTitle = ref<string>('新增用户')
const dialogVisible = ref<boolean>(false)

const tableData = ref<SystemUser[]>([])
const posts = ref<Post[]>([])
const roles = ref<Role[]>([])

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

function handleAddUser() {
  dialogTitle.value = '新增用户'
  dialogVisible.value = true
}

async function getNormalDisableDict() {
  const { data } = await systemApi.normalDiasbleApi()
  userStatusOptions.value = data
}

async function getUserSexDict() {
  const { data } = await systemApi.userSexApi()
  userSexOptions.value = data
}

async function getPostsRoles() {
  const { posts: p, roles: r } = await systemApi.userApi()
  posts.value = p
  roles.value = r
}

function handleClose() {
  dialogVisible.value = false
  form.value = {
    status: '0',
  }
  handleReset()
}

function handleConfirm() {
  userRef.value.validate(async (valid: boolean) => {
    if (valid) {
      if (dialogTitle.value === '新增用户') {
        const { code } = await userApi.addUserApi(form.value)
        if (code === 200) {
          ElMessage.success('新增成功')
          handleClose()
        }
      }
      else {
        const { code } = await userApi.updateUserApi(form.value)
        if (code === 200) {
          ElMessage.success('更新成功')
          handleClose()
        }
      }
    }
  })
}

async function handleUpdateOne(row: SystemUser) {
  await getUserInfo(row.userId)
  dialogTitle.value = '修改用户'
  dialogVisible.value = true
}

async function getUserInfo(userId: string) {
  const { data, roles: r, posts: p, roleIds: rs, postIds: ps } = await userApi.getUserApi(userId)
  posts.value = p
  roles.value = r
  form.value = data
  form.value.roleIds = rs
  form.value.postIds = ps
}

onMounted(() => {
  handleReset()
  getDept()
  getNormalDisableDict()
  getUserSexDict()
  getPostsRoles()
})
</script>

<template>
  <el-row :gutter="12">
    <el-col :xs="24" :sm="24" :md="24" :lg="4" :xl="4">
      <el-scrollbar>
        <el-tree :data="deptTree" node-key="id" highlight-current @node-click="handleNodeClick" />
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
                  v-for="item in sys_normal_disable" :key="item.value" :label="item.label"
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
              <el-button v-throttle type="primary" @click="getList">
                搜索
                <template #icon>
                  <i-mdi-search />
                </template>
              </el-button>
              <el-button v-throttle @click="handleReset()">
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
              <el-button plain type="primary" @click="handleAddUser">
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
              <el-button plain type="info">
                <template #icon>
                  <i-mdi-upload />
                </template>
                导入
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
                    <el-button circle size="small" @click="handleUpdateOne(scope.row)">
                      <template #icon>
                        <i-mdi-edit />
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
                  <el-tooltip v-if="scope.row.userId !== 1" content="重置密码" placement="top">
                    <el-button circle size="small" @click="handleResetPwd(scope.row)">
                      <template #icon>
                        <i-mdi-key />
                      </template>
                    </el-button>
                  </el-tooltip>
                  <el-tooltip v-if="scope.row.userId !== 1" content="分配角色" placement="top">
                    <el-button circle size="small">
                      <template #icon>
                        <i-mdi-arrow-all />
                      </template>
                    </el-button>
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
  <el-dialog
    v-model="dialogVisible"
    :title="dialogTitle"
    width="700"
    :before-close="handleClose"
  >
    <template #default>
      <el-form ref="userRef" :model="form" :rules="rules" label-width="80px">
        <el-row :gutter="12">
          <el-col :span="12">
            <el-form-item label="用户昵称" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入用户昵称" maxlength="30" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="归属部门" prop="deptId">
              <el-tree-select
                v-model="form.deptId"
                :data="deptTree"
                :props="{ value: 'id', label: 'label', children: 'children' }"
                value-key="id"
                placeholder="请选择归属部门"
                check-strictly
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col :span="12">
            <el-form-item label="手机号码" prop="phonenumber">
              <el-input v-model="form.phonenumber" placeholder="请输入手机号码" maxlength="11" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email" placeholder="请输入邮箱" maxlength="50" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col :span="12">
            <el-form-item v-if="form.userId === undefined" label="用户名称" prop="userName">
              <el-input v-model="form.userName" placeholder="请输入用户名称" maxlength="30" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="form.userId === undefined" label="用户密码" prop="password">
              <el-input v-model="form.password" placeholder="请输入用户密码" type="password" maxlength="20" show-password />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col :span="12">
            <el-form-item label="用户性别">
              <el-select v-model="form.sex" placeholder="请选择">
                <el-option
                  v-for="dict in sys_user_sex"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态">
              <el-radio-group v-model="form.status">
                <el-radio
                  v-for="dict in userStatusOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                >
                  {{ dict.dictLabel }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col :span="12">
            <el-form-item label="岗位">
              <el-select v-model="form.postIds" multiple placeholder="请选择">
                <el-option
                  v-for="item in posts"
                  :key="item.postId"
                  :label="item.postName"
                  :value="item.postId"
                  :disabled="item.status === 1"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色">
              <el-select v-model="form.roleIds" multiple placeholder="请选择">
                <el-option
                  v-for="item in roles"
                  :key="item.roleId"
                  :label="item.roleName"
                  :value="item.roleId"
                  :disabled="item.status === 1"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">
          取消
        </el-button>
        <el-button type="primary" @click="handleConfirm">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped></style>
