<template>
  <ul class="pagination">
    <li class="pagination-item">
      <button
        class="w3-button w3-white w3-border"
        type="button"
        @click="onClickFirstPage"
        :disabled="isInFirstPage"
      >
        First
      </button>
    </li>

    <li class="pagination-item">
      <button
        class="w3-button w3-white w3-border"
        type="button"
        @click="onClickPreviousPage"
        :disabled="isInFirstPage"
      >
        Previous
      </button>
    </li>

    <!-- Visible Buttons Start -->

    <li v-for="page in pages" :key="page.name" class="pagination-item">
      <button
        class="w3-button w3-white w3-border"
        type="button"
        @click="onClickPage(page.name)"
        :disabled="page.isDisabled"
      >
        {{ page.name }}
      </button>
    </li>

    <!-- Visible Buttons End -->

    <li class="pagination-item">
      <button
        class="w3-button w3-white w3-border"
        type="button"
        @click="onClickNextPage"
        :disabled="isInLastPage"
      >
        Next
      </button>
    </li>

    <li class="pagination-item">
      <button
        class="w3-button w3-white w3-border"
        type="button"
        @click="onClickLastPage"
        :disabled="isInLastPage"
      >
        Last
      </button>
    </li>
  </ul>
</template>

<script>
  export default {
    computed: {
      startPage() {
        // When on the first page
        if (this.currentPage === 1) {
          return 1;
        }

        // When on the last page
        if (this.currentPage === this.totalPages) {
          return this.totalPages - this.maxVisibleButtons;
        }

        // When inbetween
        return this.currentPage - 1;
      },
      pages() {
        const range = [];
        for (
          let i = this.startPage;
          i <=
          Math.min(
            this.startPage + this.maxVisibleButtons - 1,
            this.totalPages
          );
          i++
        ) {
          range.push({
            name: i,
            isDisabled: i === this.currentPage,
          });
        }
        return range;
      },
      endPage() {
        return Math.min(
          this.startPage + this.maxVisibleButtons - 1,
          this.totalPages
        );
      },
      isInFirstPage() {
        return this.currentPage === 1;
      },
      isInLastPage() {
        return this.currentPage === this.totalPages;
      },
      currentPage() {
        return this.$store.state.currentPage;
      },
      maxVisibleButtons() {
        return 3;
      },
      totalPages() {
        return this.$store.getters.totalPages;
      },
    },
    methods: {
      onClickFirstPage() {
        this.$store.dispatch("getEmployeesByPage", 1);
      },
      onClickPreviousPage() {
        this.$store.dispatch("getEmployeesByPage", this.currentPage - 1);
      },
      onClickPage(page) {
        this.$store.dispatch("getEmployeesByPage", page);
      },
      onClickNextPage() {
        this.$store.dispatch("getEmployeesByPage", this.currentPage + 1);
      },
      onClickLastPage() {
        this.$store.dispatch("getEmployeesByPage", this.totalPages);
      },
    },
  };
</script>
<style>
  .pagination {
    list-style-type: none;
  }

  .pagination-item {
    display: inline-block;
  }

  .pagination-item > button {
    margin-left: 2px;
    margin-right: 2px;
  }

  .active {
    background-color: #4aae9b;
    color: #ffffff;
  }
</style>
