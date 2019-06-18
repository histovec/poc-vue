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
          <router-link
            v-if="refDisplay"
            class="clickable alert-danger"
            :to="{ name: ref, hash: refHash }"
          >
            <em>{{ refMessage }}</em>
            <b :class="refIcon"></b>
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
    }
  },
  computed: {
    message () {
      return this.statusMessages[this.status] ? (this.statusMessages[this.status].msg ? this.statusMessages[this.status].msg : this.statusMessages[this.status]) : this.statusMessages.default.msg
    },
    alertClass () {
      return this.statusMessages[this.status] ? (this.statusMessages[this.status].class ? this.statusMessages[this.status].class : this.statusMessages.default.class) : this.statusMessages.default.class
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
      return this.statusMessages[this.status] ? ((this.statusMessages[this.status].ref !== undefined) ? this.statusMessages[this.status].ref.hash : this.statusMessages.default.ref.hash) : this.statusMessages.default.ref.route
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
