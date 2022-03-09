<template>
  <div class="w3-container w3-margin">
    <div class="w3-container">
      <div class="w3-row w3-border">
        <div class="w3-col w3-quarter w3-left w3-container">
          <h3>Employees</h3>
        </div>
        <div class="w3-col w3-right w3-container" style="width: 100px">
          <p></p>
        </div>
        <div class="w3-rest w3-container"></div>
      </div>
    </div>

    <div class="w3-container">
      <div class="w3-row w3-border">
        <div class="w3-half">
          <input
            class="w3-input w3-border"
            v-model="searchParam"
            type="text"
            placeholder="Search Name"
          />
        </div>
        <div class="w3-half">
          <div>
            <!-- <font-awesome-icon icon="fa-solid fa-angles-down" /> -->
            <input class="w3-button" type="button" value="Sort" />
          </div>
        </div>
      </div>
    </div>
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
    </div>
    <pagination
      :total-pages="totalPages"
      :total="totalEmployees"
      :per-page="10"
      :current-page="currentPage"
      @pagechanged="onPageChange"
    ></pagination>

    <Teleport to="body">
      <!-- use the modal component, pass in the prop -->
      <modal :userItem="user" :show="showModal" @close="showModal = false">
      </modal>
    </Teleport>
  </div>
</template>
<script>
  import axios from "axios";
  import pagination from "./Pagination.vue";
  import Modal from "./Modal.vue";
  const BASEURL = "https://620dfdda20ac3a4eedcf5a52.mockapi.io/api/employee";

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
    components: {
      pagination: pagination,
      Modal,
    },
    data() {
      return {
        showModal: false,
        currentPage: 1,
        employees: [],
        user: null,
        totalEmployees: 0,
        totalPages: 0,
        searchParam: null,
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
    watch: {
      searchParam: debounce(function (newVal) {
        let url = newVal ? `${BASEURL}?name=${newVal}` : BASEURL;
        axios
          .get(url)
          .then((response) => {
            let data = response.data;
            this.totalEmployees = data.length;
            this.totalPages = Math.ceil(this.totalEmployees / 10);
            this.employees = data.slice(0, 10);
          })
          .catch((er) => {
            console.log(er);
          });
      }, 1000),
    },
    methods: {
      sortColumn(e) {
        let colKey = e.target.dataset.prop;
        this.sortToggle[colKey] = !this.sortToggle[colKey];
        axios
          .get(
            `${BASEURL}?page=${
              this.currentPage
            }&limit=10&sortBy=${colKey}&order=${
              this.sortToggle[colKey] ? "desc" : "asc"
            }`
          )
          .then((res) => {
            this.employees = res.data;
          })
          .catch((er) => {
            console.log(er);
          });
      },
      onPageChange(page) {
        axios
          .get(`${BASEURL}?page=${page}&limit=10`)
          .then((res) => {
            this.employees = res.data;
          })
          .catch((er) => {
            console.log(er);
          });
        this.currentPage = page;
      },
      ViewDetails(employee) {
        let details = employee;
        axios
          .get(`${BASEURL}/${employee.id}/checkin`)
          .then((response) => {
            details.checkins = response.data;
            this.user = details;
            this.showModal = true;
          })
          .catch((er) => {
            console.log(er);
          });
      },
    },
    created() {
      axios
        .get(BASEURL)
        .then((response) => {
          let data = response.data;
          this.totalEmployees = data.length;
          this.totalPages = Math.ceil(this.totalEmployees / 10);
          this.employees = data.slice(0, 10);
        })
        .catch((er) => {
          console.log(er);
        });
    },
  };
</script>
<style scoped>
  tr {
    cursor: pointer;
  }
</style>
