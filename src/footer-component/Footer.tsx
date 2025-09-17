function Footer (){
    console.log('FOOTER')

    return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">ShopX</h2>
          <p className="text-sm text-gray-400">
            Tu e-commerce de confianza. Encuentra los mejores productos al mejor
            precio con envíos rápidos y seguros.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Navegación</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Inicio</a></li>
            <li><a href="#" className="hover:text-white">Tienda</a></li>
            <li><a href="#" className="hover:text-white">Ofertas</a></li>
            <li><a href="#" className="hover:text-white">Contacto</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Atención al cliente</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Preguntas frecuentes</a></li>
            <li><a href="#" className="hover:text-white">Política de devoluciones</a></li>
            <li><a href="#" className="hover:text-white">Envíos y entregas</a></li>
            <li><a href="#" className="hover:text-white">Soporte</a></li>
          </ul>
        </div>

        {/* Social & Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Síguenos</h3>
          <div className="flex space-x-4 mb-4">
            <a href="#" className="hover:text-white">🐦</a>
            <a href="#" className="hover:text-white">📘</a>
            <a href="#" className="hover:text-white">📸</a>
            <a href="#" className="hover:text-white">🎥</a>
          </div>
          <p className="text-sm text-gray-400">Email: soporte@shopx.com</p>
          <p className="text-sm text-gray-400">Tel: +54 11 1234 5678</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} ShopX. Todos los derechos reservados.
      </div>
    </footer>
  );
}


export default Footer