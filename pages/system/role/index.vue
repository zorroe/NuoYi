<script setup lang="ts">
definePageMeta({
  title: '角色管理',
  icon: 'i-mdi:account-group',
})

const searchFormRef = ref()

const searchParams = ref({
  pageNum: 1,
  pageSize: 10,
  roleName: undefined,
  roleKey: undefined,
  status: undefined,
})

const createTime = ref<any>([])

const multipleSelection = ref<any>([])

function getList() {

}

function handleDelete() {

}
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
          <el-input v-model="searchParams.status" placeholder="角色状态" clearable style="width: 220px" />
        </el-form-item>
        <el-form-item label="创建时间" prop="createTime">
          <el-date-picker
            v-model="createTime" type="daterange" unlink-panels range-separator="至"
            style="width: 200px" value-format="YYYY-MM-DD" format="YYYY-MM-DD" start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item>
          <el-button v-throttle type="primary">
            搜索
            <template #icon>
              <i-mdi-search />
            </template>
          </el-button>
          <el-button v-throttle>
            <template #icon>
              <i-mdi-refresh />
            </template>
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
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
</template>

<style scoped></style>
