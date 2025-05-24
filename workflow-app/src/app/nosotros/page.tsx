import React from 'react';

const SobreNosotros: React.FC = () => {
  const valores = [
    'Excelencia',
    'Colaboración',
    'Integridad',
    'Innovación',
    'Liderazgo'
  ];

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-800 mb-8">Sobre Nosotros</h1>
        
        <p className="text-base text-[#214E83] mb-4 max-w-4xl mx-auto leading-relaxed">
          Nos enorgullece ser parte de su historia de éxito, construyendo juntos un futuro lleno de posibilidades y logros compartidos.
          Esta filosofía nos impulsa a reinventarnos constantemente, adaptándonos a un entorno dinámico sin perder nuestra esencia ni
          los valores que nos definen.
        </p>
      </div>

      {/* Content sections */}
      <div className="flex justify-center gap-8">
        {/* Misión */}
        <div className="max-w-sm flex-1">
          <div className="bg-[#214E83] text-white py-3 px-8 rounded-lg text-lg font-medium text-center mb-2">
            Misión
          </div>
          <div className="bg-[#214E83] text-white p-8 rounded-lg shadow-lg">
            <p className="text-sm leading-relaxed text-center">
              Crear experiencias excepcionales que generen valor sostenible para nuestros clientes, mediante soluciones innovadoras y servicio personalizado, superando constantemente las expectativas con tecnología de vanguardia y compromiso con la calidad.
            </p>
          </div>
        </div>

        {/* Visión */}
        <div className="max-w-sm flex-1">
          <div className="border-2 border-gray-300 text-[#214E83] py-3 px-8 rounded-lg text-lg font-medium text-center bg-white mb-2">
            Visión
          </div>
          <div className="border-2 border-gray-300 bg-white p-8 rounded-lg shadow-lg">
            <p className="text-sm text-[#214E83] leading-relaxed text-center">
              Aspiramos a ser líderes globales, marcando nuevos estándares de excelencia e innovación, con soluciones que impacten cambios positivos y sostenibles en la sociedad.
            </p>
          </div>
        </div>

        {/* Valores */}
        <div className="max-w-sm flex-1">
          <div className="bg-[#214E83] text-white py-3 px-8 rounded-lg text-lg font-medium text-center mb-2">
            Valores
          </div>
          <div className="bg-[#214E83] text-white p-8 rounded-lg shadow-lg">
            <div className="space-y-3">
              {valores.map((valor, index) => (
                <div key={index} className="text-sm text-center py-1">
                  {valor}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SobreNosotros;