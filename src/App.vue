<template>
  <TheHeader />
  <RouterView />
  <TheFooter />
</template>

<script setup>
import { RouterView } from "vue-router"
import TheHeader from "@/components/TheHeader.vue"
import TheFooter from "@/components/TheFooter.vue"
</script>
