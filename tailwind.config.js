
export default {
  content: [
    "./index.html",
    './src/**/*.{js,jsx,ts,tsx}', // Ajusta estas rutas si es necesario
  ],
  theme: {
    extend: {
      colors: {
        modal: '#31363d',
        text2: 'hsl(228deg 2.24% 43.73%)',
        anchor: '#e0e1e5',
        title: '#17281b',  // Verde personalizado
        text: '#b0b0b0',   // Gris claro personalizado
        // button: '#2b2c30', // Naranja personalizado
        button:'#c8222f',
        // body: '#dfdfdf',   // Gris claro personalizado
        body: '#f2f2f2',
        // button2: '#e4bc2c', // amarillo oscuro personalizado
        button2: '#232323',
        buttonBrillant : 'linear-gradient(135deg, #000000,%20#ffcc00)',
        buttonHover: '#c79f22',
        buttonPagination:"#ef4444",
        bgGradient: 'linear-gradient(90deg, rgba(46,33,34,1) 28%, rgba(35,35,35,1) 55%, rgba(51,51,51,1) 82%)'

      },
      spacing: {
        '128': '32rem',    // Añadir nuevo espaciado
      },
      fontFamily: {
        custom: ['"Roboto"', 'sans-serif'], // Fuente personalizada
      },
    },
  },
  plugins: [],
}
