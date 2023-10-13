<script setup>

import Vue from 'vue'
import VueTailwind from 'vue-tailwind'
import {
  TTable,
} from 'vue-tailwind/dist/components'

const settings = {
  't-table': {
    component: TTable,
    props: {
      classes: {
        table: 'min-w-full divide-y divide-gray-100 shadow-sm border-gray-200 border',
        thead: '',
        theadTr: '',
        theadTh: 'px-3 py-2 font-semibold text-left bg-gray-100 border-b',
        tbody: 'bg-white divide-y divide-gray-100',
        tr: '',
        td: 'px-3 py-2 whitespace-no-wrap',
        tfoot: '',
        tfootTr: '',
        tfootTd: ''
      },
      variants: {
        thin: {
          td: 'p-1 whitespace-no-wrap text-sm',
          theadTh: 'p-1 font-semibold text-left bg-gray-100 border-b text-sm'
        }
      }
    }
  }
}

Vue.use(VueTailwind, settings)

</script>

<template>
    <t-table
      :headers="['Name', 'Email', 'Age', 'Sales']"
      :data="[
          ['Alfonso Bribiesca', 'alfonso@vexilo.com', '31', '$9,999.00'],
          ['Saida Redondo', 'saida@gmail.com', 27, '$124.00'],
      ]"
    ></t-table>

</template>