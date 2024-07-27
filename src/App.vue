<script setup lang="ts">
import Toaster from './components/ui/toast/Toaster.vue';
</script>

<template>
     <main class="min-h-screen" id="main">
          <RouterView />
          <Toaster />
     </main>
</template>
