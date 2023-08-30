<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <a class="navbar-brand" href="/">Club</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li v-if="authStatus === false" class="nav-item dropdown">
          <a class="nav-link" href="http://localhost:8080/registration">Registration</a>
        </li>
        <li v-if="authStatus === false" class="nav-item dropdown">
          <a class="nav-link" href="http://localhost:8080/login">login</a>
        </li>
        <li v-if="authStatus !== false" class="nav-item dropdown">
          <a class="nav-link" href="http://localhost:8080/profile">Profile</a>
        </li>
        <li v-if="authStatus !== false" class="nav-item dropdown">
          <a class="nav-link" href="http://localhost:8080/messages">Messages</a>
        </li>
        <li v-if="authStatus !== false && roles.includes('ADMIN')" class="nav-item dropdown">
          <a class="nav-link" href="http://localhost:8080/admin-panel">Admin panel</a>
        </li>
        <li v-if="authStatus !== false" class="nav-item dropdown">
          <a class="nav-link" href="http://localhost:8080/logout">Logout</a>
        </li>
        <li v-if="authStatus !== false" class="nav-item dropdown">
          <a class="nav-link" href="http://localhost:8080/do-work">Work</a>
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
      authStatus: null,
      roles: []
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
          this.roles = response.data.roles;
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