const form_market = document.getElementById('form-market');
const stock_list = document.getElementById('stock_list');
const stock_date = document.getElementById('stock_date');
const product = document.getElementById('product');
const market = document.getElementById('market');
const btnReset = document.getElementById('btnReset');

const loggedInUser = GetLoggedInUser();
CheckUserSession(loggedInUser, 'Customer');
let Stocks = GetStock();

function addStockDOM(stock){
    const item = document.createElement('li');
    item.classList.add("list-group-item");
    item.innerHTML = `<span hidden>${stock.id}</span>
        <span style="width: 5%;cursor: pointer;color: red;" onClick="removeStock('${stock.id}')">&#9745;</span>
        <span style="width: 15%;">${stock.stock_date}</span>
        <span style="width: 25%;">${stock.market}</span>
        <span style="width: 35%;">${stock.name}</span>
        <span style="width: 20%;">&#x20b9;${stock.cost}</span>`;
    stock_list.appendChild(item);
}

function filterStock(e){
    e.preventDefault();

    var tempStock = Stocks;
    
    if (market.value != 'All'){
        tempStock = tempStock.filter(s => s.market == market.value);
    }

    if (stock_date.value != ''){
        tempStock = tempStock.filter(s => s.stock_date == stock_date.value);
    }

    if (product.value != ''){
        tempStock = tempStock.filter(s => s.name.toLowerCase().includes(product.value.toLowerCase()));
    }

    stock_list.innerHTML = "";
    tempStock.forEach(addStockDOM);
}

function resetSearch(e){
    market.value = 'All';
    stock_date.value = '';
    product.value = '';
    filterStock(e);
}

function init(){
    stock_list.innerHTML = "";
    Stocks.forEach(addStockDOM);

    market.addEventListener("change",filterStock);
    product.addEventListener("keyup",filterStock);
    stock_date.addEventListener("change",filterStock);
    btnReset.addEventListener("click",resetSearch);
}

init();

