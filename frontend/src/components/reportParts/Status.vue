<template>
  <div
    v-if="(status !== 'ok') && (status !== 'cached')"
    class="container"
  >
    <div class="row">
      <div class="col-lg-12">
        <div
          :class="alertClass"
          role="alert"
        >
          <i :class="icon"></i>
          {{ message }}
        </div>
        <div
          v-for="(subMessage, index) in subMessages"
          :key="index"
          :class="subAlertClass"
          role="alert"
        >
          <i :class="icon"></i>
          {{ subMessage }}
        </div>
        <div v-if="typeImmatriculation === 'fni'">
          <div
            v-for="(fniSubMessage, index) in fniSubMessages"
            :key="index"
            :class="subAlertClass"
            role="alert"
          >
            <i :class="icon"></i>
            {{ fniSubMessage }}
          </div>
        </div>
        <div
          v-if="refMessage && refIcon"
          class="mb-20 text-center"
        >
          <router-link
            v-if="refDisplay"
            :to="{ name: ref, hash: refHash }"
          >
            <button
              type="button"
              class="btn btn-animated btn-default btn-m"
              :title="refMessage"
            >
              {{ refMessage }}
              <i :class="refIcon"></i>
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: String,
      default: 'unknown'
    },
    typeImmatriculation: {
      type: String,
      default: undefined
    }
  },
  computed: {
    message () {
      return this.statusMessages[this.status] ? (this.statusMessages[this.status].msg ? this.statusMessages[this.status].msg : '') : this.statusMessages.default.msg
    },
    alertClass () {
      return this.statusMessages[this.status] ? (this.statusMessages[this.status].class ? this.statusMessages[this.status].class : this.statusMessages.default.class) : this.statusMessages.default.class
    },
    subMessages () {
      return this.statusMessages[this.status] ? (this.statusMessages[this.status].subMessages ? this.statusMessages[this.status].subMessages : []) : this.statusMessages.default.subMessages
    },
    fniSubMessages () {
      return this.statusMessages[this.status] ? (this.statusMessages[this.status].fniSubMessages ? this.statusMessages[this.status].fniSubMessages : []) : this.statusMessages.default.fniSubMessages
    },
    subAlertClass () {
      return this.statusMessages[this.status] ? (this.statusMessages[this.status].subClass ? this.statusMessages[this.status].subClass : this.statusMessages.default.subClass) : this.statusMessages.default.subClass
    },
    icon () {
      return this.statusMessages[this.status] ? (this.statusMessages[this.status].icon ? this.statusMessages[this.status].icon : this.statusMessages.default.icon) : this.statusMessages.default.icon
    },
    refDisplay () {
      return this.statusMessages[this.status] ? (this.statusMessages[this.status].ref !== false) : true
    },
    ref () {
      return this.statusMessages[this.status] ? ((this.statusMessages[this.status].ref !== undefined) ? this.statusMessages[this.status].ref.route : this.statusMessages.default.ref.route) : this.statusMessages.default.ref.route
    },
    refHash () {
      return this.statusMessages[this.status] ? ((this.statusMessages[this.status].ref !== undefined) ? this.statusMessages[this.status].ref.hash : this.statusMessages.default.ref.hash) : this.statusMessages.default.ref.hash
    },
    refMessage () {
      return this.statusMessages[this.status] ? (this.statusMessages[this.status].ref ? this.statusMessages[this.status].ref.msg : this.statusMessages.default.ref.msg) : this.statusMessages.default.ref.msg
    },
    refIcon () {
      return this.statusMessages[this.status] ? (this.statusMessages[this.status].ref ? this.statusMessages[this.status].ref.icon : this.statusMessages.default.ref.icon) : this.statusMessages.default.ref.icon
    }
  }
}
</script>
