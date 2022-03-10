<template>
  <div class="w3-container w3-margin">
    <Header></Header>
    <Search></Search>
    <grid></grid>
    <pagination></pagination>
  </div>
</template>
<script>
  import pagination from "./components/Pagination.vue";
  import Modal from "./components/Modal.vue";
  import Header from "./components/Header.vue";
  import Search from "./components/Search.vue";
  import Grid from "./components/Grid.vue";
  export default {
    components: {
      pagination,
      Modal,
      Header,
      Search,
      Grid,
    },
    created() {
      this.$store.dispatch("getEmployees");
    },
  };
</script>
<style>
  @import url("./w3.css");
</style>
