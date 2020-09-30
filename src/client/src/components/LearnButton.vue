<template>
  <button class="button" type="button">
    <slot name="image"></slot>
    <slot></slot>
  </button>
</template>

<script>
</script>

<style scoped>
.button {
  display: inline-block;
  border: none;
  padding: 1rem 2rem;
  margin: 0;
  text-decoration: none;
  background: lightblue;
  cursor: pointer;
  line-height: 1;
  text-align: center;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.has-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.has-image svg {
  margin-right: 1em;
}

button:hover,
button:focus {
  background: #76bed5;
  color: white;
}

button:focus {
    outline: 1px solid #fff;
    outline-offset: -4px;
}
</style>