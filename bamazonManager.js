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

var startQuestions = [
    {
      type: 'rawlist',
      name: 'type',
      message: 'View: [1] - Products for Sale, [2] - Low Inventory, [3] - Add Inventory, [4] - Add New Product, [5] - Exit?',
      choices: [
          "Products for Sale",
          "Low Inventory",
          "Add Inventory",
          "Add New Product",
          "EXIT"
      ]
    }
];

var bExit = false;  //boolean to determine when to exit the application
var ids = [];

//startBamazonManager displays top menu to enter as customer, manager, or supervisor until
//user selects prompt to exit
function startBamazonManager(){
    console.log("-------------------Welcome to Bamazon Manager-------------------------");

    inquirer.prompt(startQuestions).then( function(answer) {
        if(answer.type === 'Products for Sale'){
            products(true);
        } else if ( answer.type ===  'Low Inventory'){
            lowInventory();
        } else if (answer.type === 'Add Inventory'){
            addInventory();
        } else if (answer.type === 'Add New Product'){
                addProduct();
        } else if(answer.type === 'EXIT'){
            console.log("Goodbye");
            bExit = true;
            onExit();
        }

        //Recursively call startBamazon until user selects "Exit"
        //if(bExit){ 
         //   onExit();
        //}

    });  

}

function products(display){
  // query the database for all items being auctioned
  connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(err, results) {
    if (err) throw err;
    if(display === true){
        var emptyArray = [];
        console.table(emptyArray);    
        console.table(results);
    }

    ids = []; //clear array

    for(var i=0; i<results.length; i++){
      ids.push(results[i].item_id);
    }
    //if(display)
        startBamazonManager();
     });

}

function lowInventory(){
  // query the database for all items being auctioned
  connection.query("SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity < 5", function(err, results) {
    if (err) throw err;
    var emptyArray = [];
    console.table(emptyArray);
    if(results.length == 0){
        console.log("No low inventory at this time.");
    } else {
        console.table(results);        
    }

    startBamazonManager();
     });
}

function addInventory(){
  // query the database for all items being auctioned
  connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products", function(err, results) {
    if (err) throw err;
    console.table(results);

    ids = []; //clear array

    for(var i=0; i<results.length; i++){
      ids.push(results[i].item_id);
    }

    inquirer.prompt([
        {
          name: "id",
          type: "input",
          message: "What item would you like to add inventory for (by item id)?",
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
          message: "How many do you want to buy items to add?",
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

             // bid was high enough, so update db, let the user know, and start over
             var newTotal = parseInt(results.quantity)+data[0].stock_quantity;
              query = connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                  {
                    stock_quantity: newTotal
                  },
                  {
                    item_id: parseInt(results.id)
                  }
                ],
                function(error) {
                  if (error) throw err;
                  console.log(`Inventory for ${data[0].item_id} ${data[0].product_name} has been updated to ${newTotal}`);
                  startBamazonManager();

                }
              );

          }
        });
    });
  
     });
}

var choose = function(ids){


    console.log(ids);
  // prompt the user for which they'd like to update quantity
  inquirer.prompt([
    {
        name: "choice",
        type: "list",
        choices: function(){
            var idArray = [];
            for(var i=0; i<ids.length;i++){
                idArray.push(ids[i].toString());
            }
            console.log("ids", ids);
            console.log("idArray", idArray);
            return idArray;
        },
        message: "What item id are you updating?"
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

    console.log("got to then");
    var query = connection.query("Select * from products where ?", {item_id: parseInt(results.choice)}, function(err, data) {
			if (err) throw err;
      // get the information of the chosen item
      var newTotal = data[0].stock_quantity+results.quantity;
      if(data.length > 0){
        // update new quantity
          query = connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: (newTotal)
              },
              {
                item_id: results.choices
              }
            ],
            function(error) {
              if (error) throw err;
              console.log(`Inventory for ${data[0].item_id} ${data[0].product_name} has been increased to ${newTotal}.`);
              //connection.end();
              //cv.displayAll();
            }
          );
        }
        else {
          // bid wasn't high enough, so apologize and start over
          console.log("Not enough stock. Try again...");
          cv.displayAll();
        }
      });
    });
};

function addProduct(){
  // query the database for all items' ids to verify not a duplicate
  connection.query("SELECT item_id FROM products", function(err, results) {
    if (err) throw err;
    ids = []; //clear array

    for(var i=0; i<results.length; i++){
      ids.push(results[i].item_id);
    }
    inquirer.prompt([
        {
          name: "id",
          type: "input",
          message: "Type in new item id-",
          validate: function(value){
            var index = ids.indexOf(parseInt(value));
            if(index != -1){
              console.log("\nThat id is already in use, try again.");
              return false;
            } else {

              return true;
            }
    
          }
        },
        {
          name: "name",
          type: "input",
          message: "Type in new product name-"
        },
        {
          name: "dept",
          type: "input",
          message: "Type in new product's department-"
        },
        {
          name: "price",
          type: "input",
          message: "Type in new product price-",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        },                
        {
          name: "quantity",
          type: "input",
          message: "How many new items to add-",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        }
      ]).then(function(results) {
        
        //Add check here to make sure department exists first, if not add to department table

        //Create query to do insert
        var queryText = "Insert into products (item_id, product_name, department_name, price, stock_quantity)";
        queryText += ` VALUES (${results.id}, '${results.name}', '${results.dept}', ${results.price}, ${results.quantity})`;

        var query = connection.query(queryText, function(err, data) {
                if (err) throw err;
                console.log(`${results.quantity} items of ${results.id} ${results.name} have been added.`);
                startBamazonManager();                
     });
  
     });
    
});
}

function onExit(){
    connection.end();
}

startBamazonManager();