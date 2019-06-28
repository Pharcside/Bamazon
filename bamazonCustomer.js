// variables to require installed npm packages
var mysql = require("mysql");
var inquirer = require('inquirer');
var Table = require('cli-table-redemption');

// Connection to the database
var connection = mysql.createConnection({
  host: "localhost",

  
  port: 3307,

  
  user: "root",

  
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
 inventory();
});
// 
function inventory(){
    var table = new Table({
        head: ["ID", "Item", "Department", "Price", "Stock"],
        colWidths: [10, 50, 30, 25, 25]
});

inventory();

function listInventory(){
    for (var i = 0; i < res.length; i++) {
        var itemID = res[i].itemID;
        var productName = res[i].product_name;
        var departmentName = res[i].department_name;
        var price = res[i].price;
        var stockQuantity = res[i].stock_quantity;

    table.push [itemID, productName, departmentName, price, stockQuantity ]    

    }
}


}
