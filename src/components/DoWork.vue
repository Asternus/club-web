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
    <div v-if="time > 0">
      <p>Time remaining: {{ time }} seconds</p>
    </div>
    <div v-else>
      <p>Time is up! Reloading...</p>
    </div>
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
        if (!this.isAvailable) {
          this.startCountdown();
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    },
    async doWork() {
      try {
        const response = await api.post("/do-work", {time: this.selectedTime});
        this.time = response.data.myTime;
        window.location.href = `${config.appUrl}do-work`;
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    },
    startCountdown() {
      this.countdownInterval = setInterval(() => {
        if (this.time > 0) {
          this.time--;
        } else {
          clearInterval(this.countdownInterval);
          setTimeout(() => {
            window.location.reload();
          }, 2000); // Подождать 2 секунды перед автоматической перезагрузкой
        }
      }, 1000);
    },
  },
  beforeUnmount() {
    clearInterval(this.countdownInterval);
  },
};
</script>

