<template>
  <div class="main-bg">
    <header class="home-header">
      <div class="logo">CÓDICE</div>
      <div class="top-buttons">
        <router-link to="/register">Registrarse</router-link>
      </div>
    </header>
    <div class="central">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
html,
body {
  height: 100%;
  margin: 0;
}

.main-bg {
  position: relative;
  width: 100vw;
  height: 100%;
  display: flex;
  flex-flow: column;
  .central {
    position: relative;
    flex: 1 1 auto;
  }
}

.home-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #2185d0;

  font-size: 2em;

  height: fit-content;

  > * {
    align-self: center;
  }

  .logo {
    font-family: "Krona One";
    padding: 10px;
    color: white;
  }
}

.top-buttons {
  display: flex;
  a:link,
  a:visited {
    color: white;
    margin-right: 10px;
    padding: 10px;
    font-size: 0.6em;
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid transparent;
    border-radius: 4px;
  }

  a:hover,
  a:active {
    border: 1px solid white;
  }

  button {
    background-color: transparent;
  }
}
</style>
