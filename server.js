const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');
// const hbs = exphbs.create({});
const hbs = exphbs.create({ helpers });

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

// create sesssion with cookie
const sess = {
  secret: 'Super secret secret',
  cookie: {// Stored in milliseconds
    maxAge: 24 * 60 * 60 * 1000, // expires after 1 day
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Set Handlebars as the default template engine.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers'));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('\x1b[1mServer started on http://localhost:' + PORT + '\x1b[0m'));
});
