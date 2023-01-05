<template>
  <main class="flex">
    <!-- Metrenome pear loader -->
    <Transition name="fade">
      <TheLoader v-if="!loaderTimeout || !apiCallFinished" class="grow" />
    </Transition>

    <!-- No images found message -->
    <Transition name="fade">
      <NotFoundMessage
        v-if="loaderTimeout && apiCallFinished && filteredPhotos.length == 0"
        :msg="notFoundMsg"
        class="w-full" />
    </Transition>

    <!-- Actually show images! -->
    <Transition name="fade">
      <div
        v-if="loaderTimeout && apiCallFinished && filteredPhotos.length > 0"
        class="w-full flex flex-wrap items-center justify-around">
        <PhotoCard
          v-for="photo in filteredPhotos"
          :key="photo.id"
          :photo="photo"
          :cachedPhotos="cachedPhotos"
          cache="true" />
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
import { useImagesStore } from "@/stores/images.js"
// Capacitor
import { Capacitor } from "@capacitor/core"

const home = useHomeStore()
const images = useImagesStore()

// Show loader logic
const loaderTimeout = ref(false)
const apiCallFinished = ref(false)
const isOnline = ref(false)

// Not found message
const notFoundMsg = computed(() => {
  if (isOnline.value) {
    return "No photos found :("
  }

  return "Go online to load photos :)"
})

// Photo refs
const photos = ref([])
const cachedPhotos = ref([])
const filteredPhotos = computed(() => {
  if (Capacitor.isNativePlatform() && !isOnline.value) {
    // Check cache
    return photos.value.filter((p) => cachedPhotos.value.includes(p.compressed_asset_url))
  }
  // TODO: add filter logic - filter store
  return photos.value
})

onMounted(() => {
  // Show timeout for a moment on mount cuz it's cute
  setTimeout(() => {
    loaderTimeout.value = true
  }, 500)

  // Set cached images if we're native
  if (Capacitor.isNativePlatform()) {
    setCachedImages().then(() => {
      setHomePhotos()
    })
  } else {
    setHomePhotos()
  }
})

const setHomePhotos = () => {
  // If online we'll refresh the content from the API
  if (navigator.onLine) {
    refreshHomePhotos()
  } else {
    // We'll refresh content when we come online
    window.addEventListener("online", refreshHomePhotos) // Bind to online event

    // Get from cache if we're native
    if (Capacitor.isNativePlatform()) {
      // Get image info from cache
      photos.value = home.photos
    }

    apiCallFinished.value = true
  }
}

const refreshHomePhotos = () => {
  isOnline.value = true
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

async function setCachedImages() {
  // Get cached images
  images.getAll().then((values) => {
    cachedPhotos.value = values
  })
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
