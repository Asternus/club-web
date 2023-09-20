<template>

  <form @submit.prevent="registrationCompany">
    <div class="mb-3">
      <label for="companyName">Company name</label>
      <input type="text" class="form-control" id="companyName" aria-describedby="emailHelp"
             placeholder="Enter companyName" v-model="companyName" required>
      <div v-if="registrationError.companyName" class="error-message">
        {{ registrationError.companyName }}
      </div>
    </div>
    <div class="mb-3">
      <label for="description">Description</label>
      <input type="text" class="form-control" id="description" aria-describedby="emailHelp"
             placeholder="Enter description" v-model="description" required>
      <div v-if="registrationError.description" class="error-message">
        {{ registrationError.description }}
      </div>
    </div>
    <div class="mb-3">
      <label for="companyBudget">Company Budget</label>
      <input type="number" class="form-control" id="companyBudget" placeholder="companyBudget" v-model="companyBudget"
             required>
      <div v-if="registrationError.companyBudget" class="error-message">
        {{ registrationError.companyBudget }}
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
      companyName: '',
      description: '',
      companyBudget: 0,
      registrationError: ''
    };
  },
  methods: {
    async registrationCompany() {
      try {
        await api.post("/company/add-company", {
          companyName: this.companyName,
          description: this.description,
          companyBudget: this.companyBudget
        });

        window.location.href = `${config.appUrl}`;
      } catch (error) {
        this.registrationError = error.response.data;
        console.error("Error fetching messages:", error);
      }
    },
  }
}
</script>

