"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Leaf,
  Calendar,
  Settings,
  Plus,
  Search,
  MessageCircle,
  Droplets,
  Sprout,
  Grid,
  Trash2,
  Edit,
  Bug,
} from "lucide-react"
import PlantInfo from "@/components/plant-info"
import ActivityCalendar from "@/components/activity-calendar"
import SettingsPage from "@/components/settings-page"
import AddPlant from "@/components/add-plant"
import SpecialFeatures from "@/components/special-features"
import SprinklerControl from "@/components/sprinkler-control"
import CropGallery from "@/components/crop-gallery"
import PlantResearch from "@/components/plant-research"
import TestPanel from "@/components/test-panel"

interface Plant {
  id: string
  name: string
  image : string,
  climate: string
  soil: string
  fertilizer: string
  growthPeriod: number // in months
}

const defaultPlants: Plant[] = [
  {
    id: "1",
    name: "Tomato",
    image: "https://images.unsplash.com/photo-1607305387299-a3d9611cd469?q=80&w=1170&auto=format&fit=crop",
    climate: "Warm temperate climate, 20-25°C optimal temperature",
    soil: "Well-drained, fertile loamy soil with pH 6.0-6.8",
    fertilizer: "NPK 10-10-10, organic compost, calcium supplements",
    growthPeriod: 3,
  },
  {
    id: "2",
    name: "Rice",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
    climate: "Tropical and subtropical, high humidity, 20-35°C",
    soil: "Clay or clay loam soil, waterlogged conditions",
    fertilizer: "Urea, DAP, potash, organic manure",
    growthPeriod: 4,
  },
  {
    id: "3",
    name: "Wheat",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop",
    climate: "Cool, moist climate during growth, warm dry during harvest",
    soil: "Well-drained loamy soil with pH 6.0-7.5",
    fertilizer: "Nitrogen-rich fertilizers, phosphorus, potassium",
    growthPeriod: 6,
  },
  {
    id: "4",
    name: "Corn",
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&h=300&fit=crop",
    climate: "Warm climate, 18-27°C, full sun exposure",
    soil: "Well-drained, fertile soil with pH 6.0-6.8",
    fertilizer: "High nitrogen fertilizer, phosphorus, potassium",
    growthPeriod: 3,
  },
  {
    id: "5",
    name: "Potato",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop",
    climate: "Cool climate, 15-20°C, moderate rainfall",
    soil: "Loose, well-drained soil with pH 5.0-6.0",
    fertilizer: "Balanced NPK, organic compost, avoid fresh manure",
    growthPeriod: 3,
  },
  {
    id: "6",
    name: "Carrot",
    image: "https://images.unsplash.com/photo-1590868309235-ea34bed7bd7f?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    climate: "Cool climate, 16-18°C optimal temperature",
    soil: "Deep, loose, sandy loam soil with pH 6.0-6.8",
    fertilizer: "Low nitrogen, high phosphorus and potassium",
    growthPeriod: 2,
  },
  {
    id: "7",
    name: "Lettuce",
     image: "https://images.unsplash.com/photo-1640958904159-51ae08bd3412?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    climate: "Cool climate, 15-18°C, partial shade in hot weather",
    soil: "Well-drained, fertile soil with pH 6.0-7.0",
    fertilizer: "Nitrogen-rich fertilizer, organic compost",
    growthPeriod: 2,
  },
  {
    id: "8",
    name: "Onion",
     image: "https://images.unsplash.com/photo-1683355739329-cea18ba93f02?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    climate: "Cool to moderate climate, 13-24°C",
    soil: "Well-drained, fertile soil with pH 6.0-7.0",
    fertilizer: "Balanced NPK, avoid fresh manure",
    growthPeriod: 4,
  },
]

export default function GrowphereApp() {
  const [currentView, setCurrentView] = useState("home")
  const [plants, setPlants] = useState<Plant[]>(defaultPlants)
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [farmingMonth, setFarmingMonth] = useState("")
  const [showCalendar, setShowCalendar] = useState(false)
  const [savedData, setSavedData] = useState<any[]>([])
  const [theme, setTheme] = useState("light")
  const [editMode, setEditMode] = useState(false)
  const [testMode, setTestMode] = useState(false)
  const [debugInfo, setDebugInfo] = useState<any>({})

  // Load saved data on app start
  useEffect(() => {
    const saved = localStorage.getItem("growphere-data")
    if (saved) {
      const data = JSON.parse(saved)
      setSavedData(data.savedPlants || [])
      setPlants([...defaultPlants, ...(data.customPlants || [])])
    }

    // Enable test mode if in development
    const isTestMode = localStorage.getItem("growphere-test-mode") === "true"
    setTestMode(isTestMode)

    // Update debug info
    setDebugInfo({
      timestamp: new Date().toISOString(),
      plantsCount: plants.length,
      savedDataCount: savedData.length,
      currentView,
      theme,
      editMode,
      testMode: isTestMode,
    })
  }, [])

  // Save data whenever important state changes
  useEffect(() => {
    const dataToSave = {
      savedPlants: savedData,
      customPlants: plants.filter((p) => !defaultPlants.find((dp) => dp.id === p.id)),
    }
    localStorage.setItem("growphere-data", JSON.stringify(dataToSave))

    // Update debug info
    setDebugInfo((prev: any) => ({
      ...prev,
      plantsCount: plants.length,
      savedDataCount: savedData.length,
      lastUpdate: new Date().toISOString(),
    }))
  }, [savedData, plants])

  // Update debug info when view changes
  useEffect(() => {
    setDebugInfo((prev: any) => ({
      ...prev,
      currentView,
      editMode,
      selectedPlant: selectedPlant?.name || null,
    }))
  }, [currentView, editMode, selectedPlant])

  const filteredPlants = plants.filter((plant) => plant.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handlePlantSelect = (plant: Plant) => {
    if (editMode) return // Don't navigate when in edit mode
    setSelectedPlant(plant)
    setCurrentView("plant-info")
  }

  const handleFarmingPlan = (month: string) => {
    setFarmingMonth(month)
    setShowCalendar(true)
    setCurrentView("calendar")

    // Save to history
    const newSavedData = {
      plant: selectedPlant,
      farmingMonth: month,
      timestamp: new Date().toISOString(),
    }
    setSavedData((prev) => [newSavedData, ...prev.slice(0, 9)]) // Keep last 10
  }

  const addNewPlant = (plant: Plant) => {
    setPlants((prev) => [...prev, { ...plant, id: Date.now().toString() }])
  }

  const handleRemovePlant = (plantId: string, plantName: string) => {
    const confirmDelete = window.confirm(`Are you sure you want to remove "${plantName}" from your plant collection?`)

    if (confirmDelete) {
      setPlants((prev) => prev.filter((plant) => plant.id !== plantId))

      // Also remove from saved data if it exists
      setSavedData((prev) => prev.filter((item) => item.plant?.id !== plantId))

      alert(`"${plantName}" has been removed from your collection.`)
    }
  }

  const isDefaultPlant = (plantId: string) => {
    return defaultPlants.some((plant) => plant.id === plantId)
  }

  const toggleTestMode = () => {
    const newTestMode = !testMode
    setTestMode(newTestMode)
    localStorage.setItem("growphere-test-mode", newTestMode.toString())

    if (newTestMode) {
      alert("🧪 Test Mode Enabled! Debug panel and testing features are now active.")
    } else {
      alert("✅ Test Mode Disabled! App is now in production mode.")
    }
  }

  const renderHeader = () => (
    <div className="bg-green-600 text-white p-4 rounded-b-lg shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Leaf className="h-8 w-8" />
          <div>
            <h1 className="text-1xl font-bold">GROWSPHERE</h1>
            {testMode && (
              <Badge variant="secondary" className="bg-yellow-500 text-yellow-900 text-xs">
                TEST VERSION
              </Badge>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          {testMode && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentView("test-panel")}
              className="text-white hover:bg-green-700"
            >
              <Bug className="h-5 w-5" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setEditMode(!editMode)
              if (editMode) {
                alert("Edit mode disabled")
              }
            }}
            className={`text-white hover:bg-green-700 ${editMode ? "bg-green-700" : ""}`}
          >
            <Edit className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentView("gallery")}
            className="text-white hover:bg-green-700"
          >
            <Grid className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentView("sprinkler")}
            className="text-white hover:bg-green-700"
          >
            <Droplets className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentView("settings")}
            className="text-white hover:bg-green-700"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )

  const renderNavigation = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2">
      <div className="flex justify-around">
        <Button
          variant={currentView === "home" ? "default" : "ghost"}
          size="sm"
          onClick={() => setCurrentView("home")}
          className="flex flex-col items-center gap-1"
        >
          <Sprout className="h-4 w-4" />
          <span className="text-xs">Plants</span>
        </Button>
        <Button
          variant={currentView === "calendar" ? "default" : "ghost"}
          size="sm"
          onClick={() => setCurrentView("calendar")}
          className="flex flex-col items-center gap-1"
        >
          <Calendar className="h-4 w-4" />
          <span className="text-xs">Calendar</span>
        </Button>
        <Button
          variant={currentView === "features" ? "default" : "ghost"}
          size="sm"
          onClick={() => setCurrentView("features")}
          className="flex flex-col items-center gap-1"
        >
          <MessageCircle className="h-4 w-4" />
          <span className="text-xs">Tools</span>
        </Button>
        <Button
          variant={currentView === "add-plant" ? "default" : "ghost"}
          size="sm"
          onClick={() => setCurrentView("add-plant")}
          className="flex flex-col items-center gap-1"
        >
          <Plus className="h-4 w-4" />
          <span className="text-xs">Add Plant</span>
        </Button>
        <Button
          variant={currentView === "research" ? "default" : "ghost"}
          size="sm"
          onClick={() => setCurrentView("research")}
          className="flex flex-col items-center gap-1"
        >
          <Search className="h-4 w-4" />
          <span className="text-xs">Research</span>
        </Button>
      </div>
    </div>
  )

  const renderHome = () => (
    <div className="p-4 pb-20">
      {testMode && (
        <div className="mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-800">🧪 Test Mode Active</p>
              <p className="text-xs text-yellow-600">Debug features enabled • Click bug icon for test panel</p>
            </div>
            <Button onClick={toggleTestMode} size="sm" variant="outline">
              Disable
            </Button>
          </div>
        </div>
      )}

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Which plant do you want to know about?</h2>
          {editMode && (
            <Badge variant="destructive" className="animate-pulse">
              Edit Mode
            </Badge>
          )}
        </div>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Type plant name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Button
          onClick={() => setCurrentView("add-plant")}
          className="w-full mb-4 bg-green-600 hover:bg-green-700"
          size="lg"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Plant
        </Button>

        {editMode && (
          <div className="mt-2 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-800">
              <strong>Edit Mode Active:</strong> Click the trash icon to remove plants from your collection.
            </p>
          </div>
        )}
      </div>

      {testMode && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">🧪 Test Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={() => {
                const testPlant = {
                  id: `test-${Date.now()}`,
                  name: "Test Plant",
                  image : "https://images.unsplash.com/photo-1607305387299-a3d9611cd469?q=80&w=1170&auto=format&fit=crop",
                  climate: "Test climate conditions",
                  soil: "Test soil requirements",
                  fertilizer: "Test fertilizer needs",
                  growthPeriod: 1,
                }
                addNewPlant(testPlant)
                alert("Test plant added!")
              }}
              size="sm"
              variant="outline"
            >
              Add Test Plant
            </Button>
            <Button
              onClick={() => {
                setSavedData([])
                alert("Saved data cleared!")
              }}
              size="sm"
              variant="outline"
            >
              Clear Saved Data
            </Button>
            <Button
              onClick={() => {
                setCurrentView("features")
              }}
              size="sm"
              variant="outline"
            >
              Test Tools
            </Button>
            <Button onClick={toggleTestMode} size="sm" variant="outline">
              Exit Test Mode
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {filteredPlants.map((plant) => (
          <Card
            key={plant.id}
            className={`cursor-pointer hover:shadow-lg transition-shadow ${editMode ? "border-red-200" : ""}`}
          >
            <CardContent className="p-4 relative">
              {editMode && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemovePlant(plant.id, plant.name)
                  }}
                  className="absolute top-2 right-2 h-8 w-8 p-0 z-10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
              <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-lg shadow-md overflow-hidden bg-green-100 flex items-center justify-center">
                {plant.image ? (
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Sprout className="h-10 w-10 text-green-600" />
                )}
              </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg">{plant.name}</h3>
                    {isDefaultPlant(plant.id) && (
                      <Badge variant="secondary" className="text-xs">
                        Default
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">Growth period: {plant.growthPeriod} months</p>
                  {!editMode && (
                    <Button onClick={() => handlePlantSelect(plant)} className="mt-2" size="sm">
                      Learn More
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPlants.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No plants found. Try a different search term.</p>
        </div>
      )}

      {testMode && (
        <div className="mt-6 p-3 bg-gray-50 rounded-lg border">
          <p className="text-xs text-gray-600 text-center">
            Test Mode: v1.0.0-test • Plants: {plants.length} • Saved: {savedData.length} • View: {currentView}
          </p>
        </div>
      )}
    </div>
  )

  return (
    <div className={`min-h-screen ${theme === "dark" ? "dark bg-gray-900" : "bg-gray-50"}`}>
      {renderHeader()}

      <div className="max-w-md mx-auto bg-white min-h-screen">
        {currentView === "home" && renderHome()}
        {currentView === "plant-info" && selectedPlant && (
          <PlantInfo plant={selectedPlant} onPlanFarming={handleFarmingPlan} onBack={() => setCurrentView("home")} />
        )}
        {currentView === "calendar" && selectedPlant && (
          <ActivityCalendar
            plant={selectedPlant}
            farmingMonth={farmingMonth}
            onBack={() => setCurrentView("plant-info")}
          />
        )}
        {currentView === "settings" && (
          <SettingsPage theme={theme} onThemeChange={setTheme} onBack={() => setCurrentView("home")} />
        )}
        {currentView === "add-plant" && <AddPlant onAddPlant={addNewPlant} onBack={() => setCurrentView("home")} />}
        {currentView === "features" && <SpecialFeatures onBack={() => setCurrentView("home")} />}
        {currentView === "sprinkler" && <SprinklerControl onBack={() => setCurrentView("home")} />}
        {currentView === "gallery" && (
          <CropGallery
            plants={plants}
            onPlantSelect={handlePlantSelect}
            onBack={() => setCurrentView("home")}
            editMode={editMode}
            onRemovePlant={handleRemovePlant}
            isDefaultPlant={isDefaultPlant}
          />
        )}
        {currentView === "research" && <PlantResearch onBack={() => setCurrentView("home")} />}
        {currentView === "test-panel" && testMode && (
          <TestPanel
            debugInfo={debugInfo}
            plants={plants}
            savedData={savedData}
            onBack={() => setCurrentView("home")}
            onToggleTestMode={toggleTestMode}
          />
        )}
      </div>

      {renderNavigation()}
    </div>
  )
}
