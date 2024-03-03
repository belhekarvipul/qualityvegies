const form_stock = document.getElementById('form-stock');
const stock_list = document.getElementById('stock_list');
const stock_date = document.getElementById('stock_date');
const market = document.getElementById('market');
const name = document.getElementById('name');
const cost = document.getElementById('cost');

const loggedInUser = GetLoggedInUser();
CheckUserSession(loggedInUser, 'Vendor');

const localStorageStocks = JSON.parse(localStorage.getItem('Stocks'));
let Stocks = localStorage.getItem('Stocks') !== null ? localStorageStocks : [];

function addStock(e){
    e.preventDefault();
    if(stock_date.value.trim() == "" || name.value.trim() == "" || cost.value.trim() == "")
    {
        alert('Please enter Date, Name and Cost');
    }    
    else
    {
        const stock = {
            id: generateId(),
            stock_date: stock_date.value,
            name: name.value,
            cost: cost.value,
            market: market.value
        };
        Stocks.push(stock);
        addStockDOM(stock);
        updateStockLocalStorage();
        name.value = "";
        cost.value = "";
        name.focus();
    }
}

function generateId(){
    return new Date().toLocaleString().replaceAll(' ','').replaceAll('/','').replaceAll(':','').replaceAll(',','');
}

function addStockDOM(stock){
    const item = document.createElement('li');
    item.classList.add("list-group-item");
    item.innerHTML = `<span hidden>${stock.id}</span>
        <span style="width: 5%;cursor: pointer;color: red;" onClick="removeStock('${stock.id}')">&#10006;</span>
        <span style="width: 15%;">${stock.stock_date}</span>
        <span style="width: 25%;">${stock.market}</span>
        <span style="width: 35%;">${stock.name}</span>
        <span style="width: 20%;">&#x20b9;${stock.cost}</span>`;
    stock_list.appendChild(item);
}

function removeStock(id){
    if (confirm("Stock will be removed, do you want to continue?")){
        Stocks = Stocks.filter(stock => stock.id != id);
        updateStockLocalStorage();
        init();
    }
}

function updateStockLocalStorage(){
    localStorage.setItem("Stocks", JSON.stringify(Stocks));
}

function init(){
    stock_list.innerHTML = "";
    Stocks.forEach(addStockDOM);

    $("#filterStocks").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        stock_list.innerHTML = "";
        var tempStock = Stocks;
        if (value != ""){
            tempStock = Stocks.filter(s => (s.market + ' ' + s.stock_date + ' ' + s.name + ' '+ s.cost).toLowerCase().includes(value));
        }
        tempStock.forEach(addStockDOM);
      });
}

init();
form_stock.addEventListener("submit",addStock);
