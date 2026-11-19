import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GAMING_LINKS, NAV_LINKS } from '../../data/siteConfig';
import { ArcadeMonitorIcon, SocialIcon } from '../widgets/Icons';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [dropdownOpen]);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location.pathname, location.hash]);

  const handleNavClick = (e, item) => {
    setMobileOpen(false);
    if (!item.hash) return; // normal route like /servicos

    e.preventDefault();
    if (location.pathname === '/') {
      const target = document.getElementById(item.hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${item.hash}`);
    }
  };

  return (
    <nav className="navbar" id="navbar">
      <div className="nav-container">
        <Link
          to="/"
          className="nav-logo"
          id="nav-logo"
          onClick={() => {
            setMobileOpen(false);
            if (location.pathname === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          FélixTec
        </Link>

        <ul className={`nav-links${mobileOpen ? ' active' : ''}`}>
          {NAV_LINKS.map((item) => {
            const isActive = !item.hash && location.pathname === item.to;
            const highlightClass = item.highlight === 'natal' ? ' nav-link-natal' : '';
            return (
              <li key={item.label}>
                <Link
                  to={item.to}
                  className={`nav-link${highlightClass}${isActive ? ' active' : ''}`}
                  onClick={(e) => handleNavClick(e, item)}
                >
                  {item.highlight === 'natal' ? `✦ ${item.label}` : item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="nav-cta-dropdown" ref={dropdownRef}>
          <button
            type="button"
            className="nav-cta-btn"
            id="nav-cta-dropdown-btn"
            aria-label="Jogue comigo - Steam e Discord"
            aria-expanded={dropdownOpen}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px 12px' }}
            onClick={(e) => {
              e.stopPropagation();
              setDropdownOpen((prev) => !prev);
            }}
          >
            <ArcadeMonitorIcon />
          </button>

          <div className={`nav-cta-dropdown-content${dropdownOpen ? ' active' : ''}`} id="nav-cta-dropdown-menu">
            {GAMING_LINKS.map((link) => (
              <a key={link.id} href={link.href} target="_blank" rel="noopener noreferrer">
                <SocialIcon id={link.id} size={14} style={{ marginRight: 8 }} />
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>

        <button
          type="button"
          className={`mobile-menu-toggle${mobileOpen ? ' active' : ''}`}
          aria-label="Abrir ou fechar menu"
          aria-expanded={mobileOpen}
          id="mobile-toggle"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          <span
            className="bar"
            style={{ transform: mobileOpen ? 'translateY(6px) rotate(45deg)' : 'none' }}
          />
          <span
            className="bar"
            style={{ transform: mobileOpen ? 'translateY(-6px) rotate(-45deg)' : 'none' }}
          />
        </button>
      </div>
    </nav>
  );
}

