<template>
  <div class="box table-wrapper d-flex h-center neu-morphism-shadow full-width">
    <table cellspacing="0" cellpadding="0">
      <thead>
        <tr>
          <th class="text-left" :colspan="Object.keys(rows[0]).length + 1">
            <span class="chip mb-1" style="display: inline-block">Total results: {{rows.length}}</span>
          </th>
        </tr>
        <tr class="neu-morphism-shadow">
          <th>&nbsp;</th>
          <th class="text-left sticky-0" v-for="(cell, idx) in Object.keys(rows[0])" :key="idx">{{setkeyNormalizer(cell)}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in rows" :key="index">
          <td class="text-right" v-text="index+1"></td>
          <td v-for="(cell, key, idx) in row" :key="idx">
            <router-link :to="'/'+encodeType(Object.keys(rows[0])[idx])+'/'+encodeName(cell)">{{cell}}</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {keyNormalizer} from './../../custom_methods/swivel_methods'
export default {
  name: 'search',
  data() {
    return {  
    }
  },
  props: {
    rows: {
      type: Array
    },
    type: Number
  },
  methods: {
    encodeType(string) {
      return string.replace(/_/g, '-').toLowerCase()
    },
    encodeName(string) {
      return string.replace(/ /g, '-').toLowerCase()
    },
    setkeyNormalizer(string) {
      return keyNormalizer(string)
    }
  }
}
</script>

<style scoped lang="scss">
.table-wrapper {
  width: 100%;
    table {
    position: relative;
    border: none;
    width: 100%;
    thead {
      tr:nth-child(1) {
        th {
          font-size: 12px;
          padding: 0px 0px 10px 0px;
        }
      }
      tr:nth-child(2) {
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        th {
          padding: 10px 10px 10px 0px;
          position: sticky;
          top: 0;
          background-color: #f3f4fb;
          text-transform: uppercase;
          font-size: 12px;
        }
      }
      th {
        color: #242a57;
        font-weight: 400;
        letter-spacing: 1px;
      }
    }
    tbody {
      tr:first-child {
        td {
          padding: 15px 5px 10px 5px;
        }
        td:first-child {
          padding-right: 5px;
        }
      }
      tr:nth-child(even) {
        background-color: #eeeef3;
      }
      tr:not(:first-child) {
        td {
          padding: 5px;
        }
        td:first-child {
          padding: 10px 5px 10px 5px;
        }
      }
    }
  }
}
</style>
