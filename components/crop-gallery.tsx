"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Grid, Trash2 } from "lucide-react"

interface Plant {
  id: string
  name: string
  image: string
  climate: string
  soil: string
  fertilizer: string
  growthPeriod: number
}

interface CropGalleryProps {
  plants: Plant[]
  onPlantSelect: (plant: Plant) => void
  onBack: () => void
  editMode?: boolean
  onRemovePlant?: (plantId: string, plantName: string) => void
  isDefaultPlant?: (plantId: string) => boolean
}

export default function CropGallery({
  plants,
  onPlantSelect,
  onBack,
  editMode = false,
  onRemovePlant,
  isDefaultPlant,
}: CropGalleryProps) {
  return (
    <div className="p-4 pb-20">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold">Crop Gallery</h2>
        <div className="ml-auto flex items-center gap-2">
          {editMode && (
            <Badge variant="destructive" className="animate-pulse">
              Edit Mode
            </Badge>
          )}
          <Button variant="outline" size="sm">
            <Grid className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {editMode && (
        <div className="mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-800">
            <strong>Edit Mode Active:</strong> Click the trash icon to remove plants from your collection.
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {plants.map((plant) => (
          <Card
            key={plant.id}
            className={`cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 ${editMode ? "border-red-200" : ""}`}
          >
            <CardContent className="p-0 relative">
              {editMode && onRemovePlant && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    onRemovePlant(plant.id, plant.name)
                  }}
                  className="absolute top-2 right-2 h-6 w-6 p-0 z-10"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              )}
              <div className="relative">
                <img
                  src={plant.image || "/placeholder.svg"}
                  alt={plant.name}
                  className="w-full h-32 object-cover rounded-t-lg"
                />
                <Badge variant="secondary" className="absolute top-2 left-2 bg-white/90 text-xs">
                  {plant.growthPeriod}m
                </Badge>
                {isDefaultPlant && isDefaultPlant(plant.id) && (
                  <Badge variant="outline" className="absolute bottom-2 left-2 bg-white/90 text-xs">
                    Default
                  </Badge>
                )}
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-sm mb-2">{plant.name}</h3>
                {!editMode && (
                  <Button onClick={() => onPlantSelect(plant)} size="sm" className="w-full text-xs">
                    Learn More
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {plants.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Grid className="h-16 w-16 mx-auto" />
          </div>
          <p className="text-gray-500">No crops available</p>
        </div>
      )}
    </div>
  )
}
