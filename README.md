# Bamazon
<h1>Amazon-like storefront CLI app using MySql</h1>

<h1>Requirements:</h1>
Bamazon uses a MySql database to store the inventory and sales data therefore the appropriate version MySql for your computer.  To create the bamazon database, run the bamazon.sal file within your MySql client to create the needed database. Clone the github repository, install the node packages needed by issuing the npm install command from within the repository directory.

<h2>Customer mode</h2>
Current inventory details are displayed to the user followed by 2 prompts. The first prompt asks for the id of the product the user wants to buy and the second asks the user for the quantity being purchased.  Before the order is placed, the quantity is verified against existing inventory.  If there isn't enough inventory to place the order, the order is cancelled and the user is notified.  If there is enough inventory, the order is placed and the inventory is updated appropriately.
<pre>To run this the command is: 
<code>node bamazonCustomer.js</code>
</pre>

<h2>Demo Video</h2>
The demo video shows an interaction of a customer viewing existing inventory, the steps that must be followed to place an order, and then the inventory count and sales data information being updated.  For best results, download the video BamazonCustomer.mp4 so it can be watched full screen to be sure the text is legible.

To run Bamazon in customer mode, 

<h2>Future enhancements inlcude</h2>
<ul>
    <li>Adding manager mode</li>
    <li>Adding supervisor mode</li>
    <li>Adding one entry point through main.js</li>
</ul>