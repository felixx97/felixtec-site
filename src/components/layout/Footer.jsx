import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NAV_LINKS, SOCIAL_LINKS } from '../../data/siteConfig';
import { SocialIcon } from '../widgets/Icons';

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e, item) => {
    if (!item.hash) return;
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
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-row">
          <div className="footer-brand footer-column">
            <span className="footer-logo">FélixTec</span>
            <p>Soluções digitais para seu negócio.</p>
          </div>

          <div className="footer-column">
            <h4>Navegação</h4>
            <ul className="footer-links-list">
              {NAV_LINKS.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} onClick={(e) => handleNavClick(e, item)}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/politicas">Políticas &amp; Termos</Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Conecte-se</h4>
            <ul className="footer-links-list">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-icon-link"
                  >
                    <SocialIcon id={social.id} size={14} />
                    <span>{social.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 FélixTec. Todos os direitos reservados. Design inspirado na estética minimalista premium.</p>
        </div>
      </div>
    </footer>
  );
}

