<script>
  export default {
    props: {
      show: Boolean,
      userItem: Object,
    },
  };
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="w3-container">
            <header class="w3-container w3-border">
              <h2>{{ userItem.name }} : Checkins</h2>
            </header>
            <div v-for="checkin in userItem.checkins" class="w3-border">
              <header class="w3-container w3-light-grey">
                <h5>{{ checkin.location }}</h5>
              </header>
              <div class="w3-container">
                <p>
                  Time :
                  {{ new Date(checkin.checkin) }}
                </p>
                <hr />
                <p>Purpose : {{ checkin.purpose }}</p>
                <br />
              </div>
            </div>
            <div>
              <button
                class="w3-button w3-right w3-white w3-border w3-margin-top"
                @click="$emit('close')"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
  <!-- <div v-show="show" id="id01" class="w3-modal">
    <div class="w3-modal-content w3-card-4 w3-animate-zoom">
      <header class="w3-container w3-blue">
        <span
          onclick="document.getElementById('id01').style.display='none'"
          class="w3-button w3-blue w3-xlarge w3-display-topright"
          >&times;</span
        >
        <h2>Header</h2>
      </header>
      <div class="w3-container">lorem ipsum</div>

      <div class="w3-container w3-light-grey w3-padding">
        <button
          class="w3-button w3-right w3-white w3-border"
          onclick="document.getElementById('id01').style.display='none'"
        >
          Close
        </button>
      </div>
    </div>
  </div> -->
</template>

<style>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(3, 3, 3, 0.5);
    display: table;
    transition: opacity 0.3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 80%;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
  }

  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-default-button {
    float: right;
  }

  /*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

  .modal-enter-from {
    opacity: 0;
  }

  .modal-leave-to {
    opacity: 0;
  }

  .modal-enter-from .modal-container,
  .modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

  .flex-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
    background-color: DodgerBlue;
  }
</style>
