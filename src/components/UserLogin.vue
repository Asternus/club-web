<template>
  <div>
    <div class="center-container">
      <form @submit.prevent="login" class="fixed-form">
        <h1>Login</h1>
        <div>
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required/>
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required/>
        </div>
        <button class="btn waves-effect waves-light" type="submit" name="action">Login
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
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

        window.location.href = 'http://localhost:8080/';

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

<style>
.center-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.fixed-form {
  position: fixed;
  top: 120px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%; /* Задайте желаемую ширину формы */
  background-color: white;
  padding: 20px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}
</style>