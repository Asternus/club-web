<template>
  <div class="row">
    <div class="col s12 m8 offset-m2"> <!-- Добавляем классы для выравнивания по центру -->
      <form class="col s12" @submit.prevent="registerUser">
        <div class="row">
          <div class="input-field col s6">
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="username" required>
            <div v-if="registrationError.username" class="error-message">
              {{ registrationError.username }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required>
            <div v-if="registrationError.password" class="error-message">
              {{ registrationError.password }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <label for="password">Confirm password:</label>
            <input type="password" id="rePassword" v-model="rePassword" required>
            <div v-if="registrationError.rePassword" class="error-message">
              {{ registrationError.rePassword }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" required>
            <div v-if="registrationError.email" class="error-message">
              {{ registrationError.email }}
            </div>
          </div>
        </div>
        <button class="btn waves-effect waves-light" type="submit" name="action">Registration
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
      email: '',
      password: '',
      rePassword: '',
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
        }, {
          params: {
            rePassword: this.rePassword
          }
        });
        window.location.href = '/';
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
