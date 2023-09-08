<template>

  <div class="d-flex justify-content-start">
    <div class="card custom-card">
      <div class="card-body" v-for="workProfile in workList" :key="workProfile.id">
        <h5 class="card-title">Company is {{ workProfile.companyProfile.companyName }}</h5>
        <h5 class="card-title">Company description is {{ workProfile.companyProfile.description }}</h5>
        <h5 class="card-title">Company employees is {{ workProfile.companyProfile.employees }}</h5>
        <h5 class="card-title">Position is {{ workProfile.position }}</h5>
        <p class="card-text">Job name is {{ workProfile.jobName }}</p>
        <p class="card-text">Salary is {{ workProfile.salary }}</p>
        <button @click="takeVacancy(workProfile.id)" type="button" class="btn btn-primary">Do work</button>
      </div>
    </div>
  </div>

</template>

<script>
import api from '@/services/api';
import config from "@/config";

export default {
  data() {
    return {
      workList: [],
      companyProfile: {}
    };
  },
  mounted() {
    this.getVacancy();
  },
  methods: {
    async getVacancy() {
      try {
        const response = await api.get("/get-vacancy");
        this.workList = response.data;
        this.companyProfile = response.data.companyProfile;
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    },
    async takeVacancy(profileId) {
      try {
        await api.post("/take-vacancy", {vacancyId: profileId});
        window.location.href = `${config.appUrl}get-vacancy`;
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    },
  }
}
</script>

