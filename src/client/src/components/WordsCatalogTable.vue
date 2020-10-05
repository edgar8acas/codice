<script>
import Vuetable from "vuetable-2/src/components/Vuetable";
import VuetablePagination from "vuetable-2/src/components/VuetablePagination";
import VuetablePaginationInfo from "vuetable-2/src/components/VuetablePaginationInfo";
import WordRowActions from "@/components/WordRowActions";
export default {
  components: {
    Vuetable,
    VuetablePagination,
    VuetablePaginationInfo,
    WordRowActions,
  },
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
    fields: {
      type: Array,
      required: true,
    },
    sortOrder: {
      type: Array,
      default() {
        return [
          {
            field: "wordId",
            direction: "asc",
          },
        ];
      },
    },
    appendParams: {
      type: Object,
      default() {
        return {};
      },
    },
    queryParams: {
      sort: '',
      page: 'page',
      perPage: 'per_page'
    }
  },
  render(h) {
    return h(
      "div",
      {
        class: { "table-container": true },
      },
      [
        this.renderVuetable(h),
        this.renderPagination(h),
      ]
    );
  },
  methods: {
    renderVuetable(h) {
      return h("vuetable", {
        ref: "vuetable",
        props: {
          apiUrl: this.apiUrl,
          fields: this.fields,
          paginationPath: "",
          perPage: 8,
          sortOrder: this.sortOrder,
          queryParams: this.queryParams,
          trackBy: 'wordId'
        },
        on: {
          "vuetable:pagination-data": this.onPaginationData,
          "vuetable:load-success": this.onLoadSuccess,
          "vuetable:row-clicked": this.showWordDetails,
        },
        scopedSlots: {
          actions: function (props) {
            return h("word-row-actions", {
              props: {
                rowData: props.rowData,
              },
            });
          },
        },
      });
    },
    renderPagination(h) {
      return h(
        "div",
        {
          class: {
            "vuetable-pagination": true,
            ui: true,
            basic: true,
            segment: true,
            grid: true,
          },
        },
        [
          h("vuetable-pagination-info", {
            ref: "paginationInfo",
            props: {
              infoTemplate: "Mostrando {from} a {to} de {total} palabras",
            },
          }),
          h("vuetable-pagination", {
            ref: "pagination",
            on: {
              "vuetable-pagination:change-page": this.onChangePage,
            },
          }),
        ]
      );
    },
    formatUrl(value) {
      return value ? value.substring(0, 30) + "..." : "";
    },
    onPaginationData(paginationData) {
      this.$refs.pagination.setPaginationData(paginationData);
      this.$refs.paginationInfo.setPaginationData(paginationData);
    },
    onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    },
    showWordDetails(word) {
      this.$emit("showWordDetails", word);
    },
  },
};
</script>
