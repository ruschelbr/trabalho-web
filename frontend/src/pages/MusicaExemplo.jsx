const comentarios = [
  { nome: 'Foto X / Nome X', texto: 'Comentário X' },
  { nome: 'Foto Y / Nome Y', texto: 'Comentário Y' },
  { nome: 'Foto Z / Nome Z', texto: 'Comentário Z' },
]

function MusicaExemplo() {
  function handleSubmit(e) {
    e.preventDefault()
  }

  return (
    <main className="pagina-musica google-sans">
      <section className="musica-container">
        <div className="musica-topo">
          <div className="musica-album">
            <img src="/Albun1.png" alt="Welcome to the Magic Room" className="musica-capa" />
            <p className="musica-album-nome">Welcome to the Magic Room</p>
          </div>

          <div className="musica-detalhes">
            <h1 className="musica-titulo">X-Ray Riff Machine</h1>
            <div className="musica-video-placeholder">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/ycYCbpjG6A8?si=M_lL2nJxH6-oWNUu"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        <section className="musica-comentarios">
          <h2 className="comentarios-titulo">Comentários da música</h2>
          {comentarios.map((c) => (
            <div key={c.nome} className="comentario-card">
              <div className="comentario-topo">
                <div className="comentario-foto" />
                <span className="comentario-nome">{c.nome}</span>
              </div>
              <p className="comentario-texto">{c.texto}</p>
            </div>
          ))}
          <p className="comentarios-mais">...</p>
        </section>

        <section className="musica-novo-comentario">
          <h2 className="comentarios-titulo">Deixe o seu comentário também!</h2>
          <form action="#" method="post" className="form-comentario" onSubmit={handleSubmit}>
            <textarea
              name="comentario"
              id="comentario"
              className="form-comentario-textarea"
              placeholder="Digite aqui o seu comentário..."
              required
            />
            <button type="submit" className="btn btn-comentario mt-3">
              Comentar
            </button>
          </form>
        </section>
      </section>
    </main>
  )
}

export default MusicaExemplo
