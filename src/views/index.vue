<template>
     <div class="flex justify-center items-center h-[100svh]">
          <div class="flex gap-4 flex-col items-center">
               <img class="w-[120px] h-[120px]" src="/svg/successfully.svg" alt="successfully" />
               <h1 class="text-center font-medium">
                    Hello - <b>{{ authStore.isAuth.user.displayName }}</b
                    >, you successfully authentication in our app
               </h1>

               <UserCard
                    :displayName="authStore.isAuth.user.displayName"
                    :email="authStore.isAuth.user.email"
                    :pictureURL="authStore.isAuth.user.pictureURL"
               />
          </div>
     </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores';
import UserCard from '@/components/user-card.vue';

const authStore = useAuthStore();
</script>
