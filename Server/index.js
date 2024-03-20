const express= require('express');
//const bodyParser= require ('body-parser'); 
const usersRoutes= require ('./routes/user.js');
const tagsRoutes = require('./routes/tags.js');
const themeRoutes = require('./routes/theme.js');
const postRoutes = require('./routes/posts.js');
const viewRoutes = require('./routes/view.js');
const connectDB =require ('./config/dbConnect.js');
const dotenv = require("dotenv");
const cors = require('cors');
const fileupload = require('express-fileupload'); 

//const swaggerUi = require('swagger-ui-express');
//const {swaggerDocument} = require('./swagger.json')

dotenv.config();

//require('dotenv').config({ path: 'ENV_FILENAME' });


const app = express();

app.use(cors());
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({limit: "10mb", extended: true}));
app.use(fileupload({tempFileDir: '/tmp/'}))

//app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



connectDB();
app.use('/users', usersRoutes);
app.use('/tags',tagsRoutes);
app.use('/theme', themeRoutes);
app.use('/Posts', postRoutes);
app.use('/view', viewRoutes);
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`server running on port : http://localhost:${PORT}`) );
