<template>
  <div>
    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Text</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="message in messages" :key="message.id">
        <td>{{ message.id }}</td>
        <td>{{ message.text }}</td>
      </tr>
      </tbody>
    </table>
  </div>

  <table class="table table-dark">
    <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
    </tbody>
  </table>

</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      messages: [],
    };
  },
  mounted() {
    this.fetchMessages();
  },
  methods: {
    async fetchMessages() {
      try {
        const response = await axios.get("http://localhost:5000/messages");
        this.messages = response.data;
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
