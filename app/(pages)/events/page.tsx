import { getUpcomingEvents } from '@/lib/db/actions/event.action'
import React from 'react'

export  default async function page() {
  const upComingEvents = await getUpcomingEvents()

  console.log(upComingEvents)

  return (
    <div>page</div>
  )
}
