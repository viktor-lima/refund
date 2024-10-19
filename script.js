// Seleciona os lementos do formulário
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

// Seleciona os elementos da lista.
const expenseList = document.querySelector("ul");
const expenseTotal = document.querySelector("aside header h2");
const expensesQuantity = document.querySelector("aside header p span"); 

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
// Adiciona um novo item na lista
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


    // Cria o valor da despesa
    const expenseAmount = document.createElement("span")
    expenseAmount.classList.add("expense-amount");
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`;

    // Crias o ìcone de remover
    const removeIcon = document.createElement("img");
    removeIcon.classList.add("remove-icon");
    removeIcon.setAttribute("src", "img/remove.svg");
    removeIcon.setAttribute("alt", "remover");


    // Adiciona as informações no item.
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon);
    // Adiciona as informações na lista.
    expenseList.append(expenseItem);

    // Limpa o formulário
    formClear();
    // Atualiza os totais
    updateTotals();
  } catch (error) {
    alert("Não foi possivel atualizar a lista de despesas.");
    console.log(error);
  }

}

// Atualiza os totais 
const updateTotals = () => {
  try {
    
    // Recupera todos os itens (li) da lista (ul)
    const items = expenseList.children;

    // Atualiza a quantidade de itens da lista
    expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`;

    // Variavel para incrementar o total e percorrer cada item da lista
    let total = 0
    for (let i = 0; i < items.length; i++) {
      const itemAmount = items[i].querySelector(".expense-amount");
      let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",",".");      
      value = parseFloat(value);
      if(isNaN(value)){
        return alert(
          "Nao foi possivel calcular o total. O valor não parece ser um número"
        );
      }

      // incremena o valor total.
      total += Number(value);
    }

    // Criar a span para adicionar o RS formatado
    const symbolBRL = document.createElement("small");
    symbolBRL.textContent = "R$";
    // Formata o valor e remove o simbolo da moeda que será exibido com um estilo customizado
    total = formatCurrenciesBRL(total).toUpperCase().replace("R$", "");

    // Limpa p conteúdo do elemento
    expenseTotal.innerHTML = "";

    // Adiciona o symbolo da moeda e o valor total formatado
    expenseTotal.append(symbolBRL, total);

  } catch (error) {
    console.log(error);
    alert("Não foi possível atualizar os totais")
  }
}

// Evento que captura click nos itens da lista
expenseList.addEventListener("click", (event) => {

  if(event.target.classList.contains("remove-icon")){
    // Obtém a 'li' pai do elemendo clicado
    const item = event.target.closest(".expense");

    // Remove o item da lista
    item.remove();
  }
  // Atualiza os totais
  updateTotals();

})


const formClear = () => {
  expense.value = ""
  category.value = ""
  amount.value = ""

  expense.focus();
}
