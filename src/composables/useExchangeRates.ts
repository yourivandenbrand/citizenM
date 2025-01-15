import { ref } from 'vue'
import type { Hotel } from '@/types/hotel'
import type { CurrencyRates } from '@/types/currency'

export function useExchangeRates() {
  const rates = ref<CurrencyRates>({})
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const fetchRates = async () => {
    isLoading.value = true
    try {
      const response = await fetch('/data/exchange-rate.json')
      if (!response.ok) throw new Error('Failed to fetch exchange rates')
      const data = await response.json()
      rates.value = data[0].rates // Using EUR as base
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load exchange rates'
    } finally {
      isLoading.value = false
    }
  }

  const convertPrice = (amount: number, fromCurrency: string, toCurrency: string): number => {
    if (fromCurrency === toCurrency || toCurrency === 'local') return amount
    
    const from = fromCurrency.toUpperCase()
    const to = toCurrency.toUpperCase()
    
    const fromRate = rates.value[from] || 1
    const toRate = rates.value[to] || 1
    
    return (amount / fromRate) * toRate
  }

  const getLowestPrice = (hotel: Hotel) => {
    return Math.min(...hotel.offers.map(offer => offer.price))
  }

  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2
    }).format(amount)
  }

  const getPriceDisplay = (hotel: Hotel, selectedCurrency: string) => {
    const lowestPrice = getLowestPrice(hotel)
    const price = selectedCurrency === 'local' 
      ? lowestPrice
      : convertPrice(lowestPrice, hotel.locale.currency, selectedCurrency)

    const displayCurrency = selectedCurrency === 'local' 
      ? hotel.locale.currency 
      : selectedCurrency

    return formatPrice(price, displayCurrency)
  }

  // Call fetchRates immediately
  fetchRates()

  return {
    rates,
    isLoading,
    error,
    convertPrice,
    getLowestPrice,
    formatPrice,
    getPriceDisplay
  }
} 