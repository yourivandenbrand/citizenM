import { defineStore } from 'pinia'
import type { Hotel, HotelState } from '../types/hotel'
import { useExchangeRates } from '../composables/useExchangeRates'

export const useHotelStore = defineStore('hotel', {
  state: (): HotelState => ({
    hotels: [],
    selectedCurrency: 'local',
    sortOrder: 'lowest'
  }),

  getters: {
    availableHotels: (state) => state.hotels,
    
    sortedHotels: (state) => {
      const { convertPrice, getLowestPrice } = useExchangeRates()
      
      return [...state.hotels].sort((a, b) => {
        const aPrice = state.selectedCurrency === 'local' 
          ? getLowestPrice(a)
          : convertPrice(getLowestPrice(a), a.locale.currency, state.selectedCurrency)
        
        const bPrice = state.selectedCurrency === 'local' 
          ? getLowestPrice(b)
          : convertPrice(getLowestPrice(b), b.locale.currency, state.selectedCurrency)
        
        return state.sortOrder === 'lowest' 
          ? aPrice - bPrice 
          : bPrice - aPrice
      })
    },
    
    totalAvailableHotels: (state) => state.hotels.length
  },

  actions: {
    setHotels(hotels: Hotel[]) {
      this.hotels = hotels
    },
    
    setCurrency(currency: string) {
      this.selectedCurrency = currency
    },
    
    setSortOrder(order: 'lowest' | 'highest') {
      this.sortOrder = order
    }
  }
}) 