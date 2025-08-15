"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Droplets, Power, Timer, Thermometer, Gauge, Wifi, Battery } from "lucide-react"

interface SprinklerControlProps {
  onBack: () => void
}

export default function SprinklerControl({ onBack }: SprinklerControlProps) {
  const [isActive, setIsActive] = useState(false)
  const [duration, setDuration] = useState([15])
  const [autoMode, setAutoMode] = useState(true)
  const [sensorData, setSensorData] = useState({
    soilMoisture: 45,
    temperature: 24,
    humidity: 68,
    batteryLevel: 85,
  })

  // Simulate sensor data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData((prev) => ({
        soilMoisture: Math.max(20, Math.min(80, prev.soilMoisture + (Math.random() - 0.5) * 5)),
        temperature: Math.max(15, Math.min(35, prev.temperature + (Math.random() - 0.5) * 2)),
        humidity: Math.max(40, Math.min(90, prev.humidity + (Math.random() - 0.5) * 3)),
        batteryLevel: Math.max(0, prev.batteryLevel - 0.1),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleManualControl = () => {
    setIsActive(!isActive)
    if (!isActive) {
      // Simulate watering for the set duration
      setTimeout(() => {
        setIsActive(false)
      }, duration[0] * 1000) // Convert minutes to milliseconds for demo
    }
  }

  const getSoilMoistureStatus = (moisture: number) => {
    if (moisture < 30) return { status: "Low", color: "text-red-600", bgColor: "bg-red-50" }
    if (moisture < 60) return { status: "Medium", color: "text-yellow-600", bgColor: "bg-yellow-50" }
    return { status: "Good", color: "text-green-600", bgColor: "bg-green-50" }
  }

  const moistureStatus = getSoilMoistureStatus(sensorData.soilMoisture)

  return (
    <div className="p-4 pb-20">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold">Sprinkler Control</h2>
      </div>

      {/* Connection Status */}
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wifi className="h-5 w-5 text-green-500" />
              <span className="font-medium">Connected to Sprinkler System</span>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Online
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Sensor Data */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className={moistureStatus.bgColor}>
          <CardContent className="p-4 text-center">
            <Droplets className={`h-6 w-6 mx-auto mb-2 ${moistureStatus.color}`} />
            <p className="text-sm text-gray-600">Soil Moisture</p>
            <p className={`text-2xl font-bold ${moistureStatus.color}`}>{sensorData.soilMoisture}%</p>
            <Badge variant="secondary">{moistureStatus.status}</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Thermometer className="h-6 w-6 mx-auto mb-2 text-blue-500" />
            <p className="text-sm text-gray-600">Temperature</p>
            <p className="text-2xl font-bold text-blue-600">{sensorData.temperature}°C</p>
            <Badge variant="secondary">Normal</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Gauge className="h-6 w-6 mx-auto mb-2 text-purple-500" />
            <p className="text-sm text-gray-600">Humidity</p>
            <p className="text-2xl font-bold text-purple-600">{sensorData.humidity}%</p>
            <Badge variant="secondary">Good</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Battery className="h-6 w-6 mx-auto mb-2 text-orange-500" />
            <p className="text-sm text-gray-600">Battery</p>
            <p className="text-2xl font-bold text-orange-600">{Math.round(sensorData.batteryLevel)}%</p>
            <Badge variant="secondary">Good</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Control Panel */}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Power className="h-5 w-5" />
            Manual Control
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Sprinkler Status</p>
              <p className="text-sm text-gray-500">{isActive ? "Currently watering..." : "Ready to water"}</p>
            </div>
            <Button
              onClick={handleManualControl}
              variant={isActive ? "destructive" : "default"}
              className="flex items-center gap-2"
            >
              <Droplets className="h-4 w-4" />
              {isActive ? "Stop" : "Start"} Watering
            </Button>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-medium">Duration</label>
              <span className="text-sm text-gray-500">{duration[0]} minutes</span>
            </div>
            <Slider value={duration} onValueChange={setDuration} max={60} min={5} step={5} className="w-full" />
          </div>
        </CardContent>
      </Card>

      {/* Auto Mode */}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Timer className="h-5 w-5" />
            Smart Watering
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Auto Mode</p>
              <p className="text-sm text-gray-500">Water automatically based on soil moisture</p>
            </div>
            <Switch checked={autoMode} onCheckedChange={setAutoMode} />
          </div>

          {autoMode && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Auto Settings</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Water when soil moisture drops below 30%</li>
                <li>• Daily watering at 7:00 AM and 5:00 PM</li>
                <li>• Skip watering if rain is detected</li>
                <li>• Adjust duration based on weather conditions</li>
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium">Morning Watering</p>
                <p className="text-sm text-gray-600">7:00 AM - Completed</p>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Done
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium">Evening Watering</p>
                <p className="text-sm text-gray-600">5:00 PM - Scheduled</p>
              </div>
              <Badge variant="secondary">Pending</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
