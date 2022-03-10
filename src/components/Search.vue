<template>
  <div class="w3-container">
    <div class="w3-row w3-border">
      <input
        class="w3-input w3-border"
        v-model="searchParam"
        type="text"
        placeholder="Search Name"
      />
    </div>
  </div>
</template>
<script>
  //to pause for 1 sec while typing.
  const debounce = function debounce(fn, delay) {
    var timeoutID = null;
    return function () {
      clearTimeout(timeoutID);
      var args = arguments;
      var that = this;
      timeoutID = setTimeout(function () {
        fn.apply(that, args);
      }, delay);
    };
  };
  export default {
    data() {
      return {
        searchParam: null,
      };
    },
    watch: {
      searchParam: debounce(function (newVal) {
        this.$store.dispatch('getEmployeesBySearch',newVal)
      }, 1000),
    },
  };
</script>
