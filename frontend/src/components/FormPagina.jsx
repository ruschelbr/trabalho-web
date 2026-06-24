function FormPagina({ children, rodape, onSubmit, className = '' }) {
  return (
    <form
      id="caixa-branca"
      className={`inter form-pagina-wrap ${className}`.trim()}
      onSubmit={onSubmit}
    >
      <div className="form-pagina">{children}</div>
      {rodape}
    </form>
  )
}

function FormTitulo({ children, subtitulo }) {
  return (
    <div className="form-titulo google-sans">
      <p className="nome-formulario texto-escuro">{children}</p>
      {subtitulo}
    </div>
  )
}

function FormCampo({ label, htmlFor, children }) {
  return (
    <div className="form-campo">
      {label && (
        <label className="texto-escuro">
          {label}
        </label>
      )}
      {children}
    </div>
  )
}

function FormAcoes({ children }) {
  return <div className="form-acoes">{children}</div>
}

function FormUpload({ id, name, label, onChange }) {
  return (
    <div className="form-campo">
      {label && <span className="texto-escuro form-upload-label">{label}</span>}
      <input type="file" name={name} id={id} className="d-none" onChange={onChange} />
      <label htmlFor={id} className="form-input linha-form form-upload">
        Upload
      </label>
    </div>
  )
}

export { FormPagina, FormTitulo, FormCampo, FormAcoes, FormUpload }
