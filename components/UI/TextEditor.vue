<script setup lang="ts">
  import Editor from '@tinymce/tinymce-vue';
  const config = useRuntimeConfig();
</script>

<template>
    <Editor
      v-model="usePost().newPost.value.body"
      class="min-h-[60vh]"
      :api-key="config.public.editorKey"
      :init="{
        plugins: 'lists link image table wordcount preview accordion',
        toolbar: 'undo redo styles fontsize | forecolor bold italic underline strikethrough | numlist bullist align outdent indent lineheight | table image accordion preview'
      }"
    />
</template>