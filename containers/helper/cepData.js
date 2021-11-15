import axios from "axios";

module.exports = async (cep) => {
  const { data: addressComplete } = await axios.get(
    `https://viacep.com.br/ws/${cep.replace(" ", "")}/json/`
  );

  return addressComplete;
};
