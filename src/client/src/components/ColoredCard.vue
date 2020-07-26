<template>
  <div class="colored-card">
    <!-- TODO: add icons -->
    <p class="card-body">
      <slot ></slot>
    </p>
  </div>
</template>

<style lang="scss">
:root {
  --info-hue: 177; 
  --info-saturation: 100%;
  --info-lightness: 87% 
}

.colored-card {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em;
  height: 120px;
  font-size: 1.5em;
  border-radius: 0.5em;
  background-color: hsl(var(--info-hue), var(--info-saturation), var(--info-lightness));
}

.card-body {
  --info-lightness: 24%;
  color: hsl(var(--info-hue), var(--info-saturation), var(--info-lightness));
}
</style>