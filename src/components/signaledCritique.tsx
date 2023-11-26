import React from 'react'
import { Badge } from './ui/badge'
import { Flag } from 'lucide-react'

export default function SignaledCritique() {
  return (
    <Badge variant={'destructive'} className='text-xs gap-1'><Flag className='text-xs w-4'/>Signalé</Badge>
  )
}
