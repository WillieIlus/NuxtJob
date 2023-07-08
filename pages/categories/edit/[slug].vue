<template>
  <div>
    <!-- Edit -->
    <form @submit.prevent="handleSubmit">
      <BaseInput v-model="updatedCategory.name" label="Name" type="text" />
      <BaseInput v-model="updatedCategory.description" label="Description" type="text" />
      <div>
        <button type="submit">Update</button>
      </div>
    </form>
  </div>
</template>
    
    
<script setup>
import { storeToRefs } from "pinia";
import { useCategoriesStore } from "~/stores/categories";
import slugify from 'slugify';

const route = useRoute();
const categoriesStore = useCategoriesStore()

const { category, loading, error } = storeToRefs(categoriesStore);
// const { fetchCategory } = categoriesStore;

const updatedCategory = ref({
  name: category.value ? category.value.name : '',
  description: category.value ? category.value.description : '',

});


const fetchCategory = async (slug) => {
  await categoriesStore.fetchCategory(slug);
};

const handleSubmit = async () => {
  try {
    const slug = slugify(updatedCategory.value.name, { lower: true });
    updatedCategory.value.slug = slug;

    await categoriesStore.editCategory(category.value.slug, updatedCategory.value);
  } catch (error) {
    console.error(error);

    if (error.response) {
      if (error.response.status == 404) {
        mythis.errorList = error.response.data.errors;
      }
    }
  }
}



onMounted(() => {
  fetchCategory(route.params.slug);
});

</script>
    