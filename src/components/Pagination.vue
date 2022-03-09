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
    props: {
      maxVisibleButtons: {
        type: Number,
        required: false,
        default: 3,
      },
      totalPages: {
        type: Number,
        required: true,
      },
      perPage: {
        type: Number,
        required: true,
      },
      currentPage: {
        type: Number,
        required: true,
      },
    },
    computed: {
      startPage() {
        // When on the first page
        if (this.currentPage === 1) {
          return 1;
        }

        // When on the last page
        if (this.currentPage === this.totalPages) {
          //return this.totalPages - this.maxVisibleButtons;
          const start = this.totalPages - (this.maxVisibleButtons - 1);

          if (start === 0) {
            return 1;
          } else {
            return start;
          }
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
    },
    methods: {
      onClickFirstPage() {
        this.$emit("pagechanged", 1);
      },
      onClickPreviousPage() {
        this.$emit("pagechanged", this.currentPage - 1);
      },
      onClickPage(page) {
        this.$emit("pagechanged", page);
      },
      onClickNextPage() {
        this.$emit("pagechanged", this.currentPage + 1);
      },
      onClickLastPage() {
        this.$emit("pagechanged", this.totalPages);
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
