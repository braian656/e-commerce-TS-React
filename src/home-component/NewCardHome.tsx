export default function Features() {
  const features = [
    {
      title: "Envíos rápidos",
      desc: "Recibí tu pedido en 24/48hs en todo el país.",
      icon: "🚚",
    },
    {
      title: "Entrega inmediata",
      desc: "Productos con stock listo para despacho.",
      icon: "⚡",
    },
    {
      title: "Pagá como quieras",
      desc: "Aceptamos todas las tarjetas y medios de pago.",
      icon: "💳",
    },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto p-6">
      {features.map((f, i) => (
        <div
          key={i}
          className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-lg transition"
        >
          <span className="text-4xl mb-4">{f.icon}</span>
          <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
          <p className="text-gray-600 text-sm">{f.desc}</p>
        </div>
      ))}
    </section>
  );
}
