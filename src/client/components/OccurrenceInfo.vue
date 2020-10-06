<template>
  <div class="side-info">
    <h2 class="section-title">
      {{ occurrence.word || "Información de ocurrencia" }}
    </h2>
    <div v-if="occurrence.word" class="word-detailed-info">
      <div class="feature">
        <span>{{ formatEssential }}</span>
        <div class="help">
          <b>Esencial: </b> La ocurrencia fue añadida por el administrador.
          <br />
          <b>No esencial: </b> La ocurrencia fue añadida por el usuario.
        </div>
      </div>
      <div class="feature">
        <span>{{ formatAvailableMeanings }}</span>
        <div class="help">
          <b>Definiciones disponibles: </b> Existen definiciones para la
          ocurrencia. <br />
          <b>Sin definiciones: </b> No existen definiciones para la ocurrencia.
        </div>
      </div>
      <div class="feature">
        <span>{{ formatVisible }}</span>
        <div class="help">
          <b>Visible: </b> La palabra está resaltada en el texto. <br />
          <b>No visible: </b> La palabra no está resaltada en el texto.
        </div>
      </div>
    </div>

    <!--<mark-learned :occurrence="occurrence"></mark-learned>-->
  </div>
</template>

<script>
export default {
  components: {},
};
</script>

<style></style>
