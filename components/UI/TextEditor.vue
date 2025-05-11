<template>
  <div>
    <editor-content :editor="editor" class="border p-4 bg-white rounded shadow" />
  </div>
</template>

<script setup>
// npm install @tiptap/vue-3 @tiptap/starter-kit
import { ref, onBeforeUnmount } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const editor = ref(new Editor({
  extensions: [StarterKit],
  content: '<p>Hello, start writing your post here...</p>',
}))

onBeforeUnmount(() => {
  editor.value.destroy()
})
</script>

<style scoped>
/* Optional styling */
.ProseMirror {
  min-height: 200px;
  outline: none;
}
</style>
