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


connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});

function displayProducts() {
    connection.query("SELECT * FROM Products", function (err, data) {
        if (err) throw err;

        console.log();
        console.log("---------- Welcome To BAMAZON ----------");
        console.log("--------------------------------------------------------------------------------------------------");
        for (var i = 0; i < data.length; i++) {
            console.log("Item ID: " + data[i].item_id + " | " + "Product Name: " + data[i].product_name + " | " + "Department Name: " + data[i].department_name + " | " + "Price: " + data[i].price + " | " + "Stock Quantity: " + data[i].stock_quantity);
            console.log("--------------------------------------------------------------------------------------------------");
        }
        purchasePrompt();
    });
    function purchasePrompt() {
        inquirer.prompt([
            {
                type: "input",
                message: "What is the ID of the product you would like to buy?",
                name: "id"
            },
            {
                type: "input",
                message: "How many units would you like to buy?",
                name: "units"
            }])

            .then(function (answer) {
                var buyid = answer.id;
                var quantitys = answer.units;
                totalProduct(buyid, quantitys)
            });

    }
};

function totalProduct(id, quntityStocks){
	connection.query("SELECT * FROM Products WHERE item_id = " + id, function(err, data){
		if (err) throw err;

		if (quntityStocks <= data[0].stock_quantity){
			var totals = data[0].price * quntityStocks;
			console.log("Your total for " + quntityStocks + ", " + data[0].product_name + " is " + totals + ". Thank you for order with items.");
			connection.query("UPDATE Products SET stock_quantity = stock_quantity - " + quntityStocks + " WHERE item_id = " + id);

			connection.query("SELECT * FROM products", function(err, data){
				if (err) throw err;
				var name;
				for(var i = 0; i < data.length; i++){																					
					if(data[i].department_name === id.department_name){
						name = i;
					}
				}
			
			});
		} 
		else {
			console.log("Our apologies, Insufficient Quantity!" + data[0].product_name + " to fulfill your order.");
		}
	displayProducts();
	});
};


displayProducts();