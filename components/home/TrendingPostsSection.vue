<template>
    <section class="w-full flex flex-col gap-4 md:px-8 py-8 max-w-screen-2xl mx-auto">
        <h2 class="font-bold text-2xl text-center">What's Trending</h2>
        <div class="w-full h-full grid md:grid-cols-2 md:grid-rows-3 gap-4 p-4">
            <CardsPostCard v-for="item in 6" :key="item" />
        </div>
    </section>
</template>