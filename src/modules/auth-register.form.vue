<script setup lang="ts">
import { h, ref, reactive, computed } from 'vue';

import { useAuthStore } from '@/stores';
import { useRouter } from 'vue-router';

import { FieldArray, useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

import { Loader2 } from 'lucide-vue-next';
import { GithubLogoIcon } from '@radix-icons/vue';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
     FormControl,
     FormDescription,
     FormField,
     FormItem,
     FormLabel,
     FormMessage,
} from '@/components/ui/form';

const authStore = useAuthStore();
const router = useRouter();

const isLoading = ref<boolean>(false);

const profileFormSchema = toTypedSchema(
     z.object({
          name: z
               .string()
               .min(2, {
                    message: 'Name must be at least 2 characters.',
               })
               .max(30, {
                    message: 'Name must not be longer than 30 characters.',
               }),

          email: z
               .string({
                    required_error: 'Please select an email to display.',
               })
               .email(),

          password: z.string().min(8, {
               message: 'Password must be at least 8 characters.',
          }),
     }),
);

const { handleSubmit, resetForm } = useForm({
     validationSchema: profileFormSchema,
});

const onSubmit = handleSubmit(async (values) => {
     isLoading.value = true;

     try {
          await authStore.createWithEmail(values);
          router.push('/');
     } finally {
          isLoading.value = false;
     }

     resetForm();
});

const onSubmitGoogle = async () => {
     await authStore.signInWithGoogle();
     router.push('/');
};

const onSubmitGitHub = async () => {
     await authStore.signInWithGitHub();
     router.push('/');
};
</script>

<template>
     <div :class="cn('grid gap-6', $attrs.class ?? '')">
          <form @submit="onSubmit">
               <div class="grid gap-2">
                    <div class="grid gap-1">
                         <Label class="sr-only" for="email"> Email </Label>
                         <FormField v-slot="{ componentField }" name="name">
                              <FormItem>
                                   <FormControl>
                                        <Input
                                             id="name"
                                             placeholder="enter your name"
                                             type="text"
                                             auto-capitalize="none"
                                             auto-correct="off"
                                             autocomplete="given-name"
                                             v-bind="componentField"
                                             :disabled="isLoading"
                                        />
                                   </FormControl>
                                   <FormMessage />
                              </FormItem>
                         </FormField>
                         <FormField v-slot="{ componentField }" name="email">
                              <FormItem>
                                   <FormControl>
                                        <Input
                                             id="email"
                                             placeholder="name@example.com"
                                             type="email"
                                             auto-capitalize="none"
                                             auto-complete="email"
                                             auto-correct="off"
                                             v-bind="componentField"
                                             :disabled="isLoading"
                                        />
                                   </FormControl>
                                   <FormMessage />
                              </FormItem>
                         </FormField>
                         <FormField v-slot="{ componentField }" name="password">
                              <FormItem>
                                   <FormControl>
                                        <Input
                                             id="password"
                                             placeholder="enter your password"
                                             type="password"
                                             :disabled="isLoading"
                                             v-bind="componentField"
                                        />
                                   </FormControl>
                                   <FormMessage />
                              </FormItem>
                         </FormField>
                    </div>
                    <Button :disabled="isLoading">
                         <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
                         Sign Up with Email
                    </Button>
               </div>
          </form>

          <div class="relative">
               <div class="absolute inset-0 flex items-center">
                    <span class="w-full border-t" />
               </div>
               <div class="relative flex justify-center text-xs uppercase">
                    <span class="bg-background px-2 text-muted-foreground"> Or continue with </span>
               </div>
          </div>

          <div class="grid gap-1">
               <Button
                    variant="outline"
                    type="button"
                    :disabled="isLoading"
                    @click="authStore.signInWithGitHub()"
               >
                    <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
                    <GithubLogoIcon v-else class="mr-2 h-4 w-4" />
                    GitHub
               </Button>

               <Button
                    variant="outline"
                    type="button"
                    :disabled="isLoading"
                    @click="authStore.signInWithGoogle()"
               >
                    <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
                    <img src="/svg/google.svg" v-else class="mr-2 h-4 w-4" />
                    Google
               </Button>
          </div>
     </div>
</template>
