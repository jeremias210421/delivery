import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'

export default function RestaurantDetails() {
  const router = useRouter()
  const { id } = router.query
  const [restaurant, setRestaurant] = useState(null)
  const [menuItems, setMenuItems] = useState([])

  useEffect(() => {
    if (id) {
      // Aqui você faria uma chamada à API para buscar os detalhes do restaurante e seu menu
      // Por enquanto, vamos usar dados mockados
      setRestaurant({
        id: 1,
        name: "Burger Queen",
        category: "Fast Food",
        rating: 4.5,
        image: "/images/burger.jpg",
        description: "Os melhores burgers da cidade!"
      })
      setMenuItems([
        { id: 1, name: "Classic Burger", price: 15.99, description: "Hambúrguer clássico com queijo, alface e tomate" },
        { id: 2, name: "Cheese Fries", price: 8.99, description: "Batatas fritas cobertas com queijo derretido" },
        { id: 3, name: "Milkshake", price: 6.99, description: "Milkshake cremoso de baunilha" },
      ])
    }
  }, [id])

  if (!restaurant) {
    return <div>Carregando...</div>
  }

  return (
    <Layout>
      <Head>
        <title>{restaurant.name} - DeliveryApp</title>
        <meta name="description" content={`Peça já do ${restaurant.name}`} />
      </Head>

      <div className="container mx-auto py-8">
        <div className="mb-8">
          <img src={restaurant.image} alt={restaurant.name} className="w-full h-64 object-cover rounded-lg" />
          <h1 className="text-3xl font-bold mt-4">{restaurant.name}</h1>
          <p className="text-gray-600">{restaurant.category}</p>
          <div className="flex items-center mt-2">
            <span className="text-yellow-500 mr-1">★</span>
            <span>{restaurant.rating}</span>
          </div>
          <p className="mt-4">{restaurant.description}</p>
        </div>

        <h2 className="text-2xl font-bold mb-4">Menu</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menuItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-2">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">${item.price.toFixed(2)}</span>
                <button className="bg-blue-600 text-white py-1 px-4 rounded hover:bg-blue-700 transition duration-300">
                  Adicionar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
