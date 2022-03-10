<template>
  <div class="w3-container">
    <table class="w3-table-all w3-container">
      <tr @click="sortColumn($event)">
        <th data-prop="id">Id</th>
        <th data-prop="name">Name</th>
        <th data-prop="country">Country</th>
        <th data-prop="department">Department</th>
        <th data-prop="email">Email</th>
        <th data-prop="phone">Phone</th>
      </tr>
      <tr v-for="employee in employees" @click="ViewDetails(employee)">
        <td>{{ employee.id }}</td>
        <td>{{ employee.name }}</td>
        <td>{{ employee.name }}</td>
        <td>{{ employee.department.join(",") }}</td>
        <td>{{ employee.email }}</td>
        <td>{{ employee.phone }}</td>
      </tr>
    </table>
    <Teleport to="body">
      <!-- use the modal component, pass in the prop -->
      <modal
        :checkInDetails="checkInDetails"
        :show="$store.state.showModal"
        @close="$store.state.showModal = false"
      >
      </modal>
    </Teleport>
  </div>
</template>
<script>
  import Modal from "./Modal.vue";
  export default {
    components: {
      Modal,
    },
    data() {
      return {
        sortToggle: {
          id: false,
          name: false,
          country: false,
          department: false,
          email: false,
          phone: false,
        },
      };
    },
    computed: {
      employees() {
        return this.$store.state.employeesChunk;
      },
      checkInDetails() {
        return this.$store.state.userCheckinDetails;
      },
    },
    methods: {
      sortColumn(e) {
        let colKey = e.target.dataset.prop;
        this.sortToggle[colKey] = !this.sortToggle[colKey];
        let sortOrder = this.sortToggle[colKey] ? "desc" : "asc";
        this.$store.dispatch("getSortedEmployees", {
          currentPage: this.$store.state.currentPage,
          colKey: colKey,
          sortOrder: sortOrder,
        });
      },

      ViewDetails(employee) {
        this.$store.dispatch("getUserCheckinDetails", employee);
      },
    },
  };
</script>
<style scoped>
  tr {
    cursor: pointer;
  }
</style>
