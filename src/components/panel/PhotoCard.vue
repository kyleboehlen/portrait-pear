<template>
  <div
    class="flex justify-center bg-secondary/50 max-xs:w-full max-sm:w-3/4 sm:h-96 border-2 rounded-lg border-secondary m-4">
    <!-- If not cached show lazy load, otherwise paint it from cache -->
    <img
      v-lazy="{ src: props.photo.compressed_asset_url, loading: logo, delay: 500 }"
      class="max-w-full max-h-full m-auto mx-2 sm:mx-4 my-0 sm:my-2 object-contain rounded-lg"
      @load="onLoad" />
  </div>
</template>

<script setup>
// Images
import logo from "@/assets/imgs/green-camera-logo.png?url"

const props = defineProps(["photo", "cache"])

// TODO: Only display photo if online or if image is cached

const onLoad = () => {
  if (props.cache) {
    console.log("caching")
  }
}
</script>
