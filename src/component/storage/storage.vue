<template>
  <div>
    <guide-bar/>
    <el-card>
      <el-row class='row-gap'>
        <el-input v-model="storageSet" class='storage-input' size='small' clearable placeholder="在这儿输入你想存储的值" />
        <el-button type='primary' icon='el-icon-circle-plus-outline' @click="save">更新缓存</el-button>
      </el-row>
      <el-row class='row-gap'>
        <el-input v-model="storageGet" class='storage-input' size='small' clearable  placeholder="这儿将展示你想读取的值" />
        <el-button type='success' icon='el-icon-circle-plus-outline' @click="load">读取缓存</el-button>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import guideBar from '../../layout/guideBar.vue';
export default {
  components: { guideBar },
  name: 'storage',
  data() {
    return {
      storageSet: '',
      storageGet: ''
    }
  },
  computed: {
    storageSetTrans() {
      return this.$storage('saveKey');
    }
  },
  methods: {
    save() {
      this.$storage('saveKey', this.storageSet);
    },
    load() {
      const val = this.$storage('saveKey');
      this.storageGet = val;
    }
  }
}
</script>

<style lang="scss" scoped>
.storage-input {
  width: 360px;
  margin-right: 8px;
}
.row-gap {
  margin-bottom: 12px;
}
</style>