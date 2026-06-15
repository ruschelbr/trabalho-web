function Contato() {
  function handleSubmit(e) {
    e.preventDefault()
  }

  return (
    <form
      id="caixa-branca"
      method="post"
      className="inter"
      onSubmit={handleSubmit}
    >
      <div className="container d-flex flex-column align-items-center justify-content-center">
        <div className="row py-0 px-5">
          <p className="my-3 nome-formulario texto-escuro">Contato</p>
        </div>
        <div className="row py-4 px-5">
          <label htmlFor="nome" className="my-3 texto-escuro">
            Nome:
          </label>
          <input type="text" name="nome" id="nome" className="form-input linha-form" />
        </div>
        <div className="row py-4 px-5">
          <label htmlFor="email" className="my-3 texto-escuro">
            Email:
          </label>
          <input type="email" name="email" id="email" className="form-input linha-form" />
        </div>
        <div className="row py-4 px-5">
          <label htmlFor="mensagem" className="my-3 texto-escuro">
            Mensagem:
          </label>
          <textarea
            name="mensagem"
            id="mensagem"
            className="form-input linha-form textarea-contato"
            rows={5}
          ></textarea>
        </div>
        <div className="row py-4 px-5">
          <button type="submit" className="btn mx-auto linha-form">
            Enviar
          </button>
        </div>
      </div>
    </form>
  )
}

export default Contato
