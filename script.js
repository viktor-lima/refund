// Seleciona os lementos do formulário
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

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

// Captura evento de submit do usuario para obter os valores
form.onsubmit = (event) => {
  event.preventDefault();

  // Objeto com os detalhes da nova despesa.
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    create_at: new Date(),
  }  
}

