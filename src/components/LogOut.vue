<script>
import api from '@/services/api';
import config from "@/config";

export default {
  mounted() {
    this.logout();
  },
  methods: {
    async logout() {
      try {
        await api.get('/logout', {
          withCredentials: true
        });
        window.location.href = `${config.appUrl}`;
        console.log('Logged out');
      } catch (error) {
        console.error('An error occurred during logout:', error);
      }
    }
  },
  }
</script>