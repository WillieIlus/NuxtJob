
<template>
  <div>
    <div v-if="job" class="relative overflow-hidden bg-white py-16">
      <div class="hidden lg:absolute lg:inset-y-0 lg:block lg:h-full lg:w-full lg:[overflow-anchor:none]">
        <div class="relative mx-auto h-full max-w-prose text-lg" aria-hidden="true">
          <svg class="absolute top-12 left-full translate-x-32 transform" width="404" height="384" fill="none"
            viewBox="0 0 404 384">
            <defs>
              <pattern id="74b3fd99-0a6f-4271-bef2-e80eeafdf357" x="0" y="0" width="20" height="20"
                patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="404" height="384" fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)" />
          </svg>
          <svg class="absolute top-1/2 right-full -translate-y-1/2 -translate-x-32 transform" width="404" height="384"
            fill="none" viewBox="0 0 404 384">
            <defs>
              <pattern id="f210dbf6-a58d-4871-961e-36d5016a0f49" x="0" y="0" width="20" height="20"
                patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="404" height="384" fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)" />
          </svg>
          <svg class="absolute bottom-12 left-full translate-x-32 transform" width="404" height="384" fill="none"
            viewBox="0 0 404 384">
            <defs>
              <pattern id="d3eb07ae-5182-43e6-857d-35c643af9034" x="0" y="0" width="20" height="20"
                patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="404" height="384" fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)" />
          </svg>
        </div>
      </div>
      <div class="relative px-6 lg:px-8">
        <div class="mx-auto max-w-prose text-lg">
          <h1>
            <span class="block text-center text-lg font-semibold text-indigo-600">Introducing</span>
            <span class="mt-2 block text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">{{
              job.title }}</span>
          </h1>
          <p class="mt-8 text-xl leading-8 text-gray-500">{{ job.description }}</p>
        </div>
        <div class="prose prose-lg prose-indigo mx-auto mt-6 text-gray-500">
          <p>{{ job.requirements }}</p>
        </div>
      </div>
      <div class="text-center">
        <h3 class="mb-4 font-medium text-xl">
          <div v-if="job.category">{{ job.category }},</div>
          <div v-if="job.location">{{ job.location }}</div>
        </h3>
        <div v-if="job.openings">
          <p class="text-gray-600 mb-2">
            Openings: {{ job.openings }}
          </p>
        </div>

        <div v-if="job.poster" class="mb-4">
          <img :src="job.poster" alt="Job Poster" class="rounded-lg w-full">
        </div>

        <div v-if="job.salary">
          <p class="text-gray-600 mb-2">
            Salary: {{ job.salary }}
          </p>
        </div>

        <div v-if="job.work_hours">
          <p class="text-gray-600 mb-4">
            Work Hours: {{ job.work_hours }}
          </p>
        </div>
        <div v-if="job.contact_email === undefined">
          <a type="button" :href="'mailto:' + job.user_mail"
            class="relative inline-flex items-center rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800">
            Apply
          </a>
        </div>
        <div v-else>
          <a type="button" :href="'mailto:' + job.contact_email"
            class="relative inline-flex items-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800">
            Apply
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>

import { storeToRefs } from "pinia";
import { useJobsStore } from "@/stores/jobs";
import { useRoute } from "vue-router";

const jobsStore = useJobsStore();
const { job, loading, error } = storeToRefs(jobsStore);
const { fetchJob } = jobsStore;
const route = useRoute();

onMounted(() => {
  fetchJob(route.params.slug);
});
</script>
  