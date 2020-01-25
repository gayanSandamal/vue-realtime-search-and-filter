<template>
  <div class="search full-width">
    <input class="full-width" type="text" v-model="content" @input="textUpdate" @change="textUpdate" @paste="textUpdate" :placeholder="'Search by any column name in ' + placeholder"/>
    <button v-if="action" @click.stop="triggerAction">Search</button>
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
    action: Function,
    realtimeAction: Function,
    placeholder: String
  },
  methods: {
    textUpdate () {
      this.$emit('input', this.content)
      if (this.realtimeAction) {
        return this.realtimeAction()
      }
    },
    triggerAction() {
      if (this.action) {
        return this.action()
      }
    }
  }
}
</script>

<style scoped lang="scss">
input {
  padding: 10px 10px;
  box-sizing: border-box;
  outline: none;
  border: none;
  transition: 0.2s;
  border: 1px solid #e0e0e9;
}
input:focus {
  box-shadow: 5px 5px 7px 1px rgba(0,0,0,0.25), -5px -5px 10px 2px rgba(255, 255, 255, 1);
  transition: 0.2s;
}
</style>
