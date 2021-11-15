import React from 'react';
import Link from 'next/link';

const REDES_SOCIAIS = [
  { nome: "facebook", url: "#"},
  { nome: "instagram", url: "#"},
  { nome: "whatsapp", url: "#"}
];

const RedesSociais = () => (
  <div className="flex-1 flex vertical redes-sociais-container">
    <div>
      <h2>Redes Sociais</h2>
      <br/>
    </div>
    <div className="redes-sociais">
      {
        REDES_SOCIAIS.map((item, idx) => (
          <div className="">
            <Link href={item.url}>
              <i className={`fa fa-${item.nome} fa-lg`}></i>
            </Link>
          </div>
        ))
      }
    </div>
  </div>
);

export default RedesSociais;