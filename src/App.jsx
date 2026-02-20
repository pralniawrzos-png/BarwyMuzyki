import React, { useState, useEffect, useRef } from 'react';
import { 
  Music, 
  Guitar, 
  Star, 
  Heart, 
  Phone, 
  Mail, 
  MapPin, 
  Menu, 
  X, 
  ChevronRight,
  ChevronLeft,
  Smile,
  Users,
  Info,
  ShieldCheck,
  Calendar,
  Mic2,
  Puzzle,
  Facebook,
  Play,
  Square
} from 'lucide-react';

// --- Komponenty Prawne (Modale i Cookies) ---

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) setIsVisible(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 border-t border-gray-800 text-gray-300 p-4 z-[100] shadow-2xl animate-fade-in-up">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3 text-sm">
          <Info className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
          <p>Ta strona korzysta z ciasteczek (cookies), aby świadczyć usługi na najwyższym poziomie. Dalsze korzystanie ze strony oznacza, że zgadzasz się na ich użycie zgodnie z naszą Polityką Prywatności.</p>
        </div>
        <button onClick={acceptCookies} className="whitespace-nowrap bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-lg font-medium transition-colors">
          Rozumiem
        </button>
      </div>
    </div>
  );
};

const LegalModal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col relative z-10 animate-fade-in-up">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><ShieldCheck className="w-6 h-6 text-purple-600" />{title}</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"><X className="w-6 h-6" /></button>
        </div>
        <div className="p-6 overflow-y-auto flex-1 text-gray-600 space-y-4">
          {children}
        </div>
        <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex justify-end">
          <button onClick={onClose} className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-xl font-medium transition-colors">Zamknij</button>
        </div>
      </div>
    </div>
  );
};

// --- INTERAKTYWNY SYMULATOR PIANINA ---

// Częstotliwości dźwięków (2.5 oktawy G3 - C6)
const noteFrequencies = {
  'G3': 196.00, 'G#3': 207.65, 'A3': 220.00, 'A#3': 233.08, 'B3': 246.94,
  'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'E4': 329.63, 'F4': 349.23, 'F#4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'A4': 440.00, 'A#4': 466.16, 'B4': 493.88,
  'C5': 523.25, 'C#5': 554.37, 'D5': 587.33, 'D#5': 622.25, 'E5': 659.25, 'F5': 698.46, 'F#5': 739.99, 'G5': 783.99, 'G#5': 830.61, 'A5': 880.00, 'A#5': 932.33, 'B5': 987.77,
  'C6': 1046.50
};

// Definicja klawiszy białych i przylegających do nich czarnych
const whiteKeys = [
  { note: 'G3', hasBlack: true, blackNote: 'G#3' }, { note: 'A3', hasBlack: true, blackNote: 'A#3' }, { note: 'B3', hasBlack: false },
  { note: 'C4', hasBlack: true, blackNote: 'C#4' }, { note: 'D4', hasBlack: true, blackNote: 'D#4' }, { note: 'E4', hasBlack: false }, { note: 'F4', hasBlack: true, blackNote: 'F#4' }, { note: 'G4', hasBlack: true, blackNote: 'G#4' }, { note: 'A4', hasBlack: true, blackNote: 'A#4' }, { note: 'B4', hasBlack: false },
  { note: 'C5', hasBlack: true, blackNote: 'C#5' }, { note: 'D5', hasBlack: true, blackNote: 'D#5' }, { note: 'E5', hasBlack: false }, { note: 'F5', hasBlack: true, blackNote: 'F#5' }, { note: 'G5', hasBlack: true, blackNote: 'G#5' }, { note: 'A5', hasBlack: true, blackNote: 'A#5' }, { note: 'B5', hasBlack: false },
  { note: 'C6', hasBlack: false }
];

// LISTA UTWORÓW W ROLCE
const sheetMusicList = [
  { id: 'wlazl-kotek', title: 'Wlazł kotek na płotek', image: '/nuty-wlazl-kotek.jpg' },
  { id: 'kurki-trzy', title: 'Kurki trzy', image: '/nuty-kurki.jpg' },
  { id: 'sto-lat', title: 'Sto lat', image: '/nuty-sto-lat.jpg' }
];

const PianoSimulator = () => {
  const audioCtxRef = useRef(null);
  const [activeNote, setActiveNote] = useState(null);
  const [currentSheetIndex, setCurrentSheetIndex] = useState(0);

  const currentSheet = sheetMusicList[currentSheetIndex];

  const nextSheet = () => {
    setCurrentSheetIndex((prev) => (prev + 1) % sheetMusicList.length);
  };

  const prevSheet = () => {
    setCurrentSheetIndex((prev) => (prev - 1 + sheetMusicList.length) % sheetMusicList.length);
  };

  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const playNote = (note) => {
    initAudio();
    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'triangle'; // Brzmienie zbliżone do prostego pianina
    osc.frequency.setValueAtTime(noteFrequencies[note], ctx.currentTime);

    // ADSR Envelope
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 1);

    setActiveNote(note);
    setTimeout(() => setActiveNote(null), 200);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 text-orange-500 mb-4">
            <Music className="w-8 h-8" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Spróbuj zagrać!</h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-purple-500 to-orange-500 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600">
            Wybierz utwór z listy poniżej i zagraj go na naszej wirtualnej klawiaturze, korzystając z podpisanych nut.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-4 md:p-8 shadow-2xl border border-purple-100">
          
          {/* ROLKA Z NUTAMI (KARUZELA) */}
          <div className="mb-8 bg-purple-50/50 rounded-2xl p-4 md:p-6 border border-purple-100">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-purple-900">{currentSheet.title}</h3>
            </div>

            <div className="flex items-center justify-between gap-2 md:gap-4">
              <button
                onClick={prevSheet}
                className="p-2 md:p-3 bg-white rounded-full shadow-md border border-purple-100 hover:bg-purple-100 hover:text-purple-700 transition-all flex-shrink-0"
                aria-label="Poprzednie nuty"
              >
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
              </button>

              <div className="flex-1 flex justify-center items-center bg-white rounded-xl p-2 md:p-4 border border-gray-200 min-h-[160px] overflow-hidden shadow-inner">
                <img 
                  src={currentSheet.image} 
                  alt={`Nuty do: ${currentSheet.title}`}
                  key={currentSheet.image}
                  className="max-h-48 md:max-h-64 object-contain max-w-full rounded-lg mix-blend-multiply animate-fade-in"
                  onError={(e) => { 
                    if (e.target.src.endsWith('.jpg')) {
                      e.target.src = currentSheet.image.replace('.jpg', '.png');
                    } else {
                      e.target.onerror = null;
                      e.target.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="150"><rect width="600" height="150" fill="%23f8fafc"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" fill="%239ca3af">Brak pliku obrazka: ${currentSheet.image.replace('.png', '')}(.jpg/.png) w folderze public</text></svg>`;
                    }
                  }}
                />
              </div>

              <button
                onClick={nextSheet}
                className="p-2 md:p-3 bg-white rounded-full shadow-md border border-purple-100 hover:bg-purple-100 hover:text-purple-700 transition-all flex-shrink-0"
                aria-label="Następne nuty"
              >
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
              </button>
            </div>
            
            <div className="flex justify-center gap-2 mt-6">
              {sheetMusicList.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-2 rounded-full transition-all duration-300 ${idx === currentSheetIndex ? 'w-6 bg-purple-600' : 'w-2 bg-purple-200'}`}
                ></div>
              ))}
            </div>
          </div>

          {/* Klawiatura Pianina */}
          <div className="relative flex w-full h-48 md:h-56 bg-gray-900 rounded-xl overflow-x-auto overflow-y-hidden touch-pan-x shadow-inner" style={{ userSelect: 'none' }}>
            <div className="flex w-full min-w-[800px] h-full">
              {whiteKeys.map((key, idx) => (
                <div key={key.note} className="flex-1 relative h-full">
                  <div 
                    onMouseDown={() => playNote(key.note)}
                    onTouchStart={(e) => { e.preventDefault(); playNote(key.note); }}
                    className={`absolute inset-0 border border-gray-300 rounded-b-md shadow-sm transition-colors cursor-pointer ${activeNote === key.note ? 'bg-orange-200' : 'bg-white hover:bg-gray-100'} z-0`}
                  >
                    <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-400 font-bold pointer-events-none">
                      {key.note.replace(/[0-9]/g, '')}
                    </span>
                  </div>
                  
                  {key.hasBlack && (
                    <div 
                      onMouseDown={(e) => { e.stopPropagation(); playNote(key.blackNote); }}
                      onTouchStart={(e) => { e.preventDefault(); e.stopPropagation(); playNote(key.blackNote); }}
                      className={`absolute top-0 -right-[30%] w-[60%] h-[60%] rounded-b-md shadow-md transition-colors cursor-pointer z-10 ${activeNote === key.blackNote ? 'bg-pink-600' : 'bg-gray-900 hover:bg-gray-800'}`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <p className="text-center text-xs text-gray-400 mt-4">Naciśnij białe lub czarne klawisze, aby zagrać dźwięk. Na telefonie możesz je przesuwać palcem w lewo i prawo.</p>
        </div>
      </div>
    </section>
  );
};

// --- Komponenty sekcji ---

const Navbar = ({ isMenuOpen, setIsMenuOpen }) => (
  <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-sm shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-20 items-center">
        <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => window.scrollTo(0,0)}>
          <img 
            src="/logo1.png" 
            alt="Logo Barwy Muzyki" 
            className="w-12 h-12 sm:w-16 sm:h-16 object-contain mix-blend-multiply mr-2"
            onError={(e) => { e.target.src = '/logo1.jpg' }}
          />
          <span className="font-extrabold text-xl sm:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-orange-500">
            {/* Sprytne ukrywanie: znika na komórkach, pojawia się na tabletach, znika na małych laptopach (żeby zmieścić menu), wraca na dużych ekranach */}
            <span className="hidden md:inline lg:hidden xl:inline">Ognisko Muzyczne </span>Barwy Muzyki
          </span>
        </div>

        {/* Menu na PC (zmieniono breakpoint z md na lg, dodano nowrap) */}
        <div className="hidden lg:flex space-x-6 xl:space-x-8 items-center">
          <a href="#o-nas" className="text-gray-600 hover:text-purple-600 font-medium transition-colors whitespace-nowrap">O nas</a>
          <a href="#oferta" className="text-gray-600 hover:text-pink-500 font-medium transition-colors whitespace-nowrap">Oferta</a>
          <a href="#pianino" className="text-gray-600 hover:text-blue-500 font-medium transition-colors whitespace-nowrap">Pianino</a>
          <a href="#grafik" className="text-gray-600 hover:text-emerald-500 font-medium transition-colors whitespace-nowrap">Grafik Zajęć</a>
          <a href="#kontakt" className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white px-5 xl:px-6 py-2.5 rounded-full font-medium hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap">
            Zapisy
          </a>
        </div>

        <div className="lg:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-purple-600 focus:outline-none p-2">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
    </div>

    {/* Menu na telefon (zmieniono breakpoint z md na lg) */}
    {isMenuOpen && (
      <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl absolute w-full">
        <div className="px-4 pt-2 pb-6 space-y-2">
          <a href="#o-nas" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl">O nas</a>
          <a href="#oferta" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-pink-500 hover:bg-pink-50 rounded-xl">Oferta</a>
          <a href="#pianino" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-blue-50 rounded-xl">Pianino</a>
          <a href="#grafik" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-emerald-500 hover:bg-emerald-50 rounded-xl">Grafik Zajęć</a>
          <a href="#kontakt" onClick={() => setIsMenuOpen(false)} className="block mt-4 px-3 py-3 text-center text-base font-medium bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white rounded-xl shadow-md">Skontaktuj się</a>
        </div>
      </div>
    )}
  </nav>
);

const Hero = () => (
  <div id="o-nas" className="relative bg-purple-50/30 pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute top-48 -right-24 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-24 left-48 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left">
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Rozbudź w dziecku <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-500 to-orange-500">pasję do muzyki!</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
            Zapraszamy na zajęcia przy Dwujęzycznej Prywatnej Szkole Podstawowej im. Antoniego Bućko w Wasilkowie. Uczymy gry, śpiewu i wprowadzamy dzieci w magiczny świat dźwięków w bezstresowej atmosferze.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a href="#grafik" className="px-8 py-4 text-lg font-bold rounded-full text-white bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 shadow-lg hover:shadow-pink-300 transition-all flex items-center justify-center">
              Sprawdź Grafik <ChevronRight className="ml-2 w-5 h-5" />
            </a>
            <a href="#kontakt" className="px-8 py-4 text-lg font-bold rounded-full text-purple-700 bg-white hover:bg-purple-50 border-2 border-purple-100 shadow-sm transition-all flex items-center justify-center">
              Zapisz się
            </a>
          </div>
        </div>
        
        <div className="relative hidden md:block">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
            <img src="https://images.unsplash.com/photo-1514119412350-e174d90d280e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Dzieci grające na instrumentach" className="w-full h-[500px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 border border-gray-100 animate-bounce">
            <div className="bg-orange-100 p-3 rounded-full"><Smile className="w-8 h-8 text-orange-500" /></div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Uśmiech gwarantowany</p>
              <p className="font-bold text-gray-900">Koncerty Świąteczne</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Offer = () => (
  <section id="oferta" className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Nasza Oferta</h2>
        <div className="w-24 h-1.5 bg-gradient-to-r from-purple-500 via-blue-500 to-orange-500 mx-auto rounded-full mb-6"></div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Dopasowujemy zajęcia do wieku i zainteresowań. Od wczesnego umuzykalniania po grę na instrumentach i śpiew.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Zajęcia Umuzykalniające */}
        <div className="bg-emerald-50 rounded-3xl p-8 border border-emerald-100 hover:shadow-xl transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
             <Puzzle className="w-32 h-32 text-emerald-900" />
          </div>
          <div className="relative z-10">
            <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-200">
              <Puzzle className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Zajęcia Umuzykalniające</h3>
            <p className="text-gray-600 mb-6">Pierwszy kontakt z rytmem i melodią. Zajęcia pełne ruchu i zabaw muzycznych dla najmłodszych.</p>
            <ul className="space-y-2 mb-6 text-sm">
              <li className="flex items-center text-gray-700 font-medium"><Star className="w-4 h-4 text-emerald-500 mr-2" /> Grupy 4-5 lat</li>
              <li className="flex items-center text-gray-700 font-medium"><Star className="w-4 h-4 text-emerald-500 mr-2" /> Grupy 6-7 lat</li>
              <li className="flex items-center text-gray-700 font-medium"><Star className="w-4 h-4 text-emerald-500 mr-2" /> Grupy 8-9 lat</li>
            </ul>
          </div>
        </div>

        {/* Pianino */}
        <div className="bg-purple-50 rounded-3xl p-8 border border-purple-100 hover:shadow-xl transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
             <Music className="w-32 h-32 text-purple-900" />
          </div>
          <div className="relative z-10">
            <div className="w-14 h-14 bg-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-200">
              <Music className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Pianino</h3>
            <p className="text-gray-600 mb-6">Król instrumentów. Rozwija koordynację, wyobraźnię i wrażliwość muzyczną. Indywidualne podejście.</p>
            <ul className="space-y-2 mb-6 text-sm">
              <li className="flex items-center text-gray-700 font-medium"><Star className="w-4 h-4 text-purple-500 mr-2" /> Nauka od podstaw</li>
              <li className="flex items-center text-gray-700 font-medium"><Star className="w-4 h-4 text-purple-500 mr-2" /> Kolorowe nuty</li>
              <li className="flex items-center text-gray-700 font-medium"><Star className="w-4 h-4 text-purple-500 mr-2" /> Ulubione melodie</li>
            </ul>
          </div>
        </div>

        {/* Ukulele */}
        <div className="bg-orange-50 rounded-3xl p-8 border border-orange-100 hover:shadow-xl transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
             <Guitar className="w-32 h-32 text-orange-900" />
          </div>
          <div className="relative z-10">
            <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-orange-200">
              <Guitar className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Ukulele</h3>
            <p className="text-gray-600 mb-6">Mały instrument o wielkim sercu. Szybkie efekty i nauka akordów. Oferujemy zajęcia grupowe!</p>
            <ul className="space-y-2 mb-6 text-sm">
              <li className="flex items-center text-gray-700 font-medium"><Star className="w-4 h-4 text-orange-500 mr-2" /> Dzieci (6-7 lat)</li>
              <li className="flex items-center text-gray-700 font-medium"><Star className="w-4 h-4 text-orange-500 mr-2" /> Młodzież</li>
              <li className="flex items-center text-gray-700 font-medium"><Star className="w-4 h-4 text-orange-500 mr-2" /> Grupy dla Dorosłych</li>
            </ul>
          </div>
        </div>

        {/* Śpiew */}
        <div className="bg-blue-50 rounded-3xl p-8 border border-blue-100 hover:shadow-xl transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
             <Mic2 className="w-32 h-32 text-blue-900" />
          </div>
          <div className="relative z-10">
            <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200">
              <Mic2 className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Śpiew i Zespół</h3>
            <p className="text-gray-600 mb-6">Odkrywamy potencjał głosu. Uczymy prawidłowego oddechu, dykcji i współpracy w grupie.</p>
            <ul className="space-y-2 mb-6 text-sm">
              <li className="flex items-center text-gray-700 font-medium"><Star className="w-4 h-4 text-blue-500 mr-2" /> Emisja głosu</li>
              <li className="flex items-center text-gray-700 font-medium"><Star className="w-4 h-4 text-blue-500 mr-2" /> Praca z mikrofonem</li>
              <li className="flex items-center text-gray-700 font-medium"><Star className="w-4 h-4 text-blue-500 mr-2" /> Zespół Wokalny</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  </section>
);

// --- NOWA DEDYKOWANA SEKCJA O PIANINIE ---
const PianoSection = () => (
  <section id="pianino" className="py-20 bg-gradient-to-br from-purple-50 to-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        
        <div className="md:w-1/2 relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-300 to-blue-300 rounded-3xl transform -rotate-3 scale-105 opacity-40"></div>
          <img 
            src="https://images.unsplash.com/photo-1552422535-c45813c61732?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="Dziecko uczące się grać na pianinie" 
            className="relative rounded-3xl shadow-xl w-full object-cover h-[450px]" 
          />
        </div>

        <div className="md:w-1/2">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-700 font-semibold text-sm mb-6">
            <Music className="w-4 h-4 mr-2" />
            Zajęcia Indywidualne
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Pianino w "Barwach Muzyki"</h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-6"></div>
          
          <p className="text-lg text-gray-600 mb-5 leading-relaxed">
            Zajęcia z gry na pianinie to nasza specjalność! Mają one charakter w 100% <strong>indywidualny</strong>, co oznacza, że nauczyciel skupia pełną uwagę tylko na jednym uczniu. Pozwala to na idealne dopasowanie tempa nauki oraz repertuaru do predyspozycji i muzycznego gustu Twojego dziecka.
          </p>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Uczymy zarówno klasycznych fundamentów, jak i współczesnych, znanych z bajek i radia melodii. Gra na pianinie doskonale rozwija wyobraźnię przestrzenną, koordynację ruchową (niezależna praca obu rąk) oraz pamięć.
          </p>
          
          <ul className="space-y-4 mb-8">
            <li className="flex items-start text-gray-700 font-medium">
              <div className="bg-purple-100 p-1 rounded-full mr-3 mt-0.5"><Star className="w-4 h-4 text-purple-600" /></div>
              <span><strong>Przyjazne materiały:</strong> Kolorowe nuty i naklejki dla najmłodszych.</span>
            </li>
            <li className="flex items-start text-gray-700 font-medium">
              <div className="bg-purple-100 p-1 rounded-full mr-3 mt-0.5"><Star className="w-4 h-4 text-purple-600" /></div>
              <span><strong>Kompleksowa nauka:</strong> Czytanie z nut, poczucie rytmu i podstawy teorii.</span>
            </li>
            <li className="flex items-start text-gray-700 font-medium">
              <div className="bg-purple-100 p-1 rounded-full mr-3 mt-0.5"><Star className="w-4 h-4 text-purple-600" /></div>
              <span><strong>Elastyczność:</strong> Dni i godziny spotkań ustalamy bezpośrednio z nauczycielem!</span>
            </li>
          </ul>
          
          <a href="#kontakt" className="inline-flex px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-full transition-colors shadow-lg shadow-purple-200">
            Zapytaj o wolny termin
          </a>
        </div>

      </div>
    </div>
  </section>
);

const Schedule = () => (
  <section id="grafik" className="py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-600 mb-4">
          <Calendar className="w-8 h-8" />
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Grafik Zajęć Grupowych</h2>
        <div className="w-24 h-1.5 bg-purple-600 mx-auto rounded-full mb-6"></div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Sprawdź nasz harmonogram zajęć grupowych na bieżący rok szkolny.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        
        {/* Środy */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-pink-100 py-4 px-8 border-b border-pink-200">
            <h3 className="text-2xl font-bold text-pink-900 tracking-wide text-center uppercase">Środy</h3>
          </div>
          <div className="p-8">
            <ul className="space-y-4">
              <li className="flex items-center justify-between border-b border-gray-50 pb-4">
                <span className="font-bold text-gray-900 text-lg w-32">16:15 - 17:00</span>
                <span className="text-gray-600 font-medium text-right">Umuzykalnienie (8-9 lat)</span>
              </li>
              <li className="flex items-center justify-between border-b border-gray-50 pb-4">
                <span className="font-bold text-gray-900 text-lg w-32">16:15 - 16:45</span>
                <span className="text-gray-600 font-medium text-right">Ukulele (6 latki)</span>
              </li>
              <li className="flex items-center justify-between border-b border-gray-50 pb-4">
                <span className="font-bold text-gray-900 text-lg w-32">17:00 - 17:45</span>
                <span className="text-gray-600 font-medium text-right">Ukulele (7 latki)</span>
              </li>
              <li className="flex items-center justify-between border-b border-gray-50 pb-4">
                <span className="font-bold text-gray-900 text-lg w-32">18:00 - 18:45</span>
                <span className="text-gray-600 font-medium text-right">Ukulele (Młodzież)</span>
              </li>
              <li className="flex items-center justify-between pt-2">
                <span className="font-bold text-gray-900 text-lg w-32">19:00 - 20:00</span>
                <span className="text-gray-600 font-medium text-right">Ukulele (Dorośli)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Piątki */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-blue-100 py-4 px-8 border-b border-blue-200">
            <h3 className="text-2xl font-bold text-blue-900 tracking-wide text-center uppercase">Piątki</h3>
          </div>
          <div className="p-8">
            <ul className="space-y-4">
              <li className="flex items-center justify-between border-b border-gray-50 pb-4">
                <span className="font-bold text-gray-900 text-lg w-32">16:30 - 17:00</span>
                <span className="text-gray-600 font-medium text-right">Umuzykalnienie (4-5 lat)</span>
              </li>
              <li className="flex items-center justify-between border-b border-gray-50 pb-4">
                <span className="font-bold text-gray-900 text-lg w-32">16:30 - 17:15</span>
                <span className="text-gray-600 font-medium text-right">Umuzykalnienie (6-7 lat)</span>
              </li>
              <li className="flex items-center justify-between pt-2">
                <span className="font-bold text-gray-900 text-lg w-32">17:15 - 18:00</span>
                <span className="text-gray-600 font-medium text-right">Zespół Wokalny</span>
              </li>
            </ul>
            
            <div className="mt-10 p-6 bg-orange-50 rounded-2xl border border-orange-100 text-center">
              <p className="text-orange-800 font-medium">Brak pasującego terminu? <br/> Prowadzimy również lekcje indywidualne!</p>
              <a href="#kontakt" className="inline-block mt-3 text-orange-600 font-bold hover:underline">Skontaktuj się z nami &rarr;</a>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
);

const Contact = ({ onOpenPrivacy }) => {
  const [formStatus, setFormStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    const form = e.target;
    const data = new FormData(form);

    try {
      // UWAGA: Zastąp ten URL swoim linkiem z Formspree
      const response = await fetch("https://formspree.io/f/maqddlnd", {
        method: "POST",
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      
      if (response.ok) {
        setFormStatus('success');
        form.reset();
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

  return (
    <section id="kontakt" className="py-20 bg-purple-900 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-800 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-900 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
          
          <div className="md:w-5/12 bg-gradient-to-br from-purple-600 to-purple-800 p-10 text-white flex flex-col justify-between">
            <div>
              <h3 className="text-3xl font-bold mb-2">Zapisy i Informacje</h3>
              <p className="text-purple-200 mb-8">Zadzwoń lub napisz do nas. Chętnie odpowiemy na wszystkie pytania!</p>
              
              <div className="space-y-6">
                <div className="flex items-center"><Phone className="w-6 h-6 text-purple-300 mr-4" /><span className="text-lg">730 501 950</span></div>
                <div className="flex items-center"><Mail className="w-6 h-6 text-purple-300 mr-4" /><span className="text-lg text-sm sm:text-base">ogniskobarwymuzyki@gmail.com</span></div>
                <div className="flex items-center"><Facebook className="w-6 h-6 text-purple-300 mr-4" /><span className="text-lg">Ognisko Muzyczne w Wasilkowie "Barwy Muzyki"</span></div>
              </div>
            </div>
            
            <div className="mt-12 bg-white/10 p-6 rounded-2xl border border-white/20">
              <div className="flex items-start">
                <MapPin className="w-8 h-8 text-pink-400 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-bold text-lg mb-1">Gdzie gramy?</p>
                  <p className="text-purple-100">ul. Antoniego Bućki 10<br/>Wasilków</p>
                  <p className="text-xs text-purple-200 mt-2">Budynek Dwujęzycznej Prywatnej Szkoły Podstawowej im. Antoniego Bućko</p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-7/12 p-10 bg-white">
            {formStatus === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12 animate-fade-in">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h4 className="text-2xl font-bold text-gray-900">Dziękujemy za wiadomość!</h4>
                <p className="text-gray-600">Skontaktujemy się z Tobą najszybciej jak to możliwe.</p>
                <button onClick={() => setFormStatus('idle')} className="mt-6 text-purple-600 font-medium hover:text-purple-800 transition-colors">Wyślij kolejną wiadomość</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Imię i nazwisko <span className="text-pink-500">*</span></label>
                    <input type="text" name="name" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all" placeholder="Jan Kowalski" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Wiek ucznia (jeśli dziecko) <span className="text-pink-500">*</span></label>
                    <input type="text" name="age" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all" placeholder="np. 7 lat / dorosły" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Numer telefonu <span className="text-pink-500">*</span></label>
                    <input type="tel" name="phone" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all" placeholder="730 ..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Interesujące zajęcia</label>
                    <select name="instrument" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all bg-white">
                      <option value="Umuzykalnienie">Zajęcia Umuzykalniające</option>
                      <option value="Pianino">Pianino</option>
                      <option value="Ukulele">Ukulele</option>
                      <option value="Spiew">Śpiew / Zespół Wokalny</option>
                      <option value="Nie wiem">Jeszcze nie wiem</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Wiadomość / Pytania (opcjonalnie)</label>
                  <textarea name="message" rows="3" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all" placeholder="Np. Pytanie o grupę Ukulele dla dorosłych..."></textarea>
                </div>

                <div className="flex items-start gap-3 mt-4">
                  <input type="checkbox" id="rodo-consent" name="rodoConsent" required className="mt-1 w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500" />
                  <label htmlFor="rodo-consent" className="text-xs text-gray-600 leading-relaxed">
                    Wyrażam zgodę na przetwarzanie moich danych osobowych przez Ognisko Muzyczne Barwy Muzyki w celu udzielenia odpowiedzi na zapytanie. Zapoznałem/am się z <button type="button" onClick={onOpenPrivacy} className="text-purple-600 hover:underline font-medium">Polityką Prywatności</button>. <span className="text-pink-500">*</span>
                  </label>
                </div>

                {formStatus === 'error' && <p className="text-red-500 text-sm">Wystąpił błąd podczas wysyłania. Zadzwoń do nas bezpośrednio.</p>}

                <button type="submit" disabled={formStatus === 'submitting'} className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 disabled:opacity-50 text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex justify-center items-center">
                  {formStatus === 'submitting' ? 'Wysyłanie...' : 'Wyślij zapytanie'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ onOpenPrivacy, onOpenTerms }) => (
  <footer className="bg-gray-900 text-gray-400 py-12 text-center">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-center items-center mb-6 opacity-80">
        <div className="bg-white p-1 rounded-full mr-3 shadow-md">
          {/* Logo 1 (bez podpisu) w stopce */}
          <img 
            src="/logo1.png" 
            alt="Logo Barwy Muzyki" 
            className="w-10 h-10 rounded-full object-contain mix-blend-multiply"
            onError={(e) => { e.target.src = '/logo1.jpg' }}
          />
        </div>
        <span className="font-bold text-xl text-white">Barwy Muzyki Wasilków</span>
      </div>
      <p className="mb-4">Ognisko Muzyczne dla Dzieci, Młodzieży i Dorosłych. Uczymy z pasją i uśmiechem.</p>
      
      <div className="flex justify-center space-x-6 mb-8 text-sm">
        <button onClick={onOpenPrivacy} className="hover:text-white transition-colors underline-offset-4 hover:underline">Polityka prywatności</button>
        <button onClick={onOpenTerms} className="hover:text-white transition-colors underline-offset-4 hover:underline">Regulamin Serwisu</button>
      </div>
      
      <p className="text-sm border-t border-gray-800 pt-8">&copy; {new Date().getFullYear()} Ognisko Muzyczne Barwy Muzyki w Wasilkowie. Wszelkie prawa zastrzeżone.</p>
    </div>
  </footer>
);

// --- Główny komponent Aplikacji ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  return (
    <div className="min-h-screen font-sans bg-gray-50 text-gray-900 scroll-smooth">
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <Hero />
      <Offer />
      <PianoSection />
      <PianoSimulator />
      <Schedule />
      
      <Contact onOpenPrivacy={() => setIsPrivacyOpen(true)} />
      <Footer 
        onOpenPrivacy={() => setIsPrivacyOpen(true)} 
        onOpenTerms={() => setIsTermsOpen(true)} 
      />

      <CookieBanner />

      <LegalModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} title="Polityka Prywatności">
        <h3 className="font-bold text-gray-900 mt-4">1. Informacje Ogólne</h3>
        <p>Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych przekazanych przez Użytkowników w związku z korzystaniem z serwisu internetowego Ogniska Muzycznego "Barwy Muzyki" w Wasilkowie.</p>
        <h3 className="font-bold text-gray-900 mt-4">2. Administrator Danych</h3>
        <p>Administratorem Twoich danych osobowych jest Ognisko Muzyczne "Barwy Muzyki" z siedzibą przy ul. Antoniego Bućki 10, Wasilków.</p>
        <h3 className="font-bold text-gray-900 mt-4">3. Cel Zbierania Danych</h3>
        <p>Dane osobowe są przetwarzane wyłącznie w celu obsługi zapytania, przedstawienia oferty i zawarcia umowy.</p>
        <h3 className="font-bold text-gray-900 mt-4">4. Prawa Użytkownika</h3>
        <p>Masz prawo dostępu do danych, sprostowania, usunięcia. Skontaktuj się z nami: ogniskobarwymuzyki@gmail.com.</p>
      </LegalModal>

      <LegalModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} title="Regulamin Serwisu">
        <h3 className="font-bold text-gray-900 mt-4">§ 1 Postanowienia wstępne</h3>
        <p>1. Regulamin określa zasady korzystania z serwisu ogniska "Barwy Muzyki" w Wasilkowie.</p>
        <h3 className="font-bold text-gray-900 mt-4">§ 2 Usługi elektroniczne</h3>
        <p>W ramach Serwisu świadczona jest bezpłatna usługa formularza kontaktowego.</p>
        <h3 className="font-bold text-gray-900 mt-4">§ 3 Kontakt</h3>
        <p>Wszelkie reklamacje i zapytania można zgłaszać na adres e-mail: ogniskobarwymuzyki@gmail.com lub telefonicznie: 730 501 950.</p>
      </LegalModal>
    </div>
  );
}