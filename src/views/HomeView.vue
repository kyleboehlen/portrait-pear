<template>
  <main>
    <button class="btn btn-outline btn-primary">
      Shutter <Icon icon="camera" class="ml-4" height="30" width="30"></Icon>
    </button>
  </main>
</template>

<script setup>
import { Icon, addIcon } from "@iconify/vue/offline"
import camera from "@iconify-icons/material-symbols/camera"

addIcon("camera", camera)
</script>
