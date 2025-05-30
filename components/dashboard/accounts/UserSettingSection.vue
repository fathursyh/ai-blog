<script setup lang="ts">
import { FormType } from '~/shared/types/generalInterfaces';

</script>

<template>
        <section class="rounded-lg border border-gray-400 shadow p-8 col-span-2 lg:col-span-1">
            <h3 class="font-bold mb-4 text-xl">Change Settings</h3>
            <ul>
                <li>
                    <button @click="useModal().showModal(FormType.Name)">Change your name</button>
                </li>
                <li>
                    <button @click="useModal().showModal(FormType.Photo)">Change your profile photo</button>
                </li>
                <li>
                    <button>Change your job</button>
                </li>
                <li>
                    <button>Change your password</button>
                </li>
                <li class="mt-1 border-t-2 border-dashed">
                    <button class="text-red-600">Delete your account</button>
                </li>
            </ul>
        </section>
</template>



<style scoped>
    button {
        cursor: pointer;
    }
    button:hover {
        color: rgb(55, 55, 255);
    }

</style>