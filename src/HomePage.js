// src/HomePage.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Star, Clock, TrendingUp, Menu, X, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';

// Componente de carrossel
const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-96 overflow-hidden">
      <AnimatePresence initial={false} custom={currentIndex}>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Imagem ${currentIndex + 1}`}
          className="absolute w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>
      <button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full" onClick={prevSlide}>
        <ChevronLeft />
      </button>
      <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full" onClick={nextSlide}>
        <ChevronRight />
      </button>
    </div>
  );
};

// Componente principal da página
const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [restaurants, setRestaurants] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const carouselImages = [
    '/api/placeholder/1200/800',
    '/api/placeholder/1200/800',
    '/api/placeholder/1200/800',
    '/api/placeholder/1200/800',
    '/api/placeholder/1200/800'
  ];

  useEffect(() => {
    const fetchRestaurants = async () => {
      const mockRestaurants = [
        { id: 1, name: 'Pizzaria Delícia', cuisine: 'Italiana', rating: 4.5, deliveryTime: '30-45 min', trending: true, image: '/api/placeholder/500/300' },
        { id: 2, name: 'Sushi Express', cuisine: 'Japonesa', rating: 4.7, deliveryTime: '40-55 min', trending: false, image: '/api/placeholder/500/300' },
        { id: 3, name: 'Burger King', cuisine: 'Fast Food', rating: 4.2, deliveryTime: '20-35 min', trending: true, image: '/api/placeholder/500/300' },
        { id: 4, name: 'Taco Loco', cuisine: 'Mexicana', rating: 4.3, deliveryTime: '35-50 min', trending: false, image: '/api/placeholder/500/300' },
        { id: 5, name: 'Veggie Paradise', cuisine: 'Vegetariana', rating: 4.6, deliveryTime: '25-40 min', trending: true, image: '/api/placeholder/500/300' },
      ];
      setRestaurants(mockRestaurants);
    };
    fetchRestaurants();
  }, []);

  const categories = ['Todos', 'Italiana', 'Japonesa', 'Fast Food', 'Mexicana', 'Vegetariana'];

  const filteredRestaurants = restaurants.filter(restaurant =>
    (activeCategory === 'Todos' || restaurant.cuisine === activeCategory) &&
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (restaurant) => {
    setCartItems([...cartItems, { ...restaurant, quantity: 1 }]);
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="bg-gray-800 p-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-500">DeliveryApp</h1>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-purple-400 transition duration-300">Início</a>
            <a href="#" className="hover:text-purple-400 transition duration-300">Restaurantes</a>
            <a href="#" className="hover:text-purple-400 transition duration-300">Pedidos</a>
            <a href="#" className="hover:text-purple-400 transition duration-300">Conta</a>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="relative text-purple-500" onClick={() => setIsCartOpen(!isCartOpen)}>
              <ShoppingCart />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItems.length}
                </span>
              )}
            </button>
            <button className="md:hidden text-purple-500" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <ImageCarousel images={carouselImages} />
        </section>

        <section className="mb-16 text-center">
          <h2 className="text-5xl font-bold mb-6 text-purple-400">Descubra Sabores Incríveis</h2>
          <p className="text-xl text-gray-400 mb-8">Encontre os melhores restaurantes da sua região</p>
          <div className="flex items-center justify-center bg-gray-800 rounded-full shadow-lg max-w-2xl mx-auto">
            <MapPin className="ml-6 text-purple-500" />
            <input type="text" placeholder="Digite seu endereço para entrega" className="flex-grow p-4 bg-transparent focus:outline-none text-gray-100" />
            <button className="bg-purple-500 text-white px-8 py-4 rounded-full hover:bg-purple-600 transition duration-300">Buscar</button>
          </div>
        </section>

        <section className="mb-16">
          <h3 className="text-3xl font-semibold mb-6 text-center text-purple-400">Categorias</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full ${activeCategory === category ? 'bg-purple-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'} transition duration-300`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-3xl font-semibold text-purple-400">Restaurantes</h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar restaurantes..."
                className="pl-10 pr-4 py-2 rounded-full bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-100"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2 text-gray-400" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRestaurants.map(restaurant => (
              <div key={restaurant.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition duration-300">
                <img src={restaurant.image} alt={restaurant.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h4 className="text-2xl font-semibold mb-2 text-purple-400">{restaurant.name}</h4>
                  <p className="text-gray-400 mb-4">{restaurant.cuisine}</p>
                  <div className="flex items-center mb-4">
                    <Star className="text-yellow-400 mr-1" />
                    <span className="text-yellow-400 mr-4">{restaurant.rating}</span>
                    <Clock className="text-gray-400 mr-1" size={16} />
                    <span className="text-gray-400">{restaurant.deliveryTime}</span>
                  </div>
                  <button className="w-full bg-purple-500 text-white py-3 rounded-full hover:bg-purple-600 transition duration-300" onClick={() => addToCart(restaurant)}>
                    Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 p-4 text-center text-gray-400">
        <p>&copy; 2024 DeliveryApp. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default HomePage;
