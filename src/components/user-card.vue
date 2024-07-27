<template>
     <Card class="p-6 items-center flex gap-4">
          <Avatar>
               <AvatarImage :src="props.pictureURL" :alt="`photo-user-${props.displayName}`" />
               <AvatarFallback>{{ sliceName(props.displayName) }}</AvatarFallback>
          </Avatar>
          <div class="pr-4 border-border border-r">
               <h2 class="font-bold">
                    {{ props.displayName }}
               </h2>
               <h2 class="text-muted-foreground leading-3 text-[12px]">
                    {{ props.email }}
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
import { toast } from '@/components/ui/toast';
import { sliceName } from '@/utils/short-name';

import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

interface ICardProps {
     displayName: string;
     email: string;
     pictureURL: string;
}

const props = defineProps<ICardProps>();

const logout = async () => {
     await authStore.logout();

     toast({
          title: 'Sign Out',
          description: 'You have successfully logged out.',
     });

     router.push('/login');
};
</script>
