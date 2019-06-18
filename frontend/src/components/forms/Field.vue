<template>
  <div
    class="form-group has-feedback"
    :class="[{'has-error' : ((!checkForm) && active)}]"
  >
    <label
      for="input"
      class="control-label"
    >
      {{ options['label'] }}
      <span 
        v-if="required"
        class="info_red"
        :title="requiredTitle"
      >
        *
      </span>
    </label>
    <i
      v-if="false"
      class="pull-right m-l-15 fa"
      :class="{ 
        'fa-lock': masked,
        'fa-unlock-alt': !masked
      }"
      :title="maskTitle"
      @click="toggleMask"
    >
    </i>
    <input
      v-if="masked && ((typeof mask) === 'string')"
      :id="formId"
      v-model="model"
      v-mask="mask"
      :type="type"
      :required="required"
      class="form-control"
      :placeholder="placeholder"
      :tabindex="tabindex"
    >
    <input
      v-if="masked && ((typeof mask) !== 'string')"
      :id="formId"
      v-model="model"
      :type="type"
      :required="required"
      class="form-control"
      :placeholder="placeholder"
      :tabindex="tabindex"
      @input="applyMask"
    >
    <input
      v-if="!masked"
      :id="formId"
      v-model="model"
      :type="type"
      :required="required"
      class="form-control"
      :placeholder="placeholder"
      :tabindex="tabindex"
    >
    <i
      v-if="icon"
      class="fa form-control-feedback"
      :class="icon"
    >
    </i>
  </div>
</template>

<script>
import masks from  '@/assets/js/masks'

export default {
  props: {
    formId: {
      type: String,
      default: 'default',
      required: true,
    },
    option: {
      type: String,
      default: undefined,
      required: false,
    },
    active: {
      type: Boolean,
      default: false,
      required: false,
    }
  },
  computed: {
    defaultOptions () {
      return this.$store.state.identity.formOptions.default
    },
    options () {
      if (this.option) {
        return this.$store.state.identity.formOptions[this.formId][this.option]
      } else {
        return this.$store.state.identity.formOptions[this.formId]
      }
    },
    model: {
      get () {
        return this.$store.state.identity[this.options.model]
      },
      set (value) {
        let m = this.options.model
        m = m.charAt(0).toUpperCase() + m.slice(1)
        this.$store.commit(`update${m}`, value)
      }
    },
    label () { return this.options.label || this.defaultOptions.label },
    required () { return ('required' in this.options) ? this.options.required : this.defaultOptions.required },
    requiredTitle () { return this.options.requiredTitle || this.defaultOptions.requiredTitle },
    type () { return this.options.type || this.defaultOptions.type },
    masked () { return this.options.masked },
    maskTitle () { return this.masked ? (this.options.maskTitle || this.defaultOptions.maskTitle) : (this.options.maskTitleAlt || this.defaultOptions.maskTitleAlt) },
    tabindex () { return this.options.tabindex },
    icon () { return this.options.icon },
    placeholder () { return this.masked ? this.options.placeholder : this.options.placeholderAlt },
    mask () {
      if (this.options.mask in masks) {
        return masks[this.options.mask]
      } else {
        return this.options.mask
      }
    },
    checkForm () { return this.model.match(this.options.check) }
  },
  methods: {
    toggleMask () {
      const lockKeyPath = this.option ? `${this.formId}.${this.option}.masked` : `${this.formId}.masked`
      this.$store.commit('updateFormOptions', { [lockKeyPath]: !this.masked })
    },
    applyMask (evt) {
      if (!evt.isTrusted) return
      let el = evt.currentTarget
      this.model = this.mask(el.value)
    }
  }
}
</script>