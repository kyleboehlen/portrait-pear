<template>
  <main>
    <p v-for="i in 100" :key="i">{{ isShoot }}</p>
    <button class="btn btn-outline btn-primary">
      Shutter <Icon icon="camera" class="ml-4" height="30" width="30"></Icon>
    </button>
    <TheFavoritesButton v-if="showFavoritesButton" :shootSlug="props.shoot_slug" />
  </main>
</template>

<script setup>
// Axios
import axios from "axios"
// Icons
import { Icon, addIcon } from "@iconify/vue/offline"
import camera from "@iconify-icons/material-symbols/camera"
// Capacitor
import { Capacitor } from "@capacitor/core"
// Vue
import { onMounted, computed } from "vue"
// Components
import TheFavoritesButton from "@/components/TheFavoritesButton.vue"

addIcon("camera", camera)

const props = defineProps(["shoot_slug"])

const shootSlug = computed(() => {
  if (props.shoot_slug === undefined || props.shoot_slug === null) {
    return null
  }
  return props.shoot_slug.toUpperCase()
})

const isShoot = computed(() => {
  return shootSlug.value !== null // and we get a valid shoot from the api, not a 404
})

const showFavoritesButton = computed(() => {
  return isShoot.value && Capacitor.isNativePlatform()
})

onMounted(() => {
  axios({
    method: "get",
    url: `http://localhost/api/pear/shoot/${shootSlug.value}`,
  })
    .then(function (response) {
      console.log(response.data)
    })
    .catch(function () {
      console.log("failed")
    })
})
</script>
