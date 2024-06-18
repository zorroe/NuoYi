<script setup lang="ts">
defineProps({
  dialogTitle: {
    type: String,
    default: '编辑部门',
  },
  data: {
    type: Object,
    default: () => {},
  },
})

const emit = defineEmits(['close'])

const dialogVisible = defineModel<boolean>('dialogVisible')

const deptInfoRef = ref()

const deptOptions = ref<any>([])

const { sys_normal_disable } = useDict('sys_normal_disable')

function handleClose() {
  deptInfoRef.value.resetFields()
  dialogVisible.value = false
}
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="dialogTitle"
    width="660"
    :before-close="handleClose"
  >
    <el-form ref="deptInfoRef" inline :model="data" :label-width="80">
      <el-form-item v-if="data.parentId !== 0" label="上级部门" prop="parentId">
        <el-tree-select
          v-model="data.parentId"
          :data="deptOptions"
          :props="{ value: 'deptId', label: 'deptName', children: 'children' }"
          value-key="deptId"
          placeholder="选择上级部门"
          check-strictly
        />
      </el-form-item>
      <el-form-item label="部门名称" prop="deptName">
        <el-input v-model="data.deptName" placeholder="部门名称" />
      </el-form-item>
      <el-form-item label="显示排序" prop="orderNum">
        <el-input-number
          v-model="data.orderNum"
          :step="1"
          :min="0"
          controls-position="right"
        />
      </el-form-item>
      <el-form-item label="负责人" prop="leader">
        <el-input v-model="data.leader" placeholder="负责人" />
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="data.phone" placeholder="联系电话" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="data.email" placeholder="邮箱" />
      </el-form-item>
      <el-form-item label="部门状态" prop="status">
        <el-radio-group v-model="data.status">
          <el-radio
            v-for="dict in sys_normal_disable"
            :key="dict.value"
            :label="dict.value"
          >
            {{ dict.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">
          取消
        </el-button>
        <el-button type="primary">
          保存
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>
