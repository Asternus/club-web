<template>
  <div>
    <h1>Регистрация пользователя</h1>
    <form @submit.prevent="registerUser">
      <div>
        <label for="username">Имя пользователя:</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div>
        <label for="password">Пароль:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <div>
        <button type="submit">Зарегистрироваться</button>
      </div>
    </form>
    <div v-if="registrationError" class="error-message">
      {{ registrationError }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      registrationError: ''
    };
  },
  methods: {
    async registerUser() {
      try {
        const response = await axios.post('http://localhost:5000/add-user', {
          username: this.username,
          email: this.email,
          password: this.password
        });
        // Обработка успешной регистрации
        console.log('Пользователь успешно зарегистрирован:', response.data);
      } catch (error) {
        console.error('Ошибка при регистрации пользователя:', error);
        this.registrationError = 'Ошибка при регистрации пользователя';
      }
    }
  }
};
</script>

<style>
.error-message {
  color: red;
  margin-top: 10px;
}
</style>
