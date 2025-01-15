<template>
  <div class="bg-white rounded-lg overflow-hidden shadow h-full flex flex-col">
    <div class="relative">
      <img 
        :src="hotel.image" 
        :alt="hotel.name"
        class="w-full h-48 object-cover"
      >
      <div class="absolute top-3 left-3">
        <span class="bg-green-500 text-white px-2 py-1 text-sm rounded">
          available
        </span>
      </div>
      <button class="absolute top-3 right-3 p-2 bg-white rounded hover:bg-gray-100">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
        </svg>
      </button>
    </div>

    <div class="p-4 flex flex-col flex-grow">
      <div>
        <h3 class="text-2xl font-bold">{{ hotel.name }}</h3>
        <p class="text-gray-600 text-sm mt-1 font-chalet">
          1 out of 1 hotels are available
        </p>
      </div>

      <div class="mt-auto">
        <div class="bg-[#F1F1F1] px-4 py-3 mt-3 mb-1">
          <div class="flex flex-row items-center justify-between">
            <p class="text-gray-500 text-sm font-chalet mr-2">rooms available <br />from</p>
            <p class="font-chalet text-xl font-bold">
              {{ getPriceDisplay(hotel, selectedCurrency) }}
            </p>
          </div>
        </div>

        <button 
          @click="$emit('view-rates')"
          class="w-full mt-3 bg-[#FF0038] text-white py-5 rounded hover:bg-red-600 transition-colors font-medium"
        >
          view rates
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Hotel } from '../types/hotel'
import { useExchangeRates } from '../composables/useExchangeRates'
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  hotel: Hotel,
  selectedCurrency: string
}>()

defineEmits<{
  (e: 'view-rates'): void
}>()

const { getPriceDisplay } = useExchangeRates()

defineOptions({
  name: 'HotelCard'
})
</script>
