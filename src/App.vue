<template>
  <div class="app-wrapper flex flex-col min-h-screen justify-start">
    <TheHeader />
    <RouterView class="grow" />
    <TheFooter class="justify-self-end" />
  </div>
</template>

<script setup>
// Vue
import { onMounted } from "vue"
import { RouterView } from "vue-router"
// Components
import TheHeader from "@/components/TheHeader.vue"
import TheFooter from "@/components/TheFooter.vue"
// Capacitor
import { SplashScreen } from "@capacitor/splash-screen"

onMounted(() => {
  setTimeout(() => {
    SplashScreen.hide()
  }, 750)
})
</script>
