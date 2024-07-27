<template>
     <div class="flex justify-center items-center h-[100svh]">
          <div class="flex gap-4 flex-col items-center">
               <img class="w-[120px] h-[120px]" src="/svg/successfully.svg" alt="successfully" />
               <h1 class="text-center font-medium">
                    Hello - <b>{{ authStore.isAuth.user.displayName }}</b
                    >, you successfully authentication in our app
               </h1>

               <UserCard />
          </div>
     </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores';

import UserCard from '@/components/user-card.vue';

import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const split_name = ref<string>('');

const authStore = useAuthStore();

const sliceName = () => {
     const firstname = authStore.isAuth.user.displayName.split(' ')[0];
     const lastname = authStore.isAuth.user.displayName.split(' ')[1];

     return (split_name.value = `${firstname.charAt(0).toUpperCase()}${lastname.charAt(0).toUpperCase()}`);
};
</script>
