<template>
  <div>
    <button @click="checkAuthStatus">Check Auth Status</button>
    <p v-if="authStatus !== null">
      Authenticated: {{ authStatus ? 'true' : 'false' }}
    </p>
  </div>
</template>

<script>
import api from '@/services/api';

export default {
  data() {
    return {
      authStatus: null
    };
  },
  methods: {
    async checkAuthStatus() {
      try {
        const response = await api.get('/auth/status', {
          withCredentials: true // This includes cookies in the request
        });

        if (response.status === 200) {
          this.authStatus = response.data.authenticated;
        } else {
          console.error('Error fetching auth status');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
  }
};
</script>
