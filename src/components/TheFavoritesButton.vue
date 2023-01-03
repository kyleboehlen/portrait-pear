<template>
  <!-- Favorite heart button -->
  <span class="fixed right-0 bottom-0 pb-4 pr-4">
    <button class="btn btn-lg btn-circle" @click="handleFavorite">
      <Icon v-if="!isFavorited" icon="heart" class="w-2/3 h-auto" />
      <Icon v-else icon="heartFilled" class="w-2/3 h-auto text-error" />
    </button>
  </span>

  <!-- Add Favorite modal -->
  <input type="checkbox" id="add-modal" class="modal-toggle" />
  <div id="add-modal" class="modal" :class="{ 'modal-open': showAddModal }" @click.self="showAddModal = false">
    <div class="modal-box p-0">
      <div class="card w-full bg-neutral text-neutral-content">
        <div class="card-body items-center text-center">
          <h2 class="card-title">Favorite Shoot</h2>
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">Name</span>
            </label>
            <input
              v-model="shootName"
              type="text"
              placeholder="My Awesome Shoot"
              class="input input-bordered input-primary focus:outline-none w-full max-w-xs"
              :class="{ 'input-primary': shootNameValid, 'input-error': !shootNameValid }"
              @focus="shootNameValid = true"
              @keyup.enter="saveFavorite" />
          </div>
          <div class="card-actions justify-end w-full max-w-xs pt-4">
            <button class="btn btn-ghost" @click="showAddModal = false">Cancel</button>
            <div class="w-2"></div>
            <button class="btn btn-primary" @click="saveFavorite">Favorite</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Remove Favorite modal -->
  <input type="checkbox" id="remove-modal" class="modal-toggle" />
  <div id="remove-modal" class="modal" :class="{ 'modal-open': showRemoveModal }" @click.self="showAddModal = false">
    <div class="modal-box p-0">
      <div class="card w-full bg-neutral text-neutral-content">
        <div class="card-body items-center text-center">
          <h2 class="card-title">Remove As Favorite?</h2>
          <div class="card-actions justify-center w-full max-w-xs pt-4">
            <button class="btn btn-ghost" @click="showRemoveModal = false">Cancel</button>
            <div class="w-2"></div>
            <button class="btn btn-primary" @click="removeFavorite">Remove</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Vue
import { computed, ref } from "vue"
// Icons
import { Icon, addIcon } from "@iconify/vue/offline"
import heart from "@iconify-icons/mdi/cards-heart-outline"
import heartFilled from "@iconify-icons/mdi/cards-heart"
// Store
import { useFavoritesStore } from "@/stores/favorites.js"

const favorites = useFavoritesStore()

addIcon("heart", heart)
addIcon("heartFilled", heartFilled)

const props = defineProps(["shootSlug"])

const isFavorited = computed(() => {
  const favorite = favorites.shoots.find((shoot) => {
    return shoot.slug === props.shootSlug
  })

  return favorite !== undefined
})

const showAddModal = ref(false)
const showRemoveModal = ref(false)
const shootName = ref()
const shootNameValid = ref(true)

const handleFavorite = () => {
  if (isFavorited.value) {
    // Are you sure modal
    showRemoveModal.value = true
  } else {
    // Add favorites modal
    showAddModal.value = true
  }
}

const saveFavorite = () => {
  if (shootName.value === undefined || shootName.value.length === 0) {
    shootNameValid.value = false
  } else {
    favorites.addShoot(props.shootSlug, shootName.value)
    showAddModal.value = false
  }
}

const removeFavorite = () => {
  favorites.removeShoot(props.shootSlug)
  showRemoveModal.value = false
}
</script>
