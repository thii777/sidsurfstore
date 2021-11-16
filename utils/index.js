export const formatMoney = (value) =>
  "R$ " +
  parseInt(value || 0)
    .toFixed(2)
    .replace(".", ",");

export const ESTADOS = [
  { state: "Acre", uf: "AC" },
  { state: "Alagoas", uf: "AL" },
  { state: "Amapá", uf: "AP" },
  { state: "Bahia", uf: "BA" },
  { state: "Ceará", uf: "CE" },
  { state: "Distrito Federal", uf: "DF" },
  { state: "Espírito Santo", uf: "ES" },
  { state: "Goiás", uf: "GO" },
  { state: "Maranhão", uf: "MA" },
  { state: "Mato Grosso", uf: "MT" },
  { state: "Mato Grosso do Sul", uf: "MS" },
  { state: "Minas Gerais", uf: "MG" },
  { state: "Pará", uf: "PA" },
  { state: "Paraíba", uf: "PA" },
  { state: "Paraná", uf: "PR" },
  { state: "Pernambuco", uf: "PE" },
  { state: "Piauí", uf: "PI" },
  { state: "Rio de Janeiro", uf: "RJ" },
  { state: "Rio Grande do Norte", uf: "RN" },
  { state: "Rio Grande do Sul", uf: "RS" },
  { state: "Rondônia", uf: "RO" },
  { state: "Roraima", uf: "RR" },
  { state: "Santa Catarina", uf: "SC" },
  { state: "São Paulo", uf: "SP" },
  { state: "Sergipe", uf: "SE" },
  { state: "Tocantins", uf: "TO" },
];
