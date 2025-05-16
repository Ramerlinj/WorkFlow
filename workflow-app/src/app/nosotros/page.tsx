'use client';
import { useState } from 'react';

const SobreNosotros = () => {
  const [activeTab, setActiveTab] = useState('vision');



  const valores = [
    'Excelencia',
    'Colaboración',
    'Integridad',
    'Innovación',
    'Liderazgo'
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">Sobre Nosotros</h1>
        
        <p className="text-sm text-slate-700 mb-4 max-w-3xl mx-auto">
          Nos enorgullece ser parte de su historia de éxito, construyendo juntos un futuro lleno de posibilidades y logros compartidos.
          Esta filosofía nos impulsa a reinventarnos constantemente, adaptándonos a un entorno dinámico sin perder nuestra esencia ni
          los valores que nos definen.
        </p>
      </div>

      {/* Navigation tabs */}
      <div className="flex justify-between gap-4 mb-8">
        <button 
          className={`flex-1 py-3 px-4 text-lg font-medium rounded ${activeTab === 'mision' ? 'bg-button-primary text-white' : 'border border-slate-300 text-slate-800'}`}
          onClick={() => setActiveTab('mision')}
        >
          Misión
        </button>
        
        <button 
          className={`flex-1 py-3 px-4 text-lg font-medium rounded ${activeTab === 'vision' ? 'bg-button-primary text-white' : 'border border-slate-300 text-slate-800'}`}
          onClick={() => setActiveTab('vision')}
        >
          Visión
        </button>
        
        <button 
          className={`flex-1 py-3 px-4 text-lg font-medium rounded ${activeTab === 'valores' ? 'bg-button-primary text-white' : 'border border-slate-300 text-slate-800'}`}
          onClick={() => setActiveTab('valores')}
        >
          Valores
        </button>
      </div>

      {/* Content section */}
      <div className="grid grid-cols-1 gap-6">
        {activeTab === 'mision' && (
          <div className="bg-button-primary text-white p-6 rounded shadow-md flex items-center">
            <p className="text-sm">
              Crear experiencias excepcionales que potencien el éxito de nuestros clientes, mediante soluciones innovadoras y de máxima calidad, generando constantemente valor y satisfacción con tecnología de vanguardia y compromiso con la calidad.
            </p>
          </div>
        )}

        {activeTab === 'vision' && (
          <div className="border   border-slate-300 p-6 rounded shadow-md flex items-center">
            <p className="text-sm text-tertiary text-center  ">
              Aspiramos a ser líderes globales, marcando nuevos estándares de excelencia e innovación, con soluciones que transformen positivamente y generen impactos favorables en la sociedad.
            </p>
          </div>
        )}

        {activeTab === 'valores' && (
          <div className=" text-white bg-button-primary p-6 rounded shadow-md flex flex-col justify-center">
            <ul className="space-y-2">
              {valores.map((valor, index) => (
                <li key={index} className="text-center">{valor}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SobreNosotros;