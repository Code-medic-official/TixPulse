import React from 'react'

export  default async function page({params}: {params: Promise<{username: string}>}) {

  const {username} = await params

  return (
    <div>page {username ?? "pernal User"}</div>
  )
}
