<template>
  <div class="navbar-fixed">
  <nav>
    <div class="nav-wrapper">
      <a href="/" class="brand-logo right">Club</a>
      <ul id="nav-mobile" class="left hide-on-med-and-down">
        <li v-if="authStatus === false">
          <a class="nav-link" href="http://localhost:8080/registration">Registration</a>
        </li>
        <li v-if="authStatus !== false">
          <a class="nav-link" href="http://localhost:8080/messages">Messages</a>
        </li>
        <li v-if="authStatus === false">
          <a class="nav-link" href="http://localhost:8080/login">login</a>
        </li>
        <li v-if="authStatus !== false">
          <a class="nav-link" href="http://localhost:8080/logout">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
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
  },
  created() {
    this.checkAuthStatus();
  }
};
</script>

<style>
nav {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}

.nav-wrapper {
  padding-left: 20px;
  padding-right: 20px;
}

.brand-logo {
  margin-right: 20px;
}
</style>