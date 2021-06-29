<template>
  <div class="about">
    <h1>{{ id ? '编辑' : '新增' }}分类</h1>
    <el-form ref="form" :model="form" label-width="80px" :rules="rule">
      <!-- <el-row>
        <el-col :span="12">
          <el-form-item label="上级分类" prop="parent">
            <treeselect
              v-model="form.parent"
              placeholder="请选择分类"
              :show-count="true"
              :normalizer="normalizer"
              :options="classification"
            />
          </el-form-item>
        </el-col>
      </el-row> -->
      <el-row>
        <el-col :span="12">
          <el-form-item label="名称" prop="name">
            <el-input
              v-model="form.name"
              placeholder="请输入物品名称"
            ></el-input> </el-form-item
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="图标" prop="icon">
            <el-input
              v-model="form.icon"
              placeholder="请选择图标"
            ></el-input> </el-form-item
        ></el-col>
      </el-row>
      <el-form-item>
        <!-- <el-button type="primary" native-type="sumbit">保存</el-button> -->
        <el-button type="primary" @click="sumbit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// import the component
// import Treeselect from '@riophae/vue-treeselect';
// import the styles
// import '@riophae/vue-treeselect/dist/vue-treeselect.css';
// eslint-disable-next-line no-unused-vars
// import { buildTreeSelect } from '../utils/treeSelect';
export default {
  // register the component
  // components: { Treeselect },
  props: {
    id: []
  },
  data() {
    return {
      form: {},
      // normalizer(node) {
      //   return {
      //     id: node._id,
      //     label: node.name,
      //     children: node.children
      //   };
      // },
      // 表单验证规则
      rule: {
        name: [
          {
            required: true,
            message: '名称不能为空',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  watch: {
    $route(to, from) {
      this.form.name = undefined;
      this.form.parent = undefined;
      console.log(from.path); // 从哪来
      console.log(to.path); // 到哪去
    }
  },
  created() {
    this.id && this.fetch();
  },
  methods: {
    sumbit() {
      this.$refs.form.validate(async vaild => {
        if (vaild) {
          let res;
          if (this.id) {
            if (!this.form.parent) {
              this.form.parent = null;
            }
            res = await this.$http.put(`rest/items/${this.id}`, this.form);
          } else {
            this.form._id = undefined;
            res = await this.$http.post('rest/items', this.form);
          }
          if (res) {
            this.$router.push('/items/list');
            this.$message({
              type: 'success',
              message: ' 保存成功'
            });
          }
        }
      });
    },
    async fetch() {
      const res = await this.$http.get(`items/${this.id}`);
      this.form = res.data;
    }
  }
};
</script>
<style scoped>
</style>
