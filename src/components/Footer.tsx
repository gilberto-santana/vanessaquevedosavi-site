import { Facebook, Instagram, Mail, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-pacifico text-2xl mb-4">
              Vanessa Quevedo Savi
            </h3>
            <p className="text-teal-100 mb-4">
              Transformando vidas através da massoterapia e terapias holísticas.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-teal-400 rounded-full flex items-center justify-center hover:bg-teal-300 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-teal-400 rounded-full flex items-center justify-center hover:bg-teal-300 transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-teal-100">
              <li>
                <a href="#cursos" className="hover:text-white transition-colors">
                  Cursos
                </a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-white transition-colors">
                  Sobre
                </a>
              </li>
              <li>
                <a
                  href="#depoimentos"
                  className="hover:text-white transition-colors"
                >
                  Depoimentos
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Contato</h4>
            <ul className="space-y-3 text-teal-100">
              <li className="flex items-center">
                <Phone size={18} className="mr-2" />
                <span>(00) 0000-0000</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2" />
                <span>contato@vanessaquevedo.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-teal-400/30 pt-8 text-center text-teal-100">
          <p>© 2024 Vanessa Quevedo Savi. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
