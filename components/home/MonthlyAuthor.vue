<template>
    <section class="w-full flex flex-col gap-8 h-fit p-8 max-w-screen-2xl mx-auto">
        <h2 class="font-bold text-2xl text-center">Authors of The Month</h2>
        <div class="lg:h-80 h-full w-full grid lg:grid-cols-3 gap-4 group">
            <article v-for="item in 3" :key="item" class="w-full h-full bg-white rounded shadow-md overflow-hidden hover:scale-105 transition-transform duration-300 group-hover:not-hover:scale-90 grid grid-cols-2 divide-x-2 divide-gray-300 divide-dashed py-4">
                <div class="flex flex-col gap-4 justify-center items-center">
                    <NuxtImg src="https://awsimages.detik.net.id/community/media/visual/2023/09/02/kucing-ragdoll_169.jpeg?w=600&q=90" width="300" height="300" class="w-32 h-32 object-cover rounded-full" />
                    <div>
                        <p class="text-center line-clamp-1 font-medium text-sm lg:text-base" title="">Author's Name</p>
                    <p class="text-sm text-center line-clamp-1 text-gray-500" title="">Author</p>
                    </div>
                </div>
                <div class="flex flex-col justify-evenly items-center">
                    <p class="lg:text-4xl text-2xl font-semibold flex flex-col-reverse items-center">20 <span class="font-light lg:text-sm text-xs">Posts</span></p>
                    <p class="lg:text-4xl text-2xl font-semibold flex flex-col-reverse items-center">1.4K <span class="font-light lg:text-sm text-xs">Engagements</span></p>
                    <p class="lg:text-4xl text-2xl font-semibold flex flex-col-reverse items-center">362<span class="font-light lg:text-sm text-xs">Likes</span></p>
                </div>
            </article>
        </div>
    </section>
</template>