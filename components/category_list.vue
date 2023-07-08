<template>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">
        <p>{{ error }}</p>
    </div>
    <div v-else>
        <ul>
            <div v-if="categories">
                <li v-for="category in categories" :key="category.id">
                    <NuxtLink :to="`/categories/${category.slug}/`">
                        {{ category.name }} - ({{ category.job_count }})
                    </NuxtLink>
                </li>
            </div>
        </ul>
    </div>
</template>

<script setup>
defineProps(['categories', 'loading', 'error']);
</script>
  