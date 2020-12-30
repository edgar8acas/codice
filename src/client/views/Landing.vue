<template>
  <div class="Landing">
    <div class="Landing-lead">
      <div class="Landing-lead-wrapper">
        <div class="Landing-lead-header">
          <h1>Comienza tu aprendizaje</h1>
          <h2>Descubre nuevas palabras</h2>
        </div>
        <login></login>
      </div>
    </div>
    <div class="Landing-features">
      <div class="Landing-features-grid">
        <div class="Feature">
          <h3>Obtiene palabras importantes</h3>
          <p>
            Mediante algoritmos de estadística, obtiene aquellas palabras que
            son esenciales para la comprensión de un texto.
          </p>
        </div>
        <div class="Feature">
          <h3>Visualiza su significado en una vista de lectura</h3>
          <p>
            Una vista de lectura interactiva muestra los significados de las
            palabras además de imágenes y videos para fortalecer la comprensión.
          </p>
        </div>
        <div class="Feature">
          <h3>
            Incrementa el vocabulario de personas con capacidades diferentes
          </h3>
          <p>
            Las personas con dificultades para oír y/o hablar pueden encontrar
            una herramienta de ayuda efectiva.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Login from "../views/Login";
export default {
  components: {
    Login,
  },
};
</script>

<style lang="scss">
.Landing {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.Landing-lead {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 1 60%;

  ::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("../assets/home_bg.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    filter: blur(10px);
    z-index: -1;
  }
}

.Landing-lead-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex: 0 1 80%;
}

.Landing-lead-header {
  color: white;
  padding-right: 2rem;
  h1 {
    font-size: clamp(3rem, 3vw, 4rem);
  }
  h2 {
    font-size: 1.5rem;
  }
}

.Landing-features {
  background: rgb(236, 236, 236);
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.Landing-features-grid {
  display: grid;
  grid-template-columns: 1fr;
  flex: 0 1 80%;
}

.Feature {
  h3 {
    font-size: 1.5rem;
  }
  p {
    font-size: 1.2rem;
  }
}

@media (min-width: 400px) {
  .Landing-features-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
  }
}

@media (max-width: 750px) {
  .Landing-lead {
    margin-bottom: 3rem;
    margin-top: 3rem;
  }

  .Landing-lead-wrapper {
    flex-direction: column;
    align-items: center;
  }

  .Landing-lead-header {
    margin-bottom: 3rem;
    text-align: center;
  }

  .Feature {
    margin-bottom: 2rem;
  }
}

@media (max-width: 900px) {
  .Landing-lead-wrapper {
    flex: 0 1 90%;
  }

  .Landing-features {
    padding-top: 3rem;
  }
}
</style>
