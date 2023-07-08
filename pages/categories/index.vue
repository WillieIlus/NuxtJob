<template>
  <CategoryList :categories="categories" :loading="loading" :error="error" />

  <form @submit.prevent="handleSubmit">
    <BaseInput v-model="category.name" label="Name" type="text" />
    <BaseInput v-model="category.description" label="Description" type="text" />
    <div>
      <button type="submit">Submit</button>
    </div>
  </form>
</template>

<script setup>
import { storeToRefs } from "pinia";
import slugify from 'slugify';

import { useCategoriesStore } from "@/stores/categories";

const props = defineProps(['category', 'loading', 'error']);

const categoriesStore = useCategoriesStore();
const { categories, loading, error } = storeToRefs(categoriesStore);
const { fetchCategories } = categoriesStore;

const category = ref({
  name: '',
  description: '',
});

const handleSubmit = async () => {
  try {
    const slug = slugify(category.value.name, { lower: true });
    category.value.slug = slug;

    await categoriesStore.addCategory(category.value);
    category.value.name = '';
    category.value.description = '';
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetchCategories();
});

</script>
  