<template>
  <h1>Login form</h1>
  <form @submit.prevent="login">
    <div class="mb-3">
      <label for="username" class="form-label">Email address</label>
      <input type="email" class="form-control" id="username" aria-describedby="emailHelp" v-model="username" required>
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Password</label>
      <input type="password" class="form-control" id="password" v-model="password" required>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</template>

<script>
import api from '@/services/api';
import config from '@/config';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const formData = new FormData();
        formData.append('username', this.username);
        formData.append('password', this.password);

        const response = await api.post('/login', formData, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

        // Извлечение значения куки
        const authToken = this.getCookie('SESSION'); // Здесь "SESSION" - имя куки

        if (authToken) {
          localStorage.setItem('authToken', authToken);
          sessionStorage.setItem('authToken', authToken)
        }

        window.location.href = `${config.appUrl}`;

        // Действия после успешного входа
        console.log('Logged in:', response.data);
      } catch (error) {
        console.error('Login error:', error);
      }
    },
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    },
  },
};
</script>