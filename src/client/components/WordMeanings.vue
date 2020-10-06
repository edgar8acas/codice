<template>
    <div class="WordMeanings-list">
      <Meaning v-for="m in meanings" :key="m.wordId" :meaning="m"></Meaning>
    </div>
</template>

<script>
import { wordMeanings } from "../mixins/wordMeanings";
import Meaning from "../components/meanings/Meaning";

export default {
  components: {
    Meaning
  },
  mixins: [wordMeanings]
}
</script>

<style>
.WordMeanings-list {

}

.WordMeanings-list:empty::after {
  content: 'Sin definiciones';
  display: block;
  text-align: center;
  font-size: 1.2em;
  color: hsl(0, 0%, 60%);
}
</style>