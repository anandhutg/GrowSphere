"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ExternalLink, BookOpen } from "lucide-react"

interface GoogleSearchProps {
  onClose?: () => void
}

export default function GoogleSearch({ onClose }: GoogleSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchHistory, setSearchHistory] = useState<string[]>([])

  const handleGoogleSearch = (query: string) => {
    if (!query.trim()) return

    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query + " plant growing guide farming")}`
    window.open(searchUrl, "_blank", "noopener,noreferrer")

    // Add to search history
    setSearchHistory((prev) => {
      const newHistory = [query, ...prev.filter((item) => item !== query)].slice(0, 5)
      return newHistory
    })
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    handleGoogleSearch(searchQuery)
  }

  const popularSearches = [
    "tomato growing guide",
    "rice cultivation methods",
    "wheat farming techniques",
    "corn planting season",
    "potato growing conditions",
    "carrot soil requirements",
    "lettuce growing tips",
    "onion farming guide",
    "spinach growing season",
    "broccoli cultivation",
  ]

  const quickSearches = [
    { query: "plant climate requirements", icon: "🌡️", description: "Temperature & weather needs" },
    { query: "soil pH for vegetables", icon: "🌱", description: "Soil conditions & pH levels" },
    { query: "NPK fertilizer guide", icon: "🧪", description: "Fertilizer types & ratios" },
    { query: "plant growth stages", icon: "📈", description: "Growth timeline & stages" },
    { query: "organic farming methods", icon: "🌿", description: "Natural growing techniques" },
    { query: "pest control vegetables", icon: "🐛", description: "Pest management & control" },
  ]

  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-blue-500" />
            Google Plant Research
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              placeholder="Search for plant information (e.g., tomato growing guide)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={!searchQuery.trim()}>
              <Search className="h-4 w-4" />
            </Button>
          </form>

          <p className="text-sm text-gray-600">
            Search Google for detailed plant growing information, then use the details to fill your plant form.
          </p>
        </CardContent>
      </Card>

      {/* Quick Search Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Research Topics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-2">
            {quickSearches.map((item, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => handleGoogleSearch(item.query)}
                className="justify-start h-auto p-3"
              >
                <div className="flex items-center gap-3 w-full">
                  <span className="text-lg">{item.icon}</span>
                  <div className="text-left">
                    <p className="font-medium text-sm">{item.query}</p>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                  <ExternalLink className="h-4 w-4 ml-auto text-gray-400" />
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Popular Plant Searches */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Popular Plant Searches</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((search, index) => (
              <Button
                key={index}
                variant="secondary"
                size="sm"
                onClick={() => handleGoogleSearch(search)}
                className="text-xs"
              >
                {search}
                <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search History */}
      {searchHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Searches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {searchHistory.map((search, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  onClick={() => handleGoogleSearch(search)}
                  className="w-full justify-between"
                >
                  <span>{search}</span>
                  <ExternalLink className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-green-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <BookOpen className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-green-800 mb-1">Research Tips</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Search for "[plant name] growing guide" for comprehensive info</li>
                <li>• Look for climate zones and temperature requirements</li>
                <li>• Check soil pH and drainage needs</li>
                <li>• Find fertilizer NPK ratios and feeding schedules</li>
                <li>• Note planting seasons and harvest times</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {onClose && (
        <Button onClick={onClose} variant="outline" className="w-full bg-transparent">
          Close Search
        </Button>
      )}
    </div>
  )
}
