# mecig
mE-Cig is an application which allows users to create a network of buddies to help hold them accountable and provide support while they quit smoking. 

Run server: node app.js or nodemon app.js 

Data Vis: 
* Populated with D3.js 

* To change graph data go to carousel.js and change the data file on line 15


Sending Texts: 
* Text messages are sent using Twillio and are sent using a schedular.

* To send a message go to app.js line 104 to set the date and time for delivery. 

* The number and message are sent when visiting 
    http://localhost:3000/notify
    http://localhost:3000/notifyjason
    http://localhost:3000/notifydad


Sending Emails: 
* To populate weekly progress email: http://localhost:3000/send-email
    * Go to app.js line 78 to change email address to field 

* To populate buddy invite email: http://localhost:3000/send-invite
   * Go to app.js line 84 to change email address to field
