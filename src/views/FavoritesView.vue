<template>
  <main class="flex flex-col justify-center items-center pb-8">
    <ul v-if="favorites.shoots.length > 0" class="menu bg-secondary w-5/6 xs:w-3/4 sm:w-1/2 p-2 rounded-box text-lg">
      <li class="menu-title">
        <span class="!text-base">Favorite Shoots</span>
      </li>
      <li v-for="shoot in favorites.shoots" :key="shoot.slug">
        <a class="link" @click="navigate(shoot.slug)">
          <Icon icon="shutter" class="inline-block mt-1" />
          {{ shoot.name }}
        </a>
      </li>
    </ul>
    <div v-else class="flex flex-col justify-center items-center">
      <Icon icon="shutter" class="h-48 w-auto" />
      <p class="text-3xl mt-4">No Shoots Favorited</p>
    </div>
  </main>
</template>

<script setup>
// Vue
import { useRouter } from "vue-router"
// Icons
import { Icon, addIcon } from "@iconify/vue/offline"
import shutter from "@iconify-icons/material-symbols/camera"
// Store
import { useFavoritesStore } from "@/stores/favorites.js"

const favorites = useFavoritesStore()

addIcon("shutter", shutter)

const router = useRouter()
const navigate = (slug) => {
  router.push({ name: "shoot", params: { shoot_slug: slug.toUpperCase() } })
}
</script>
