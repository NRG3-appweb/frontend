<script>

export default {
  name: "category-filter",
  props: {
    categories: {
      type: Array,
      default: []
    },
    modelValue: {
      type: Array,
      default: []
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      selectedCategories: this.modelValue
    };
  },
  watch: {
    selectedCategories(newVal) {
      this.$emit('update:modelValue', newVal);
    }
  }
};
</script>

<template>

  <pv-card class="m-1 w-auto">
    <template #title>Categories</template>
    <template #content>
      <div class="card flex justify-center">
        <div class="flex flex-column gap-2">
          <div v-for="category in categories" :key="category.id" class="">
            <pv-checkbox v-model="selectedCategories"  name="category"
                         :value="category"/>
            <label :for="category.id"> {{category.category_name}}</label>
          </div>
        </div>
      </div>
    </template>
  </pv-card>
</template>

<style scoped>
</style>