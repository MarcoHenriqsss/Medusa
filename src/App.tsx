import React, { useState, useEffect } from 'react';
import { Instagram, Play, X, ChevronLeft, ChevronRight, Waves, Sparkles, Clock, Zap, Eye } from 'lucide-react';


const artworks = [
  {
    id: 1,
    title: "Medusa",
    image: "https://i.imgur.com/F3s332I.png", // Substituir pela URL real do imgur
    description: "Uma representação etérea de uma água-viva em tons roxos"
  },
  {
    id: 2,
    title: "Bioluminescência", 
    image: "https://i.imgur.com/k0HdLrI.png", // Substituir pela URL real do imgur Dança Aquática
    description: "Movimento fluido capturado em cores profundas"
  },
  {
    id: 3,
    title: "Dança Aquática",
    image: "https://i.imgur.com/lRldbJS.png", // Substituir pela URL real do imgur
    description: "A dança de varias Medusas"
  },
  {
    id: 4,
    title: "Serenidade Marinha",
    image: "https://i.imgur.com/5u1y7rV.png", // Substituir pela URL real do imgur
    description: "Tranquilidade dos oceanos em pinceladas suaves"
  },
  {
    id: 5,
    title: "Confecção Subaquática",
    image: "https://i.imgur.com/zLMoHz5.png", // Substituir pela URL real do imgur
    description: "Criação e leveza em cada pincelada"
  },
  {
    id: 6,
    title: "Jardim de Cristal",
    image: "https://i.imgur.com/30qsclE.png", // Substituir pela URL real do imgur
    description: "Delicadeza translúcida das águas-vivas"
  }
];

interface LightboxProps {
  isOpen: boolean;
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ isOpen, currentIndex, onClose, onNext, onPrev }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen) return null;

  const currentArtwork = artworks[currentIndex];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
      <div className="relative max-w-4xl max-h-full">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-cyan-400 transition-colors duration-200"
        >
          <X size={32} />
        </button>
        
        <div className="relative">
          <img
            src={currentArtwork.image}
            alt={currentArtwork.title}
            className="max-w-full max-h-[80vh] object-contain rounded-lg"
          />
          
          <button
            onClick={onPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-cyan-400 transition-colors duration-200"
          >
            <ChevronLeft size={48} />
          </button>
          
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-cyan-400 transition-colors duration-200"
          >
            <ChevronRight size={48} />
          </button>
        </div>
        
        <div className="text-center mt-4 text-white">
          <h3 className="text-2xl font-bold mb-2">{currentArtwork.title}</h3>
          <p className="text-gray-300">{currentArtwork.description}</p>
          <p className="text-sm text-gray-400 mt-2">
            {currentIndex + 1} de {artworks.length}
          </p>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPlayer, setShowPlayer] = useState(true);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
  const script = document.createElement('script');
  script.src = 'https://www.tiktok.com/embed.js';
  script.async = true;
  document.body.appendChild(script);

  return () => {
    document.body.removeChild(script);
  };
}, []);


  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % artworks.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + artworks.length) % artworks.length);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-slate-900/95 backdrop-blur-sm' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Waves className="text-cyan-400" size={28} />
              <span className="text-white font-bold text-xl">Ana Clara Cruz</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <button
                onClick={() => scrollToSection('home')}
                className="text-white hover:text-cyan-400 transition-colors duration-200"
              >
                Início
              </button>
              <button
                onClick={() => scrollToSection('gallery')}
                className="text-white hover:text-cyan-400 transition-colors duration-200"
              >
                Galeria
              </button>
              <button
                onClick={() => scrollToSection('evolution')}
                className="text-white hover:text-cyan-400 transition-colors duration-200"
              >
                Evolução
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-white hover:text-cyan-400 transition-colors duration-200"
              >
                Sobre
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        id="home" 
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.6), rgba(6, 182, 212, 0.2)), url('https://images.pexels.com/photos/1076758/pexels-photo-1076758.jpeg?auto=compress&cs=tinysrgb&w=3840&h=2160&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/10 to-slate-900/70"></div>
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-cyan-400/30 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${Math.random() * 4 + 2}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="mb-6 flex justify-center">
            <Sparkles className="text-cyan-400 animate-pulse" size={48} />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in drop-shadow-2xl">
            Ana Clara Cruz
          </h1>
          <p className="text-xl md:text-2xl text-cyan-200 mb-8 animate-fade-in-delay-1 drop-shadow-lg">
            Artista Visual • Pinturas Aquáticas
          </p>
          <p className="text-lg text-gray-200 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-delay-2 drop-shadow-md">
            Explorando a beleza etérea das águas-vivas através da arte, capturando a magia 
            bioluminescente dos oceanos em cada pincelada.
          </p>
          <button
            onClick={() => scrollToSection('gallery')}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-2xl animate-fade-in-delay-3"
          >
            Descobrir Arte
          </button>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Galeria Aquática
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Uma coleção de obras inspiradas na fascinante vida marinha, 
              especialmente nas misteriosas e belas águas-vivas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artworks.map((artwork, index) => (
              <div
                key={artwork.id}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                onClick={() => openLightbox(index)}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-slate-800">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white font-bold text-xl mb-2">{artwork.title}</h3>
                      <p className="text-gray-300 text-sm">{artwork.description}</p>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                      <Sparkles className="text-white" size={20} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Evolution Section */}
      <section id="evolution" className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              A Jornada Evolutiva das Águas-vivas
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Descubra a fascinante história de 500 milhões de anos dessas criaturas ancestrais 
              que inspiram a arte de Ana Clara Cruz.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Timeline */}
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-400 to-purple-600 rounded-full"></div>

              {/* Timeline items */}
              <div className="space-y-16">
                {/* 500 Million Years Ago */}
                <div className="relative flex items-center">
                  <div className="w-1/2 pr-8 text-right">
                    <div className="bg-slate-800 p-6 rounded-2xl shadow-xl border border-cyan-400/20">
                      <div className="flex items-center justify-end mb-4">
                        <Clock className="text-cyan-400 mr-2" size={24} />
                        <h3 className="text-2xl font-bold text-white">500 Milhões de Anos</h3>
                      </div>
                      <p className="text-gray-300 leading-relaxed">
                        As primeiras águas-vivas surgem nos oceanos primitivos, tornando-se um dos 
                        primeiros animais multicelulares do planeta. Elas já possuíam a capacidade 
                        de se mover ativamente através da água.
                      </p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-cyan-400 rounded-full border-4 border-slate-900"></div>
                  <div className="w-1/2 pl-8">
                    <img
                      src="https://media.istockphoto.com/id/1193815215/pt/foto/an-elegant-but-dangerous-jellyfish-hovers-in-the-weightlessness-of-the-ocean-beauty-and-danger.jpg?s=612x612&w=0&k=20&c=p2u2MK_fjGqf6nksa46aEODnqDon68c8mwllsFFzunI="
                      alt="Água-viva ancestral"
                      className="w-full h-48 object-cover rounded-2xl shadow-xl"
                    />
                  </div>
                </div>

                {/* 400 Million Years Ago */}
                <div className="relative flex items-center">
                  <div className="w-1/2 pr-8">
                    <img
                      src="https://images.unsplash.com/photo-1508311603478-ce574376c3cf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8amVsbHlmaXNofGVufDB8fDB8fHww"
                      alt="Evolução das águas-vivas"
                      className="w-full h-48 object-cover rounded-2xl shadow-xl"
                    />
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-purple-500 rounded-full border-4 border-slate-900"></div>
                  <div className="w-1/2 pl-8">
                    <div className="bg-slate-800 p-6 rounded-2xl shadow-xl border border-purple-500/20">
                      <div className="flex items-center mb-4">
                        <Zap className="text-purple-500 mr-2" size={24} />
                        <h3 className="text-2xl font-bold text-white">400 Milhões de Anos</h3>
                      </div>
                      <p className="text-gray-300 leading-relaxed">
                        Desenvolvimento dos primeiros sistemas nervosos simples e células 
                        especializadas para captura de presas. As águas-vivas começam a 
                        desenvolver suas características tentáculos urticantes.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 200 Million Years Ago */}
                <div className="relative flex items-center">
                  <div className="w-1/2 pr-8 text-right">
                    <div className="bg-slate-800 p-6 rounded-2xl shadow-xl border border-cyan-400/20">
                      <div className="flex items-center justify-end mb-4">
                        <Eye className="text-cyan-400 mr-2" size={24} />
                        <h3 className="text-2xl font-bold text-white">200 Milhões de Anos</h3>
                      </div>
                      <p className="text-gray-300 leading-relaxed">
                        Surgimento das primeiras espécies com bioluminescência - a capacidade 
                        mágica de produzir luz própria que tanto fascina artistas como Ana Clara. 
                        Esta adaptação revolucionária permitiu comunicação e defesa nas profundezas.
                      </p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-cyan-400 rounded-full border-4 border-slate-900"></div>
                  <div className="w-1/2 pl-8">
                    <img
                      src="https://images.unsplash.com/photo-1508138119323-5452bd81d53d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGplbGx5ZmlzaHxlbnwwfHwwfHx8MA%3D%3D"
                      alt="Bioluminescência"
                      className="w-full h-48 object-cover rounded-2xl shadow-xl"
                    />
                  </div>
                </div>

                {/* Present Day */}
                <div className="relative flex items-center">
                  <div className="w-1/2 pr-8">
                    <img
                      src="https://images.unsplash.com/photo-1562720053-82d9426daa0d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzM4fHxqZWxseWZpc2h8ZW58MHx8MHx8fDA%3D"
                      alt="Águas-vivas modernas"
                      className="w-full h-48 object-cover rounded-2xl shadow-xl"
                    />
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full border-4 border-slate-900"></div>
                  <div className="w-1/2 pl-8">
                    <div className="bg-slate-800 p-6 rounded-2xl shadow-xl border border-gradient-to-r from-cyan-400/20 to-purple-600/20">
                      <div className="flex items-center mb-4">
                        <Sparkles className="text-cyan-400 mr-2" size={24} />
                        <h3 className="text-2xl font-bold text-white">Dias Atuais</h3>
                      </div>
                      <p className="text-gray-300 leading-relaxed">
                        Hoje existem mais de 2.000 espécies conhecidas de águas-vivas, desde 
                        minúsculas criaturas de poucos milímetros até gigantes com tentáculos 
                        de mais de 30 metros. Elas continuam a inspirar artistas, cientistas 
                        e admiradores da natureza ao redor do mundo.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fun Facts */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-cyan-500/10 to-purple-600/10 p-6 rounded-2xl border border-cyan-400/20">
                <div className="text-center">
                  <div className="bg-cyan-400/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="text-cyan-400" size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Sobreviventes Ancestrais</h4>
                  <p className="text-gray-300 text-sm">
                    As águas-vivas existem há mais tempo que os dinossauros, tubarões e 
                    praticamente todos os outros animais complexos da Terra.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500/10 to-cyan-600/10 p-6 rounded-2xl border border-purple-500/20">
                <div className="text-center">
                  <div className="bg-purple-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="text-purple-500" size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Mestres da Simplicidade</h4>
                  <p className="text-gray-300 text-sm">
                    Sem cérebro, coração ou sangue, as águas-vivas são 95% água e ainda assim 
                    são predadores eficientes e navegadores oceânicos experientes.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-cyan-500/10 to-purple-600/10 p-6 rounded-2xl border border-cyan-400/20">
                <div className="text-center">
                  <div className="bg-cyan-400/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="text-cyan-400" size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Luzes Vivas</h4>
                  <p className="text-gray-300 text-sm">
                    A bioluminescência das águas-vivas inspirou tecnologias modernas e 
                    continua a fascinar artistas como Ana Clara em suas criações.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-800">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Sobre a Artista
                </h2>
                <div className="space-y-6 text-gray-300 leading-relaxed">
                  <p className="text-lg">
                    Olá! Sou Ana Clara Cruz, uma artista apaixonada pela beleza misteriosa 
                    dos oceanos e, especialmente, pelas águas-vivas - essas criaturas etéreas 
                    que dançam nas profundezas marinhas.
                  </p>
                  <p>
                    Minha jornada artística começou com a fascinação pela bioluminescência 
                    e pelos movimentos fluidos dessas criaturas ancestrais. Cada pintura 
                    é uma tentativa de capturar não apenas sua aparência, mas a sensação 
                    de tranquilidade e mistério que elas transmitem.
                  </p>
                  <p>
                    Através das minhas telas, busco compartilhar a conexão profunda que 
                    sinto com o mundo aquático, transformando essa paixão em arte que 
                    toca a alma e desperta a curiosidade sobre a vida marinha.
                  </p>
                </div>
                
                <div className="flex space-x-6 mt-8">
                  <a
                    href="https://instagram.com/_sco.nd_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <Instagram size={20} />
                    <span>@_sco.nd_</span>
                  </a>
                  <a
                    href="https://tiktok.com/@_scond_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-gradient-to-r from-slate-800 to-slate-700 text-white px-6 py-3 rounded-full hover:from-slate-700 hover:to-slate-600 transition-all duration-300 transform hover:scale-105 shadow-lg border border-cyan-400/30"
                  >
                    <Play size={20} />
                    <span>Lives no TikTok</span>
                  </a>
                </div>
              </div>
              
              <div className="order-1 lg:order-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-purple-600/20 rounded-3xl transform rotate-6"></div>
                  <img
                    src="https://i.imgur.com/Eav1bvr.png" 
                    // Substituir pela foto real da Ana Clara
                    alt="Ana Clara Cruz"
                    className="relative z-10 w-full h-96 lg:h-[500px] object-cover rounded-3xl shadow-2xl"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-cyan-400 to-purple-600 p-4 rounded-2xl shadow-lg">
                    <Waves className="text-white" size={32} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 border-t border-slate-800">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <Waves className="text-cyan-400" size={24} />
            <span className="text-white font-bold text-lg">Ana Clara Cruz</span>
          </div>
          <p className="text-gray-400 mb-6">
            Transformando a magia dos oceanos em arte
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="https://instagram.com/_sco.nd_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-400 transition-colors duration-200"
            >
              <Instagram size={24} />
            </a>
            <a
              href="https://tiktok.com/@_scond_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
            >
              <Play size={24} />
            </a>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800">
            <p className="text-gray-500 text-sm">
              © 2025 Ana Clara Cruz. Todos os direitos reservados.
              Feito por MHdeveloper.
            </p>
          </div>
        </div>
      </footer>

      {/* Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        currentIndex={currentImageIndex}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
      />
      
    
// [CÓDIGO ORIGINAL INCLUÍDO AQUI INALTERADO ACIMA DO RETURN]

{!showPlayer && (
  <button
    className="fixed bottom-6 left-6 z-50 bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-full shadow-lg"
    onClick={() => setShowPlayer(true)}
  >
    ▶ Ver vídeo
  </button>
)}

{showPlayer && (
  <div className="fixed bottom-6 left-6 z-50 bg-white rounded-xl shadow-xl p-2 max-w-xs">
    <button
      className="absolute top-1 right-1 text-gray-600 hover:text-red-500"
      onClick={() => setShowPlayer(false)}
    >
      ✖
    </button>
    <blockquote
      className="tiktok-embed"
      cite="https://www.tiktok.com/@_scond_/video/7509650413591842104"
      data-video-id="7509650413591842104"
      style={{width: '300px', height: '650px', overflow: 'hidden', borderRadius: '16px' }}
    >
      <section>
        <a target="_blank" title="@_scond_" href="https://www.tiktok.com/@_scond_?refer=embed">@_scond_</a>
        oiiiiiiiii juro que mais la pra frente eu falo uma curiosidade legal!
        <a title="pintura" target="_blank" href="https://www.tiktok.com/tag/pintura?refer=embed">#pintura</a>
        <a title="aquarela" target="_blank" href="https://www.tiktok.com/tag/aquarela?refer=embed">#aquarela</a>
        <a title="fyp" target="_blank" href="https://www.tiktok.com/tag/fyp?refer=embed">#fyp</a>
        <a title="fy" target="_blank" href="https://www.tiktok.com/tag/fy?refer=embed">#fy</a>
        <a target="_blank" title="♬ som original - Ana Scond" href="https://www.tiktok.com/music/som-original-7509650428708375301?refer=embed">♬ som original - Ana Scond</a>
      </section>
    </blockquote>
  </div>
)}
</div>
  );
}

export default App;