<template>
    <JobList :jobs="jobs" :loading="loading" :error="error" />

    <form @submit.prevent="handleSubmit">
        <BaseSelect v-model="job.user" label="User" type="text" /><br />
        <BaseSelect v-model="job.company" label="Company" type="text" /><br />
        <BaseInputt v-model="job.title" label="Title" type="text" /><br />
        <BaseSelect v-model="job.category" label="Category" type="text" /><br />
        <BaseInput v-model="job.contact_email" label="Contact Email" type="text" /><br />
        <BaseInput v-model="job.description" label="Description" type="text" /><br />
        <BaseInput v-model="job.duration_days" label="Duration Days" type="text" /><br />
        <BaseInput v-model="job.location" label="Location" type="text" /><br />
        <BaseRadioGroup v-model="job.on_site" label="On Site" type="text" /><br />
        <BaseInput v-model="job.openings" label="Openings" type="text" /><br />
        <BaseInput v-model="job.poster" label="Poster" type="text" /><br />
        <BaseInput v-model="job.requirements" label="Requirements" type="text" /><br />
        <BaseInput v-model="job.salary" label="Salary" type="text" /><br />
        <BaseSelect v-model="job.plan" label="Plan" type="text" /><br />
        <BaseInput v-model="job.url" label="URL" type="text" /><br />
        <BaseInput v-model="job.work_hours" label="Work Hours" type="text" /><br />
        <div>
            <button type="submit">Submit</button>
        </div>
    </form>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useJobsStore } from "@/stores/jobs";

const props = defineProps(['jobs']);

const jobStore = useJobsStore();

const { jobs, loading, error } = storeToRefs(jobStore);
const { fetchJobs } = jobStore;

const job = ref({
    user: '',
    company: '',
    title: '',
    category: '',
    contact_email: '',
    description: '',
    duration_days: '',
    location: '',
    on_site: '',
    openings: '',
    poster: '',
    requirements: '',
    salary: '',
    slug: '',
    plan: '',
    url: '',
    work_hours: ''
});


const handleSubmit = async () => {
    try {
        const slug = slugify(job.title, { lower: true });
        job.slug = slug;

        await jobsStore.addJob({
            user: job.user,
            company: job.company,
            title: job.title,
            category: job.category,
            contact_email: job.contact_email,
            description: job.description,
            duration_days: job.duration_days,
            location: job.location,
            on_site: job.on_site,
            openings: job.openings,
            poster: job.poster,
            requirements: job.requirements,
            salary: job.salary,
            slug: job.slug,
            plan: job.plan,
            url: job.url,
            work_hours: job.work_hours
        });

        // Resetting the form fields
        job.user = '';
        job.company = '';
        job.title = '';
        job.category = '';
        job.contact_email = '';
        job.description = '';
        job.duration_days = '';
        job.location = '';
        job.on_site = '';
        job.openings = '';
        job.poster = '';
        job.requirements = '';
        job.salary = '';
        job.slug = '';
        job.plan = '';
        job.url = '';
        job.work_hours = '';
    } catch (error) {
        console.error(error);
    }
};



onMounted(() => {
    fetchJobs();
});
</script>
  