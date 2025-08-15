"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Thermometer, Droplets, Leaf } from "lucide-react"

interface Plant {
  id: string
  name: string
  image: string
  climate: string
  soil: string
  fertilizer: string
  growthPeriod: number
}

interface PlantInfoProps {
  plant: Plant
  onPlanFarming: (month: string) => void
  onBack: () => void
}

export default function PlantInfo({ plant, onPlanFarming, onBack }: PlantInfoProps) {
  const [farmingMonth, setFarmingMonth] = useState("")

  const handlePlanFarming = () => {
    if (farmingMonth.trim()) {
      onPlanFarming(farmingMonth)
    }
  }

  return (
    <div className="p-4 pb-20">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold">Plant Information</h2>
      </div>

      <Card className="mb-6">
        <CardHeader className="text-center">
          <img
            src={plant.image}
            alt={plant.name}
            className="w-40 h-40 rounded-lg mx-auto mb-4 object-cover shadow-lg"
          />
          <CardTitle className="text-2xl">{plant.name}</CardTitle>
          <Badge variant="secondary">Growth Period: {plant.growthPeriod} months</Badge>
        </CardHeader>
      </Card>

      <div className="space-y-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Thermometer className="h-5 w-5 text-orange-500" />
              Climate Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{plant.climate}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Droplets className="h-5 w-5 text-blue-500" />
              Soil Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{plant.soil}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Leaf className="h-5 w-5 text-green-500" />
              Fertilizer Needs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{plant.fertilizer}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            When do you plan to farm?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Enter month (e.g., January, March, etc.)"
            value={farmingMonth}
            onChange={(e) => setFarmingMonth(e.target.value)}
          />
          <Button onClick={handlePlanFarming} className="w-full" disabled={!farmingMonth.trim()}>
            Create Activity Calendar
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
