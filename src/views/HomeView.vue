<template>
  <main>
    <button class="btn btn-outline btn-primary">
      Shutter <Icon icon="camera" class="ml-4" height="30" width="30"></Icon>
    </button>
  </main>
</template>

<script setup>
// Axios
import axios from "axios"
// Icons
import { Icon, addIcon } from "@iconify/vue/offline"
import camera from "@iconify-icons/material-symbols/camera"
// Capacitor
import { SplashScreen } from "@capacitor/splash-screen"
// Vue
import { onMounted } from "vue"

addIcon("camera", camera)

onMounted(() => {
  axios({
    method: "get",
    url: `http://localhost/api/pear/home`,
  })
    .then(function (response) {
      console.log(response.data)
      setTimeout(() => {
        SplashScreen.hide()
      }, 500)
    })
    .catch(function () {
      console.log("failed")
    })
})
</script>