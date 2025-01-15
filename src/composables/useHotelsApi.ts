import { ref } from 'vue'
import type { Hotel } from '../types/hotel'
import { useHotelStore } from '../stores/hotelStore'

export function useHotelsApi() {
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const store = useHotelStore()

  const fetchHotels = async () => {
    isLoading.value = true
    
    try {
      const response = await fetch('/data/offers.json')
      if (!response.ok) throw new Error('Failed to fetch hotels')
      
      const hotels: Hotel[] = await response.json()
      store.setHotels(hotels)
      error.value = null
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An error occurred'
      error.value = errorMessage
    } finally {
      isLoading.value = false
    }
  }

  return {
    fetchHotels,
    isLoading,
    error
  }
} 