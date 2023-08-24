<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username"/>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password"/>
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

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

        const response = await axios.post('http://localhost:5000/login', formData, {
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

        window.location.href = '/';

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