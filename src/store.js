import axios from "axios";
const BASEURL = "https://620dfdda20ac3a4eedcf5a52.mockapi.io/api/employee";
export default {
  state() {
    return {
      totalEmployees: [],
      employeesChunk: [],
      userCheckinDetails: [],
      currentPage: 1,
      showModal: false,
    };
  },
  mutations: {
    generateEmployees(state, payload) {
      state.totalEmployees = payload;
      state.employeesChunk = payload.slice(0, 10);
    },
    generateEmployeesByPage(state, payload) {
      state.employeesChunk = payload.employees;
      state.currentPage = payload.page;
    },
    generateEmployeesBySearchKey(state, payload) {
      state.totalEmployees = payload;
      state.employeesChunk = payload.slice(0, 10);
      state.currentPage = 1;
    },
    generateSortedEmployees(state, payload) {
      state.employeesChunk = payload;
    },
    generateEmployeeCheckinDetails(state, payload) {
      state.userCheckinDetails = payload;
      state.showModal = true;
    },
  },
  getters: {
    totalEmployeeCount(state) {
      return state.totalEmployees.length;
    },
    totalPages(state, getters) {
      return Math.ceil(getters.totalEmployeeCount / 10);
    },
  },
  actions: {
    getEmployees(context) {
      axios
        .get(BASEURL)
        .then((res) => {
          context.commit("generateEmployees", res.data);
        })
        .catch((er) => {
          console.log(er);
        });
    },
    getEmployeesByPage(context, page) {
      axios
        .get(`${BASEURL}?page=${page}&limit=10`)
        .then((res) => {
          const payload = {
            employees: res.data,
            page: page,
          };
          context.commit("generateEmployeesByPage", payload);
        })
        .catch((er) => {
          console.log(er);
        });
    },
    getEmployeesBySearch(context, searchKey) {
      let url = searchKey ? `${BASEURL}?name=${searchKey}` : BASEURL;
      axios
        .get(url)
        .then((response) => {
          let payload = response.data;
          context.commit("generateEmployeesBySearchKey", payload);
        })
        .catch((er) => {
          console.log(er);
        });
    },
    getSortedEmployees(context, payload) {
      axios
        .get(
          `${BASEURL}?page=${payload.currentPage}&limit=10&sortBy=${payload.colKey}&order=${payload.sortOrder}`
        )
        .then((res) => {
          context.commit("generateSortedEmployees", res.data);
        })
        .catch((er) => {
          console.log(er);
        });
    },
    getUserCheckinDetails(context, employee) {
      let details = employee;
      axios
        .get(`${BASEURL}/${employee.id}/checkin`)
        .then((response) => {
          details.checkins = response.data;
          context.commit("generateEmployeeCheckinDetails", details);
        })
        .catch((er) => {
          console.log(er);
        });
    },
  },
};
