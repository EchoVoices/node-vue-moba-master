<template>
  <div class="about">
    <h1>{{ id ? '编辑' : '新增' }}分类</h1>
    <el-form ref="form" label-width="80px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name" key="add"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="sumbit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    id: []
  },
  data() {
    return {
      model: {}
    };
  },
  watch: {
    $route(to, from) {
      this.model.name = undefined;
      console.log(from.path); // 从哪来
      console.log(to.path); // 到哪去
    }
  },
  created() {
    this.id && this.fetch();
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`categories/${this.id}`, this.model);
      } else {
        this.model._id = undefined;
        res = await this.$http.post('categories', this.model);
      }
      if (res) {
        this.$router.push('/categories/list');
        this.$message({
          type: 'success',
          message: '保存成功'
        });
      }
    },
    async fetch() {
      const res = await this.$http.get(`categories/${this.id}`);
      this.model = res.data;
    }
  }
};
</script>
