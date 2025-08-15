"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Sprout, Scissors, Droplets, Bug } from "lucide-react"

interface Plant {
  id: string
  name: string
  image: string
  climate: string
  soil: string
  fertilizer: string
  growthPeriod: number
}

interface ActivityCalendarProps {
  plant: Plant
  farmingMonth: string
  onBack: () => void
}

interface Activity {
  week: number
  activity: string
  description: string
  icon: React.ReactNode
  color: string
}

export default function ActivityCalendar({ plant, farmingMonth, onBack }: ActivityCalendarProps) {
  const generateActivities = (): Activity[] => {
    const activities: Activity[] = []
    const totalWeeks = plant.growthPeriod * 4

    // Week 1-2: Soil Preparation
    activities.push({
      week: 1,
      activity: "Soil Preparation",
      description: "Prepare and test soil, add organic matter",
      icon: <Sprout className="h-4 w-4" />,
      color: "bg-brown-100 text-brown-800",
    })

    // Week 2-3: Seeding
    activities.push({
      week: 2,
      activity: "Seeding/Planting",
      description: "Plant seeds or seedlings according to spacing requirements",
      icon: <Sprout className="h-4 w-4" />,
      color: "bg-green-100 text-green-800",
    })

    // Regular fertilizing (every 3-4 weeks)
    for (let week = 4; week <= totalWeeks; week += 4) {
      activities.push({
        week,
        activity: "Fertilizing",
        description: "Apply fertilizer as per plant requirements",
        icon: <Droplets className="h-4 w-4" />,
        color: "bg-blue-100 text-blue-800",
      })
    }

    // Pest control (every 2 weeks after week 4)
    for (let week = 6; week <= totalWeeks; week += 2) {
      activities.push({
        week,
        activity: "Pest Control",
        description: "Check for pests and apply control measures",
        icon: <Bug className="h-4 w-4" />,
        color: "bg-red-100 text-red-800",
      })
    }

    // Harvesting (last 2-4 weeks)
    const harvestStart = Math.max(totalWeeks - 3, totalWeeks - 4)
    for (let week = harvestStart; week <= totalWeeks; week++) {
      activities.push({
        week,
        activity: "Harvesting",
        description: "Harvest mature crops",
        icon: <Scissors className="h-4 w-4" />,
        color: "bg-yellow-100 text-yellow-800",
      })
    }

    return activities.sort((a, b) => a.week - b.week)
  }

  const activities = generateActivities()
  const totalWeeks = plant.growthPeriod * 4
  const months = Math.ceil(totalWeeks / 4)

  const getMonthName = (monthOffset: number) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]
    const startMonthIndex = monthNames.indexOf(farmingMonth)
    if (startMonthIndex === -1) return farmingMonth

    return monthNames[(startMonthIndex + monthOffset) % 12]
  }

  return (
    <div className="p-4 pb-20">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold">Activity Calendar</h2>
      </div>

      <Card className="mb-6">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Calendar className="h-6 w-6" />
            {plant.name} Farming Schedule
          </CardTitle>
          <div className="flex justify-center gap-2 mt-2">
            <Badge variant="outline">Starting: {farmingMonth}</Badge>
            <Badge variant="outline">
              {months} Month{months > 1 ? "s" : ""}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        {Array.from({ length: months }, (_, monthIndex) => (
          <Card key={monthIndex}>
            <CardHeader>
              <CardTitle className="text-lg">
                {getMonthName(monthIndex)} - Month {monthIndex + 1}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activities
                  .filter((activity) => {
                    const activityMonth = Math.ceil(activity.week / 4) - 1
                    return activityMonth === monthIndex
                  })
                  .map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                      <div className={`p-2 rounded-full ${activity.color}`}>{activity.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium">{activity.activity}</h4>
                          <Badge variant="secondary">Week {activity.week}</Badge>
                        </div>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6 bg-green-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-5 w-5 text-green-600" />
            <h3 className="font-medium text-green-800">Daily Reminders Set</h3>
          </div>
          <p className="text-sm text-green-700">
            You'll receive watering reminders at 7:00 AM and 5:00 PM daily throughout the growing period.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
