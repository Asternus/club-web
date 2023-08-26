<template>
  <div>
    <h1>Users</h1>
    <table class="responsive-table">
      <thead>
      <tr>
        <th>User guid</th>
        <th>User email</th>
        <th>User roles</th>
        <th>User status</th>
        <th>Baned user</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.email }}</td>
        <td>
          <ul>
            <li v-for="role in user.roles" :key="role">{{ role }}</li>
          </ul>
        </td>
        <td>{{ user.accountNonLocked ? 'Yes' : 'No' }}</td>
        <td><button @click="banedUser(user.id)">Ban User</button></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from '@/services/api';

export default {
  data() {
    return {
      users: [],
    };
  },
  mounted() {
    this.fetchMessages();
  },
  methods: {
    async fetchMessages() {
      try {
        const response = await api.get("/admin/users");
        this.users = response.data;
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    },
    async banedUser(userId) {
      try {
        const response = await api.get(`/admin/user/ban/${userId}`);
        this.messages = response.data;
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    },
  },
};
</script>