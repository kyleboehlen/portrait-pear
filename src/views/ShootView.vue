<template>
  <main class="flex">
    <!-- Shoot not found :( -->
    <Transition name="fade">
      <NotFoundMessage v-if="apiCallFinished && !shootFound" msg="No shoot found :(" class="w-full" />
    </Transition>

    <!-- The photos, yay -->
    <Transition name="fade">
      <div v-if="isShoot" class="w-full flex flex-wrap items-center justify-around">
        <PhotoCard v-for="photo in photos" :key="photo.id" :photo="photo" />
      </div>
    </Transition>

    <!-- Favorites button -->
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
import { onMounted, computed, ref } from "vue"
// Components
import TheFavoritesButton from "@/components/TheFavoritesButton.vue"
import NotFoundMessage from "@/components/panel/NotFoundMessage.vue"
import PhotoCard from "@/components/panel/PhotoCard.vue"

addIcon("camera", camera)

const props = defineProps(["shoot_slug"])

const shootSlug = computed(() => {
  if (props.shoot_slug === undefined || props.shoot_slug === null) {
    return null
  }
  return props.shoot_slug.toUpperCase()
})

const shootFound = ref(false)
const apiCallFinished = ref(false)
const isShoot = computed(() => {
  return shootSlug.value !== null && apiCallFinished.value && shootFound.value
})

const showFavoritesButton = computed(() => {
  return isShoot.value && Capacitor.isNativePlatform()
})

const photos = ref(null)

const apiUrl = import.meta.env.VITE_API_URL
onMounted(() => {
  axios({
    method: "get",
    url: `${apiUrl}/api/pear/shoot/${shootSlug.value}`,
  })
    .then(function (response) {
      // console.log(response.data)
      // TODO: update cache if favorited?
      apiCallFinished.value = true
      shootFound.value = true
      photos.value = response.data.photos
    })
    .catch(function () {
      // console.log("failed")
      apiCallFinished.value = true
      shootFound.value = false
    })
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-active {
  transition-delay: 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
