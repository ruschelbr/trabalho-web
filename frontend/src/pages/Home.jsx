import { Link } from 'react-router-dom'

const carouselSlides = [
  { src: '/album_1_carrossel.png', alt: 'Álbum 1' },
  { src: '/album_2_carrossel.png', alt: 'Álbum 2' },
  { src: '/album_3_carrossel.png', alt: 'Álbum 3' },
]

const exploreLinks = [
  { to: '/discografia', icon: '/disk-icon.png', label: 'Discografia', alt: 'Discografia' },
  { to: '/sobre', icon: '/info-icon.png', label: 'Sobre', alt: 'Sobre' },
  { to: '/contato', icon: '/contato-icon.png', label: 'Contato', alt: 'Contato' },
]

function Home() {
  return (
    <>
      <div className="container-home-1 d-flex flex-column">
        <div className="img-home-1">
          <img
            id="img-splippleman-abbey-road"
            src="/Splippleman_Abbey_Road.png"
            alt="Splippleman at Abbey Road"
            className="img-fluid"
          />
        </div>
        <div className="texto-home-1">
          <div className="row row-top">
            <p id="container-home-1-this-is" className="mb-12">
              this is.
            </p>
          </div>
          <div className="row row-bottom">
            <p id="container-home-1-splippleman" className="mb-12 animacao-splippleman-home-1">
              SPLIPPLEMAN
            </p>
          </div>
        </div>
      </div>

      <div className="container-home-2">
        <div className="carousel-wrapper">
          <div id="demo" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
              {carouselSlides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  data-bs-target="#demo"
                  data-bs-slide-to={i}
                  className={i === 0 ? 'active' : undefined}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>

            <div className="carousel-inner">
              {carouselSlides.map((slide, i) => (
                <div key={slide.src} className={`carousel-item${i === 0 ? ' active' : ''}`}>
                  <Link to="/discografia">
                    <img
                      src={slide.src}
                      alt={slide.alt}
                      className="d-block w-100 img-carrossel-home"
                    />
                  </Link>
                </div>
              ))}
            </div>

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#demo"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" />
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#demo"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" />
            </button>
          </div>
        </div>
      </div>

      <div className="container-home-3 py-4 px-5">
        <div className="titulo-home-3">
          <p id="container-home-3-texto">Explore.</p>
        </div>
        <div className="texto-e-imagem-home-3">
          {exploreLinks.map((item) => (
            <Link key={item.to} to={item.to} id="links-home-3">
              <div className="box-home-3">
                <img className="img-icones-home-3" src={item.icon} alt={item.alt} />
                <p className="texto-home-3">{item.label}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default Home
