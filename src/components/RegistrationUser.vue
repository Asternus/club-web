<template>
  <h1> Registration </h1>
  <form @submit.prevent="registerUser">
    <div class="mb-3">
      <label for="username">User name</label>
      <input type="text" class="form-control" id="username" aria-describedby="emailHelp" placeholder="Enter username" v-model="username" required>
      <div v-if="registrationError.username" class="error-message">
        {{ registrationError.username }}
      </div>
    </div>
    <div class="mb-3">
      <label for="email">Email address</label>
      <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" v-model="email" required>
      <div v-if="registrationError.email" class="error-message">
        {{ registrationError.email }}
      </div>
    </div>
    <div class="mb-3">
      <label for="password">Password</label>
      <input type="password" class="form-control" id="password" placeholder="Password" v-model="password" required>
      <div v-if="registrationError.password" class="error-message">
        {{ registrationError.password }}
      </div>
    </div>
    <div class="mb-3">
      <label for="rePassword">Confirm password</label>
      <input type="password" class="form-control" id="rePassword" placeholder="Password" v-model="rePassword" required>
      <div v-if="registrationError.password" class="error-message">
        {{ registrationError.rePassword }}
      </div>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</template>

<script>
import api from '@/services/api';
import config from "@/config";

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      rePassword: '',
      registrationError: ''
    };
  },
  methods: {
    async registerUser() {
      try {
        const response = await api.post('/add-user', {
          username: this.username,
          email: this.email,
          password: this.password
        }, {
          params: {
            rePassword: this.rePassword
          }
        });

        const formData = new FormData();
        formData.append('username', this.email);
        formData.append('password', this.password);

        await api.post('/login', formData, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

        window.location.href = `${config.appUrl}`;
        console.log('Пользователь успешно зарегистрирован:', response.data);
      } catch (error) {
        console.error('Ошибка при регистрации пользователя:', error);
        this.registrationError = error.response.data;
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
