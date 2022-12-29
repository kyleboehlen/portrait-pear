<template>
  <div class="app-wrapper flex flex-col min-h-screen justify-around">
    <TheHeader />
    <RouterView />
    <TheFooter />
  </div>
</template>

<script setup>
import { RouterView } from "vue-router"
import TheHeader from "@/components/TheHeader.vue"
import TheFooter from "@/components/TheFooter.vue"
</script>
