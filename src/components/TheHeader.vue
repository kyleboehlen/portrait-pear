<template>
  <!-- Header proper -->
  <header class="w-100 sticky top-0">
    <!-- iOS safe area spacer -->
    <div class="w-full bg-base-100" :style="{ height: safeAreaTop }"></div>

    <!-- Header proper -->
    <div
      class="w-full px-2 bg-secondary flex flex-row flex-nowrap justify-between items-center rounded-b-xl"
      :class="{ 'h-28': !shrink, 'md:h-24': !shrink, 'h-12': shrink }">
      <img :src="logo" class="h-full" />
      <h1
        class="md:whitespace-nowrap text-center"
        :class="{ 'text-4xl': !shrink, 'sm:text-5xl': !shrink, 'md:text-6xl': !shrink, 'text-3xl': shrink }">
        Portrait Pear
      </h1>
      <div
        class="btn flex w-auto p-0 aspect-square"
        :class="{ 'h-2/3': !shrink, 'sm:h-3/4': !shrink, 'btn-sm': shrink }">
        <Icon icon="hamburger" class="text-primary h-2/3 w-auto"></Icon>
      </div>
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
// Capacitor
import { Capacitor } from "@capacitor/core"
import { SafeArea } from "capacitor-plugin-safe-area"

addIcon("hamburger", hamburger)

// Shrink on scroll
const shrink = ref(false)
const shrinkOnScroll = () => {
  if (window.scrollY > 50) {
    shrink.value = true
  } else {
    shrink.value = false
  }
}

// Safe area for iphone
const safeAreaTop = ref(0)

// Mounted
onMounted(() => {
  // Mount on scroll for shrink
  window.addEventListener("scroll", shrinkOnScroll)

  // Get the status bar height and add proper padding
  if (Capacitor.getPlatform() === "ios") {
    SafeArea.getStatusBarHeight().then(({ statusBarHeight }) => {
      safeAreaTop.value = statusBarHeight + "px"
      console.log(statusBarHeight, "statusbarHeight")
    })
  }
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
