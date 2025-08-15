"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MessageCircle, Camera, TestTube, Bug, DollarSign, Send, Upload } from "lucide-react"
import MarketPrices from "@/components/market-prices"

interface SpecialFeaturesProps {
  onBack: () => void
}

export default function SpecialFeatures({ onBack }: SpecialFeaturesProps) {
  const [activeFeature, setActiveFeature] = useState<string | null>(null)
  const [chatMessage, setChatMessage] = useState("")
  const [chatHistory, setChatHistory] = useState<Array<{ role: string; message: string }>>([])
  const [isAiThinking, setIsAiThinking] = useState(false)

  const tools = [
    {
      id: "ai-chat",
      title: "AI Chat Assistant",
      description: "Get instant farming advice and answers",
      icon: <MessageCircle className="h-6 w-6" />,
      color: "bg-blue-500",
    },
    {
      id: "photo-detection",
      title: "Plant Photo Detection",
      description: "Identify plants and diseases from photos",
      icon: <Camera className="h-6 w-6" />,
      color: "bg-green-500",
    },
    {
      id: "soil-test",
      title: "Soil Analysis",
      description: "Test and analyze your soil conditions",
      icon: <TestTube className="h-6 w-6" />,
      color: "bg-purple-500",
    },
    {
      id: "pest-control",
      title: "Pest Control Guide",
      description: "Identify and manage plant pests",
      icon: <Bug className="h-6 w-6" />,
      color: "bg-red-500",
    },
    {
      id: "market-price",
      title: "Market Prices",
      description: "Current crop prices and trends",
      icon: <DollarSign className="h-6 w-6" />,
      color: "bg-yellow-500",
    },
  ]

  const handleSendMessage = async () => {
    if (!chatMessage.trim() || isAiThinking) return

    const userMessage = chatMessage
    const newHistory = [...chatHistory, { role: "user", message: userMessage }]
    setChatHistory(newHistory)
    setChatMessage("")
    setIsAiThinking(true)

    // Simulate AI thinking delay
    await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 2000))

    try {
      // Get intelligent response based on the question
      const aiResponse = getIntelligentResponse(userMessage)

      // Add AI response to chat history
      setChatHistory((prev) => [...prev, { role: "ai", message: aiResponse }])
    } catch (error) {
      console.error("AI Chat Error:", error)
      setChatHistory((prev) => [
        ...prev,
        {
          role: "ai",
          message:
            "I'm having trouble processing your request right now. Please try asking again or use the Research feature for detailed plant information.",
        },
      ])
    } finally {
      setIsAiThinking(false)
    }
  }

  // Enhanced intelligent response system
  const getIntelligentResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase()

    // Tomato-related questions
    if (lowerQuestion.includes("tomato")) {
      return `🍅 **Tomato Growing Guide:**

**🌡️ Climate Requirements:**
• Temperature: 20-25°C (68-77°F) optimal
• Full sun exposure: 6-8 hours daily
• Protect from strong winds and frost

**🌱 Soil & Planting:**
• Well-drained, fertile loamy soil
• pH level: 6.0-6.8 (slightly acidic)
• Plant depth: Bury 2/3 of stem for strong roots
• Spacing: 60-90cm apart

**💧 Watering:**
• Deep, consistent watering (avoid leaves)
• 2.5-5cm water per week
• Mulch around plants to retain moisture

**🧪 Fertilization:**
• Start: Balanced NPK 10-10-10
• Fruiting: Lower nitrogen (5-10-10)
• Add calcium to prevent blossom end rot

**🎯 Care Tips:**
• Stake or cage tall varieties
• Prune suckers for better fruit production
• Harvest when fully colored but still firm

**Common Issues:** Blight, cracking, pests like hornworms`
    }

    // Rice-related questions
    if (lowerQuestion.includes("rice")) {
      return `🌾 **Rice Cultivation Guide:**

**🌡️ Climate Requirements:**
• Tropical/subtropical climate preferred
• Temperature: 20-35°C throughout growing season
• High humidity: 80-90% ideal
• Requires 120-150 frost-free days

**🌊 Water Management:**
• Flooded field cultivation (paddy system)
• Maintain 2-5cm water depth during growth
• Drain fields 2-3 weeks before harvest
• Requires 1000-2000mm annual rainfall or irrigation

**🌱 Soil & Planting:**
• Clay or clay loam soil preferred
• Can tolerate waterlogged conditions
• pH range: 5.5-7.0 (slightly acidic to neutral)
• Transplant 20-25 day old seedlings

**🧪 Fertilization:**
• Basal: Organic manure before planting
• Nitrogen: Urea in 3-4 split applications
• Phosphorus: DAP at planting
• Potassium: Muriate of potash

**⏰ Timeline:**
• Nursery: 20-25 days
• Vegetative: 60-90 days
• Reproductive: 30-40 days
• Total: 120-150 days from sowing

**Harvest:** When 80% of grains turn golden yellow`
    }

    // Wheat-related questions
    if (lowerQuestion.includes("wheat")) {
      return `🌾 **Wheat Cultivation Guide:**

**🌡️ Climate Requirements:**
• Cool, moist climate during vegetative growth
• Warm, dry weather during grain filling
• Temperature: 15-25°C optimal
• Requires vernalization (cold treatment) for some varieties

**🌱 Soil & Planting:**
• Well-drained loamy soil preferred
• pH range: 6.0-7.5 (neutral to slightly alkaline)
• Deep soil with good organic matter
• Avoid waterlogged or sandy soils

**⏰ Planting Times:**
• Winter wheat: September-November
• Spring wheat: March-May
• Sowing depth: 2.5-5cm
• Seed rate: 100-125 kg/hectare

**🧪 Fertilization:**
• Nitrogen: Split application (basal + top-dress)
• Phosphorus: Full dose at sowing
• Potassium: For disease resistance
• Micronutrients: Zinc, iron if deficient

**💧 Water Management:**
• Critical stages: Crown root initiation, flowering, grain filling
• Avoid waterlogging during any stage
• Drought stress during grain filling reduces yield

**🎯 Care:**
• Weed control in early stages
• Disease monitoring (rust, smut)
• Harvest when moisture content is 12-14%`
    }

    // Corn/Maize questions
    if (lowerQuestion.includes("corn") || lowerQuestion.includes("maize")) {
      return `🌽 **Corn (Maize) Growing Guide:**

**🌡️ Climate Requirements:**
• Warm season crop: 18-27°C optimal
• Full sun exposure essential
• Frost-sensitive: needs 120+ frost-free days
• Moderate rainfall: 500-750mm during season

**🌱 Soil & Planting:**
• Well-drained, fertile soil
• pH range: 6.0-6.8 (slightly acidic)
• Deep loamy soil with good organic matter
• Plant in blocks (not single rows) for pollination

**⏰ Planting:**
• Plant after soil temperature reaches 16°C
• Depth: 2.5-5cm deep
• Spacing: 20-30cm between plants
• Rows: 75-90cm apart

**🧪 Fertilization:**
• High nitrogen requirement
• Side-dress with nitrogen when knee-high
• Phosphorus for early root development
• Potassium for stalk strength

**💧 Watering:**
• Critical periods: Tasseling and ear formation
• Deep, infrequent watering preferred
• Avoid overhead watering during pollination

**🎯 Care Tips:**
• Hill soil around stalks for support
• Watch for corn borers and earworms
• Harvest when kernels are milky and full
• Sweet corn: Pick when silks are brown and dry`
    }

    // Potato questions
    if (lowerQuestion.includes("potato")) {
      return `🥔 **Potato Growing Guide:**

**🌡️ Climate Requirements:**
• Cool season crop: 15-20°C optimal
• Cool nights essential for tuber formation
• Avoid extreme heat (reduces tuber quality)
• 90-120 frost-free days needed

**🌱 Soil & Planting:**
• Loose, well-drained soil essential
• pH range: 5.0-6.0 (slightly acidic)
• Sandy loam preferred for easy harvesting
• Good soil aeration prevents diseases

**🌰 Planting:**
• Plant seed potatoes 10-15cm deep
• Space 30cm apart in rows
• Rows 75-90cm apart
• Plant when soil temperature is 7-10°C

**🧪 Fertilization:**
• Balanced NPK with emphasis on potassium
• Avoid fresh manure (causes scab disease)
• Organic compost 2-3 weeks before planting
• Side-dress with compost during growth

**🏔️ Hilling:**
• Hill soil around plants as they grow
• Prevents green tubers (toxic)
• Improves drainage and tuber development
• Hill 2-3 times during season

**🎯 Care:**
• Consistent moisture (avoid waterlogging)
• Watch for Colorado potato beetle
• Harvest when plants die back
• Cure in dark, cool place before storage`
    }

    // Pest control questions
    if (
      lowerQuestion.includes("pest") ||
      lowerQuestion.includes("bug") ||
      lowerQuestion.includes("insect") ||
      lowerQuestion.includes("aphid") ||
      lowerQuestion.includes("caterpillar")
    ) {
      return `🐛 **Comprehensive Pest Control Guide:**

**🔍 Common Garden Pests:**

**Aphids** 🐛
• Symptoms: Curled leaves, sticky honeydew
• Treatment: Neem oil, insecticidal soap, ladybugs
• Prevention: Reflective mulch, companion planting

**Spider Mites** 🕷️
• Symptoms: Fine webbing, stippled leaves
• Treatment: Increase humidity, predatory mites
• Prevention: Avoid dusty conditions, proper watering

**Caterpillars** 🐛
• Symptoms: Chewed leaves, visible larvae
• Treatment: Bt spray, hand picking, row covers
• Prevention: Beneficial insects, crop rotation

**Whiteflies** 🦟
• Symptoms: Flying white insects, yellowing leaves
• Treatment: Yellow sticky traps, reflective mulch
• Prevention: Remove infected plants, beneficial insects

**🌿 Organic Control Methods:**
• **Neem Oil:** Effective against soft-bodied insects
• **Diatomaceous Earth:** For crawling pests
• **Beneficial Insects:** Ladybugs, lacewings, parasitic wasps
• **Companion Plants:** Marigolds, basil, nasturtiums

**🛡️ Prevention Strategies:**
• Crop rotation breaks pest cycles
• Healthy soil = healthy plants = pest resistance
• Regular inspection catches problems early
• Proper spacing improves air circulation
• Remove plant debris where pests overwinter

**⚠️ When to Act:**
• Early morning or evening applications
• Target pest life cycles
• Rotate control methods to prevent resistance`
    }

    // Fertilizer questions
    if (
      lowerQuestion.includes("fertilizer") ||
      lowerQuestion.includes("nutrient") ||
      lowerQuestion.includes("npk") ||
      lowerQuestion.includes("nitrogen") ||
      lowerQuestion.includes("phosphorus") ||
      lowerQuestion.includes("potassium")
    ) {
      return `🧪 **Complete Fertilizer Guide:**

**📊 NPK Basics:**
• **Nitrogen (N):** Leaf growth, green color, protein synthesis
• **Phosphorus (P):** Root development, flowering, fruit set
• **Potassium (K):** Disease resistance, water regulation, fruit quality

**🎯 Application Guidelines:**
• Test soil pH first (most plants prefer 6.0-7.0)
• Apply to moist soil, then water in
• Follow package rates - more isn't better
• Split applications for better uptake

**🌱 Organic Options:**
• **Compost:** Slow-release, improves soil structure
• **Fish Emulsion:** Quick nitrogen source
• **Bone Meal:** Phosphorus for root development
• **Wood Ash:** Potassium source (use sparingly)
• **Aged Manure:** Balanced nutrients plus organic matter

**⏰ Timing:**
• **Spring:** Balanced fertilizer for new growth
• **Summer:** Lower nitrogen, higher phosphorus/potassium
• **Fall:** Phosphorus/potassium only (no nitrogen)

**🔬 Deficiency Signs:**
• **Nitrogen:** Yellow older leaves, stunted growth
• **Phosphorus:** Purple leaf tinge, poor flowering
• **Potassium:** Brown leaf edges, weak stems

**💡 Pro Tips:**
• Foliar feeding for quick nutrient uptake
• Slow-release fertilizers reduce leaching
• Organic matter improves nutrient retention
• Different crops have different needs
• Over-fertilizing can burn plants or delay fruiting

**🌿 Crop-Specific Needs:**
• Leafy greens: High nitrogen
• Fruiting plants: Balanced, then lower nitrogen
• Root vegetables: Lower nitrogen, higher phosphorus`
    }

    // Soil questions
    if (
      lowerQuestion.includes("soil") ||
      lowerQuestion.includes("ph") ||
      lowerQuestion.includes("drainage") ||
      lowerQuestion.includes("compost")
    ) {
      return `🌱 **Complete Soil Management Guide:**

**🔬 Soil Testing:**
• Test pH levels (6.0-7.0 ideal for most crops)
• Check nutrient levels (N-P-K plus micronutrients)
• Assess soil structure and drainage
• Test every 2-3 years or when problems arise

**🏗️ Soil Types & Management:**

**Clay Soil:**
• Pros: Rich in nutrients, retains moisture
• Cons: Poor drainage, compacts easily
• Improve: Add organic matter, create raised beds

**Sandy Soil:**
• Pros: Good drainage, easy to work
• Cons: Nutrients leach quickly, dries out fast
• Improve: Add compost, mulch heavily

**Loamy Soil:**
• The ideal: Balance of sand, silt, clay
• Good drainage + nutrient retention
• Maintain with regular organic matter additions

**🌿 Soil Improvement Strategies:**
• **Organic Matter:** Compost, aged manure, leaf mold
• **Cover Crops:** Nitrogen fixation, prevent erosion
• **Mulching:** Retains moisture, suppresses weeds
• **No-Till:** Preserves soil structure and biology

**⚖️ pH Management:**
• **Too Acidic (below 6.0):** Add lime
• **Too Alkaline (above 7.5):** Add sulfur or organic matter
• **pH affects nutrient availability**
• Most vegetables prefer 6.0-7.0

**💧 Drainage Solutions:**
• Raised beds for heavy clay
• French drains for persistent wet spots
• Organic matter improves both drainage and retention
• Avoid working wet soil (causes compaction)

**🦠 Soil Biology:**
• Beneficial microorganisms break down organic matter
• Earthworms improve soil structure
• Mycorrhizal fungi help plants absorb nutrients
• Avoid overuse of synthetic chemicals`
    }

    // Watering/irrigation questions
    if (
      lowerQuestion.includes("water") ||
      lowerQuestion.includes("irrigation") ||
      lowerQuestion.includes("drought") ||
      lowerQuestion.includes("overwater")
    ) {
      return `💧 **Smart Watering & Irrigation Guide:**

**⏰ When to Water:**
• Early morning (6-10 AM) is best
• Evening watering okay if leaves dry before dark
• Avoid midday watering (wasteful, can burn leaves)
• Check soil moisture 2-3 inches deep

**💦 How Much Water:**
• Most vegetables need 1-1.5 inches per week
• Deep, infrequent watering better than frequent shallow
• Water until it penetrates 6-8 inches deep
• Adjust for rainfall, temperature, and plant stage

**🎯 Watering Techniques:**
• **Drip Irrigation:** Most efficient, reduces disease
• **Soaker Hoses:** Good for rows and beds
• **Sprinklers:** Avoid during flowering (interferes with pollination)
• **Hand Watering:** Good for containers and spot watering

**🌱 Plant-Specific Needs:**
• **Seedlings:** Light, frequent watering
• **Established plants:** Deep, less frequent
• **Fruiting plants:** Consistent moisture critical
• **Root vegetables:** Even moisture prevents cracking

**🚨 Signs of Water Stress:**
• **Underwatering:** Wilting, dry soil, stunted growth
• **Overwatering:** Yellow leaves, root rot, fungal issues
• **Inconsistent watering:** Cracking, blossom end rot

**💡 Water Conservation:**
• Mulch reduces evaporation by 50-70%
• Compost improves water retention
• Group plants by water needs
• Collect rainwater when possible
• Choose drought-tolerant varieties

**🌿 Seasonal Adjustments:**
• Spring: Increase as temperatures rise
• Summer: Peak water needs, morning watering essential
• Fall: Reduce as temperatures drop
• Winter: Minimal watering for most crops`
    }

    // General growing/planting questions
    if (
      lowerQuestion.includes("grow") ||
      lowerQuestion.includes("plant") ||
      lowerQuestion.includes("garden") ||
      lowerQuestion.includes("farm") ||
      lowerQuestion.includes("crop")
    ) {
      return `🌾 **Complete Growing Guide:**

**📅 Planning Your Garden:**
• Know your hardiness zone and frost dates
• Plan crop rotation (don't plant same family in same spot)
• Consider companion planting benefits
• Start with easy crops: lettuce, radishes, beans

**🌱 Starting from Seed vs. Transplants:**
• **Direct Sow:** Beans, corn, carrots, radishes
• **Start Indoors:** Tomatoes, peppers, eggplant
• **Either Method:** Lettuce, spinach, herbs

**⏰ Timing is Everything:**
• **Cool Season:** Plant 2-4 weeks before last frost
• **Warm Season:** Plant after soil warms and frost danger passes
• **Succession Planting:** Sow every 2-3 weeks for continuous harvest

**🎯 Essential Growing Tips:**
• Prepare soil with compost before planting
• Follow spacing recommendations (overcrowding reduces yields)
• Mulch to retain moisture and suppress weeds
• Monitor for pests and diseases regularly

**🌿 Crop Categories:**

**Leafy Greens** (lettuce, spinach, kale):
• Cool weather crops
• Quick growing (30-60 days)
• Can tolerate light frost

**Fruiting Crops** (tomatoes, peppers, squash):
• Warm weather crops
• Longer growing season (60-120 days)
• Need consistent moisture and feeding

**Root Vegetables** (carrots, beets, radishes):
• Direct sow only
• Need loose, deep soil
• Some can overwinter

**🔄 Crop Rotation Benefits:**
• Prevents soil-borne diseases
• Balances soil nutrients
• Breaks pest cycles
• Improves soil structure

**📈 Maximizing Yields:**
• Choose varieties suited to your climate
• Provide adequate spacing and support
• Harvest regularly to encourage production
• Keep plants healthy with proper care`
    }

    // Harvest questions
    if (
      lowerQuestion.includes("harvest") ||
      lowerQuestion.includes("pick") ||
      lowerQuestion.includes("ripe") ||
      lowerQuestion.includes("ready")
    ) {
      return `🎯 **Harvest Timing & Techniques:**

**🍅 Fruiting Vegetables:**
• **Tomatoes:** Harvest when fully colored but still firm
• **Peppers:** Pick when full size, any color stage
• **Eggplant:** Harvest when skin is glossy and firm
• **Squash:** Summer squash when tender, winter when hard

**🥬 Leafy Greens:**
• **Lettuce:** Cut outer leaves or whole head when full
• **Spinach:** Harvest outer leaves, leave center growing
• **Kale:** Pick outer leaves, plant keeps producing
• **Herbs:** Pinch flowers to keep leaves tender

**🥕 Root Vegetables:**
• **Carrots:** Ready when shoulders show at soil surface
• **Beets:** Harvest when 2-3 inches diameter
• **Radishes:** Pull when size of marble to golf ball
• **Potatoes:** Dig when plants die back

**⏰ Best Harvest Times:**
• **Morning:** After dew dries but before heat
• **Evening:** Second best option
• **Avoid:** Midday heat or when plants are wet

**🎯 Harvest Techniques:**
• Use clean, sharp tools to prevent disease
• Handle gently to avoid bruising
• Harvest regularly to encourage production
• Don't harvest wet plants (spreads disease)

**📦 Post-Harvest Care:**
• Cool vegetables quickly after harvest
• Remove field heat with cold water rinse
• Store in appropriate conditions
• Process or preserve excess harvest

**🔄 Succession Harvesting:**
• Pick outer leaves of lettuce, spinach
• Harvest beans and peas regularly
• Cut herbs frequently for bushier growth
• Remove spent flowers to extend season

**⚠️ Signs of Overripeness:**
• Tough, bitter greens
• Cracked or soft fruits
• Woody root vegetables
• Bolted (gone to seed) crops`
    }

    // Disease questions
    if (
      lowerQuestion.includes("disease") ||
      lowerQuestion.includes("fungus") ||
      lowerQuestion.includes("blight") ||
      lowerQuestion.includes("rot") ||
      lowerQuestion.includes("mold")
    ) {
      return `🦠 **Plant Disease Prevention & Treatment:**

**🔍 Common Plant Diseases:**

**Fungal Diseases:**
• **Blight:** Brown/black spots on leaves and stems
• **Powdery Mildew:** White powdery coating on leaves
• **Root Rot:** Wilting despite moist soil, black roots
• **Rust:** Orange/brown spots on leaf undersides

**Bacterial Diseases:**
• **Bacterial Wilt:** Sudden wilting, slimy stems
• **Leaf Spot:** Water-soaked spots with yellow halos
• **Soft Rot:** Mushy, foul-smelling plant parts

**Viral Diseases:**
• **Mosaic Virus:** Mottled, distorted leaves
• **Curly Top:** Stunted, twisted growth
• **Ring Spot:** Circular patterns on leaves

**🛡️ Prevention Strategies:**
• **Air Circulation:** Proper plant spacing
• **Water Management:** Water at soil level, not leaves
• **Crop Rotation:** 3-4 year rotation minimum
• **Sanitation:** Remove infected plant debris
• **Resistant Varieties:** Choose disease-resistant cultivars

**🌿 Organic Treatments:**
• **Baking Soda Spray:** For powdery mildew
• **Copper Fungicide:** For bacterial and fungal issues
• **Neem Oil:** Broad-spectrum organic treatment
• **Compost Tea:** Boosts plant immunity

**⚠️ When to Remove Plants:**
• Viral infections (no cure, prevent spread)
• Severe bacterial wilt
• Advanced root rot
• Any plant that's more than 50% affected

**🌱 Building Plant Immunity:**
• Healthy soil with good drainage
• Adequate but not excessive fertilization
• Consistent watering schedule
• Beneficial microorganisms in soil
• Avoid plant stress from overcrowding

**📋 Disease Management Checklist:**
• Inspect plants weekly
• Remove affected leaves immediately
• Disinfect tools between plants
• Avoid working with wet plants
• Compost only healthy plant material`
    }

    // Season/timing questions
    if (
      lowerQuestion.includes("season") ||
      lowerQuestion.includes("spring") ||
      lowerQuestion.includes("summer") ||
      lowerQuestion.includes("fall") ||
      lowerQuestion.includes("winter") ||
      lowerQuestion.includes("when")
    ) {
      return `📅 **Seasonal Farming Calendar:**

**🌸 Spring (March-May):**
• **Early Spring:** Plant cool-season crops (peas, lettuce, spinach)
• **Mid Spring:** Start warm-season seeds indoors
• **Late Spring:** Transplant warm-season crops after last frost
• **Tasks:** Soil preparation, compost addition, garden cleanup

**☀️ Summer (June-August):**
• **Early Summer:** Plant heat-loving crops (beans, squash, corn)
• **Mid Summer:** Succession plant for continuous harvest
• **Late Summer:** Start fall crops (broccoli, cabbage)
• **Tasks:** Consistent watering, pest monitoring, harvesting

**🍂 Fall (September-November):**
• **Early Fall:** Plant winter crops in mild climates
• **Mid Fall:** Harvest and preserve summer crops
• **Late Fall:** Garden cleanup, cover crop planting
• **Tasks:** Soil amendment, tool maintenance, planning next year

**❄️ Winter (December-February):**
• **Cold Climates:** Plan next year's garden, order seeds
• **Mild Climates:** Grow cool-season crops
• **Indoor:** Start seeds for early spring transplants
• **Tasks:** Equipment maintenance, education, greenhouse growing

**🌡️ Temperature Guidelines:**
• **Cool Season Crops:** Grow best at 60-70°F
• **Warm Season Crops:** Need 70-80°F+ for best growth
• **Soil Temperature:** More important than air temperature for seeds

**📊 Planting Schedule Tips:**
• Count back from first/last frost dates
• Use succession planting for continuous harvest
• Consider crop maturity times when planning
• Keep records of what works in your area

**🌍 Regional Variations:**
• Northern climates: Shorter growing season, focus on quick crops
• Southern climates: Year-round growing possible
• Coastal areas: Moderated temperatures, longer seasons
• Mountain areas: Shorter seasons, temperature extremes`
    }

    // Default comprehensive response
    return `🤖 **Farming Assistant - Expert Advice**

Thank you for your question: "${question}"

I'm here to help with all aspects of farming and gardening! Here's what I can assist you with:

**🌱 Plant Growing:**
• Specific crop cultivation guides (tomatoes, rice, wheat, corn, etc.)
• Soil preparation and management
• Planting schedules and timing
• Spacing and companion planting

**🧪 Plant Care:**
• Fertilization programs and nutrient management
• Watering and irrigation strategies
• Pest identification and organic control
• Disease prevention and treatment

**⏰ Seasonal Planning:**
• When to plant different crops
• Harvest timing and techniques
• Seasonal garden maintenance
• Crop rotation strategies

**🎯 Specific Help Available:**
Try asking about:
• "How to grow [specific plant]?"
• "What fertilizer for [crop]?"
• "When to harvest [vegetable]?"
• "How to control [pest/disease]?"
• "Soil preparation for [crop]?"

**🔧 Additional Resources:**
• Use the **Research** feature for online plant information
• Check **Market Prices** for crop value planning
• Visit the **Plant Gallery** for quick plant references

Feel free to ask any specific farming question - I'm here to help you grow successfully! 🌾`
  }

  const renderFeatureContent = () => {
    switch (activeFeature) {
      case "ai-chat":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                AI Farming Assistant
                <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                  Expert Mode
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-64 border rounded-lg p-4 overflow-y-auto bg-gray-50">
                  {chatHistory.length === 0 ? (
                    <div className="text-center text-gray-500">
                      <MessageCircle className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p className="font-medium">Ask me anything about farming!</p>
                      <p className="text-xs mt-1">Expert agricultural knowledge at your fingertips</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {chatHistory.map((chat, index) => (
                        <div key={index} className={`flex ${chat.role === "user" ? "justify-end" : "justify-start"}`}>
                          <div
                            className={`max-w-xs p-3 rounded-lg ${
                              chat.role === "user" ? "bg-blue-500 text-white" : "bg-white border shadow-sm"
                            }`}
                          >
                            {chat.role === "ai" && (
                              <div className="flex items-center gap-1 mb-1">
                                <MessageCircle className="h-3 w-3 text-green-600" />
                                <span className="text-xs text-green-600 font-medium">Farming Expert</span>
                              </div>
                            )}
                            <div className="text-sm whitespace-pre-line">{chat.message}</div>
                          </div>
                        </div>
                      ))}
                      {isAiThinking && (
                        <div className="flex justify-start">
                          <div className="bg-white border shadow-sm p-3 rounded-lg max-w-xs">
                            <div className="flex items-center gap-2">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                              <span className="text-sm text-gray-600">Analyzing your question...</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {chatHistory.length === 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Popular questions:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "How do I grow tomatoes?",
                        "What fertilizer for rice?",
                        "When to harvest wheat?",
                        "Pest control for corn?",
                        "Soil pH for vegetables?",
                        "Watering schedule tips?",
                      ].map((question, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setChatMessage(question)
                            setTimeout(() => handleSendMessage(), 100)
                          }}
                          className="text-xs h-auto p-2"
                          disabled={isAiThinking}
                        >
                          {question}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask about farming, pests, fertilizers, soil, harvesting..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                    disabled={isAiThinking}
                  />
                  <Button onClick={handleSendMessage} disabled={!chatMessage.trim() || isAiThinking}>
                    {isAiThinking ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case "photo-detection":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Plant Photo Detection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Camera className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">Take or upload a photo of your plant</p>
                  <Button className="mb-2">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Photo
                  </Button>
                  <p className="text-xs text-gray-500">AI will identify the plant and detect any diseases or issues</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">What we can detect:</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Plant species identification</li>
                    <li>• Disease detection</li>
                    <li>• Nutrient deficiencies</li>
                    <li>• Pest damage assessment</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case "soil-test":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TestTube className="h-5 w-5" />
                Soil Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <h4 className="font-medium text-blue-800">pH Level</h4>
                    <p className="text-2xl font-bold text-blue-600">6.8</p>
                    <Badge variant="secondary">Optimal</Badge>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <h4 className="font-medium text-green-800">Nitrogen</h4>
                    <p className="text-2xl font-bold text-green-600">High</p>
                    <Badge variant="secondary">Good</Badge>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg text-center">
                    <h4 className="font-medium text-yellow-800">Phosphorus</h4>
                    <p className="text-2xl font-bold text-yellow-600">Medium</p>
                    <Badge variant="secondary">Fair</Badge>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <h4 className="font-medium text-purple-800">Potassium</h4>
                    <p className="text-2xl font-bold text-purple-600">Low</p>
                    <Badge variant="destructive">Needs Attention</Badge>
                  </div>
                </div>
                <Button className="w-full">
                  <TestTube className="h-4 w-4 mr-2" />
                  Run New Soil Test
                </Button>
              </div>
            </CardContent>
          </Card>
        )

      case "pest-control":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bug className="h-5 w-5" />
                Pest Control Guide
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Aphids", severity: "High", treatment: "Neem oil spray" },
                  { name: "Spider Mites", severity: "Medium", treatment: "Increase humidity" },
                  { name: "Whiteflies", severity: "Low", treatment: "Yellow sticky traps" },
                ].map((pest, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{pest.name}</h4>
                      <Badge
                        variant={
                          pest.severity === "High"
                            ? "destructive"
                            : pest.severity === "Medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {pest.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">Treatment: {pest.treatment}</p>
                  </div>
                ))}
                <Button className="w-full">
                  <Camera className="h-4 w-4 mr-2" />
                  Identify Pest from Photo
                </Button>
              </div>
            </CardContent>
          </Card>
        )

      case "market-price":
        return <MarketPrices />

      default:
        return null
    }
  }

  return (
    <div className="p-4 pb-20">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold">Tools</h2>
      </div>

      {!activeFeature ? (
        <div className="grid grid-cols-1 gap-4">
          {tools.map((tool) => (
            <Card key={tool.id} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${tool.color} text-white`}>{tool.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{tool.title}</h3>
                    <p className="text-sm text-gray-600">{tool.description}</p>
                    <Button onClick={() => setActiveFeature(tool.id)} className="mt-2" size="sm">
                      Open Tool
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div>
          <Button variant="ghost" onClick={() => setActiveFeature(null)} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tools
          </Button>
          {renderFeatureContent()}
        </div>
      )}
    </div>
  )
}
