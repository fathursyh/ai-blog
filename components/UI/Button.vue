<template>
    <button
    v-if="!isLink"
      class="custom-button"
      :class="buttonTypeClasses"
    >
      <slot />
    </button>
    <NuxtLink
    v-else
      :href="url"
      class="custom-button"
      :class="buttonTypeClasses"
    >
      <slot />
    </NuxtLink>

  </template>
  
  <script>
  export default {
    name: 'CustomButton',
    props: {
      isLink: {
        type: Boolean,
        default: false
      },
      url: {
        type: String,
        default: ''
      },
      variant: {
        type: String,
        default: 'primary',
        validator: (value) => ['primary', 'secondary', 'ghost'].includes(value),
      },
    },
    computed: {
      buttonTypeClasses() {
        return {
          'custom-button--primary': this.variant === 'primary',
          'custom-button--secondary': this.variant === 'secondary',
          'custom-button--ghost': this.variant === 'ghost',
        };
      },
    },
  };
  </script>
  
  <style scoped>
  .custom-button {
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
    border: none;
  }
  
  .custom-button--primary {
    background-color: #007bff;
    color: white;
  }
  
  .custom-button--primary:hover {
    background-color: #0056b3;
  }
  
  .custom-button--secondary {
    background-color: #f3d047; 
  }
  
  .custom-button--secondary:hover {
    background-color: #e3cb69;
  }
  
  .custom-button--ghost {
    background-color: transparent;
    color: #343a40;
    border: 1px solid #535a61;
  }
  
  .custom-button--ghost:hover {
    background-color: rgba(0, 0, 0, 0.264);
    color: whitesmoke;
  }
  .custom-button:disabled {
    background-color: #696e73;
  }
  </style>