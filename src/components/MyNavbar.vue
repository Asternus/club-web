<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <a class="navbar-brand" href="http://localhost:8080/">Navbar</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li v-if="authStatus === false" class="nav-item active">
          <a class="nav-link" href="http://localhost:8080/registration">Registration <span
              class="sr-only">(current)</span></a>
        </li>
        <li v-if="authStatus !== false" class="nav-item">
          <a class="nav-link" href="http://localhost:8080/messages">Messages</a>
        </li>
        <li v-if="authStatus === false" class="nav-item">
          <a class="nav-link" href="http://localhost:8080/login">login</a>
        </li>
        <li v-if="authStatus !== false" class="nav-item active">
          <a class="nav-link" href="http://localhost:8080/logout">Logout <span
              class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#">Disabled</a>
        </li>
      </ul>
    </div>
  </nav>
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
  },
  created() {
    this.checkAuthStatus();
  }
};
</script>