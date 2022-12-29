<template>
  <footer class="footer footer-center p-4 bg-secondary text-base-content rounded-t-xl">
    <div>
      <p>Copyright © {{ year }} - All right reserved by Kyle Boehlen</p>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>
