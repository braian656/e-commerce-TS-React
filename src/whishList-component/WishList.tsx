"use client"

import { useState } from "react"
import { Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"



export default function Wishlist() {
//   const [wishlistItems, setWishlistItems] = useState(initialWishlistItems)

//   const removeItem = (id: number) => {
//     setWishlistItems(wishlistItems.filter(item => item.id !== id))
//   }

//   const clearWishlist = () => {
//     setWishlistItems([])
//   }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
      {wishlistItems.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
            {wishlistItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remove ${item.title} from wishlist`}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="p-4">
                    <h2 className="font-semibold text-lg mb-2">{item.title}</h2>
                    <p className="text-primary font-bold">${item.price.toFixed(2)}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button variant="destructive" onClick={clearWishlist} className="flex items-center">
            <Trash2 className="mr-2 h-4 w-4" />
            Clear Wishlist
          </Button>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground mb-4">Your wishlist is empty</p>
          <Button variant="outline">Continue Shopping</Button>
        </div>
      )}
    </div>
  )
}