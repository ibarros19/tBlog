const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection.js');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Do you know my secret?',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

const hbs = exphbs.create({
  helpers: {
    format_date: date => {
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }
  }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./controllers/'));

app.listen(PORT, () => {
  console.log(`App started at => http://localhost:${PORT} <= Ctrl + click to open the page.`);
  sequelize.sync({ force: false });
});