# Bamazon
<h2>Amazon-like storefront CLI app using MySql</h2>

<h2>Requirements:</h2>
Bamazon uses a MySql database to store the inventory and sales data therefore the appropriate version MySql for your computer.  To create the bamazon database, run the bamazon.sal file within your MySql client to create the needed database. Clone the github repository, install the node packages needed by issuing the npm install command from within the repository directory.

<h2>Customer mode</h2>
Current inventory details are displayed to the user followed by 2 prompts. The first prompt asks for the id of the product the user wants to buy and the second asks the user for the quantity being purchased.  Before the order is placed, the quantity is verified against existing inventory.  If there isn't enough inventory to place the order, the order is cancelled and the user is notified.  If there is enough inventory, the order is placed and the inventory is updated appropriately.
To run this the command is:
<pre> 
    <code>node bamazonCustomer.js</code>
</pre>

<h2>Manager mode</h2>
The manager is presented with the following 4 options:
<ol>
    <li>View Products for Sale</li>
        Lists details for all items currently for sale
    <li>View Low Inventory</li>
        Lists details for all items that are running low on stock (defined here as having fewer than 5 items).
    <li>Add to Inventory</li>
        Additional inventory item count is added to current inventory number.
    <li>Add New Product</li>
        New product item information can be added.
</ol>

To run this the command is:
<pre> 
    <code>node bamazonManager.js</code>
</pre>

<h2>Supervisor mode</h2>
The supervisor is presented with options to view sales by department which includes calculating the total profit by department or to create a new department.

To run this the command is:
<pre> 
    <code>node bamazonSupervisor.js</code>
</pre>

<h2>Demo Video</h2>
The <a href="https://youtu.be/FW50oWzf-Cg">demo video</a> shows an interaction of a customer, manager, and a supervisor.  For best results, download the video BamazonCustomer.mp4 so it can be watched full screen to be sure the text is legible. 

<h2>Future enhancements inlcude</h2>
<ul>
    <li>Adding one entry point through main.js</li>
</ul>