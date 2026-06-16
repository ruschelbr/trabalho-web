import { FormPagina, FormTitulo, FormCampo, FormAcoes } from '../components/FormPagina.jsx'

function Contato() {
  function handleSubmit(e) {
    e.preventDefault()
  }

  return (
    <FormPagina onSubmit={handleSubmit}>
      <FormTitulo>Contato</FormTitulo>
      <FormCampo label="Nome:" htmlFor="nome-contato">
        <input type="text" name="nome" id="nome-contato" className="form-input linha-form" />
      </FormCampo>
      <FormCampo label="Email:" htmlFor="email-contato">
        <input type="email" name="email" id="email-contato" className="form-input linha-form" />
      </FormCampo>
      <FormCampo label="Mensagem:" htmlFor="mensagem-contato">
        <textarea
          name="mensagem"
          id="mensagem-contato"
          className="form-input linha-form textarea-contato"
          rows={5}
        />
      </FormCampo>
      <FormAcoes>
        <button type="submit" className="btn linha-form">
          Enviar
        </button>
      </FormAcoes>
    </FormPagina>
  )
}

export default Contato
