import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function UnderConstruction() {
  return (
    <div className="min-h-screen bg-[#06044B] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#F1F1F1] mb-4">Under Construction</h1>
        <p className="text-[#F1F1F1]/80 mb-8">We are working hard to bring you something amazing. Please check back soon!</p>
        <Link href="/">
          <Button className="bg-[#05F4C1] text-[#06044B] hover:bg-[#05F4C1]/90">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  )
}