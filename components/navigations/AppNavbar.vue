<template>
    <div class="bg-gray-900 fixed w-full z-50">
      <div
        class="px-4 py-3 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8"
      >
        <div class="relative flex items-center justify-between">
          <NuxtLink
            href="/"
            aria-label="InkCraft"
            title="InkCraft"
            class="inline-flex items-center"
          >
            <Icon name="lucide:pen-tool" class="text-white text-xl" />
            <span
              class="ml-2 text-xl font-bold tracking-widest text-gray-100 uppercase font-oswald"
              >InkCraft</span
            >
          </NuxtLink>
          <ul class="items-center hidden space-x-8 lg:flex">
            <li>
              <NuxtLink
                to="/"
                aria-label="Home"
                title="Home"
                class="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
                >Home</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/posts"
                aria-label="Blogs"
                title="Blogs"
                class="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
                prefetch-on="visibility"
                >
                Blogs
                </NuxtLink
              >
            </li>
              <li>
                <NuxtLink 
                  v-show="useAuth().user.value === null"
                  to="/login"
                  class="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                  aria-label="Sign in"
                  title="Sign in"
                >
                <Icon name="lucide:log-in" class="me-2" />
                  Sign in
                </NuxtLink>
                <NuxtLink
                  v-show="useAuth().user.value !== null"
                  to="/dashboard"
                  class="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                  aria-label="Dashboard"
                  title="Dashboard"
                >
                <Icon name="lucide:user" class="me-2" />
                  Dashboard
                </NuxtLink>
              </li>
          </ul>
          <div class="lg:hidden">
            <button
              aria-label="Open Menu"
              title="Open Menu"
              class="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline"
              @click="isMenuOpen = true"
            >
              <svg class="w-5 text-gray-600" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                 />
                <path
                  fill="currentColor"
                  d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                 />
                <path
                  fill="currentColor"
                  d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                 />
              </svg>
            </button>
            <div v-if="isMenuOpen" class="absolute top-0 left-0 w-full" @click="isMenuOpen = false">
              <div class="p-5 bg-white border rounded shadow-sm">
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <NuxtLink
                      href="/"
                      aria-label="InkCraft"
                      title="InkCraft"
                      class="inline-flex items-center"
                    >
                      <Icon name="lucide:pen-tool" class="text-gray-900 text-xl" />

                      <span
                        class="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase"
                        >InkCraft</span
                      >
                    </NuxtLink>
                  </div>
                  <div>
                    <button
                      aria-label="Close Menu"
                      title="Close Menu"
                      class="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                      @click="isMenuOpen = false"
                    >
                      <svg class="w-5 text-gray-600" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <nav>
                  <ul class="space-y-4">
            <li>
              <NuxtLink
                to="/"
                aria-label="Home"
                title="Home"
                class="font-medium tracking-wide text-gray-800 transition-colors duration-200 hover:text-teal-accent-400"
                >Home</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/posts"
                aria-label="Blogs"
                title="Blogs"
                class="font-medium tracking-wide text-gray-800 transition-colors duration-200 hover:text-teal-accent-400"
                >Blogs</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                v-show="useAuth().user.value === null"
                to="/login"
                aria-label="Sign in"
                title="Sign in"
                class="font-medium tracking-wide text-blue-700 transition-colors duration-200 hover:text-teal-accent-400"
                >Sign in</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                v-show="useAuth().user.value !== null"
                to="/dashboard"
                aria-label="Dashboard"
                title="Dashboard"
                class="font-medium tracking-wide text-blue-700 transition-colors duration-200 hover:text-teal-accent-400"
                >Dashboard</NuxtLink
              >
            </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script setup lang="ts">
  const isMenuOpen = ref(false);
</script>