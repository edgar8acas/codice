<template>
  <div class="media-container">
    <colored-card v-if="!isOccurrence" class="info center-card">
      Selecciona una palabra para ver su significado
    </colored-card>
    <colored-card
      v-else-if="!occurrence.selectedWordObject"
      class="warning center-card"
    >
      Elige un significado para
      <span class="word-select-meaning"> {{ occurrence.word }}</span>
      <template v-slot:menu>
        <dropdown-menu class="word-card--actions">
          <template v-slot:button>
            <img
              src="../assets/menu.svg"
              alt="Opciones de ocurrencia"
              width="20px"
              height="20px"
            />
          </template>
          <li>
            <button @click="emitSelectMeaning">
              Cambiar significado
            </button>
          </li>
          <li v-if="!occurrence.essential">
            <button @click="emitDeleteOccurrence">Eliminar ocurrencia</button>
          </li>
          <li>
            <button @click="emitToggleVisibility">
              {{
                "Marcar como" + (occurrence.visible ? " no " : " ") + "visible"
              }}
            </button>
          </li>
        </dropdown-menu>
      </template>
    </colored-card>
    <div v-else class="info-and-media-wrapper">
      <div class="word-information">
        <div class="word-information--header"></div>
        <div class="word-information--content">
          <div class="word-card">
            <div class="word-card--header">
              <h1>{{ occurrence.word }}</h1>
              <dropdown-menu class="word-card--actions">
                <template v-slot:button>
                  <img
                    src="../assets/menu.svg"
                    alt="Opciones de ocurrencia"
                    width="20px"
                    height="20px"
                  />
                </template>
                <li>
                  <button @click="emitSelectMeaning">
                    Cambiar significado
                  </button>
                </li>
                <li v-if="!occurrence.essential">
                  <button @click="emitDeleteOccurrence">
                    Eliminar ocurrencia
                  </button>
                </li>
                <li>
                  <button @click="emitToggleVisibility">
                    {{
                      "Marcar como" +
                      (occurrence.visible ? " no " : " ") +
                      "visible"
                    }}
                  </button>
                </li>
                <li>
                  <button @click="emitToggleIsLearned">
                    {{
                      "Marcar como" +
                      (dictionary.isLearned ? " no " : " ") +
                      "aprendida"
                    }}
                  </button>
                </li>
              </dropdown-menu>
            </div>

            <div class="word-type">
              {{ occurrence.selectedWordObject.type }}
            </div>
            <p>{{ occurrence.selectedWordObject.definition }}</p>
            <!-- TODO: detalles desplegables -->
            <!-- TODO: menú de acciones -->
          </div>
        </div>
      </div>
      <div class="associated-media">
        <div class="image">
          <img
            v-if="occurrence.selectedWordObject.imageUrl"
            :src="occurrence.selectedWordObject.imageUrl"
            :alt="occurrence.word"
            class="media"
          />
          <div
            v-if="
              occurrence.selectedWordObject &&
              !occurrence.selectedWordObject.imageUrl
            "
            class="media no-media-found"
          >
            No hay imagen relacionada
          </div>
        </div>
        <div class="video">
          <iframe
            v-if="occurrence.selectedWordObject.videoUrl"
            :src="formattedVideoUrl"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            class="media"
          >
          </iframe>
          <div
            v-if="
              occurrence.selectedWordObject &&
              !occurrence.selectedWordObject.videoUrl
            "
            class="media no-media-found"
          >
            No hay video relacionado
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ColoredCard from "@/components/ColoredCard";
import DropdownMenu from "@/components/DropdownMenu";
import UserOccurrence from "@/utils/user_occurrence";
import { mapGetters } from "vuex";
import { GET_DICTIONARY_BY_WORD_ID } from "../store/getter-types";
export default {
  components: {
    ColoredCard,
    DropdownMenu,
  },
  data() {
    return {
      optionsDropdownActive: false,
    };
  },
  props: {
    occurrence: {
      required: true,
      default: function () {
        return {};
      },
    },
  },
  computed: {
    ...mapGetters([GET_DICTIONARY_BY_WORD_ID]),
    dictionary() {
      return this[GET_DICTIONARY_BY_WORD_ID](this.occurrence.selectedWordId);
    },
    isOccurrence() {
      return this.occurrence instanceof UserOccurrence;
    },
    formattedVideoUrl() {
      if (this.occurrence.selectedWordObject.videoUrl) {
        const videoUrl = this.occurrence.selectedWordObject.videoUrl.match(
          new RegExp("v=(.*)")
        )[1];
        return `https://www.youtube.com/embed/${videoUrl}`;
      }
      return null;
    },
  },
  methods: {
    toggleOptionsMenu() {
      this.optionsDropdownActive = !this.optionsDropdownActive;
    },
    emitSelectMeaning() {
      this.$emit("onSelectMeaning");
    },
    emitDeleteOccurrence() {
      this.$emit("onDeleteOccurrence", this.occurrence.userOccurrenceId);
    },
    emitToggleVisibility() {
      this.$emit("onToggleVisibility", this.occurrence);
    },
    emitToggleIsLearned() {
      this.$emit("onToggleIsLearned", this.dictionary);
    },
  },
};
</script>

<style lang="scss">
.media-container {
  display: flex;
  padding: 0 1em;
  position: relative;
  height: -webkit-fill-available;
}

.media {
  width: 100%;
  height: 100%;
  border-radius: 1em;
}

.info-and-media-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.word-information {
  height: 40%;
}

.associated-media {
  height: 40%;
  display: flex;
  justify-content: space-evenly;
  .image {
    width: 40%;
  }
  .video {
    width: 40%;
  }
}
.no-media-found {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 1.2rem;
  color: #c2c2c2;
  border: 2px solid #c2c2c2;
}

.word-information--content {
  margin-top: 10%;
  display: flex;
  justify-content: center;

  .word-card {
    padding: 1em;

    .word-card--header {
      display: flex;
      align-items: flex-start;
      position: relative;
      h1 {
        text-align: left;
        color: blue;
        font-size: 2em;
        flex: 1 1 auto;
      }
    }

    .word-type {
      color: hsl(0, 0%, 60%);
      font-style: italic;
    }

    p {
      font-size: 1.3em;
    }
    border-radius: 10px;
    box-shadow: 0px 0px 10px 2px #c2c2c2;
    width: 70%;
  }
}

.word-information--header {
  display: flex;
  flex-flow: row-reverse;
}

.center-card {
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 5em;
  right: 5em;
  margin-top: -60px;
}

.word-select-meaning {
  font-weight: 800;
  display: block;
  text-align: center;
}
</style>
