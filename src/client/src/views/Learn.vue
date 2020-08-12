<template>
  <div class="learn">
    <div class="learn--header">
      <div class="learn--header-left">
        <h2 class="learn--title">{{ currentTemplateText.title }}</h2>
        <dropdown-menu 
          class="learn--header-text-actions"
          :active="optionsMenuActive"
        >
          <template v-slot:button>
            <button
              @click="toggleOptionsMenu"
              class="dropdown-button"
            >
            <img
              src="../assets/menu.svg"
              alt="Opciones del texto"
              width="30px"
              height="30px"
            />
          </button>
          </template>
          <li>
            <button @click="toggleAddOccurrence">
              Agregar palabra
            </button>
          </li>
        </dropdown-menu>
      </div>
    </div>
    <div class="learn--text">
      <!-- TODO: Stick title to the top when scrolling -->
      <text-content
        class="learn--text-content"
        @changeOccurrence="changeOccurrence"
        :current="occurrence"
      ></text-content>
    </div>
    <selected-occurrence-info
      class="learn--current-info"
      :occurrence="occurrence"
      @onSelectMeaning="selectMeaning"
      @onDeleteOccurrence="deleteOccurrence"
      @onToggleVisibility="toggleVisibility"
    >
    </selected-occurrence-info>

    <sui-modal v-model="activeSelectMeaning">
      <sui-modal-header>Cambiar significado</sui-modal-header>
      <sui-modal-content class="scrolling">
        <word-details
          class="word-details"
          :occurrence="occurrence"
          :selection="true"
          @changedMeaning="onChangedMeaning"
        >
        </word-details>
      </sui-modal-content>
      <sui-modal-actions>
        <sui-button positive @click.native="selectMeaning">
          Aceptar
        </sui-button>
      </sui-modal-actions>
    </sui-modal>

    <sui-modal v-model="activeAddingOccurrence">
      <sui-modal-header>Añadir ocurrencia</sui-modal-header>
      <sui-modal-content class="scrolling">
        <div class="ui info message" v-if="activeAddingOccurrence">
          <div class="header">
            Instrucciones
          </div>
          <p>
            Selecciona la ocurrencia y da click en <b>Añadir seleccionado</b>.
          </p>
        </div>
        <pre>{{ currentTemplateText.rawContent }}</pre>
      </sui-modal-content>
      <sui-modal-actions>
        <button
          class="primary ui button"
          v-if="activeAddingOccurrence"
          @click="addSelectedOccurrence"
        >
          Añadir seleccionado
        </button>
      </sui-modal-actions>
    </sui-modal>
  </div>
</template>

<script>
import TextContent from "@/components/TextContent";
import SelectedOccurrenceInfo from "@/components/SelectedOccurrenceInfo";
import WordDetails from "@/components/WordDetails";
import DropdownMenu from "@/components/DropdownMenu";
import { getSelectedWordDetails } from "@/utils/template";
import { mapState, mapGetters } from "vuex";
export default {
  components: {
    TextContent,
    SelectedOccurrenceInfo,
    WordDetails,
    DropdownMenu
  },
  data() {
    return {
      textId: this.$route.params.id,
      occurrence: null,
      isLearnt: false,
      activeSelectMeaning: false,
      activeAddingOccurrence: false,
      optionsMenuActive: false
    };
  },
  computed: {
    ...mapState(["occurrences", "currentTemplateText"]),
    ...mapGetters(["learntWords", "unlearntWords"]),
    formatEssential() {
      return this.occurrence.essential ? "Esencial" : "No esencial";
    },
    formatAvailableMeanings() {
      return this.occurrence.availableMeanings
        ? "Definiciones disponibles"
        : "Sin definiciones";
    },
    formatVisible() {
      return this.occurrence.visible ? "Visible" : "No visible";
    },
  },
  async mounted() {
    await this.$store.dispatch("getDataForLearning", this.textId);
  },
  methods: {
    changeOccurrence(start) {
      this.occurrence = this.occurrences.find((o) => o.start === start);
    },
    toggleOptionsMenu() {
      this.optionsMenuActive = !this.optionsMenuActive;
    },
    async selectMeaning() {
      if (!this.activeSelectMeaning) {
        await this.$store.dispatch("getRelatedWords", this.occurrence);
      }
      this.activeSelectMeaning = !this.activeSelectMeaning;
    },
    async deleteOccurrence(id) {
      await this.$store.dispatch("deleteOccurrence", id);
      // TODO: Avoid reloading the page
      window.location.reload();
    },
    async toggleVisibility(occurrence) {
      occurrence.visible = !occurrence.visible;
      await this.$store.dispatch("updateSelectedWord", occurrence);
    },
    toggleAddOccurrence() {
      this.activeAddingOccurrence = true;
    },
    async addSelectedOccurrence() {
      const details = getSelectedWordDetails(this.currentTemplateText);
      await this.$store.dispatch("addNewOccurrence", details);
      // TODO: Avoid reloading the page
      window.location.reload();
    },
    onChangedMeaning() {
      this.occurrence = this.occurrences.find(
        o => o.start === this.occurrence.start
      );
    }
  },
};
</script>

<style lang="scss">
:root {
  --learn-background: #abd1c6;
  --learn-secondary: #004643;
}
.learn.main {
  grid-column: 2 / span 8;
  font-family: "Mulish", sans-serif;
}

.learn--header {
  padding-bottom: 20px;
  margin-bottom: 10px;
  border-bottom: 3px solid var(--learn-secondary);
}

.learn--header-left {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  width: 40%;
}

.learn--text {
  width: 40%;
  float: left;
  overflow: scroll;
  overflow-x: hidden;
  height: 100%;
}

.learn--text-content {
  font-size: 1.8em;
  text-align: left;
  line-height: 160%;
}

.learn--title {
  font-family: "Mulish", sans-serif;
  font-size: 2.5em;
  text-align: left;
  font-weight: 800;
}

.learn--current-info {
  width: 60%;
  float: right;
  height: 80vh;
}

.learn__word-actions {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 1em;
  grid-column: 1 / 3;
  // border: 1px solid red;
  margin-left: 20px;
  margin-right: 20px;

  > * {
    margin-top: 10px;
  }
}

.central {
  display: grid;
  grid-template-columns: 20% 40% 20%;
  justify-content: center;
  column-gap: 0.5em;
}
.side-info {
  border-radius: 5px;
  border: 1px solid #c2c2c2;
  text-align: center;

  .word-detailed-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0.5em;

    .feature {
      position: relative;

      span {
        color: #2185d0;
      }
      .help {
        display: none;
      }
      &:hover .help {
        display: block;
        border-radius: 20px;
        position: absolute;
        background-color: beige;
        z-index: 5;
        left: 200px;
        min-width: 200px;
        text-align: left;
        padding: 10px;
      }
    }
  }
}

.btn {
  margin: 5px;
  width: 150px;
  height: 30px;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  font-size: 1em;
  border: none;
  border-radius: 5px;
}

.btn-learned {
  background-color: green;
}

.btn-unlearned {
  background-color: red;
}
.dictionary {
  text-align: left;
  margin-left: 20px;
  margin-right: 20px;
}

.inline-word.ready {
  color: blue;
}
</style>
