<template>
  <div class="modal w-screen h-screen">
    <div class="bg-base-100 grow w-screen h-screen flex flex-col-reverse sm:flex-col justify-center p-2 flex-nowrap">
      <!-- Actions bar -->
      <div class="flex justify-between items-center w-auto px-0 sm:px-4">
        <!-- Download -->
        <button class="btn btn-sm xs:btn-md sm:btn-lg">
          <Icon icon="download" class="h-4/6 w-auto px-0 sm:px-1" />
        </button>
        <!-- Toggle back/forth -->
        <div class="flex justify-center items-center">
          <button class="btn btn-sm xs:btn-md sm:btn-lg" @click="goLeft">
            <Icon icon="left" class="h-4/6 w-auto px-0 sm:px-1" />
          </button>

          <h2 class="text-xl xs:text-2xl sm:text-3xl pb-1 sm:pb-2 px-4 sm:px-6">{{ photoIndex }}/{{ photoCount }}</h2>

          <button class="btn btn-sm xs:btn-md sm:btn-lg" @click="goRight">
            <Icon icon="right" class="h-4/6 w-auto px-0 sm:px-1" />
          </button>
        </div>
        <!-- Close -->
        <button class="btn btn-sm xs:btn-md sm:btn-lg" @click="$emit('close')">
          <Icon icon="close" class="h-4/6 w-auto" />
        </button>
      </div>

      <!-- Image container -->
      <div class="w-auto h-5/6 flex justify-center items-center shrink m-1 grow">
        <img :src="photo?.full_res_asset_url" class="object-contain max-h-full rounded-lg" />
      </div>
    </div>
  </div>
</template>

<script setup>
// Vue
import { ref, computed, onMounted } from "vue"
// Icons
import { Icon, addIcon } from "@iconify/vue/offline"
import close from "@iconify-icons/pajamas/close"
import download from "@iconify-icons/pajamas/download"
import left from "@iconify-icons/pajamas/chevron-lg-left"
import right from "@iconify-icons/pajamas/chevron-lg-right"

addIcon("close", close)
addIcon("download", download)
addIcon("left", left)
addIcon("right", right)

const props = defineProps(["photo", "photos"])

const photo = ref(null)
onMounted(() => {
  photo.value = props.photo
})
const photoIndex = computed(() => {
  if (photo.value !== null) {
    const index = props.photos.findIndex((p) => p.id == photo.value.id)
    return index + 1
  }
  return null
})
const photoCount = computed(() => {
  if (photo.value !== null) {
    return props.photos.length
  }
  return null
})

// Controls
const downloadImage = () => {
  console.log("TODO")
}
const goLeft = () => {
  if (photoIndex.value <= 1) {
    photo.value = props.photos[props.photos.length - 1]
  } else {
    photo.value = props.photos[photoIndex.value - 2]
  }
}
const goRight = () => {
  if (photoIndex.value >= props.photos.length) {
    photo.value = props.photos[0]
  } else {
    photo.value = props.photos[photoIndex.value]
  }
}
</script>
