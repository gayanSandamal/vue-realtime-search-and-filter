<template>
  <div class="switch d-flex h-left">
    <div class="switch-loop d-flex v-center" v-for="(type, index) in types" :key="index">
      <input type="radio" :id="type.slug" :value="type.id" v-model="content" @change="choiseUpdate">
      <label :for="type.slug" class="d-flex v-center">
        {{type.label}}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'search',
  data() {
    return {  
      content: this.value
    }
  },
  props: {
    value: null,
    types: {
      type: Array,
      required: true
    }
  },
  methods: {
    choiseUpdate () {
      this.$emit('input', this.content)
    }
  }
}
</script>

<style scoped lang="scss">
.switch-loop:not(:last-child) {
  margin-right: 20px;
}
.switch-loop > input {
  margin: 0px 5px 0px 0px;
}

input[type="radio"] {
  position: absolute;
  opacity: 0;
  & + label {
    position: relative;
    cursor: pointer;
    padding: 0;
  }
  & + label:before {
    content: '';
    margin-right: 10px;
    display: inline-block;
    vertical-align: text-top;
    width: 24px;
    height: 24px;
    background-color: #c4c2da;
    border-radius: 4px;
  }
  &:checked + label:before {
    background: #abdca3;
  }
  &:checked + label:after {
    content: '';
    position: absolute;
    left: 7px;
    top: 11px;
    background: white;
    width: 2px;
    height: 2px;
    box-shadow: 
      2px 0 0 white,
      4px 0 0 white,
      4px -2px 0 white,
      4px -4px 0 white,
      4px -6px 0 white,
      4px -8px 0 white;
    transform: rotate(45deg);
  }
}
</style>
