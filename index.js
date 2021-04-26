const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

app.use(express.static('./assets'));

//extract styles and scripts from subpages into the layout
app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);





//use express router
app.use('/',require('./routes/index'));

//view engine setup
app.set('view engine','ejs');
app.set('views','./views');




app.listen(port , function(err){
    if(err){
        
        console.log(`Error:${err}`);
        return;
    }
    console.log(`Server is running on port: ${port}`);
})