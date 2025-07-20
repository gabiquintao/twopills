import { Link, useLocation } from 'react-router-dom';
import type { NavbarProps, NavigationLink } from '@/types/navigation';
import { NAVIGATION_LINKS } from '@/utils/constants';

const Navbar = ({ className = '' }: NavbarProps) => {
  const location = useLocation();

  const getCurrentPage = (): string => {
    const currentLink = NAVIGATION_LINKS.find(
      (link: NavigationLink) => link.href === location.pathname
    );
    return currentLink?.label || 'Home';
  };

  return (
    <nav
      className={`bg-white text-black shadow-sm sticky top-0 z-40 font-sans ${className}`}
    >
      <div className="mx-auto px-6 lg:px-12">
        <div className="relative flex items-center justify-between h-16">
          <img src="/Twopills.svg" alt="Logo" width={40} />

          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <span className="text-md font-semibold text-gray-800">
              {getCurrentPage()}
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {NAVIGATION_LINKS.map((link: NavigationLink) => {
              const isActive = location.pathname === link.href;

              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-yellow-600'
                      : 'text-gray-900 hover:text-yellow-600'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-yellow-600" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
