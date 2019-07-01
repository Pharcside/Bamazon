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

connection.connect(function (err, ) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    startPrompt();
});

function startPrompt() {
    inquirer.prompt([{
        type: "confirm",
        name: "confirm",
        message: "Would you like to view the inventory?",
        default: true

    }]).then(function (user) {
        if (user.confirm === true) {
            inventory();
        } else {
            console.log("Come back again soon!")
        }
    })
};

function inventory() {
    var table = new Table({
        head: ["ID", "Item", "Department", "Price", "Stock"],
        colWidths: [10, 50, 30, 25, 25]
    });

    listInventory();

    function listInventory() {
        connection.query("SELECT * FROM products", function (res) {
            for (var i = 0; i < res.length; i++) {
                var itemId = res[i].id,
                productName = res[i].product_name,
                departmentName = res[i].department_name,
                price = res[i].price,
                stockQuantity = res[i].stock_quantity;

          table.push(
              [itemId, productName, departmentName, price, stockQuantity]
        );

            };
            console.log("~~~~~~~~~~~~~~~~Current Inventory~~~~~~~~~~~~~~~~~~~~~~~~");
            console.log(table.toString());
            connection.end();
            continuePrompt();


        }


        )
    }
}


function continuePrompt() {
    inquirer.prompt([{
        type: "confirm",
        name: "confirm",
        message: "Would you like to purchace an item?",
        default: true

    }]).then(function (user) {
        if (user.continue === true) {
            selectionPrompt();
        } else {
            console.log("Come back soon!")
        }
    });
}

function selectionPrompt() {

    inquirer.prompt([{

        type: "input",
        name: "inputId",
        message: "Enter ID numer of the item you would like to purchase.",
    },
    {
        type: "input",
        name: "inputNumber",
        message: "How many units of this item would you like to buy?",
    }    

    
]).then(function (userPurchace) {
        connection.query("SELECT * FROM products WHERE item_id=?", userPurchace.inputId, function (err, res) {
            for (var i = 0; i < res.length; i++) {
                if (userPurchace.inputNumber > res[i]
                    .stock_quantity) {
                    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                    console.log("Sorry not enough in stock");
                    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                    startPrompt();

                } else {
                    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                    console.log("Great, we can fill your order!");
                    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                    console.log("Your have Selected: ");
                    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                    console.log("item: " + res[i].product.name);
                    console.log("Department: " + res[i].department_name);
                    console.log("Price: " + res[i].price);
                    console.log("Quantity: " * userPurchace.inputNumber);
                    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                    console.log("Total: " + res[i].price + userPurchace.inputNumber);
                    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

                    var newStock = (res[i].stock_quantity - userPurchace.inputNumber);
                    var purchaceID = (userPurchace.inputID);
                   // console.log(newStock);
                   confirmPrompt(newStock, purchaceID);
                }
            }
        })

    })}

    function confirmPrompt(newStock, purchaseId) {

        inquirer.prompt([{
    
            type: "confirm",
            name: "confirmPurchase",
            message: "Are you sure you would like to purchase this item and quantity?",
            default: true
    
        }]).then(function(userConfirm) {
            if (userConfirm.confirmPurchase === true) {
    
                
    
                connection.query("UPDATE products SET ? WHERE ?", [{
                    stock_quantity: newStock
                }, {
                    item_id: purchaseId
                }], function(err, res) {});
    
                console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                console.log("Purchace completed");
                console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                startPrompt();
            } else {
                console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                console.log("No worries. Maybe next time!");
                console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                startPrompt();
            }
            connection.end();
        });}