require("dotenv").config();
const express = require('express');
const path = require('path');
const app = express();
const snippetRoutes = require('./routes/snippetRoutes');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 3000;
//Conexion
app.listen(PORT, () => {
    console.log(`Server running on port:${PORT}`);
});
mongoose.connect(process.env.MONGO_URL)
.then(()=> {
    console.log('MongoDB connected');
    
})
.catch(err => console.log('MongoDB connected', err));

//EJS config
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));


//Middleware
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));


//Basic route
app.use('/', snippetRoutes);
/*app.get("/", (req, res)=> {
    res.send("Server is alive")
});*/

