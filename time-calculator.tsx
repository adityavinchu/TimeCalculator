"use client"

import { useState } from "react"
import { Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function TimeCalculator() {
  const [entries, setEntries] = useState<string[]>([])
  const [inputValue, setInputValue] = useState("")

  const convertToMinutes = (entry: string): number => {
    const parts = entry.toLowerCase().split(" ")
    let totalMinutes = 0

    for (let i = 0; i < parts.length; i += 2) {
      const value = parseInt(parts[i])
      const unit = parts[i + 1]

      if (unit.startsWith("hr")) {
        totalMinutes += value * 60
      } else if (unit.startsWith("min")) {
        totalMinutes += value
      }
    }

    return totalMinutes
  }

  const addEntry = () => {
    if (inputValue.trim() !== "") {
      setEntries([...entries, inputValue.trim()])
      setInputValue("")
    }
  }

  const calculateTotal = (): string => {
    const totalMinutes = entries.reduce((acc, entry) => acc + convertToMinutes(entry), 0)
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    return `${hours} hr${hours !== 1 ? "s" : ""} ${minutes} min${minutes !== 1 ? "s" : ""}`
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Time Entry Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <div className="flex-grow">
              <Label htmlFor="timeEntry" className="sr-only">
                Enter time (e.g., 30 mins, 4 hrs 50 mins)
              </Label>
              <Input
                id="timeEntry"
                type="text"
                placeholder="Enter time (e.g., 30 mins, 4 hrs 50 mins)"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    addEntry()
                  }
                }}
              />
            </div>
            <Button onClick={addEntry} aria-label="Add entry">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Entries:</h3>
            <ul className="list-disc list-inside space-y-1">
              {entries.map((entry, index) => (
                <li key={index} className="text-sm">
                  {entry}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full text-center">
          <p className="text-lg font-semibold">Total: {calculateTotal()}</p>
        </div>
      </CardFooter>
    </Card>
  )
}