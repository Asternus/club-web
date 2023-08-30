<template>
  <div class="d-flex justify-content-start">
    <div class="card custom-card">
      <h1> {{ user.username }} </h1>
      <div class="card-body">
        <h5 class="card-title">{{ user.id }}</h5>
        <p class="card-text">{{ user.email }}</p>
        <p class="card-text">{{ wallet.aster }}</p>
      </div>
    </div>
  </div>

</template>

<script>
import api from '@/services/api';

export default {
  data() {
    return {
      user: {},
      wallet: {},
    };
  },
  mounted() {
    this.fetchUser();
  },
  methods: {
    async fetchUser() {
      try {
        const response = await api.get("/profile");
        this.user = response.data;
        this.wallet = response.data.wallet;
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    },
  },
};
</script>

<style>
.custom-card {
  width: auto;
  margin-right: auto; /* Отодвигает карточку от правого края */
}
</style>
