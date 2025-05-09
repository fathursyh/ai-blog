<template>
    <div class="px-4 py-2 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div class="grid gap-8 lg:grid-cols-3 sm:max-w-sm sm:mx-auto md:max-w-full">
        <CardsPostCard v-for="item in 9" :key="item" />
      </div>
    </div>
  </template>