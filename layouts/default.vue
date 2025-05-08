<template>
        <div>
            <LayoutsTheHeader />
            <main class="min-h-screen overflow-x-hidden">
                <slot />
            </main>
            <LazyLayoutsTheFooter/>
        </div>
</template>