"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Moon, Sun, Bell, Droplets, Smartphone, Trash2, RotateCcw } from "lucide-react"

interface SettingsPageProps {
  theme: string
  onThemeChange: (theme: string) => void
  onBack: () => void
}

export default function SettingsPage({ theme, onThemeChange, onBack }: SettingsPageProps) {
  const [notifications, setNotifications] = useState(true)
  const [wateringReminders, setWateringReminders] = useState(true)
  const [sprinklerControl, setSprinklerControl] = useState(true)

  const handleClearAllData = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear all data? This will remove all saved plants, calendars, and settings. This action cannot be undone.",
    )

    if (confirmClear) {
      localStorage.removeItem("growphere-data")
      localStorage.removeItem("growphere-settings")
      localStorage.removeItem("growphere-reminders")
      alert("All data has been cleared. Please refresh the page to restart the app.")
      window.location.reload()
    }
  }

  const handleRestoreDefaultPlants = () => {
    const confirmRestore = window.confirm(
      "This will restore all default plants to your collection. Custom plants will remain. Continue?",
    )

    if (confirmRestore) {
      // This will be handled by the parent component
      alert("Default plants will be restored when you restart the app.")
      window.location.reload()
    }
  }

  return (
    <div className="p-4 pb-20">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold">Settings</h2>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-gray-500">Switch between light and dark themes</p>
              </div>
              <Switch
                checked={theme === "dark"}
                onCheckedChange={(checked) => onThemeChange(checked ? "dark" : "light")}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-gray-500">Receive app notifications</p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Watering Reminders</p>
                <p className="text-sm text-gray-500">Daily reminders at 7:00 AM & 5:00 PM</p>
              </div>
              <Switch checked={wateringReminders} onCheckedChange={setWateringReminders} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="h-5 w-5" />
              Sprinkler System
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Smart Control</p>
                <p className="text-sm text-gray-500">Enable sensor-based sprinkler control</p>
              </div>
              <Switch checked={sprinklerControl} onCheckedChange={setSprinklerControl} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              App Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Version</span>
              <span>1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Last Updated</span>
              <span>Today</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Storage Used</span>
              <span>2.4 MB</span>
            </div>
          </CardContent>
        </Card>

        {/* Plant Management Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RotateCcw className="h-5 w-5" />
              Plant Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              onClick={handleRestoreDefaultPlants}
              variant="outline"
              className="w-full justify-start bg-transparent"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Restore Default Plants
            </Button>
            <p className="text-xs text-gray-500">
              Restore all default plants to your collection. Custom plants will remain unchanged.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-red-50">
          <CardContent className="p-4 space-y-3">
            <Button variant="destructive" onClick={handleClearAllData} className="w-full">
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All Data
            </Button>
            <p className="text-xs text-gray-500 text-center">
              This will remove all saved plants, calendars, settings, and search history. This action cannot be undone.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
