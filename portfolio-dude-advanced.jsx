import React, { useState } from 'react';
import { Play, Volume2, VolumeX, MessageCircle } from 'lucide-react';

export default function DudePortfolio() {
  const [isMuted, setIsMuted] = useState(true);
  const [hoveredPanel, setHoveredPanel] = useState(null);

  // ======================================
  // 📸 GUÍA DE IMÁGENES - EDITA AQUÍ
  // ======================================
  // Reemplaza estas URLs con tus propias imágenes
  // Puedes usar URLs externas o importar imágenes locales
  // Formato recomendado: JPG/PNG, min 600x400px
  
  const backgroundImage = 'E:\\Portfolio\\assets\\hatsune-miku-5120x2880-25942.jpg'; // Imagen de fondo (Miku)
  
  const panels = [
    {
      id: 'trolleo',
      title: 'Trolleo',
      icon: '😂',
      // EDITA ESTA URL - Reemplaza con tu imagen de trolleo
      image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=400&fit=crop',
      color: 'from-purple-600 to-pink-600',
      description: 'Contenido de humor y bromas'
    },
    {
      id: 'irl',
      title: 'IRL',
      icon: '🌍',
      // EDITA ESTA URL - Reemplaza con tu imagen IRL (In Real Life)
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop',
      color: 'from-blue-600 to-cyan-600',
      description: 'Contenido en vivo y experimentos'
    },
    {
      id: 'minecraft',
      title: 'Minecraft 3D',
      icon: '⛏️',
      // EDITA ESTA URL - Reemplaza con tu imagen de Minecraft
      image: 'https://images.unsplash.com/photo-1538481143235-5d1d4ee50631?w=600&h=400&fit=crop',
      color: 'from-green-600 to-emerald-600',
      description: 'Builds épicos en Minecraft'
    },
    {
      id: 'gaming',
      title: 'Gaming',
      icon: '🎮',
      // EDITA ESTA URL - Reemplaza con tu imagen de gaming
      image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=600&h=400&fit=crop',
      color: 'from-red-600 to-orange-600',
      description: 'Gameplay y reviews'
    },
    {
      id: 'entretenimiento',
      title: 'Entretenimiento',
      icon: '🎬',
      // EDITA ESTA URL - Reemplaza con tu imagen de entretenimiento
      image: 'https://images.unsplash.com/photo-1489749798305-4fea3ba63d60?w=600&h=400&fit=crop',
      color: 'from-yellow-600 to-orange-600',
      description: 'Contenido entretenido'
    },
    {
      id: 'cliente',
      title: 'Trabajo de Cliente',
      icon: '💼',
      // EDITA ESTA URL - Reemplaza con tu imagen de trabajos para clientes
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
      color: 'from-indigo-600 to-purple-600',
      description: 'Proyectos profesionales'
    },
    {
      id: 'contacto',
      title: 'Contacto',
      icon: '💬',
      // EDITA ESTA URL - Logo o imagen para Discord
      image: 'https://images.unsplash.com/photo-1611339555312-e607c90352fd?w=600&h=400&fit=crop',
      color: 'from-blue-600 to-indigo-600',
      description: 'Únete a mi servidor',
      isDiscord: true,
      discordLink: 'https://discord.gg/tuservidordiscord' // ← CAMBIA ESTO CON TU LINK DE DISCORD
    }
  ];

  return (
    <div className="min-h-screen w-full overflow-hidden">
      {/* Background container */}
      <div 
        className="fixed inset-0 w-full h-full -z-10"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen w-full">
        {/* SECCIÓN 1: VIDEO DE PRESENTACIÓN */}
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
          {/* Video container */}
          <div className="absolute inset-0 w-full h-full">
            {/* 
              ======================================
              🎥 GUÍA DE VIDEO - EDITA AQUÍ
              ======================================
              Reemplaza esta URL con tu propio video MP4
              El video DEBE estar en formato MP4
              URL recomendada: un video tuyo en loop
              Ejemplo de cómo subir:
              1. Carga tu video en un servicio como Streamable, Vimeo o tu servidor
              2. Copia la URL del video MP4
              3. Pégala en el atributo src del <video>
              
              Formato del video recomendado:
              - Resolución: 1920x1080 (Full HD)
              - Codec: H.264
              - Duración: 10-30 segundos para loop
            */}
            <video
              autoPlay
              muted={isMuted}
              loop
              playsInline
              className="w-full h-full object-cover"
              src="https://videos.pexels.com/video-files/3587519/3587519-sd_640_360_30fps.mp4"
            />
            
            {/* Dark overlay on video */}
            <div className="absolute inset-0 bg-black/30"></div>
          </div>

          {/* Presentation text */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="text-center text-white px-6">
              <h1 className="text-7xl md:text-8xl font-black mb-4 drop-shadow-lg">
                Soy <span style={{ color: '#48ADAD' }}>Dude !</span>
              </h1>
              <p className="text-2xl md:text-4xl font-bold drop-shadow-lg mb-8">
                y este es mi trabajo...
              </p>
              <div className="flex justify-center gap-4">
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className="px-6 py-3 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold hover:bg-white/30 transition flex items-center gap-2"
                >
                  {isMuted ? <VolumeX /> : <Volume2 />}
                  {isMuted ? 'Sin audio' : 'Con audio'}
                </button>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 animate-bounce">
            <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* SECCIÓN 2: PANELES CON BLUR Y HOVER */}
        <section className="relative min-h-screen w-full py-20 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Title */}
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black text-white mb-4 drop-shadow-lg">
                Mi Portafolio
              </h2>
              <p className="text-xl text-white/80 drop-shadow-lg">
                Pasa el cursor sobre cada panel para ver más
              </p>
            </div>

            {/* Panels grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {panels.map((panel) => (
                <div
                  key={panel.id}
                  onMouseEnter={() => setHoveredPanel(panel.id)}
                  onMouseLeave={() => setHoveredPanel(null)}
                  className={`relative h-80 rounded-2xl overflow-hidden cursor-pointer group transition-all duration-500 ${
                    panel.isDiscord ? 'lg:col-span-1' : ''
                  }`}
                >
                  {/* Background image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{
                      backgroundImage: `url('${panel.image}')`,
                    }}
                  />

                  {/* Blur overlay - activo por defecto, se quita en hover */}
                  <div 
                    className={`absolute inset-0 backdrop-blur-md bg-black/40 transition-all duration-500 ${
                      hoveredPanel === panel.id ? 'backdrop-blur-0 bg-black/0' : ''
                    }`}
                  />

                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${panel.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

                  {/* Content - visible by default */}
                  <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${
                    hoveredPanel === panel.id ? 'opacity-0' : 'opacity-100'
                  }`}>
                    <div className="text-6xl mb-4">{panel.icon}</div>
                    <h3 className="text-2xl font-black text-white text-center drop-shadow-lg">
                      {panel.title}
                    </h3>
                  </div>

                  {/* Hover content - aparece al pasar el cursor */}
                  <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${
                    hoveredPanel === panel.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="text-center px-6">
                      <h3 className="text-3xl font-black text-white mb-3 drop-shadow-lg">
                        {panel.title}
                      </h3>
                      <p className="text-white text-lg mb-6 drop-shadow-lg">
                        {panel.description}
                      </p>

                      {panel.isDiscord ? (
                        // Discord button
                        <a
                          href={panel.discordLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-bold transition-all duration-300 transform hover:scale-105"
                        >
                          <MessageCircle className="w-5 h-5" />
                          Únete al servidor
                        </a>
                      ) : (
                        // Default button
                        <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/20 backdrop-blur-md border border-white text-white font-bold hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                          <Play className="w-5 h-5" />
                          Ver más
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Border accent */}
                  <div style={{ borderColor: '#48ADAD' }} className="absolute inset-0 border-2 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECCIÓN 3: Footer */}
        <section style={{ backgroundColor: '#1b1b1b' }} className="relative w-full py-12 border-t" style={{ borderTopColor: '#48ADAD' }}>
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-white/60 text-sm">
              © 2024 Dude Studios. Todos los derechos reservados.
            </p>
            <p style={{ color: '#48ADAD' }} className="text-sm mt-2">
              Diseño personalizado para creadores de contenido
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
