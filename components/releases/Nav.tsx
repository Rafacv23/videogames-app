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

export default function Nav() {
  const router = useRouter()
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")

  const resetValues = () => {
    setMonth("")
    setYear("")
    router.push(`/releases`)
  }

  useEffect(() => {
    if (year) {
      router.push(`/releases/${year}/1`)
    }
    if (month && year) {
      router.push(`/releases/${year}/${month}`)
    }
  }, [month, year, router])
  return (
    <nav className="flex items-center justify-center space-x-4 sticky top-20 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Button onClick={resetValues}>Reset</Button>
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
    </nav>
  )
}
