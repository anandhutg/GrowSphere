"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Bug,
  Database,
  Monitor,
  Zap,
  Download,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Info,
} from "lucide-react"

interface TestPanelProps {
  debugInfo: any
  plants: any[]
  savedData: any[]
  onBack: () => void
  onToggleTestMode: () => void
}

export default function TestPanel({ debugInfo, plants, savedData, onBack, onToggleTestMode }: TestPanelProps) {
  const [testResults, setTestResults] = useState<any[]>([])
  const [isRunningTests, setIsRunningTests] = useState(false)
  const [selectedTest, setSelectedTest] = useState<string | null>(null)

  const runAllTests = async () => {
    setIsRunningTests(true)
    setTestResults([])

    const tests = [
      {
        name: "Plant Data Integrity",
        test: () => {
          const hasValidPlants = plants.length > 0
          const allPlantsHaveRequiredFields = plants.every((p) => p.id && p.name && p.climate && p.soil && p.fertilizer)
          return {
            passed: hasValidPlants && allPlantsHaveRequiredFields,
            message:
              hasValidPlants && allPlantsHaveRequiredFields
                ? `✅ All ${plants.length} plants have valid data`
                : `❌ Plant data validation failed`,
          }
        },
      },
      {
        name: "Local Storage",
        test: () => {
          try {
            const testKey = "growphere-test"
            localStorage.setItem(testKey, "test-value")
            const retrieved = localStorage.getItem(testKey)
            localStorage.removeItem(testKey)
            return {
              passed: retrieved === "test-value",
              message: retrieved === "test-value" ? "✅ Local storage working" : "❌ Local storage failed",
            }
          } catch (error) {
            return {
              passed: false,
              message: `❌ Local storage error: ${error}`,
            }
          }
        },
      },
      {
        name: "Navigation System",
        test: () => {
          const requiredViews = ["home", "plant-info", "calendar", "features", "settings"]
          const currentView = debugInfo.currentView
          return {
            passed: requiredViews.includes(currentView),
            message: requiredViews.includes(currentView)
              ? `✅ Navigation working (current: ${currentView})`
              : `❌ Invalid view: ${currentView}`,
          }
        },
      },
      {
        name: "Theme System",
        test: () => {
          const validThemes = ["light", "dark"]
          const currentTheme = debugInfo.theme
          return {
            passed: validThemes.includes(currentTheme),
            message: validThemes.includes(currentTheme)
              ? `✅ Theme system working (${currentTheme})`
              : `❌ Invalid theme: ${currentTheme}`,
          }
        },
      },
      {
        name: "Search Functionality",
        test: () => {
          const searchableFields = plants.every((p) => typeof p.name === "string" && p.name.length > 0)
          return {
            passed: searchableFields,
            message: searchableFields
              ? "✅ All plants have searchable names"
              : "❌ Some plants missing searchable data",
          }
        },
      },
    ]

    for (let i = 0; i < tests.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate test delay

      const test = tests[i]
      const result = test.test()

      setTestResults((prev) => [
        ...prev,
        {
          name: test.name,
          ...result,
          timestamp: new Date().toISOString(),
        },
      ])
    }

    setIsRunningTests(false)
  }

  const exportDebugData = () => {
    const debugData = {
      timestamp: new Date().toISOString(),
      debugInfo,
      plants: plants.map((p) => ({ ...p, image: "[IMAGE_URL]" })), // Don't export full image URLs
      savedData,
      testResults,
      userAgent: navigator.userAgent,
      localStorage: {
        growphereData: localStorage.getItem("growphere-data") ? "Present" : "Missing",
        testMode: localStorage.getItem("growphere-test-mode"),
      },
    }

    const blob = new Blob([JSON.stringify(debugData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `growphere-debug-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const clearAllData = () => {
    if (window.confirm("⚠️ This will clear ALL app data including plants, settings, and saved data. Continue?")) {
      localStorage.clear()
      alert("All data cleared! Please refresh the page.")
      window.location.reload()
    }
  }

  const simulateError = () => {
    try {
      throw new Error("Test error for debugging purposes")
    } catch (error) {
      console.error("Simulated error:", error)
      alert(`Simulated error logged to console: ${error}`)
    }
  }

  const passedTests = testResults.filter((t) => t.passed).length
  const totalTests = testResults.length

  return (
    <div className="p-4 pb-20">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold">🧪 Test Panel</h2>
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
          DEBUG MODE
        </Badge>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <Database className="h-6 w-6 mx-auto mb-2 text-blue-500" />
            <p className="text-sm text-gray-600">Plants</p>
            <p className="text-2xl font-bold text-blue-600">{plants.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Monitor className="h-6 w-6 mx-auto mb-2 text-green-500" />
            <p className="text-sm text-gray-600">Saved Data</p>
            <p className="text-2xl font-bold text-green-600">{savedData.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Test Runner */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Automated Tests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">System Health Check</p>
                <p className="text-sm text-gray-500">
                  {testResults.length > 0
                    ? `${passedTests}/${totalTests} tests passed`
                    : "Run tests to check app functionality"}
                </p>
              </div>
              <Button onClick={runAllTests} disabled={isRunningTests} className="flex items-center gap-2">
                {isRunningTests ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4" />}
                {isRunningTests ? "Running..." : "Run Tests"}
              </Button>
            </div>

            {testResults.length > 0 && (
              <div className="space-y-2">
                {testResults.map((result, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border ${
                      result.passed ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {result.passed ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                      )}
                      <span className="font-medium text-sm">{result.name}</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{result.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Debug Information */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Debug Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium">Current View:</p>
                <p className="text-gray-600">{debugInfo.currentView}</p>
              </div>
              <div>
                <p className="font-medium">Theme:</p>
                <p className="text-gray-600">{debugInfo.theme}</p>
              </div>
              <div>
                <p className="font-medium">Edit Mode:</p>
                <p className="text-gray-600">{debugInfo.editMode ? "Active" : "Inactive"}</p>
              </div>
              <div>
                <p className="font-medium">Selected Plant:</p>
                <p className="text-gray-600">{debugInfo.selectedPlant || "None"}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="font-medium">Last Update:</p>
              <p className="text-gray-600 text-xs">{debugInfo.lastUpdate || "Never"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Debug Actions */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Debug Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <Button onClick={exportDebugData} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Debug Data
            </Button>
            <Button onClick={simulateError} variant="outline" size="sm">
              <Bug className="h-4 w-4 mr-2" />
              Simulate Error
            </Button>
            <Button
              onClick={() => {
                console.log("Debug Info:", debugInfo)
                console.log("Plants:", plants)
                console.log("Saved Data:", savedData)
                alert("Debug data logged to console")
              }}
              variant="outline"
              size="sm"
            >
              <Monitor className="h-4 w-4 mr-2" />
              Log to Console
            </Button>
            <Button onClick={onToggleTestMode} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Exit Test Mode
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="bg-red-50 border-red-200">
        <CardHeader>
          <CardTitle className="text-red-800">⚠️ Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button onClick={clearAllData} variant="destructive" size="sm" className="w-full">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Clear All App Data
            </Button>
            <p className="text-xs text-red-600 text-center">
              This will permanently delete all plants, settings, and saved data
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Test Mode Info */}
      <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          <strong>Test Mode Features:</strong> Debug panel, automated tests, data export, error simulation, enhanced
          logging, and development tools for troubleshooting and quality assurance.
        </p>
      </div>
    </div>
  )
}
