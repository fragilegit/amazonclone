if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const createError = require('http-errors');
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const db = require('./config/database');
const flash = require('express-flash');
const methodOverride = require('method-override');
const multer = require('multer');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const dashboardRouter = require('./routes/dashboard');

const { ensureAuthenticated } = require('./middleware/auth');

// Test DB
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log(`Error: ${err}`));

// init app
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}));

let hbs = exphbs.create({});

hbs.handlebars.registerHelper('ifCond', function(v1, v2, options) {
  if(v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

app.set('view engine', 'hbs');

// set storage engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: (req, file, callback) => {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname).toLowerCase());
  }
})

// init upload
exports.upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, callback) => {
    checkFileType(file, callback);
  }
}).single('image')

checkFileType = (file, callback) => {
  // allowed ext
  const file_types = /jpeg|jpg|png|gif/
  // check ext
  const ext_name = file_types.test(path.extname(file.originalname).toLowerCase());

  // check mime type
  const mime_type = file_types.test(file.mimetype);

  if (mime_type && ext_name) {
    return callback(null, true);
  } else {
    callback('Error: Images Only')
  }
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(methodOverride('_method'));

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use(express.static(__dirname + './public'));

// app.use('/css', express.static(__dirname + '/node_modules/admin-lte/dist/css'));
// app.use('/js', express.static(__dirname + '/node_modules/admin-lte/dist/js'));

app.use('/jss', express.static(__dirname + '/node_modules/popper.js/dist'));
app.use('/jss', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/jss', express.static(__dirname + '/node_modules/bootstrap/dist/js'));

// init session
app.use(
  session({
    secret: 'd386fa2e48e81147d23d6b02',
    resave: false,
    saveUninitialized: false
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport').init(app);

// require('./config/strategies/local')();

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dashboard', ensureAuthenticated, dashboardRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
// exports.upload = upload;
