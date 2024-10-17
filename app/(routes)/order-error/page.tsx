import Navbar from '@/components/Shared/Navbar/Navbar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div>
        <Navbar />
        
        <div className="p-6 mx-auto max-w-7xl">
            <div className="flex flex-col items-center justoify-center gap-4 text-center">
                <h1 className="text-2xl">Oops! An error occurred!</h1>
                <p>Try again later</p>
                <Link href="/">
                    <Button>Back to dinos list</Button>
                </Link>
            </div>
        </div>
    </div>
  )
}
