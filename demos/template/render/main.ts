import './styles/style.css'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
app.use(createPinia()).mount('#app')

console.log(import.meta.env)

