var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('myDB');      // file database

db.serialize(function() {
        
    db.run("CREATE TABLE IF NOT EXISTS User (name TEXT, password TEXT, option TEXT)");

    db.run("DELETE FROM User");
    db.run(`INSERT INTO User (name, password, option) VALUES ("Jason", "deakin2017", "1")`);
    db.run(`INSERT INTO User (name, password, option) VALUES ("Karl", "deakin2016", "2")`);
    db.run(`INSERT INTO User (name, password, option) VALUES ("Belgrave", "barby", "3")`);
    // NOTE: The order of the fields relates to the order of the Values provided
    db.run(`INSERT INTO User (password, name, option) VALUES ("cooldeakin", "Alice", "2")`);    
    
    // The SELECT operation is performed on the DB one row at a time and the function
    // is called for each row 'selected'
    console.log('Display all content from all rows of the DB');
    db.each("SELECT * FROM User", function(err, row) {
        console.log("[all] Name: " + row.name + "  Password: " + row.password + "  Option: " + row.option); 
    });
    // Or you can select 'specific' fields from a data row
    console.log('Display only the name and option fields from all rows of the DB');
    db.each("SELECT name, option FROM User", function(err, row) {
        console.log("[subset] Name: " + row.name + "  Option: " + row.option); 
    });
});
db.close(); 