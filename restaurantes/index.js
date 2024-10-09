import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Layout from '../../components/Layout'

export default function Restaurantes() {
  const [restaurants, setRestaurants] = useState([])
  const [filteredRestaurants, setFilteredRestaurants] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Aqui você faria uma chamada à API para buscar os restaurantes
    // Por enquanto, vamos usar dados mockados
    const mockRestaurants = [
      { id: 1, name: "Burger Queen", category: "Fast Food", rating: 4.5, image: "/images/burger.jpg" },
      { id: 2, name: "Pizza Palace", category: "Italiana", rating: 4.2, image: "/images/pizza.jpg" },
      { id: 3, name: "Sushi Master", category: "Japonesa", rating: 4.7, image: "/images/sushi.jpg" },
      { id: 4, name: "Veggie Delight", category: "Vegetariana", rating: 4.3, image: "/images/veggie.jpg" },
    ]
    setRestaurants(mockRestaurants)
    setFilteredRestaurants(mockRestaurants)
  }, [])

  useEffect(() => {
    const results = restaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredRestaurants(results)
  }, [searchTerm, restaurants])

  return (
    <Layout>
      <Head>
        <title>Restaurantes - DeliveryApp</title>
        <meta name="description" content="Escolha entre os melhores restaurantes" />
      </Head>

      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Nossos Restaurantes</h1>
        
        <div className="mb-8">
          <input
            type="text"
            placeholder="Buscar restaurantes..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRestaurants.map((restaurant) => (
            <div key={restaurant.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={restaurant.image} alt={restaurant.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{restaurant.name}</h2>
                <p className="text-gray-600 mb-2">{restaurant.category}</p>
                <div className="flex items-center mb-4">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span>{restaurant.rating}</span>
                </div>
                <Link href={`/restaurantes/${restaurant.id}`}>
                  <a className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
                    Ver Menu
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
