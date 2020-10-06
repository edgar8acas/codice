<template>
  <div class="colored-card">
    <!-- TODO: add icons -->
    <div class="card-header">
      <slot name="menu"></slot>
    </div>
    <p class="card-body">
      <slot></slot>
    </p>
    <div class="actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<style lang="scss">
:root {
  --info-hue: 177;
  --info-saturation: 100%;
  --info-lightness: 87%;
}

.colored-card {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  padding: 1em;
  height: auto;
  font-size: 1.5em;
  border-radius: 0.5em;
  background-color: hsl(
    var(--info-hue),
    var(--info-saturation),
    var(--info-lightness)
  );
}

.card-header {
  align-self: flex-end;
}

.card-body {
  --info-lightness: 24%;
  color: hsl(var(--info-hue), var(--info-saturation), var(--info-lightness));
}

.actions button .ui.button {
  background: hsl(
    var(--info-hue),
    var(--info-saturation),
    var(--info-lightness)
  );
}
</style>
