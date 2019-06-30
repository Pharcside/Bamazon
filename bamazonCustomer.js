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
    connection.end()
    startPromt();
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
        connection.query("SELECT * FROM products", function (err, res) {
            for (var i = 0; i < res.length; i++) {
                var itemID = res[i].itemID;
                var productName = res[i].product_name;
                var departmentName = res[i].department_name;
                var price = res[i].price;
                var stockQuantity = res[i].stock_quantity;

                table.push[itemID, productName, departmentName, price, stockQuantity]

            };
            console.log("~~~~~~~~~~~~~~~~Current Inventory~~~~~~~~~~~~~~~~~~~~~~~~");
            console.log(table.toString());
            connection.end();
            continuePrompt();


        }


        )
    }
}


continuePrompt() {
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
                    console.log("Great, we can fill your order!")
                }
            }
        }

    }