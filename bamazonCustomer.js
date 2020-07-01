var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon_db"
});
var stock_quantity = res[i].stock_quantity;

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});

var displayProducts = function () {
    connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("Item Id: " + res[i].item_id + " || Product Name: " + res[i].product_name + " || Department Name: " + res[i].department_name
                + " || Price: " + res[i].price + " || Stock Quantity: " + res[i].stock_quantity);

        }
        purchasePrompt();
    });
};
function purchasePrompt() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the ID of the product you would like to buy?",
            name: "productId"
        },
        {
            type: "input",
            message: "How many units would you like to buy?",
            name: "units"
        }

    ])

        .then(function (inquirerResponse) {
            var productQuantity = inquirerResponse.units;
            var idRequested = inquirerResponse.productId;
            purchaseOrder(idRequested, productQuantity);
        });
}

function purchaseOrder(idRequested, amtNeeded, productQuantity) {
    connection.query('Select * FROM products WHERE item_id = ' + idRequested, function (err, res) {
        if (err) { console.log(err) };
        if (amtNeeded <= res[0].stock_quantity) {
            var totalCost = res[0].price * amtNeeded;
            console.log("Good news your order is in stock!");
            console.log("Your total cost for " + amtNeeded + " " + res[0].product_name + " is " + totalCost + " Thank you!");
            updateProduct();
            function updateProduct() {
                console.log("Updating Quantity...\n");

                connection.query(

                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: (res[idRequested].stock_quantity - productQuantity)
                        },
                        {
                            item_id: ans.id
                        }
                    ],
                    function (err, res) {
                        if (err) throw err;

                    }

                );
            }
            //connection.query("UPDATE products SET stock_quantity = stock_quantity - " + amtNeeded + "WHERE item_id = " + idRequested);
        } else {
            console.log("Insufficient quantity, sorry we do not have enough " + res[0].product_name + "to complete your order.");
        };

        displayProducts();
    });
};


displayProducts();