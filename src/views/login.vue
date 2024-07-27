<script setup lang="ts">
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

import AuthLoginForm from '@/modules/auth-login.form.vue';
</script>

<template>
     <div
          class="container relative h-[100svh] flex flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
     >
          <router-link
               to="/register"
               :class="
                    cn(
                         buttonVariants({ variant: 'ghost' }),
                         'absolute right-4 top-4 md:right-8 md:top-8',
                    )
               "
          >
               Sign Up
          </router-link>
          <div
               class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex"
          >
               <div class="absolute inset-0 bg-zinc-900" />
               <div class="relative z-20 mt-auto">
                    <blockquote class="space-y-2">
                         <p class="text-lg">
                              &ldquo;This library has saved me countless hours of work and helped me
                              deliver stunning designs to my clients faster than ever before.&rdquo;
                         </p>
                         <footer class="text-sm">Sofia Davis</footer>
                    </blockquote>
               </div>
          </div>
          <div class="lg:p-8">
               <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div class="flex flex-col space-y-2 text-center">
                         <h1 class="text-2xl font-semibold tracking-tight">Welcome Back!</h1>
                         <p class="text-sm text-muted-foreground">
                              Enter your email below to create your account
                         </p>
                    </div>
                    <AuthLoginForm />
                    <p class="px-8 text-center text-sm text-muted-foreground">
                         By clicking continue, you agree to our
                         <a href="/terms" class="underline underline-offset-4 hover:text-primary">
                              Terms of Service
                         </a>
                         and
                         <a href="/privacy" class="underline underline-offset-4 hover:text-primary">
                              Privacy Policy
                         </a>
                         .
                    </p>
               </div>
          </div>
     </div>
</template>
