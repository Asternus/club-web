<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" />
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
          withCredentials: true, // Включить передачу куки и авторизационных данных
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded', // Установить заголовок для данных формы
          },
        });
        // Действия после успешного входа
        console.log('Logged in:', response.data);
      } catch (error) {
        console.error('Login error:', error);
      }
    },
  },
};
</script>