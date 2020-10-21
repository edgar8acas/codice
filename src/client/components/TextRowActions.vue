<template>
  <div>
    <router-link
      :to="{ name: 'TextDetails', params: { id: rowData.textId } }"
      tag="button"
      class="ui button mini"
      v-if="user.admin"
    >
      Detalles
    </router-link>
    <router-link
      :to="{ name: 'Learn', params: { id: rowData.textId } }"
      tag="button"
      class="ui button mini"
    >
      Aprender
    </router-link>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    rowData: Object,
  },
  computed: {
    ...mapState("auth", ["user"]),
  },
};
</script>

<style></style>
