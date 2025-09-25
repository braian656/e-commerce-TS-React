export default function HeroPopularProducts() {
  return (
    <section className="py-12">
      <div className="flex max-w-6xl sm:mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Tarjeta 1 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300">
            <img
              src="../images/images-hero/zapatillas.jpg"
              alt="Zapatillas urbanas"
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Zapatillas Urbanas
              </h3>
              <p className="text-gray-600 mt-2">
                Comodidad y estilo para tu día a día.
              </p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-lg font-bold text-[#2b2c30]">
                  $59.99
                </span>
                <button className="bg-[#2b2c30] text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">
                  Comprar
                </button>
              </div>
            </div>
          </div>

          {/* Tarjeta 2 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300">
            <img
              src="../images/images-hero/auricular.webp"
              alt="Auriculares inalámbricos"
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Auriculares Inalámbricos
              </h3>
              <p className="text-gray-600 mt-2">
                Disfrutá de tu música con la mejor calidad.
              </p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-lg font-bold text-[#2b2c30]">
                  $89.99
                </span>
                <button className="bg-[#2b2c30] text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">
                  Comprar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
