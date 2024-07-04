"use client"

import React from "react"
import { useTimer } from "react-timer-hook"

export default function MyTimer({ expiryTimestamp }: { expiryTimestamp: any }) {
  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  })

  return (
    <div>
      <div>
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
        <span>{seconds}</span>
      </div>
    </div>
  )
}
