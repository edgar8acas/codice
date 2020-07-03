<template>
  <div class="main-bg">
    <header class="home-header">
      <div class="logo">CÓDICE</div>
      <div class="top-buttons">
        <router-link to="/login">Ingresar</router-link>
        <router-link to="/register">Registro</router-link>
        <router-link to="/dashboard">Panel principal</router-link>
      </div>
    </header>
    <div class="central">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" >
.main-bg {
  position: relative;
  width: 100vw; height: 100vh;

  .central {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  ::before {
    content: "";
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background-image: url('../assets/home_bg.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    filter: blur(10px);
    z-index: -1;
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
      font-family: 'Krona One';
      padding: 10px;
      color: white;
    }

    .top-buttons {
      display: flex;
      > * {
        color: white;
        margin-right: 10px;
        padding: 10px;
        font-size: 0.6em;
        border: 2px solid white;
        border-radius: 10px;
        margin-top: 10px;
        margin-bottom: 10px;

        :hover {
          color: #2185d0;
          background-color: white;
        }
      }
    }
  }
</style>