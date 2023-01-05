<template>
  <main class="flex">
    <!-- Metrenome pear loader -->
    <Transition name="fade">
      <TheLoader v-if="!loaderTimeout || !apiCallFinished" class="grow" />
    </Transition>

    <!-- No images found message -->
    <Transition name="fade">
      <NotFoundMessage
        v-if="loaderTimeout && apiCallFinished && photos.length == 0"
        :msg="notFoundMsg"
        class="w-full" />
    </Transition>

    <!-- Actually show images! -->
    <Transition name="fade">
      <div
        v-if="loaderTimeout && apiCallFinished && photos.length > 0"
        class="w-full flex flex-wrap items-center justify-around">
        <PhotoCard v-for="photo in photos" :key="photo.id" :photo="photo" />
      </div>
    </Transition>
  </main>
</template>

<script setup>
// Axios
import axios from "axios"
// Vue
import { onMounted, ref, computed } from "vue"
// Components
import TheLoader from "@/components/TheLoader.vue"
import NotFoundMessage from "@/components/panel/NotFoundMessage.vue"
import PhotoCard from "@/components/panel/PhotoCard.vue"
// Store
import { useHomeStore } from "@/stores/home.js"
// Capacitor
import { Capacitor } from "@capacitor/core"

const home = useHomeStore()

// Show loader logic
const loaderTimeout = ref(false)
const apiCallFinished = ref(false)

// Not found message
const notFoundMsg = computed(() => {
  if (navigator.onLine) {
    return "No photos found :("
  }

  return "Go online to load photos :)"
})

// Filtered Photos - check filters, check online and only show cached

onMounted(() => {
  // Show timeout for a moment on mount cuz it's cute
  setTimeout(() => {
    loaderTimeout.value = true
  }, 500)

  // If online we'll refresh the content from the API
  if (navigator.onLine) {
    refreshHomePhotos()
  } else {
    // We'll refresh content when we come online
    window.addEventListener("online", refreshHomePhotos) // Bind to online event
    apiCallFinished.value = true
  }
})

const photos = ref([])
const refreshHomePhotos = () => {
  // Get from cache if we're native and we have updated in the past 30 minutes
  if (Capacitor.isNativePlatform() && Date.now() - home.lastUpdated < 1800000) {
    // Get from cache
    photos.value = home.photos
    apiCallFinished.value = true
  } else {
    axios({
      method: "get",
      url: `http://localhost/api/pear/home`,
    })
      .then(function (response) {
        // Cache on native
        if (Capacitor.isNativePlatform()) {
          home.photos = response.data.photos
          home.setLastUpdated()
        }
        // Set photos
        photos.value = response.data.photos
        apiCallFinished.value = true
      })
      .catch(function () {
        apiCallFinished.value = true
      })
  }
}
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
