<template>
        <div>
            <LayoutsTheHeader />
            <main class="min-h-screen overflow-x-hidden">
                <slot />
            </main>
            <UICustomAlert />
            <LazyLayoutsTheFooter/>
        </div>
</template>