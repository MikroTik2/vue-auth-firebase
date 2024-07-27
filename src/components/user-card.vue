<template>
     <Card class="p-6 items-center flex gap-4">
          <Avatar>
               <AvatarImage
                    :src="authStore.isAuth.user.pictureURL"
                    :alt="`photo-user-${authStore.isAuth.user.displayName}`"
               />
               <AvatarFallback>{{ sliceName() }}</AvatarFallback>
          </Avatar>
          <div class="pr-4 border-border border-r">
               <h2 class="font-bold">
                    {{ authStore.isAuth.user.displayName }}
               </h2>
               <h2 class="text-muted-foreground leading-3 text-[12px]">
                    {{ authStore.isAuth.user.email }}
               </h2>
          </div>

          <Button @click="logout()">Logout</Button>
     </Card>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ref } from 'vue';

import { useRouter } from 'vue-router';

const split_name = ref<string>('');

const authStore = useAuthStore();
const router = useRouter();

const logout = () => {
     authStore.logout();
     router.push('/login');
};

const sliceName = () => {
     const firstname = authStore.isAuth.user.displayName.split(' ')[0];
     const lastname = authStore.isAuth.user.displayName.split(' ')[1];

     return (split_name.value = `${firstname.charAt(0).toUpperCase()}${lastname?.charAt(0)?.toUpperCase()}`);
};
</script>
