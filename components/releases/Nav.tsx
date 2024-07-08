"use client"

import React, { useEffect, useState } from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { RotateCcw } from "lucide-react"
import { fetchPlatforms } from "@/lib/fetchs"
import { Platform } from "@/lib/types"

export default function Nav() {
  const router = useRouter()
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")
  const [selectedPlatform, setSelectedPlatform] = useState("")
  const [platforms, setPlatforms] = useState<Platform[]>([])

  const resetValues = () => {
    setMonth("")
    setYear("")
    setSelectedPlatform("")
    router.push(`/releases`)
  }

  useEffect(() => {
    fetchPlatforms({ setPlatforms })
  }, [])

  useEffect(() => {
    if (selectedPlatform && year && month) {
      router.push(`/releases/${year}/${month}/${selectedPlatform}`)
    } else if (selectedPlatform && year) {
      router.push(`/releases/${year}/1/${selectedPlatform}`)
    } else if (year && month) {
      router.push(`/releases/${year}/${month}`)
    } else if (year) {
      router.push(`/releases/${year}/1`)
    }
  }, [month, year, selectedPlatform, router])

  return (
    <nav
      id="start"
      className="flex flex-col md:flex-row items-center justify-center md:space-x-4 top-16 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <Select value={month} onValueChange={(value) => setMonth(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Month" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Months</SelectLabel>
            <SelectItem value="1">January</SelectItem>
            <SelectItem value="2">February</SelectItem>
            <SelectItem value="3">March</SelectItem>
            <SelectItem value="4">April</SelectItem>
            <SelectItem value="5">May</SelectItem>
            <SelectItem value="6">June</SelectItem>
            <SelectItem value="7">July</SelectItem>
            <SelectItem value="8">August</SelectItem>
            <SelectItem value="9">September</SelectItem>
            <SelectItem value="10">October</SelectItem>
            <SelectItem value="11">November</SelectItem>
            <SelectItem value="12">December</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select value={year} onValueChange={(value) => setYear(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Years</SelectLabel>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2025">2025</SelectItem>
            <SelectItem value="2026">2026</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        value={selectedPlatform}
        onValueChange={(value) => setSelectedPlatform(value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Platform" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Platforms</SelectLabel>
            {platforms
              ? platforms.map((platform) => (
                  <SelectItem key={platform.id} value={platform.id}>
                    {platform.name}
                  </SelectItem>
                ))
              : null}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button onClick={resetValues} className="w-[180px]">
        <RotateCcw className="mr-2 h-4 w-4" />
        Reset
      </Button>
    </nav>
  )
}
