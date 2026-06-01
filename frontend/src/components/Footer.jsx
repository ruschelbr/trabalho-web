function Footer() {
  return (
    <footer className="google-sans">
      <div className="footer-conteudo">
        <div className="footer-esquerda">
          <p className="footer-logo">SPLIPPLEMAN</p>
          <div className="footer-icons d-flex align-items-center">
            <a
              href="https://open.spotify.com/intl-pt/artist/4dQ2640iVoRcfgmMW0BThy?si=JqEAwcLiSGq9XfVgV_EjuQ"
              className="footer-icon me-3"
            >
              <img src="/spotify.png" alt="Spotify" />
            </a>
            <a href="https://www.youtube.com/user/splippleman" className="footer-icon me-3">
              <img src="/youtube.png" alt="youtube" />
            </a>
            <a href="https://www.instagram.com/splippleman/" className="footer-icon">
              <img id="img-instagram" src="/instagram_512.png" alt="Instagram" />
            </a>
          </div>
        </div>
        <div className="footer-direita">
          <img src="/icon-rodape.png" alt="Splippleman" className="footer-logo" />
        </div>
      </div>
      <div className="footer-copy mt-5">
        <p>© 2026 Todos os direitos reservados</p>
      </div>
    </footer>
  )
}

export default Footer
