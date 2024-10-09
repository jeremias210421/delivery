import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Star, Clock, TrendingUp, Menu, X, ShoppingCart } from 'lucide-react';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [restaurants, setRestaurants] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const fetchRestaurants = async () => {
      // Simula uma chamada de API
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
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative text-purple-500"
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
              <ShoppingCart />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItems.length}
                </span>
              )}
            </motion.button>
            <button className="md:hidden text-purple-500" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="bg-gray-800 text-gray-100 p-4 md:hidden"
          >
            <ul className="space-y-2">
              <li><a href="#" className="block py-2 hover:text-purple-400 transition duration-300">Início</a></li>
              <li><a href="#" className="block py-2 hover:text-purple-400 transition duration-300">Restaurantes</a></li>
              <li><a href="#" className="block py-2 hover:text-purple-400 transition duration-300">Pedidos</a></li>
              <li><a href="#" className="block py-2 hover:text-purple-400 transition duration-300">Conta</a></li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="container mx-auto px-4 py-12">
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-5xl font-bold mb-6 text-purple-400">Descubra Sabores Incríveis</h2>
          <p className="text-xl text-gray-400 mb-8">Encontre os melhores restaurantes da sua região</p>
          <div className="flex items-center justify-center bg-gray-800 rounded-full shadow-lg max-w-2xl mx-auto">
            <MapPin className="ml-6 text-purple-500" />
            <input
              type="text"
              placeholder="Digite seu endereço para entrega"
              className="flex-grow p-4 bg-transparent focus:outline-none text-gray-100"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-500 text-white px-8 py-4 rounded-full hover:bg-purple-600 transition duration-300"
            >
              Buscar
            </motion.button>
          </div>
        </motion.section>

        <section className="mb-16">
          <h3 className="text-3xl font-semibold mb-6 text-center text-purple-400">Categorias</h3>
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {categories.map(category => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full ${
                  activeCategory === category
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                } transition duration-300`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
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
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <AnimatePresence>
              {filteredRestaurants.map(restaurant => (
                <motion.div
                  key={restaurant.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
                >
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
                    {restaurant.trending && (
                      <div className="flex items-center text-purple-400 mb-4">
                        <TrendingUp className="mr-1" size={16} />
                        <span>Trending</span>
                      </div>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-purple-500 text-white py-3 rounded-full hover:bg-purple-600 transition duration-300"
                      onClick={() => addToCart(restaurant)}
                    >
                      Adicionar ao Carrinho
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>
      </main>

      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-96 bg-gray-800 shadow-lg p-6 z-50"
          >
            <h2 className="text-3xl font-bold mb-6 text-purple-400">Seu Carrinho</h2>
            {cartItems.length === 0 ? (
              <p className="text-gray-400">Seu carrinho está vazio.</p>
            ) : (
              <ul className="space-y-4">
                {cartItems.map(item => (
                  <li key={item.id} className="flex justify-between items-center pb-4 border-b border-gray-700">
                    <span className="text-gray-100">{item.name}</span>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-300 transition duration-300">
                      Remover
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 w-full bg-purple-500 text-white py-3 rounded-full hover:bg-purple-600 transition duration-300"
              onClick={() => setIsCartOpen(false)}
            >
              Fechar Carrinho
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="bg-gray-800 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h4 className="text-2xl font-semibold mb-4 text-purple-400">Sobre nós</h4>
              <p>DeliveryApp é sua plataforma para descobrir e pedir as melhores comidas da sua região.</p>
            </div>
            <div>
              <h4 className="text-2xl font-semibold mb-4 text-purple-400">Links rápidos</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-purple-400 transition duration-300">Termos de Serviço</a></li>
                <li><a href="#" className="hover:text-purple-400 transition duration-300">Política de Privacidade</a></li>
                <li><a href="#" className="hover:text-purple-400 transition duration-300">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-2xl font-semibold mb-4 text-purple-400">Siga-nos</h4>
              <div className="flex space-x-4">
                {/* Adicione ícones de redes sociais aqui */}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
