import {createApp} from 'vue'
import App from './App.vue'
import router from './router/router';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';

const app = createApp(App);

app.use(router);
app.config.globalProperties.$materialize = M;
app.mount('#app');
