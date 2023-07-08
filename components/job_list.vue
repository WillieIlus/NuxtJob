<template>
  <div v-if="jobs">
    <div v-for="job in jobs" :key="job.id">
      <div class="p-6">
        <NuxtLink :to="`/jobs/${job.slug}`">{{ job.title }}</NuxtLink>
        <p>
          Posted {{ job.time_since }} Days ago
        </p>
        <div>
          {{ job.on_site ? 'OnSite' : 'Remote' }}

          <p> {{ job.salary }}
          </p>
        </div>
      </div>
      <div>
        <img :src="job.company.logo" alt="job.company.name" />
        <div>
          <h6>{{ job.company.name }}</h6>
          <span>{{ job.location }}</span>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="loading">
    <p>Loading...</p>
  </div>
  <div v-else-if="error">
    <p>Error: {{ error.message }}</p>
  </div>
</template>

<script setup>
defineProps(['jobs', 'loading', 'error']);
</script>
