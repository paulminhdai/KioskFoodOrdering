const sqlite3 = require('sqlite3');
const express = require("express");
const data = require("./data");

const app = express();
app.use(express.urlencoded({ extends:true }));
app.use(express.json());

// Root URI
app.get('/', (req, res) => {
    res.send('Hello World!')
});

function isEmpty(str) {
    return (!str || str.length === 0 );;
}

function timestamp() {
    var date = new Date();
    return (date.getMonth()+1)+
          "/" + date.getDate()+
          "/" + date.getFullYear()+
          " " + date.getHours()+
          ":" + date.getMinutes()+
          ":" + date.getSeconds()
}

// Creat database and tables
const db = new sqlite3.Database('./kiosk.db', (err) => {
    if (err) {
        console.error("Error opening database " + err.message);
    } else {
        db.run('CREATE TABLE IF NOT EXISTS foodItems( \
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
            name NVARCHAR(50) NOT NULL,\
            image NVARCHAR(50) NOT NULL,\
            price FLOAT NOT NULL,\
            calories INTERGER,\
            category NVARCHAR(10),\
            ingredient NVARCHAR(100),\
            healthNotes NVARCHAR(50),\
            prepTime INTERGER,\
            inStock INTERGER(1)\
        )', (err) => {
            if (err) {
                console.log("Cannot create table foodItems. Because of" + err);
            }
        });

        db.run('CREATE TABLE IF NOT EXISTS orders( \
            number INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
            orderType NVARCHAR(10) NOT NULL,\
            paymentType NVARCHAR(50) NOT NULL,\
            isPaid INTEGER(1) NOT NULL,\
            isReady INTEGER(1) NOT NULL,\
            isProgress INTEGER(1) NOT NULL,\
            isCanceled INTEGER(1) NOT NULL,\
            isDelivered INTEGER(1) NOT NULL,\
            taxPrice FLOAT,\
            totalPrice FLOAT,\
            createdAt DATETIME,\
            updatedAt DATETIME\
        )', (err) => {
            if (err) {
                console.log("Cannot create table orders. Because of" + err);
            }
        });

        db.run('CREATE TABLE IF NOT EXISTS orderItems( \
            orderID INTEGER NOT NULL,\
            itemID INTEGER NOT NULL,\
            itemName NVARCHAR(50) NOT NULL,\
            quantity INTERGER NOT NULL,\
            CONSTRAINT orderItemsPK PRIMARY KEY (orderID, itemID),\
            CONSTRAINT orderItemsFK_order FOREIGN KEY (orderID) REFERENCES orders(number) ON UPDATE CASCADE ON DELETE CASCADE,\
            CONSTRAINT orderItemsFK_item FOREIGN KEY (itemID) REFERENCES foodItems(id) ON UPDATE CASCADE ON DELETE CASCADE\
        )', (err) => {
            if (err) {
                console.log("Cannot create table orders. Because of" + err);
            }
        });
    }
});

// GET categories
app.get('/api/categories', (req, res)=> {
    res.send(data.categories);
});

// Seed foodItems from data.js
app.post("/api/products/seed", (req, res, next) => {
    let insert = 'INSERT INTO foodItems (name, image, price, calories, category, ingredient, healthNotes, prepTime, inStock) VALUES (?,?,?,?,?,?,?,?,?)';
    data.products.forEach(
        item => {
            db.run(insert, [item.name, item.image, item.price, item.calorie, item.category, item.ingredient, item.healthNotes, item.prepTime, item.inStock]);
        }
    );
    res.json({
        "message": "success",
    })
});

// GET all foodItems or by category
app.get("/api/products", (req, res, next) => {
    const params = req.query;
    if (!isEmpty(params.category)) // by category
        db.all(`SELECT * FROM foodItems where category=?`, [params.category], (err, rows) => {
            if (err) {
            res.status(400).json({"error":err.message});
            return;
            }
            res.status(200).json(rows);
        });
    else    // get all foodItems
        db.all(`SELECT * FROM foodItems`, [], (err, rows) => {
            if (err) {
            res.status(400).json({"error":err.message});
            return;
            }
            res.status(200).send(rows);
        });
});

// POST a new Food Item
app.post("/api/products", (req, res, next) => {
    var data = {
        name: req.body.name, 
        image: req.body.image, 
        price: req.body.price,
        calories: req.body.calories, 
        category: req.body.category, 
        ingredient: req.body.ingredient, 
        healthNotes: req.body.healthNotes, 
        prepTime: req.body.prepTime, 
        inStock: 1
    }
    let insert = 'INSERT INTO foodItems (name, image, price, calories, category, ingredient, healthNotes, prepTime, inStock) VALUES (?,?,?,?,?,?,?,?,?)';
    var params = [data.name, data.image, data.price, data.calorie, data.category, data.ingredient, data.healthNotes, data.prepTime, data.inStock];
    db.run(insert, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
})

// GET current orders
// source https://stackoverflow.com/questions/41975458/how-to-create-nested-json-array-properly-while-looping-sql-database-in-node-js
app.get("/api/orders", (req, res, next) => {
    var executeSql = (sql, params) => new Promise((resolve, reject) => {
            db.all(sql, params, function (err, result) {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });

    executeSql("SELECT * FROM orders WHERE isDelivered = 0 AND isCanceled = 0", [])
    .then(orders => 
        Promise.all(orders.map(order => 
            executeSql("SELECT * FROM orderItems WHERE orderID = ?", [order.number])
            .then(orderItems => 
                ({  number: order.number, 
                    orderType: order.orderType, 
                    paymentType: order.paymentType,
                    isPaid: order.isPaid,
                    isReady: order.isReady,
                    isProgress: order.isProgress,
                    isCanceled: order.isCanceled,
                    isDelivered: order.isDelivered,
                    taxPrice: order.taxPrice,
                    totalPrice: order.totalPrice,
                    createdAt: order.createdAt,
                    updatedAt: order.updatedAt,
                    orderItems: orderItems.map(orderItem =>
                        ({id: orderItem.itemId, 
                          name: orderItem.itemName, 
                          quantity: orderItem.quantity})
                )})
            )
        ))
    )
    .then(hddt => res.send(hddt))
    .catch(err => res.status(400).json({"error" : err.message}));
});

// POST new order
app.post("/api/orders", (req, res, next) => {
    var order = {
        orderType: req.body.orderType,
        paymentType: req.body.paymentType,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        isPaid: req.body.paymentType === "At counter" ? 0 : 1,
        isReady: 0,
        isProgress: 1,
        isCanceled: 0,
        isDelivered: 0,
        createdAt: timestamp(),
        updatedAt: timestamp()
    };
    // Insert new order to order table
    let insert = 'INSERT INTO orders (orderType, paymentType, taxPrice, totalPrice, isPaid, isReady, isProgress, isCanceled, isDelivered, createdAt, updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?,?)';
    var params = [order.orderType, order.paymentType, order.taxPrice, order.totalPrice, order.isPaid, order.isReady, order.isProgress, order.isCanceled, order.isDelivered, order.createdAt, order.updatedAt];
    db.run(insert, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }  
        res.json({
            "message": "success",
            "order": order,
            "number" : this.lastID
        })
    });
    // Record all items for the order
    var orderItems = req.body.orderItems;
    orderItems.forEach( item => {
        let insertItem = 'INSERT INTO orderItems (itemID, itemName, quantity, orderID) VALUES (?,?,?,\
                            (SELECT number FROM orders WHERE orderType = ? AND paymentType = ? AND totalPrice = ? AND createdAt = ?))';
        var params = [item.id, item.name, item.quantity, order.orderType, order.paymentType, order.totalPrice, order.createdAt];
        db.run(insertItem, params, function (err, result) {
            if (err){
                res.status(400).json({"error": err.message})
                return;
            }
        })
    });
    
});

// UPDATE order status
app.put("/api/orders/:id", (req, res, next) => {
    var currentTime = timestamp();
    var action = req.body.action;
    if (action === "ready") {
        let update = 'UPDATE orders SET isReady = 1, isProgress = 0, updatedAt = ? WHERE number = ?';
        db.run(update, [currentTime, req.params.id], function(err, result) {
            if (err){
                res.status(400).json({"error": err.message})
                return;
            }
            res.json({
                "message": "success",
                "action": action,
                "orderNumber": req.params.id
            })
        });
    } else if (action === "deliver") {
        let update = 'UPDATE orders SET isDelivered = 1, isPaid = 1, isProgress = 0, updatedAt = ? WHERE number = ?';
        db.run(update, [currentTime, req.params.id], function(err, result) {
            if (err){
                res.status(400).json({"error": err.message})
                return;
            }
            res.json({
                "message": "success",
                "action": action,
                "orderNumber": req.params.id
            })
        });
    } else if (action === "cancel"){
        let update = 'UPDATE orders SET isCanceled = 1, isProgress = 0, updatedAt = ? WHERE number = ?';
        db.run(update, [currentTime, req.params.id], function(err, result) {
            if (err){
                res.status(400).json({"error": err.message})
                return;
            }
            res.json({
                "message": "success",
                "action": action,
                "orderNumber": req.params.id
            })
        });
    }
});


// Run server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Serve running at http://localhost:${port}`);
});