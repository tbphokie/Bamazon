var mysql = require("mysql");
var inquirer = require("inquirer");
var conTable = require("console.table");

// create the connection information for the sql database
connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "rxoxoxtx",
  database: "bamazon_DB"
});
connection.connect(function(err) {
  if (err) throw err;

});

var ids = [];

CustomerView = function(connection){

    this.connection = connection;
    if(this instanceof CustomerView){

    } else {
        return new CustomerView();
    }
};



CustomerView.prototype.displayAll = function(){
  // query the database for all items being auctioned
  connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products", function(err, results) {
    if (err) throw err;
    console.table(results);

    ids = []; //clear array

    for(var i=0; i<results.length; i++){
      ids.push(results[i].item_id);
    }

    purchaseItem();
  
     });
}

purchaseItem = function(){
  // prompt the user for which they'd like to purchase
  inquirer.prompt([
    {
      name: "id",
      type: "input",
      message: "What item would you like to purchase (by item id)?",
      validate: function(value){
        var index = ids.indexOf(parseInt(value));
        if(index != -1){
          return true;
        } else {
          console.log("\nCould not find that id\n");
          return false;
        }

      }
    },
    {
      name: "quantity",
      type: "input",
      message: "How many do you want to buy?",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    }
  ]).then(function(results) {


    var query = connection.query("Select * from products where ?", {item_id: parseInt(results.id)}, function(err, data) {
			if (err) throw err;
      // get the information of the chosen item
      if(data.length > 0){
        // determine if enough stock
       if(data[0].stock_quantity > results.quantity ){
         // bid was high enough, so update db, let the user know, and start over
         var totalPrice = results.quantity*data[0].price;
          query = connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: (data[0].stock_quantity-results.quantity),
                product_sales: (data[0].product_sales+totalPrice)
              },
              {
                item_id: parseInt(results.id)
              }
            ],
            function(error) {
              if (error) throw err;
              console.log(`Your purchase of $${totalPrice} was successful`);
              connection.end();
              //cv.displayAll();
            }
          );
        }
        else {
          // bid wasn't high enough, so apologize and start over
          console.log("Not enough stock. Try again...");
          cv.displayAll();
        }
      }
    });
});
};

/*CustomerView.prototype.purchaseItem = function(id, quantity){
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: stock_quantity-quantity,
            product_sales: product_sales+(price*quantity)
          },
          {
            item_id: id
          }
        ],
        function(error) {
          if (error) throw err;
          console.log("Item(s) purchased successfully!");
        }
      );
};

CustomerView.prototype.onExit = function(){
    console.log("exiting");
    //connecton.end();
}

CustomerView.prototype.getConnection = function(){
    //console.log(connection);
};
*/

var cv = new CustomerView();
cv.displayAll();

// Exporting constructor
module.exports = CustomerView;