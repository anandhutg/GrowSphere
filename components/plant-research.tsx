"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import GoogleSearch from "@/components/google-search"

interface PlantResearchProps {
  onBack: () => void
}

export default function PlantResearch({ onBack }: PlantResearchProps) {
  return (
    <div className="p-4 pb-20">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold">Plant Research Center</h2>
      </div>

      <GoogleSearch />
    </div>
  )
}
