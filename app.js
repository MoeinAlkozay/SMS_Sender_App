const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const Nexmoo = require('nexmo');
const socketio = require('socket.io');
const { application } = require('express');
const { default: Nexmo } = require('nexmo');


// init Nexmo

const  nexmo = new Nexmoo({
    apiKey:'6518744c',
    apiSecret:'b8dUypYePhizdCeo'
},{debug:true});

//Init app
const app = express();

//Templete engine setup
app.set('view engine','html');
app.engine('html', ejs.renderFile);

// Public folder setup
app.use(express.static(__dirname + '/public'));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
 
//Index route
app.get('/',(req,res) =>{
    res.render('index');
});

//Catch from submit
app.post('/', (req,res) =>{
    // res.send(req.body);
    // console.log(req.body);
    const number = req.body.number;
    const text = req.body.text;
    nexmo.message.sendSms(
        '93793061612', number , text, {type: 'unicode'},
        (err, responseData) =>{
            if(err){
                console.log(err);
            }else{
                console.dir(responseData);
            }
        }
    )
});

//Define port
const port = 3000;

const server = app.listen(port,()=> console.log(`Server started on port ${port}`))










