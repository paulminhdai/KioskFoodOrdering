const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const data = require('./data');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extends:true }));

dotenv.config ();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


// Order Product
const Product = mongoose.model(
    'products', 
    new mongoose.Schema({
        name: String,
        image: String,
        price: Number,
        calorie: Number,
        category: String,
        ingredient: { type: String, default: 'N/A'},
        healthNotes: { type: String, default: 'N/A'},
        prepTime: Number,
        inStock: { type: Boolean, default: true}
    })
);

app.get('/api/products/seed', async (req,res) => {
    const products = await Product.insertMany (data.products);
    res.send({products});
})

app.get('/api/products', async (req,res) => {
    const { category } = req.query;
    const products = await Product.find(category ? { category } : {});
    res.send(products);
});

app.post('/api/products', async (req, res) => {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.send(savedProduct);
});

app.get('/api/categories', (req, res)=> {
    res.send(data.categories);
});

// Order Model
const Order = mongoose.model('order', new mongoose.Schema (
    {
        number: { type: Number, default: 0},
        orderType: String,
        paymentType: String,
        isPaid: { type: Boolean, default: false },
        isReady: { type: Boolean, default: false },
        isProgress: { type: Boolean, default: true },
        isCanceled: { type: Boolean, default: false },
        isDelivered: { type: Boolean, default: false },
        itemsPrice: Number,
        taxPrice: Number,
        totalPrice: Number,
        orderItems: [
            {
                name: String,
                price: Number,
                quantity: Number,
            },
        ],
    },
    { timestamps: true }
    )
);

app.get('/api/orders', async (req, res) => {
    const orders = await Order.find({isDelivered: false, isCanceled: false})
    res.send(orders);
})

app.post('/api/orders', async (req, res) => {
    const lastOrder = await Order.find().sort({ number: -1 }).limit(1);
    const lastNumber = lastOrder.length === 0  ? 0 : lastOrder[0].number;
    if (
        !req.body.orderType ||
        !req.body.paymentType ||
        !req.body.orderItems ||
        req.body.orderItems.length === 0
    ){
        return res.send({ message: 'Data is required.'});
    }
    const order = await Order({ ...req.body, number: lastNumber + 1 }).save();
    res.send(order);
});

app.put('/api/orders/:id', async (req, res) => {
    console.log(req.body);
    console.log(req.params.id);
    const order = await Order.findById(req.params.id);
    if (order) {
        if(req.body.action === 'ready') {
            order.isReady = true;
            order.inProgress = false;
        } else if(req.body.action === 'deliver') {
            order.isDelivered = true;
            order.inProgress = false;
            order.isPaid == true
        } else if(req.body.action === 'cancel') {
            order.isCanceled = true;
            order.inProgress = false;
        }
        await order.save();
        
        res.send({ message: 'Done'});
    } else {
        req.statusCode(404).message({message:'Order not found'})
    }
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Serve running at http://localhost:${port}`);
});