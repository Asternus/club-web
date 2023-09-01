<template>

  <div v-if="isAvailable">
    <label for="timeSelect">Select time:</label>
    <select v-model="selectedTime" id="timeSelect">
      <option value="10">10 seconds</option>
      <option value="15">15 seconds</option>
    </select>
    <button @click="doWork">Do work</button>
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
        const reloadTime = localStorage.getItem('reloadTime');
        if (reloadTime > 0) {
          setTimeout(() => {
            window.location.href = `${config.appUrl}do-work`;
          }, reloadTime);
          localStorage.setItem('reloadTime', 0);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    },
    async doWork() {
      try {
        await api.post("/do-work", {time: this.selectedTime});
        localStorage.setItem('reloadTime', this.selectedTime * 1000);
        window.location.href = `${config.appUrl}do-work`;
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    },
  }
}
</script>

