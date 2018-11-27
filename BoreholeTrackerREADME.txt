This is the Readme For the boreholetracker task that was assigned to me
This document will contain some notes on the process that i followed and the result i came up with, as well as a walk through and some explanation

************
* Planning *
************

Initially when i received the request to do this task and saw that requirements stipulated that i should use node.js package to complete the back-end operations and angularjs to complete the front-end
The database that i am using is a phpmyadmin-based MySQL web application. I decided that because i didnt know much about node.js that i should sharpen up on my knowledge and attempt to complete the task as the requirements stipulated.
Along with the phpmyadmin web application, i use wamp server that hosts my web pages for me, in the preparation a list of instructions will follow to set up a usable environment.
I did however not get so lucky to get the nodejs working in my application and i reverted doing the back end operations to php functions that get executed when database requests are made from the frontend.
I attached some of the code that i attempted with node.js in a folder, but decided not to continue working on that as it would take too much time to figure out from scratch. 
I am sure with proper training in the language and maybe a point out of my mistakes, I would improve my knowledge significantly in this regard.

**************
* Final Site *
**************

The final site that is contained in the folders is a Borehole Data Tracking site that allows for the add, edit, delete, reinstate and view of and boreholes and/or water readings that are linked to boreholes.
This is purely the CRUD operations that are performed and none of the bonus features were implemented as requested.
The feature that allows the user to sort the borehole names alphabetically was added in automatically using a simple orderby function found in angularjs.
The feature allowing filtering by types is completed by using the search bar that i have added to each component, which lowers the sample size using a filter.

***************
* Preparation *
***************

Firstly if you are familiar with the phpmyadmin then you will find the following files:

BoreholeTracker.sql (Database export, no inserts included):
which can be imported into the phpmyadmin database application

DBConn.php
Which is my php script that uses the variables inside to connect to the the said database throught the port specified
!!!! Please change any variables that are different from the ones provided !!!!

from wamp server i run the address:  http://localhost:8080/projects/BoreholeTracker/index.html#/home

the folder structure will be added additionally.

The site will be able to be navigated without a database, but no operations can be completed.

******************
* Final Thoughts *
******************

please contact me on hoppies@live.co.za if there are any questions
