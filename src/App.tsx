import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Package, Zap, Pickaxe, Feather } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

interface Item {
  id: string
  name: string
  description: string
  price: number
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  image: string
  category: string
}

interface CartItem extends Item {
  quantity: number
}

const items: Item[] = [
  {
    id: 'elytra',
    name: 'Elytra',
    description: 'Rare wings that allow you to glide through the air with style and grace.',
    price: 1.00,
    icon: Feather,
    image: '/images/elytra.png',
    category: 'Equipment'
  },
  {
    id: 'skeleton-spawner',
    name: 'Skeleton Spawner',
    description: 'Spawns skeletons for your mob farm or defense system.',
    price: 0.25,
    icon: Package,
    image: '/images/skeleton-spawner.png',
    category: 'Spawners'
  },
  {
    id: 'sea-pickle-farm',
    name: 'Sea Pickle Farm (150 modules)',
    description: 'Complete underwater farm setup with 150 sea pickle modules for lighting.',
    price: 3.50,
    icon: Pickaxe,
    image: '/images/sea-pickle-farm.jpg',
    category: 'Farms'
  },
  {
    id: 'krypton-client',
    name: 'Krypton Client',
    description: 'Advanced Minecraft client with performance optimizations and features.',
    price: 2.00,
    icon: Zap,
    image: '/images/krypton-client.jpg',
    category: 'Software'
  }
]

function App() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const addToCart = (item: Item) => {
    setCart(prev => {
      const existing = prev.find(cartItem => cartItem.id === item.id)
      if (existing) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
    toast.success(`${item.name} added to cart!`)
  }

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId))
    toast.success('Item removed from cart')
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty!')
      return
    }
    toast.success('Checkout functionality coming soon!')
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                MineCraft Shop
              </h1>
              <p className="text-sm text-slate-400">Premium Minecraft Items & Tools</p>
            </div>
          </div>
          
          <Button
            variant="outline"
            className="relative border-slate-700 bg-slate-800/50 hover:bg-slate-700"
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Cart
            {getTotalItems() > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs">
                {getTotalItems()}
              </Badge>
            )}
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
          >
            Premium Minecraft Items
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-300 max-w-2xl mx-auto"
          >
            Enhance your Minecraft experience with our exclusive collection of items, spawners, and tools.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Items Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-slate-900/50 border-slate-700 hover:border-slate-600 transition-all duration-300 group hover:shadow-lg hover:shadow-green-500/10">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="bg-slate-800 text-slate-300">
                          {item.category}
                        </Badge>
                        <item.icon className="w-6 h-6 text-green-400" />
                      </div>
                      <CardTitle className="text-white group-hover:text-green-400 transition-colors">
                        {item.name}
                      </CardTitle>
                      <CardDescription className="text-slate-400">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="pb-3">
                      <div className="aspect-video bg-slate-800 rounded-lg mb-4 overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                        />
                      </div>
                      <div className="text-2xl font-bold text-green-400">
                        €{item.price.toFixed(2)}
                      </div>
                    </CardContent>
                    
                    <CardFooter>
                      <Button 
                        onClick={() => addToCart(item)}
                        className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 text-white border-0"
                      >
                        Add to Cart
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-900/50 border-slate-700 sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Shopping Cart
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {cart.length === 0 ? (
                  <p className="text-slate-400 text-center py-4">Your cart is empty</p>
                ) : (
                  <div className="space-y-3">
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white truncate">{item.name}</p>
                          <p className="text-xs text-slate-400">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-green-400">
                            €{(item.price * item.quantity).toFixed(2)}
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-900/20 h-6 px-2"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
              
              {cart.length > 0 && (
                <CardFooter className="flex-col space-y-4">
                  <div className="w-full flex justify-between items-center text-lg font-bold">
                    <span className="text-white">Total:</span>
                    <span className="text-green-400">€{getTotalPrice().toFixed(2)}</span>
                  </div>
                  <Button 
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 text-white"
                  >
                    Checkout
                  </Button>
                </CardFooter>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App