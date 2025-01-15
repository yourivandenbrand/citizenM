<template>
  <div>
    <h1 class="text-4xl font-bold mb-4 font-chalet">
      {{ store.totalAvailableHotels }} available hotels in Europe
    </h1>

    <div class="flex gap-8 mb-8">
      <div class="flex items-center gap-2">
        <span class="text-sm text-gray-600 font-chalet">currency:</span>
        <div class="relative">
          <select 
            v-model="store.selectedCurrency"
            class="appearance-none bg-transparent pr-8 pl-2 py-1 border-b border-gray-300 focus:outline-none focus:border-gray-600"
          >
            <option value="local">local</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="USD">USD</option>
            <option value="DKK">DKK</option>
          </select>
          <svg 
            class="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <span class="text-sm text-gray-600 font-chalet">price:</span>
        <div class="relative">
          <select 
            v-model="store.sortOrder"
            class="appearance-none bg-transparent pr-8 pl-2 py-1 border-b border-gray-300 focus:outline-none focus:border-gray-600"
          >
            <option value="lowest">lowest</option>
            <option value="highest">highest</option>
          </select>
          <svg 
            class="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
    </div>

    <div v-if="isLoading" class="text-center py-8">
      Loading hotels...
    </div>

    <div v-else-if="error" class="text-center py-8 text-red-500">
      {{ error }}
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <HotelCard
        v-for="hotel in store.sortedHotels"
        :key="hotel.name"
        :hotel="hotel"
        :selected-currency="store.selectedCurrency"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useHotelStore } from '../stores/hotelStore'
import { useHotelsApi } from '../composables/useHotelsApi'
import HotelCard from './HotelCard.vue'

const store = useHotelStore()
const { fetchHotels, isLoading, error } = useHotelsApi()

onMounted(() => {
  fetchHotels()
})
</script> 