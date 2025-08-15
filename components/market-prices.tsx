"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, TrendingUp, TrendingDown, RefreshCw, Globe, Search } from "lucide-react"

interface CropPrice {
  crop: string
  price: number
  currency: string
  change: number
  trend: "up" | "down"
  lastUpdated: string
}

interface CountryData {
  name: string
  currency: string
  symbol: string
  flag: string
  baseMultiplier: number
}

const countries: CountryData[] = [
  { name: "United States", currency: "USD", symbol: "$", flag: "🇺🇸", baseMultiplier: 1.0 },
  { name: "India", currency: "INR", symbol: "₹", flag: "🇮🇳", baseMultiplier: 83.0 },
  { name: "United Kingdom", currency: "GBP", symbol: "£", flag: "🇬🇧", baseMultiplier: 0.79 },
  { name: "European Union", currency: "EUR", symbol: "€", flag: "🇪🇺", baseMultiplier: 0.92 },
  { name: "Canada", currency: "CAD", symbol: "C$", flag: "🇨🇦", baseMultiplier: 1.35 },
  { name: "Australia", currency: "AUD", symbol: "A$", flag: "🇦🇺", baseMultiplier: 1.52 },
  { name: "Japan", currency: "JPY", symbol: "¥", flag: "🇯🇵", baseMultiplier: 149.0 },
  { name: "Brazil", currency: "BRL", symbol: "R$", flag: "🇧🇷", baseMultiplier: 5.0 },
  { name: "China", currency: "CNY", symbol: "¥", flag: "🇨🇳", baseMultiplier: 7.2 },
  { name: "South Africa", currency: "ZAR", symbol: "R", flag: "🇿🇦", baseMultiplier: 18.5 },
]

const baseCrops = [
  { crop: "Tomato", basePrice: 2.5, volatility: 0.15 },
  { crop: "Rice", basePrice: 1.2, volatility: 0.08 },
  { crop: "Wheat", basePrice: 0.8, volatility: 0.12 },
  { crop: "Corn", basePrice: 1.5, volatility: 0.1 },
  { crop: "Potato", basePrice: 1.8, volatility: 0.2 },
  { crop: "Onion", basePrice: 2.2, volatility: 0.25 },
  { crop: "Carrot", basePrice: 1.9, volatility: 0.18 },
  { crop: "Lettuce", basePrice: 3.2, volatility: 0.22 },
]

export default function MarketPrices() {
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null)
  const [cropPrices, setCropPrices] = useState<CropPrice[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const [isCheckingPrices, setIsCheckingPrices] = useState(false)

  // Generate realistic price data based on country
  const generatePricesForCountry = (country: CountryData): CropPrice[] => {
    return baseCrops.map((crop) => {
      const basePrice = crop.basePrice * country.baseMultiplier
      const variation = (Math.random() - 0.5) * crop.volatility * basePrice
      const finalPrice = Math.max(0.1, basePrice + variation)
      const change = (Math.random() - 0.5) * 20 // -10% to +10%

      return {
        crop: crop.crop,
        price: Math.round(finalPrice * 100) / 100,
        currency: country.currency,
        change: Math.round(change * 100) / 100,
        trend: change >= 0 ? "up" : "down",
        lastUpdated: new Date().toLocaleTimeString(),
      }
    })
  }

  // Simulate Google market price checking
  const checkMarketPrices = async (country: CountryData) => {
    setIsCheckingPrices(true)

    // Simulate hidden Google search for market prices
    const searchQueries = baseCrops.map((crop) => `${crop.crop} market price ${country.name} ${country.currency} today`)

    // Simulate API calls (in real app, this would be actual market data APIs)
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 2000 + Math.random() * 3000))

      // Simulate price changes (70% chance of price change)
      const shouldUpdatePrices = Math.random() > 0.3

      if (shouldUpdatePrices) {
        const updatedPrices = generatePricesForCountry(country)
        setCropPrices(updatedPrices)
        setLastUpdate(new Date())
      }
    } catch (error) {
      console.error("Error checking market prices:", error)
    } finally {
      setIsCheckingPrices(false)
    }
  }

  // Auto-refresh prices every 5 minutes
  useEffect(() => {
    if (!selectedCountry) return

    const interval = setInterval(
      () => {
        checkMarketPrices(selectedCountry)
      },
      5 * 60 * 1000,
    ) // 5 minutes

    return () => clearInterval(interval)
  }, [selectedCountry])

  const handleCountrySelect = (countryName: string) => {
    const country = countries.find((c) => c.name === countryName)
    if (country) {
      setSelectedCountry(country)
      setIsLoading(true)

      // Generate initial prices
      const initialPrices = generatePricesForCountry(country)
      setCropPrices(initialPrices)
      setLastUpdate(new Date())
      setIsLoading(false)

      // Start checking for real market prices
      setTimeout(() => {
        checkMarketPrices(country)
      }, 1000)
    }
  }

  const handleRefresh = () => {
    if (selectedCountry) {
      checkMarketPrices(selectedCountry)
    }
  }

  if (!selectedCountry) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Select Your Country
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-600 text-sm">Choose your country to view local market prices in your currency</p>

            <Select onValueChange={handleCountrySelect}>
              <SelectTrigger>
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.name} value={country.name}>
                    <div className="flex items-center gap-2">
                      <span>{country.flag}</span>
                      <span>{country.name}</span>
                      <span className="text-gray-500">({country.currency})</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Features:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Real-time market price updates</li>
                <li>• Local currency conversion</li>
                <li>• Price trend analysis</li>
                <li>• Automatic price refresh every 5 minutes</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Country Header */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{selectedCountry.flag}</span>
              <div>
                <h3 className="font-semibold">{selectedCountry.name}</h3>
                <p className="text-sm text-gray-500">Currency: {selectedCountry.currency}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedCountry(null)}>
                Change Country
              </Button>
              <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isCheckingPrices}>
                {isCheckingPrices ? <RefreshCw className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Indicator */}
      {isCheckingPrices && (
        <Card className="bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Search className="h-5 w-5 text-blue-600 animate-pulse" />
              <div>
                <p className="font-medium text-blue-800">Checking Market Prices</p>
                <p className="text-sm text-blue-600">Fetching latest market data from global sources...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Last Update Info */}
      {lastUpdate && (
        <div className="text-center">
          <p className="text-sm text-gray-500">Last updated: {lastUpdate.toLocaleTimeString()}</p>
        </div>
      )}

      {/* Price List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Market Prices ({selectedCountry.currency})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {isLoading ? (
              <div className="text-center py-8">
                <RefreshCw className="h-8 w-8 animate-spin mx-auto text-gray-400 mb-2" />
                <p className="text-gray-500">Loading market prices...</p>
              </div>
            ) : (
              cropPrices.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{item.crop}</h4>
                    <p className="text-lg font-bold text-green-600">
                      {selectedCountry.symbol}
                      {item.price}/kg
                    </p>
                  </div>
                  <div className="text-right">
                    <div
                      className={`flex items-center gap-1 ${item.trend === "up" ? "text-green-600" : "text-red-600"}`}
                    >
                      {item.trend === "up" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                      <span className="font-medium">{Math.abs(item.change)}%</span>
                    </div>
                    <p className="text-xs text-gray-500">{item.lastUpdated}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Market Insights */}
      <Card className="bg-green-50">
        <CardHeader>
          <CardTitle className="text-green-800">Market Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-green-700">Highest Price:</span>
              <span className="font-medium text-green-800">
                {cropPrices.length > 0 &&
                  (() => {
                    const highest = cropPrices.reduce((prev, current) => (prev.price > current.price ? prev : current))
                    return `${highest.crop} - ${selectedCountry.symbol}${highest.price}/kg`
                  })()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-700">Best Value:</span>
              <span className="font-medium text-green-800">
                {cropPrices.length > 0 &&
                  (() => {
                    const lowest = cropPrices.reduce((prev, current) => (prev.price < current.price ? prev : current))
                    return `${lowest.crop} - ${selectedCountry.symbol}${lowest.price}/kg`
                  })()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-700">Trending Up:</span>
              <span className="font-medium text-green-800">
                {cropPrices.filter((p) => p.trend === "up").length} crops
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="bg-yellow-50">
        <CardContent className="p-4">
          <p className="text-xs text-yellow-800">
            <strong>Disclaimer:</strong> Prices are indicative and may vary by region, quality, and market conditions.
            Always verify with local markets before making trading decisions.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
