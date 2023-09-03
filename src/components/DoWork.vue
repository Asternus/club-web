<template>

  <div class="d-flex justify-content-start">
    <div class="card custom-card">
      <div class="card-body" v-for="workProfile in workProfiles" :key="workProfile.id">
        <h5 class="card-title">My position is {{ workProfile.position }}</h5>
        <p class="card-text">My Job name is {{ workProfile.jobName }}</p>
        <p class="card-text">My salary is {{ workProfile.salary }}</p>
      </div>
    </div>
  </div>

  <div v-if="isAvailable">
    <div> Select time:</div>
    <br>
    <select v-model="selectedJob" id="jobSelect" class="form-select" aria-label="Default select example">
      <option v-for="workProfile in workProfiles" :key="workProfile.id" :value="workProfile.salary">
        {{ workProfile.jobName }}
      </option>
    </select>
    <select v-model="selectedTime" id="timeSelect" class="form-select" aria-label="Default select example">
      <option value="10">10 seconds</option>
      <option value="15">15 seconds</option>
    </select>
    <br>
    <button @click="doWork" type="button" class="btn btn-primary">Do work</button>
  </div>

  <div v-if="!isAvailable">
    <h1>Now you in work</h1>
  </div>

</template>

<script>
import api from '@/services/api';
import config from "@/config";

export default {
  data() {
    return {
      isAvailable: false,
      time: 0,
      selectedTime: 10,
      workProfiles: [],
      selectedJob: null,
      salary: 0,
    };
  },
  mounted() {
    this.getWork();
  },
  methods: {
    async getWork() {
      try {
        const response = await api.get("/get-work");
        this.isAvailable = response.data.isAvailable;
        this.workProfiles = response.data.workProfiles;
        const reloadTime = localStorage.getItem('reloadTime');
        if (reloadTime > 0) {
          setTimeout(() => {
            window.location.href = `${config.appUrl}do-work`;
          }, reloadTime);
          localStorage.setItem('reloadTime', 0);
        }
        if (this.workProfiles.length > 0) {
          this.selectedJob = this.workProfiles[0].salary;
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    },
    async doWork() {
      try {
        console.log(this.selectedJob)
        if (this.selectedJob) {
          this.salary = this.selectedJob
        }
        await api.post("/do-work", {time: this.selectedTime, salary: this.salary});
        localStorage.setItem('reloadTime', this.selectedTime * 1000);
        window.location.href = `${config.appUrl}do-work`;
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    },
  }
}
</script>

