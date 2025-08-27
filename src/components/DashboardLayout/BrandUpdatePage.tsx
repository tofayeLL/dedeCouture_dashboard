import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useState } from "react"

interface BrandUpdateItem {
  id: number
  name: string
  avatar: string
  status: "approved" | "pending" | "rejected"
}

const brandUpdates: BrandUpdateItem[] = [
  { id: 1, name: "Chic Boutique", avatar: "/fashion-boutique-logo.png", status: "approved" },
  { id: 2, name: "Chic Boutique", avatar: "/fashion-boutique-logo.png", status: "pending" },
  { id: 3, name: "Chic Boutique", avatar: "/fashion-boutique-logo.png", status: "approved" },
  { id: 4, name: "Chic Boutique", avatar: "/fashion-boutique-logo.png", status: "pending" },
  { id: 5, name: "Chic Boutique", avatar: "/fashion-boutique-logo.png", status: "rejected" },
  { id: 6, name: "Chic Boutique", avatar: "/fashion-boutique-logo.png", status: "rejected" },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "approved":
      return <Badge className="bg-green-500 hover:bg-green-600 text-lg text-white px-6 py-1 lg:w-[30%] rounded-md">Approved</Badge>
    case "pending":
      return <Badge className="bg-blue-500 hover:bg-blue-600 text-lg text-white px-6 py-1 lg:w-[30%] rounded-md">Pending</Badge>
    case "rejected":
      return <Badge className="bg-red-500 hover:bg-red-600 text-lg text-white px-6 py-1 lg:w-[30%] rounded-md">Rejected</Badge>
    default:
      return null
  }
}

export default function BrandUpdatePage() {

      const [selectedCategory, setSelectedCategory] = useState("Jun");

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    // Add filtering logic here based on your needs
  };




  return (
    <div className="w-full h-full bg-white p-6 rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Brand Update</h1>
         <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="">
              <SelectValue placeholder="Jun" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Jun">Jun</SelectItem>
              <SelectItem value="July">July</SelectItem>
              <SelectItem value="August">August</SelectItem>
              <SelectItem value="September">September</SelectItem>
            </SelectContent>
          </Select> 
      </div>

      {/* Brand Update List */}
      <div className="space-y-4">
        {brandUpdates.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-16 h-16">
                <AvatarImage src={item.avatar || "/placeholder.svg"} alt={item.name} />
                <AvatarFallback>CB</AvatarFallback>
              </Avatar>
              <span className="text-gray-900 text-xl font-medium">{item.name}</span>
            </div>
            {getStatusBadge(item.status)}
          </div>
        ))}
      </div>
    </div>
  )
}
