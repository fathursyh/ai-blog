<template>
    <p>dashboard</p>
</template>

<script setup lang="ts">

    onMounted(() => {
        console.log(useAuth().user.value);
    });
</script>