<template>
  <ul class="list box">
    <li class="list-loop" v-for="(item, key, index) in list" :key="index">
      <span>{{key}}</span>
      <span>{{item}}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'search',
  data() {
    return {  
    }
  },
  props: {
    list: {
      type: Object
    }
  }
}
</script>

<style scoped lang="scss">
li {
  display: table-row;
  span {
    display: table-cell;
    padding: 10px;
  }
}
</style>
