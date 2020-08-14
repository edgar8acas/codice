<template>
  <div class="dropdown">
    <button class="dropdown-button">
      <slot name="button">
        Menu
      </slot>
    </button>
    <ul :class="dropdownClassObject">
      <slot></slot>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    dropdownClassObject() {
      return {
        "dropdown-content link-list": true,
      };
    },
  },
};
</script>

<style>
.dropdown {
  position: relative;
}

.dropdown-button {
  border: none;
  background: none;
  padding: 0.1rem;
}

.dropdown-content {
  position: absolute;
  display: none;

  border-radius: 0.5em;
  box-shadow: 0px 0px 10px 2px #c2c2c2;
  background: #fff;
  width: auto;
  opacity: 1;

  padding: 5px 0;
  left: 0;
  top: 100%;
  z-index: 100;
  margin-top: 4px;
}

.dropdown-content:before {
  content: "";
  background-color: transparent;
  z-index: -1;
  position: absolute;
  top: -15px;
  bottom: 0px;
  right: 0px;
  left: 0px;
}

.dropdown-button:hover + .dropdown-content,
.dropdown-content:hover {
  display: block;
}

.active {
  display: block;
}

.link-list {
  list-style-type: none;
}

.link-list button {
  display: block;
  width: 100%;
  border: none;
  padding: 7px 15px 8px;
  text-align: left;
  font-size: 1rem;
  background: none;
  border-radius: 0;
  white-space: nowrap;
}

.link-list button:hover,
.link-list button:focus {
  color: inherit;
  background: #e7e8f1;
}
</style>
