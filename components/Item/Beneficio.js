import React from 'react';

export default ({ icone, texto, paragrafo }) => (
  <div className="advantages flex-1 wrap-2-mb">
    <div className="box flex beneficios-children">
      <div>
        <i className={`fa ${icone} fa-3x`}></i>
      </div>
      <div >
        <span className="beneficios-texto">{texto}</span>
        <p className="beneficios-nome">{paragrafo}</p>
      </div>
    </div>
  </div>
);