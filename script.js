// Seleciona os lementos do formulário
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

// Seleciona os elementos da lista.
const expenseList = document.querySelector("ul");

// Captura o evento de input para formatar o valor
amount.oninput = () => {
  // Pega o input e remove caracteres não numéricos
  let value = amount.value.replace(/\D/g, "");

  // transformar valor em centavos
  value = Number(value) / 100;

  // Atualiza o valor do input
  amount.value = formatCurrenciesBRL(value);
  
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

  expenseAdd(newExpense)
}

const expenseAdd = ( newExpense ) => {
  try {
    // Cria o elemento para adicionar o item (li) na lista (ul).
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense");
    // Cria o ícone da categoria
    const expenseIcon = document.createElement("img");
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
    expenseIcon.setAttribute("alt", newExpense.category_name);

    // cria a info da depesa
    const expenseInfo = document.createElement("div");
    expenseInfo.classList.add("expense-info");

    // Cria o nome da despesa
    const expenseName = document.createElement("strong");
    expenseName.textContent = newExpense.expense;

    // Cria a categoria da despesa.
    const expenseCategory = document.createElement("span");
    expenseCategory.textContent = newExpense.category_name;

    //Adiciona name e category em expenseInfo (informações da despesa)
    expenseInfo.append(expenseName, expenseCategory);

    // Adiciona as informações no item.
    expenseItem.append(expenseIcon, expenseInfo);
    // Adiciona as informações na lista.
    expenseList.append(expenseItem,);

  } catch (error) {
    alert("Não foi possivel atualizar a lista de despesas.");
    console.log(error);
  }
}

