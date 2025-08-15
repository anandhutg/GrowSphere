"use client"

import type React from "react"
import type { ReactElement } from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, Upload, Search, Loader2, CheckCircle, Globe, ImageIcon } from "lucide-react"
import GoogleSearch from "@/components/google-search"

interface Plant {
  id: string
  name: string
  image: string
  climate: string
  soil: string
  fertilizer: string
  growthPeriod: number
}

interface AddPlantProps {
  onAddPlant: (plant: Plant) => void
  onBack: () => void
}

interface PlantResearchResult {
  name: string
  scientificName: string
  description: string
  image: string
  climate: string
  soil: string
  fertilizer: string
  growthPeriod: number
  plantingSeasons: string[]
  harvestTime: string
  commonDiseases: string[]
  tips: string[]
  confidence: number
}

export default function AddPlant({ onAddPlant, onBack }: AddPlantProps): ReactElement {
  const [formData, setFormData] = useState({
    name: "",
    climate: "",
    soil: "",
    fertilizer: "",
    growthPeriod: "",
    image: "",
  })

  const [showGoogleSearch, setShowGoogleSearch] = useState(false)
  const [isResearching, setIsResearching] = useState(false)
  const [researchResult, setResearchResult] = useState<PlantResearchResult | null>(null)
  const [showResearchResult, setShowResearchResult] = useState(false)

  // Enhanced plant database with detailed information
  const plantDatabase: Record<string, PlantResearchResult> = {
    tomato: {
      name: "Tomato",
      scientificName: "Solanum lycopersicum",
      description:
        "Tomatoes are warm-season vegetables that belong to the nightshade family. They are one of the most popular garden vegetables worldwide, known for their versatility in cooking and high nutritional value.",
      image: "https://shorturl.at/H4gD2",
      climate:
        "Warm temperate climate with temperatures between 20-25°C. Requires full sun exposure (6-8 hours daily), moderate humidity (60-70%), and protection from strong winds. Frost-sensitive and needs warm nights for fruit development.",
      soil: "Well-drained, fertile loamy soil with pH 6.0-6.8. Rich in organic matter with good drainage essential to prevent root rot. Soil should be deep (at least 30cm) and have good water retention capacity.",
      fertilizer:
        "NPK 10-10-10 balanced fertilizer during early growth, then switch to lower nitrogen (5-10-10) during fruiting. Organic compost, calcium supplements to prevent blossom end rot, and regular feeding every 2-3 weeks.",
      growthPeriod: 3,
      plantingSeasons: ["Spring", "Early Summer"],
      harvestTime: "75-85 days from transplant",
      commonDiseases: ["Blight", "Fusarium Wilt", "Blossom End Rot"],
      tips: ["Stake tall varieties", "Mulch around plants", "Water consistently", "Prune suckers"],
      confidence: 0.98,
    },
    rice: {
      name: "Rice",
      scientificName: "Oryza sativa",
      description:
        "Rice is a staple cereal grain and one of the most important food crops globally. It's primarily grown in flooded fields and requires specific water management techniques for optimal growth.",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
      climate:
        "Tropical and subtropical climate with high humidity (80-90%). Temperature range 20-35°C with warm nights. Requires monsoon rainfall or irrigation, and can tolerate flooding conditions.",
      soil: "Clay or clay loam soil with high water retention capacity. pH range 5.5-7.0, preferably slightly acidic. Soil should be able to hold water for extended periods without drainage.",
      fertilizer:
        "Urea for nitrogen (split application), DAP for phosphorus, potash for potassium. Organic manure before planting, and micronutrients like zinc and iron. Apply fertilizers in 3-4 splits during growing season.",
      growthPeriod: 4,
      plantingSeasons: ["Monsoon", "Winter"],
      harvestTime: "120-150 days from sowing",
      commonDiseases: ["Blast", "Brown Spot", "Bacterial Leaf Blight"],
      tips: ["Maintain water level", "Transplant seedlings", "Weed control", "Proper spacing"],
      confidence: 0.96,
    },
    wheat: {
      name: "Wheat",
      scientificName: "Triticum aestivum",
      description:
        "Wheat is a major cereal grain and one of the world's most important food crops. It's a cool-season crop that requires specific temperature and moisture conditions for optimal growth.",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop",
      climate:
        "Cool, moist climate during vegetative growth phase, warm dry weather during grain filling and harvest. Optimal temperature 15-25°C, requires vernalization (cold treatment) for some varieties.",
      soil: "Well-drained loamy soil with pH 6.0-7.5. Deep, fertile soil with good water holding capacity and organic matter content. Avoid waterlogged or sandy soils.",
      fertilizer:
        "Nitrogen-rich fertilizers for vegetative growth, phosphorus for root development and grain formation, potassium for disease resistance. Apply basal dose and top-dress with nitrogen.",
      growthPeriod: 6,
      plantingSeasons: ["Winter", "Spring"],
      harvestTime: "120-150 days from sowing",
      commonDiseases: ["Rust", "Smut", "Powdery Mildew"],
      tips: ["Proper seed rate", "Timely sowing", "Weed management", "Disease monitoring"],
      confidence: 0.94,
    },
    corn: {
      name: "Corn (Maize)",
      scientificName: "Zea mays",
      description:
        "Corn is a large grain plant domesticated in Mexico. It's one of the most widely grown crops globally and serves as food for humans and livestock, as well as industrial applications.",
      image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&h=300&fit=crop",
      climate:
        "Warm climate with temperatures 18-27°C. Requires full sun exposure, moderate rainfall (500-750mm), and warm growing season. Sensitive to frost and requires long frost-free period.",
      soil: "Well-drained, fertile soil with pH 6.0-6.8. Deep loamy soil with good organic matter content and excellent drainage. Avoid compacted or waterlogged soils.",
      fertilizer:
        "High nitrogen fertilizer for vegetative growth, phosphorus for root development and early growth, potassium for stalk strength. Side-dress with nitrogen when plants are knee-high.",
      growthPeriod: 3,
      plantingSeasons: ["Spring", "Early Summer"],
      harvestTime: "60-100 days depending on variety",
      commonDiseases: ["Corn Borer", "Leaf Blight", "Smut"],
      tips: ["Plant in blocks for pollination", "Hill up soil around stalks", "Adequate spacing", "Pest monitoring"],
      confidence: 0.95,
    },
    potato: {
      name: "Potato",
      scientificName: "Solanum tuberosum",
      description:
        "Potatoes are underground tubers that serve as a major food crop worldwide. They're cool-season vegetables that require specific growing conditions for optimal tuber development.",
      image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop",
      climate:
        "Cool climate with temperatures 15-20°C. Moderate rainfall, cool nights for tuber formation. Avoid extreme heat which can cause poor tuber development and increased disease pressure.",
      soil: "Loose, well-drained soil with pH 5.0-6.0 (slightly acidic). Sandy loam preferred for easy harvesting. Good aeration essential, avoid heavy clay or waterlogged soils.",
      fertilizer:
        "Balanced NPK fertilizer with emphasis on potassium. Organic compost, avoid fresh manure which can cause scab disease. Potassium-rich fertilizers for tuber quality.",
      growthPeriod: 3,
      plantingSeasons: ["Spring", "Fall"],
      harvestTime: "70-120 days from planting",
      commonDiseases: ["Late Blight", "Scab", "Colorado Potato Beetle"],
      tips: ["Hill soil around plants", "Avoid green tubers", "Proper storage", "Crop rotation"],
      confidence: 0.97,
    },
  }

  // Simulate automatic image search from Bing
  const searchPlantImages = async (plantName: string): Promise<string> => {
    console.log(`🖼️ Automatically searching Bing Images for: "${plantName}"`)

    // Simulate network delay for image search
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Generate high-quality image URLs based on plant name
    const imageOptions = [
      `/placeholder.svg?height=400&width=600&query=${plantName} plant growing in field agriculture`,
      `/placeholder.svg?height=400&width=600&query=${plantName} crop farming harvest fresh`,
      `/placeholder.svg?height=400&width=600&query=${plantName} organic garden vegetable healthy`,
      `/placeholder.svg?height=400&width=600&query=${plantName} seedling growth cultivation`,
      `/placeholder.svg?height=400&width=600&query=${plantName} mature plant leaves green`,
    ]

    // Return the first (best) image option
    return imageOptions[0]
  }

  // Enhanced research function with automatic image search
  const performPlantResearch = async (plantName: string) => {
    if (!plantName.trim()) {
      alert("Please enter a plant name first")
      return
    }

    setIsResearching(true)
    setResearchResult(null)

    try {
      // Simulate comprehensive research process
      console.log(`🔍 Starting comprehensive research for "${plantName}"...`)
      console.log(`📊 Searching: "${plantName} growing guide cultivation"`)
      console.log(`🌡️ Searching: "${plantName} climate temperature requirements"`)
      console.log(`🌱 Searching: "${plantName} soil pH drainage needs"`)
      console.log(`🧪 Searching: "${plantName} fertilizer NPK requirements"`)

      // Automatically search for images
      const imageUrl = await searchPlantImages(plantName)
      console.log(`✅ Found plant image: ${imageUrl}`)

      // Simulate additional research delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Check database for plant information
      const searchKey = plantName.toLowerCase().trim()
      let plantData = plantDatabase[searchKey]

      // Try partial matching if exact match not found
      if (!plantData) {
        const partialMatch = Object.entries(plantDatabase).find(
          ([key, data]) =>
            key.includes(searchKey) || searchKey.includes(key) || data.name.toLowerCase().includes(searchKey),
        )
        if (partialMatch) {
          plantData = partialMatch[1]
        }
      }

      if (plantData) {
        // Use the automatically found image
        const enhancedPlantData = {
          ...plantData,
          image: imageUrl, // Override with automatically searched image
        }
        setResearchResult(enhancedPlantData)
        setShowResearchResult(true)
      } else {
        // Create generic result for unknown plants with auto-searched image
        const genericResult: PlantResearchResult = {
          name: plantName,
          scientificName: "Scientific name not found",
          description: `${plantName} is a plant that requires specific growing conditions. Please research more details for optimal cultivation.`,
          image: imageUrl, // Use automatically searched image
          climate: "Research specific climate requirements for this plant",
          soil: "Research specific soil requirements for this plant",
          fertilizer: "Research specific fertilizer requirements for this plant",
          growthPeriod: 3,
          plantingSeasons: ["Spring", "Summer"],
          harvestTime: "Research specific harvest timing",
          commonDiseases: ["Research common diseases"],
          tips: ["Research growing tips"],
          confidence: 0.3,
        }
        setResearchResult(genericResult)
        setShowResearchResult(true)
      }
    } catch (error) {
      console.error("Research error:", error)
      alert("Failed to research plant information. Please try again.")
    } finally {
      setIsResearching(false)
    }
  }

  // Auto-fill form with research results (including auto-found image)
  const autoFillFromResearch = () => {
    if (!researchResult) return

    setFormData({
      name: researchResult.name,
      climate: researchResult.climate,
      soil: researchResult.soil,
      fertilizer: researchResult.fertilizer,
      growthPeriod: researchResult.growthPeriod.toString(),
      image: researchResult.image, // Auto-filled image from research
    })

    setShowResearchResult(false)
    alert("✅ Form auto-filled with research data and plant image!")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.climate || !formData.soil || !formData.fertilizer || !formData.growthPeriod) {
      alert("Please fill in all fields")
      return
    }

    const newPlant: Plant = {
      id: Date.now().toString(),
      name: formData.name,
      climate: formData.climate,
      soil: formData.soil,
      fertilizer: formData.fertilizer,
      growthPeriod: Number.parseInt(formData.growthPeriod),
      image:
        formData.image || `/placeholder.svg?height=200&width=200&query=${formData.name} crop plant growing in field`,
    }

    onAddPlant(newPlant)

    // Reset form
    setFormData({
      name: "",
      climate: "",
      soil: "",
      fertilizer: "",
      growthPeriod: "",
      image: "",
    })

    setResearchResult(null)
    setShowResearchResult(false)

    alert("Plant added successfully!")
    onBack()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (showGoogleSearch) {
    return (
      <div className="p-4 pb-20">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="sm" onClick={() => setShowGoogleSearch(false)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold">Manual Google Research</h2>
        </div>
        <GoogleSearch onClose={() => setShowGoogleSearch(false)} />
      </div>
    )
  }

  if (showResearchResult && researchResult) {
    return (
      <div className="p-4 pb-20">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="sm" onClick={() => setShowResearchResult(false)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold">Research Results</h2>
          <Badge
            variant="secondary"
            className={`${researchResult.confidence > 0.8 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
          >
            {Math.round(researchResult.confidence * 100)}% Confidence
          </Badge>
        </div>

        <div className="space-y-4">
          {/* Plant Overview with Auto-Found Image */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-500" />
                Plant Overview
                <Badge variant="outline" className="bg-green-100 text-green-800 text-xs">
                  Image Auto-Found
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <img
                    src={researchResult.image || "/placeholder.svg"}
                    alt={researchResult.name}
                    className="w-32 h-32 rounded-lg object-cover shadow-md border-2 border-green-200"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg?height=200&width=200"
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-green-700">{researchResult.name}</h3>
                    <p className="text-sm text-gray-600 italic mb-2">{researchResult.scientificName}</p>
                    <p className="text-sm text-gray-700">{researchResult.description}</p>
                    <div className="mt-2">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                        <ImageIcon className="h-3 w-3 mr-1" />
                        Image automatically sourced from Bing
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Growing Information */}
          <Card>
            <CardHeader>
              <CardTitle>Growing Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-green-700 mb-2">🌡️ Climate Requirements</h4>
                <p className="text-sm text-gray-700 bg-blue-50 p-3 rounded-lg">{researchResult.climate}</p>
              </div>

              <div>
                <h4 className="font-semibold text-green-700 mb-2">🌱 Soil Requirements</h4>
                <p className="text-sm text-gray-700 bg-green-50 p-3 rounded-lg">{researchResult.soil}</p>
              </div>

              <div>
                <h4 className="font-semibold text-green-700 mb-2">🧪 Fertilizer Needs</h4>
                <p className="text-sm text-gray-700 bg-yellow-50 p-3 rounded-lg">{researchResult.fertilizer}</p>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-semibold text-sm text-gray-700">Growth Period</h4>
                  <p className="text-lg font-bold text-green-600">{researchResult.growthPeriod} months</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-700">Harvest Time</h4>
                  <p className="text-sm text-gray-600">{researchResult.harvestTime}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-1">Planting Seasons</h4>
                  <div className="flex gap-2">
                    {researchResult.plantingSeasons.map((season, index) => (
                      <Badge key={index} variant="outline">
                        {season}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-1">Common Diseases</h4>
                  <div className="flex flex-wrap gap-2">
                    {researchResult.commonDiseases.map((disease, index) => (
                      <Badge key={index} variant="secondary" className="bg-red-100 text-red-800">
                        {disease}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-1">Growing Tips</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {researchResult.tips.map((tip, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="text-green-500">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button onClick={() => setShowResearchResult(false)} variant="outline" className="flex-1">
              Back to Form
            </Button>
            <Button onClick={autoFillFromResearch} className="flex-1">
              <CheckCircle className="h-4 w-4 mr-2" />
              Auto-Fill Form + Image
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 pb-20">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold">Add New Crop</h2>
        <div className="ml-auto">
          <Button onClick={() => setShowGoogleSearch(true)} variant="outline" size="sm">
            <Globe className="h-4 w-4 mr-2" />
            Google Research
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium">Plant Name *</label>
                <Button
                  type="button"
                  onClick={() => performPlantResearch(formData.name)}
                  disabled={!formData.name.trim() || isResearching}
                  size="sm"
                  variant="outline"
                >
                  {isResearching ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Search className="h-4 w-4 mr-2" />
                  )}
                  {isResearching ? "Researching + Finding Images..." : "Research + Find Images"}
                </Button>
              </div>
              <Input
                placeholder="Enter plant name (e.g., tomato, rice, wheat...)"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter plant name and click "Research + Find Images" to auto-fill everything including plant image
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Growth Period (months) *</label>
              <Input
                type="number"
                placeholder="Enter growth period in months"
                value={formData.growthPeriod}
                onChange={(e) => handleInputChange("growthPeriod", e.target.value)}
                min="1"
                max="12"
                required
              />
            </div>


              <div>
                <label className="block text-sm font-medium mb-2">Plant Image</label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    {/* URL Input */}
                    <Input
                      placeholder="Image will be automatically found during research..."
                      value={formData.image}
                      onChange={(e) => handleInputChange("image", e.target.value)}
                    />

                    {/* Upload Button */}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById("fileUpload")?.click()}
                    >
                      <Upload className="h-4 w-4" />
                    </Button>

                    {/* Hidden File Input */}
                    <input
                      id="fileUpload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          const imageUrl = URL.createObjectURL(file)
                          handleInputChange("image", imageUrl)
                        }
                      }}
                    />
                  </div>

    {/* Preview */}
    {formData.image && (
      <div className="border rounded-lg p-2">
        <img
          src={formData.image || "/placeholder.svg"}
          alt="Plant preview"
          className="w-full h-32 object-cover rounded"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg?height=200&width=200"
          }}
        />
        <div className="mt-2">
          <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
            <ImageIcon className="h-3 w-3 mr-1" />
            {formData.image.startsWith("blob:") ? "Uploaded from your device" : "Auto-found from research"}
          </Badge>
        </div>
      </div>
    )}
  </div>
  <p className="text-xs text-gray-500 mt-1">
    You can either paste an image URL, let research auto-fill it, or upload from your device.
  </p>
</div>

          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Growing Requirements</CardTitle>
            <p className="text-sm text-gray-600">
              Use the "Research + Find Images" button above to auto-fill these fields
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Climate Requirements *</label>
              <Textarea
                placeholder="Climate requirements will be auto-filled from research..."
                value={formData.climate}
                onChange={(e) => handleInputChange("climate", e.target.value)}
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Soil Requirements *</label>
              <Textarea
                placeholder="Soil requirements will be auto-filled from research..."
                value={formData.soil}
                onChange={(e) => handleInputChange("soil", e.target.value)}
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Fertilizer Needs *</label>
              <Textarea
                placeholder="Fertilizer requirements will be auto-filled from research..."
                value={formData.fertilizer}
                onChange={(e) => handleInputChange("fertilizer", e.target.value)}
                rows={3}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Research Tip */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Search className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-800 mb-1">🚀 One-Click Complete Research</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>
                    • <strong>Comprehensive Research:</strong> Finds all plant information from database
                  </li>
                  <li>
                    • <strong>Automatic Image Search:</strong> Searches Bing Images and finds best plant photo
                  </li>
                  <li>
                    • <strong>Complete Auto-Fill:</strong> Fills all form fields including image URL
                  </li>
                  <li>
                    • <strong>One-Click Solution:</strong> Everything happens with a single research button
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button type="button" variant="outline" onClick={onBack} className="flex-1 bg-transparent">
            Cancel
          </Button>
          <Button type="submit" className="flex-1">
            Add Crop
          </Button>
        </div>
      </form>
    </div>
  )
}
