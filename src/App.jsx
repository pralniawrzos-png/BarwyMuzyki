import React, { useState } from 'react';
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
  Smile,
  Users
} from 'lucide-react';

// --- Komponenty sekcji ---

const Navbar = ({ isMenuOpen, setIsMenuOpen }) => (
  <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-sm shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-20 items-center">
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center cursor-pointer">
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center mr-3 shadow-lg shadow-indigo-200">
            <Music className="h-6 w-6 text-white" />
          </div>
          <span className="font-extrabold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-rose-500">
            Barwy Muzyki
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          <a href="#o-nas" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">O nas</a>
          <a href="#oferta" className="text-gray-600 hover:text-rose-500 font-medium transition-colors">Oferta</a>
          <a href="#dlaczego-my" className="text-gray-600 hover:text-amber-500 font-medium transition-colors">Dlaczego my?</a>
          <a href="#kontakt" className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white px-6 py-2.5 rounded-full font-medium hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
            Zapisz dziecko
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-600 hover:text-indigo-600 focus:outline-none p-2"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
    </div>

    {/* Mobile Menu */}
    {isMenuOpen && (
      <div className="md:hidden bg-white border-t border-gray-100 shadow-xl absolute w-full">
        <div className="px-4 pt-2 pb-6 space-y-2">
          <a href="#o-nas" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl">O nas</a>
          <a href="#oferta" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-rose-500 hover:bg-rose-50 rounded-xl">Oferta</a>
          <a href="#dlaczego-my" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-amber-500 hover:bg-amber-50 rounded-xl">Dlaczego my?</a>
          <a href="#kontakt" onClick={() => setIsMenuOpen(false)} className="block mt-4 px-3 py-3 text-center text-base font-medium bg-indigo-600 text-white rounded-xl shadow-md">
            Skontaktuj się
          </a>
        </div>
      </div>
    )}
  </nav>
);

const Hero = () => (
  <div className="relative bg-indigo-50 pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute top-48 -right-24 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-24 left-48 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white text-indigo-600 font-semibold text-sm shadow-sm mb-6 border border-indigo-100">
            <Star className="w-4 h-4 mr-2 text-amber-400 fill-amber-400" />
            Prywatna Szkoła Muzyczna dla Dzieci
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Rozbudź w dziecku <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-rose-500">pasję do muzyki!</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
            Uczymy gry na pianinie i ukulele poprzez zabawę. W "Barwach Muzyki" wprowadzamy dzieci w magiczny świat dźwięków w przyjaznej, bezstresowej atmosferze.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a href="#oferta" className="px-8 py-4 text-lg font-bold rounded-full text-white bg-rose-500 hover:bg-rose-600 shadow-lg hover:shadow-rose-300 transition-all flex items-center justify-center">
              Poznaj Ofertę <ChevronRight className="ml-2 w-5 h-5" />
            </a>
            <a href="#kontakt" className="px-8 py-4 text-lg font-bold rounded-full text-indigo-700 bg-white hover:bg-gray-50 border-2 border-indigo-100 shadow-sm transition-all flex items-center justify-center">
              Darmowa lekcja próbna
            </a>
          </div>
        </div>
        
        <div className="relative hidden md:block">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
            <img 
              src="https://images.unsplash.com/photo-1514119412350-e174d90d280e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Dzieci grające na instrumentach" 
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>
          {/* Floating badge */}
          <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 border border-gray-100 animate-bounce">
            <div className="bg-amber-100 p-3 rounded-full">
              <Smile className="w-8 h-8 text-amber-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Uśmiech gwarantowany</p>
              <p className="font-bold text-gray-900">Zabawa i nauka</p>
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
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Nasze Instrumenty</h2>
        <div className="w-24 h-1.5 bg-gradient-to-r from-indigo-500 to-rose-500 mx-auto rounded-full mb-6"></div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Specjalizujemy się w nauce gry na dwóch wspaniałych instrumentach, idealnych na początek muzycznej przygody.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Pianino */}
        <div className="bg-indigo-50 rounded-3xl p-8 md:p-10 border border-indigo-100 hover:shadow-xl transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
             <Music className="w-48 h-48 text-indigo-900" />
          </div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-200">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Pianino</h3>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Król instrumentów! Nauka gry na pianinie doskonale rozwija wyobraźnię przestrzenną, koordynację obu rąk oraz wrażliwość muzyczną. Zajęcia prowadzimy w sposób autorski, łącząc klasykę z ulubionymi melodiami dzieci.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-gray-700 font-medium"><Star className="w-5 h-5 text-indigo-500 mr-3" /> Dla dzieci od 5 roku życia</li>
              <li className="flex items-center text-gray-700 font-medium"><Star className="w-5 h-5 text-indigo-500 mr-3" /> Indywidualny tok nauczania</li>
              <li className="flex items-center text-gray-700 font-medium"><Star className="w-5 h-5 text-indigo-500 mr-3" /> Kolorowe nuty dla najmłodszych</li>
            </ul>
            <a href="#kontakt" className="inline-block bg-white text-indigo-600 font-bold px-6 py-3 rounded-xl shadow hover:shadow-md border border-indigo-100 transition-all">
              Zapytaj o terminy
            </a>
          </div>
        </div>

        {/* Ukulele */}
        <div className="bg-rose-50 rounded-3xl p-8 md:p-10 border border-rose-100 hover:shadow-xl transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
             <Guitar className="w-48 h-48 text-rose-900" />
          </div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-rose-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-rose-200">
              <Guitar className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Ukulele</h3>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Mały instrument o wielkim sercu! Ukulele to absolutny hit ze względu na swoje rozmiary i szybkość osiągania pierwszych efektów. Dzieci uwielbiają je za wesołe brzmienie i łatwość nauki podstawowych akordów.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-gray-700 font-medium"><Star className="w-5 h-5 text-rose-500 mr-3" /> Dla dzieci od 6 roku życia</li>
              <li className="flex items-center text-gray-700 font-medium"><Star className="w-5 h-5 text-rose-500 mr-3" /> Szybkie efekty i nauka piosenek</li>
              <li className="flex items-center text-gray-700 font-medium"><Star className="w-5 h-5 text-rose-500 mr-3" /> Rozwój poczucia rytmu</li>
            </ul>
            <a href="#kontakt" className="inline-block bg-white text-rose-600 font-bold px-6 py-3 rounded-xl shadow hover:shadow-md border border-rose-100 transition-all">
              Zapytaj o terminy
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const WhyUs = () => (
  <section id="dlaczego-my" className="py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row gap-16 items-center">
        <div className="md:w-1/2">
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1552422535-c45813c61732?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Chłopiec grający na pianinie" className="rounded-2xl shadow-lg w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1543840950-6ce32179bdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Dziewczynka z ukulele" className="rounded-2xl shadow-lg w-full h-48 object-cover mt-8" />
          </div>
        </div>
        
        <div className="md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">Dlaczego "Barwy Muzyki"?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Nasze ognisko muzyczne to miejsce stworzone z myślą o dzieciach. Wierzymy, że muzyka to nie sucha teoria, ale wspaniała kolorowa przygoda.
          </p>
          
          <div className="space-y-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600">
                  <Heart className="w-6 h-6" />
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-xl font-bold text-gray-900">Nauka bez stresu</h4>
                <p className="mt-1 text-gray-600">Nie robimy rygorystycznych egzaminów. Skupiamy się na czerpaniu radości z grania i budowaniu pewności siebie.</p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-amber-100 text-amber-600">
                  <Users className="w-6 h-6" />
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-xl font-bold text-gray-900">Wykwalifikowana Kadra</h4>
                <p className="mt-1 text-gray-600">Nasi nauczyciele to nie tylko świetni muzycy, ale przede wszystkim wspaniali pedagodzy z doskonałym podejściem do najmłodszych.</p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-rose-100 text-rose-600">
                  <Music className="w-6 h-6" />
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-xl font-bold text-gray-900">Materiały dopasowane do dzieci</h4>
                <p className="mt-1 text-gray-600">Używamy nowoczesnych, kolorowych podręczników, naklejek i gier edukacyjnych, aby teoria była banalnie prosta.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Co mówią rodzice?</h2>
        <div className="w-24 h-1.5 bg-amber-400 mx-auto rounded-full"></div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { name: "Katarzyna, mama 7-letniej Zosi", text: "Zosia uwielbia zajęcia z pianina! Wcześniej próbowała w innej szkole i szybko się zniechęciła. W Barwach Muzyki odzyskała zapał, a nauczycielka jest przekochana." },
          { name: "Michał, tata 6-letniego Antka", text: "Ukulele to był strzał w dziesiątkę. Po kilku lekcjach Antek zagrał nam pierwszy utwór w domu. Pełen profesjonalizm i świetne podejście do dzieciaków." },
          { name: "Anna, mama 9-letniego Filipa", text: "Świetna atmosfera i bardzo jasny przekaz. Nauczyciel ma anielską cierpliwość. Widzę, że zajęcia bardzo rozwijają moje dziecko nie tylko muzycznie." }
        ].map((testimonial, idx) => (
          <div key={idx} className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm hover:shadow-lg transition-shadow relative">
            <div className="flex text-amber-400 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
            </div>
            <p className="text-gray-600 italic mb-6">"{testimonial.text}"</p>
            <p className="font-bold text-gray-900 text-sm">{testimonial.name}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Contact = () => {
  const [formStatus, setFormStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    const form = e.target;
    const data = new FormData(form);

    try {
      // UWAGA: Zastąp poniższy URL swoim linkiem z Formspree (np. https://formspree.io/f/twoj_kod)
      const response = await fetch("https://formspree.io/f/maqddlnd", {
        method: "POST",
        body: data,
        headers: {
          'Accept': 'application/json'
        }
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
    <section id="kontakt" className="py-20 bg-indigo-900 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-800 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-900 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
          
          {/* Contact Info */}
          <div className="md:w-5/12 bg-gradient-to-br from-indigo-600 to-indigo-800 p-10 text-white flex flex-col justify-between">
            <div>
              <h3 className="text-3xl font-bold mb-2">Skontaktuj się z nami</h3>
              <p className="text-indigo-200 mb-8">Zadzwoń lub napisz, aby umówić się na pierwszą, darmową lekcję próbną!</p>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-indigo-300 mr-4" />
                  <span className="text-lg">+48 123 456 789</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-indigo-300 mr-4" />
                  <span className="text-lg">kontakt@barwymuzyki.pl</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-indigo-300 mr-4 mt-1" />
                  <span className="text-lg">ul. Muzyczna 15/2<br/>00-123 Warszawa</span>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <p className="text-sm text-indigo-200 font-medium">Godziny otwarcia:</p>
              <p className="text-white">Pon - Pt: 14:00 - 20:00</p>
              <p className="text-white">Sobota: 10:00 - 15:00</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:w-7/12 p-10 bg-white">
            {formStatus === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12 animate-fade-in">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h4 className="text-2xl font-bold text-gray-900">Dziękujemy za wiadomość!</h4>
                <p className="text-gray-600">Skontaktujemy się z Tobą najszybciej jak to możliwe.</p>
                <button onClick={() => setFormStatus('idle')} className="mt-6 text-indigo-600 font-medium hover:text-indigo-800 transition-colors">Wyślij kolejną wiadomość</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Imię i nazwisko rodzica</label>
                    <input type="text" name="parentName" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" placeholder="Jan Kowalski" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Wiek dziecka</label>
                    <input type="number" name="childAge" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" placeholder="np. 7" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Numer telefonu</label>
                    <input type="tel" name="phone" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" placeholder="+48 ..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Interesujący instrument</label>
                    <select name="instrument" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white">
                      <option value="Pianino">Pianino</option>
                      <option value="Ukulele">Ukulele</option>
                      <option value="Nie wiem">Jeszcze nie wiem</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Wiadomość (opcjonalnie)</label>
                  <textarea name="message" rows="4" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" placeholder="Czy macie wolne terminy we wtorki?"></textarea>
                </div>

                {formStatus === 'error' && (
                  <p className="text-red-500 text-sm">Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.</p>
                )}

                <button type="submit" disabled={formStatus === 'submitting'} className="w-full bg-rose-500 hover:bg-rose-600 disabled:bg-rose-300 text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex justify-center items-center">
                  {formStatus === 'submitting' ? 'Wysyłanie...' : 'Wyślij zapytanie'}
                </button>
                <p className="text-xs text-gray-500 text-center">Administratorem Twoich danych jest Ognisko Muzyczne Barwy Muzyki. Wysyłając formularz zgadzasz się z polityką prywatności.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-gray-900 text-gray-400 py-12 text-center">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-center items-center mb-6 opacity-80">
        <Music className="h-6 w-6 mr-2" />
        <span className="font-bold text-xl text-white">Barwy Muzyki</span>
      </div>
      <p className="mb-4">Prywatna Szkoła Muzyczna dla Dzieci. Uczymy z pasją i uśmiechem.</p>
      <div className="flex justify-center space-x-6 mb-8 text-sm">
        <a href="#" className="hover:text-white transition-colors">Polityka prywatności</a>
        <a href="#" className="hover:text-white transition-colors">Regulamin</a>
        <a href="#" className="hover:text-white transition-colors">Cennik</a>
      </div>
      <p className="text-sm border-t border-gray-800 pt-8">&copy; {new Date().getFullYear()} Ognisko Muzyczne Barwy Muzyki. Wszelkie prawa zastrzeżone.</p>
    </div>
  </footer>
);

// --- Główny komponent Aplikacji ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen font-sans bg-gray-50 text-gray-900 scroll-smooth">
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <Hero />
      <Offer />
      <WhyUs />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}