<template>
  <div class="switch d-flex h-left">
    <div class="check-loop d-flex v-center full-width" v-for="(type, index) in types" :key="index">
      <input type="checkbox" :id="type.slug" :value="type.slug" v-model="content" @change="choiseUpdate">
      <label :for="type.slug">
        <div>{{type.label}}</div>
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
.check-loop:not(:last-child) {
  margin-right: 20px;
}
.check-loop > input {
  margin: 0px 5px 0px 0px;
}
input[type=checkbox]{
	height: 0;
  width: 0;
  display: none;
}

label {
  div {
    white-space: nowrap;
    position: relative;
    top: 3px;
    left: 50px;
  }
	cursor: pointer;
  width: 40px;
  height: 22px;
	background: #c4c2da;
	display: block;
	border-radius: 25px;
	position: relative;
}
label:after {
	content: '';
	position: absolute;
  top: 2px;
  left: 2px;
	width: 18px;
	height: 18px;
	background: #fff;
	border-radius: 18px;
	transition: 0.3s;
}
input:checked + label {
	background: #abdca3;
}
input:checked + label:after {
	left: calc(100% - 5px);
	transform: translateX(-100%);
}
label:active:after {
	width: 30px;
}
</style>
