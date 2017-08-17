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
      message: 'Options: [1] - View Product Sales by Department, [2] - Create New Department, [3] - Exit',
      choices: [
          "View Product Sales by Department",
          "Create New Department",
          "EXIT"
      ]
    }
];

//startBamazonSupervisor displays top menu to enter as supervisor to view sales or create new department until
//user selects prompt to exit
function startBamazonSupervisor(){
    console.log("-------------------Welcome to Bamazon Supervisor-------------------------");

    inquirer.prompt(startQuestions).then( function(answer) {
        if(answer.type === 'View Product Sales by Department'){
            salesByDept();
        } else if ( answer.type ===  'Create New Department'){
            createDept();
        } else if(answer.type === 'EXIT'){
            console.log("Goodbye");
            onExit();
        }


    });  

}

function salesByDept(){
  /*
  Query to get this resultSet
    select departments.department_id, departments.department_name, departments.overhead_costs, SUM(products.product_sales) as product_sales, SUM(products.product_sales-departments.overhead_costs) as total_sales
    from departments
    join products on departments.department_name = products.department_name
    group by departments.department_id;
*/
  var queryText = "select departments.department_id, departments.department_name, departments.overhead_costs, SUM(products.product_sales) as product_sales, SUM(products.product_sales-departments.overhead_costs) as total_sales";
  queryText += " from departments";
  queryText += " join products on departments.department_name = products.department_name";
  queryText += " group by departments.department_id";

  var query = connection.query(queryText, function(err, data) {
    if (err) throw err;
    console.table(data);
startBamazonSupervisor(); 
  });
}

function createDept(){
  // query the database for all items' ids to verify not a duplicate
  connection.query("SELECT department_id FROM departments", function(err, results) {
    if (err) throw err;
    ids = []; //clear array

    for(var i=0; i<results.length; i++){
      ids.push(results[i].item_id);
    }
    inquirer.prompt([
        {
          name: "id",
          type: "input",
          message: "Type in new department id-",
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
          name: "overhead",
          type: "input",
          message: "Type in new department overhead-",
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
        var queryText = "Insert into departments (department_id, department_name, overhead_costs)";
        queryText += ` VALUES (${results.id}, '${results.name}', '${results.overhead}')`;

        var query = connection.query(queryText, function(err, data) {
                if (err) throw err;
                console.log(`Added ${results.id} ${results.name} with overhead of ${results.overhead}.`);
        startBamazonSupervisor();                
     });
  
     });
    
});
}

function onExit(){
    connection.end();
}

startBamazonSupervisor();