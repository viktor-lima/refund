// Seleciona os lementos do formulário
const amount = document.getElementById("amount");

// Captura o evento de input para formatar o valor
amount.oninput = () => {
  // Pega o input e remove caracteres não numéricos
  let value = amount.value.replace(/\D/g, "");

  // transformar valor em centavos
  value = Number(value) / 100;

  // Atualiza o valor do input
  amount.value = formatCurrenciesBRL(value);
  console.log(value);
  
}

const formatCurrenciesBRL = ( value ) =>{
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  })
  return value;
}