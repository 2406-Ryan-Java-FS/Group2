# Group2

# Introduction

Auctionator is a single-page web application that allows users 
to register, sign in, list items for auction, and bid on auctions as well as leave 
comments on them. With admin permissions, users can approve items for auction and 
adjust the active status and remaining time on said auctions.

# Technologies/How to Run

Auctionator runs on a Spring 3 backend coded in Java, using Spring Boot, Spring Web, Spring Data JPA, and Dev Tools.
For the database, we used postgreSQL for our Relational Database Management System.
The repository layer sends SQL syntax to the database configured in the application.properties file - you will
need to have a database ready to host and configure the url and credentials in that file accordingly. Afterwards, there are 2 sql scripts provided in the sql-scripts folder
that will create the necessary tables in the database to persist data and another that inserts initial values into each table.

To get the backend running, simply run the AuctionatorApplication.java file in IntelliJ or your choice of coding software after
the application.properties has been configured. The Tomcat server embedded in the Spring container will run
on port 8080.

The frontend uses React components written in Javascript. To initialize the frontend, open the auctionator-front-end
folder in VSCode and open a terminal in auctionator-front-end/auctionator. You'll need Node.js installed on your machine;
first use `npm init -y` to initialize the project, then `npm install` to install the Node modules folder, next run `npm install react-router-dom` to install this dependency for React, 
and then `npm start` to run the app. It will run on port 3000, and should open the login page in your default browser when it runs.

# Continuing Development

Stretch features include user balance integration with completing auctions, as well as automatic time limit updating to active auctions.
A function should keep track of the current time remaining on each auction and be able to display the updated minutes remaining for each
listing in the auction-table component. Additionally, further development teams should modify the update-auction-admin component such
that if an admin modifies an auction status as "Completed", that auction should end and the amount of the current bid should be deducted
from the bidder using their ID and added to the balance of the previous item owner. After that, the item should be removed from the 
previous owner and added to the collection of the bidder.

Finally, many components are divided in two via client permissions vs. admin permissions. Keep this in mind when rendering modified components 
and adding future ones.
