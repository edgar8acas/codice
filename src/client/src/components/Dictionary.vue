<template>
  <div class="side-info">
      <h2 class="section-title">Diccionario de la lección</h2>
      <div class="dictionary">
        Aprendidas ({{ learntWords.length }})
        <ul>
          <li
            class="learned"
            v-for="dictionaryWord in learntWords"
            :key="dictionaryWord.dictionaryId"
          >
            {{ dictionaryWord.Word.word }}
          </li>
        </ul>
        Por aprender ({{ unlearntWords.length }})
        <ul>
          <li
            class="unlearned"
            v-for="dictionaryWord in unlearntWords"
            :key="dictionaryWord.dictionaryId"
          >
            {{ dictionaryWord.Word.word }}
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>