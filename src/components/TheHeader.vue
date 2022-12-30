<template>
  <header
    class="w-100 px-2 bg-secondary flex flex-row flex-nowrap justify-between items-center sticky top-0 rounded-b-xl"
    :class="{ 'h-24': !shrink, 'h-12': shrink }">
    <img :src="logo" class="h-full" />
    <h1 class="whitespace-nowrap" :class="{ 'text-6xl': !shrink, 'text-3xl': shrink }">Portrait Pear</h1>
    <div class="btn flex h-3/4 w-auto p-0 aspect-square" :class="{ 'btn-lg': !shrink, 'btn-sm': shrink }">
      <Icon icon="hamburger" class="text-primary h-2/3 w-auto"></Icon>
    </div>
  </header>
</template>

<script setup>
// Images
import logo from "@/assets/imgs/green-camera-logo.png?url"
// Vue
import { onMounted, ref } from "vue"
// Iconify
import { Icon, addIcon } from "@iconify/vue/offline"
import hamburger from "@iconify-icons/pajamas/hamburger"

addIcon("hamburger", hamburger)

// Shrink on scroll
const shrink = ref(false)
const shrinkOnScroll = () => {
  if (window.scrollY > 50) {
    shrink.value = true
  } else {
    shrink.value = false
  }
  console.log(shrink.value)
}
onMounted(() => {
  window.addEventListener("scroll", shrinkOnScroll)
})
</script>

<style>
h1 {
  font-family: Kodchasan;
  transition: 0.2s;
}
header {
  transition: 0.2s;
}
</style>
