<template>
  <div class="relative">
  <NuxtImg src="https://images.pexels.com/photos/3228766/pexels-photo-3228766.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260" class="absolute inset-0 object-cover w-full h-[98%]" alt="hero image" />
  <div class="relative bg-opacity-75 bg-black/50">
    <svg class="absolute inset-x-0 -bottom-1 text-gray-50" viewBox="0 0 1160 163">
      <path
        fill="currentColor"
        d="M-164 13L-104 39.7C-44 66 76 120 196 141C316 162 436 152 556 119.7C676 88 796 34 916 13C1036 -8 1156 2 1216 7.7L1276 13V162.5H1216C1156 162.5 1036 162.5 916 162.5C796 162.5 676 162.5 556 162.5C436 162.5 316 162.5 196 162.5C76 162.5 -44 162.5 -104 162.5H-164V13Z"
      />
    </svg>
    <div class="relative px-4 py-16 mx-auto overflow-hidden sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 h-[92svh]">
      <div class="flex flex-col items-center justify-between xl:flex-row">
        <div class="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
          <h2 class="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
            Ai-powered insights <br class="hidden md:block" >
            help you write amazing posts
          </h2>
          <p class="max-w-xl mb-4 text-base text-gray-200 md:text-lg">
              Never ran out of ideas, speak your mind through your words. Making people closer and better with your very own thoughts.
          </p>
          <NuxtLink href="/posts" aria-label="check blog" class="inline-flex items-center font-semibold tracking-wider transition-colors duration-200 text-gray-50 hover:text-blue-500">
            More posts
            <svg class="inline-block w-3 ml-2" fill="currentColor" viewBox="0 0 12 12">
              <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
            </svg>
          </NuxtLink>
        </div>
        <FormsRegisterForm />
      </div>
    </div>
  </div>
</div>
</template>