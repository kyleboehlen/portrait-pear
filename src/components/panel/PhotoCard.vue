<template>
  <div
    class="flex justify-center bg-secondary/50 max-xs:w-full max-sm:w-3/4 sm:h-96 border-2 rounded-lg border-secondary m-4">
    <!-- If not cached show lazy load, otherwise paint it from cache -->
    <img
      v-if="crossorigin"
      ref="img"
      v-lazy="{ src: props.photo.compressed_asset_url, loading: logo, delay: 500, lifecycle: lazyLifecycle }"
      :class="imgClasses"
      crossorigin="anonymous" />
    <img
      v-else-if="!useCached"
      v-lazy="{ src: props.photo.compressed_asset_url, loading: logo, delay: 500 }"
      :class="imgClasses" />
    <img v-else :src="cachedSource" :class="imgClasses" />
  </div>
</template>

<script setup>
// Vue
import { computed, ref, onMounted } from "vue"
// Images
import logo from "@/assets/imgs/green-camera-logo.png?url"
// Store
import { useImagesStore } from "@/stores/images.js"
// Capacitor
import { Capacitor } from "@capacitor/core"

const props = defineProps(["photo", "cache", "cachedPhotos"])

const images = useImagesStore()

const img = ref()
const isOnline = ref(false)

const isCached = computed(() => {
  if (props.cachedPhotos !== undefined) {
    return props.cachedPhotos.includes(props.photo.compressed_asset_url)
  }

  return false
})

const useCached = computed(() => {
  return isCached.value && Capacitor.isNativePlatform() && !isOnline.value
})

const crossorigin = computed(() => {
  if (Capacitor.isNativePlatform() && !isCached.value) {
    return true
  }
  return false
})

const cachedSource = ref(null)
onMounted(() => {
  // Handle online state
  isOnline.value = navigator.onLine
  window.addEventListener("online", setOnline)
  window.addEventListener("offline", setOffline)

  if (isCached.value) {
    images.getBase64(props.photo.compressed_asset_url).then((src) => {
      cachedSource.value = src
    })
  }
})

const setOnline = () => {
  isOnline.value = true
}

const setOffline = () => {
  isOnline.value = false
}

const onLoad = () => {
  if (props.cache && !isCached.value && Capacitor.isNativePlatform() && navigator.onLine) {
    // Generate base64
    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")
    canvas.height = img.value.naturalHeight
    canvas.width = img.value.naturalWidth
    context.drawImage(img.value, 0, 0)
    const baseSixtyFour = canvas.toDataURL("image/jpeg")
    // Persist to database
    images.store(props.photo.compressed_asset_url, baseSixtyFour)
  }
}

const lazyLifecycle = {
  loaded: onLoad,
}

const imgClasses = "max-w-full max-h-full m-auto mx-2 sm:mx-4 my-0 sm:my-2 object-contain rounded-lg"
</script>
