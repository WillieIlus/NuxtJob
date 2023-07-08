<template>
  <div>
    <div v-if="loading" class="text-center">
      Loading...
    </div>
    <div v-else-if="category">
      {{ category.name }} - {{ category.job_count }}<br />
      {{ category.description }}<br />
      {{ category.image }}
      <NuxtLink :to="`/categories/edit/${category.slug}`">
        <button>Edit</button>
      </NuxtLink>
    </div>

    <div v-else>
      {{ error }}
    </div>
  </div>
</template>
  
  
<script setup>
import { storeToRefs } from "pinia";
import { useCategoriesStore } from "~/stores/categories";


const route = useRoute();
const categoriesStore = useCategoriesStore()

const { category, loading, error } = storeToRefs(categoriesStore);


const fetchCategory = async (slug) => {
  await categoriesStore.fetchCategory(slug);
};



onMounted(() => {
  fetchCategory(route.params.slug);
});

</script>
  