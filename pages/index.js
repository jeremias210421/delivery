import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'
import { useState, useEffect } from 'react'

export default function Home() {
  const [featuredRestaurants, setFeaturedRestaurants] = useState([])

  useEffect(() => {
    // Aqui você faria uma chamada à API para buscar os restaurantes em destaque
    // Por enquanto, vamos usar dados mockados
    setFeaturedRestaurants([
      { id: 1, name: "Burger Queen", image: "/images/burger.jpg" },
      { id: 2, name: "Pizza Palace", image: "/images/pizza.jpg" },
      { id: 3, name: "Sushi Master", image: "/images/sushi.jpg" },
    ])
  }, [])

  return (
    <Layout>
      <Head>
        <title>DeliveryApp - Peça sua comida favorita</title>
        <meta name="description" content="Os melhores restaurantes da cidade" />
      </Head>

      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Peça sua comida favorita</h1>
          <p className="text-xl mb-8">Entrega rápida e segura na sua porta</p>
          <Link href="/restaurantes">
            <a className="bg-white text-blue-600 py-2 px-6 rounded-full text-lg font-semibold hover:bg-blue-100 transition duration-300">
              Ver Restaurantes
            </a>
          </Link>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Restaurantes em Destaque</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={restaurant.image} alt={restaurant.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{restaurant.name}</h3>
                  <Link href={`/restaurantes/${restaurant.id}`}>
                    <a className="text-blue-600 hover:underline">Ver Menu</a>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Categorias Populares</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Pizza', 'Sushi', 'Burger', 'Vegetariano'].map((category) => (
              <div key={category} className="bg-white rounded-lg shadow-md p-4 text-center">
                <h3 className="text-lg font-semibold">{category}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}
