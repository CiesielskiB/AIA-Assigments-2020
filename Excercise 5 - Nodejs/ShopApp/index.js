const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const sqlite3 = require('sqlite3').verbose()

const router = express();
const sqLite = new sqlite3.Database(':memory:')

const SiteRouting = require('./siteRouting');
const BackendApi = require('./backendApi');

const siteRouting = new SiteRouting(router, sqLite);
const backendApi = new BackendApi(router, sqLite);

prepareDatabase();
setupApp();
addBasicRouter();
addApi();
startListening();

function prepareDatabase() {
    sqLite.serialize(function () {
        sqLite.run('DROP TABLE IF EXISTS Games;');
        sqLite.run('CREATE TABLE Games (Id Integer PRIMARY KEY AUTOINCREMENT Not Null, Title TEXT NOT NULL, Already_bought BOOLEAN NOT NULL DEFAULT 0);');
        sqLite.run("INSERT INTO Games (Title) VALUES ('Dark souls'), ('Dark souls 2'), ('Dark souls 3'), ('The Witcher 3'), ('Divinity Original Sin'), ('Divinity Original Sin 2'), ('Cuphead'), ('Europa Universalis 4'), ('Outward'), ('Crusader Kings 2')");
      })  
}

function setupApp() {
  useBodyParser()
  useSession();
  useStaticFiles();
  setViewEngine();
  useHeaders();
}

function useBodyParser() {
    router.use(bodyParser.json());
}

function useSession() {
    router.use(session({
    secret: 'shopping-cart',
    saveUninitialized: true,
    resave: true
  }));
}

function useStaticFiles() {
    router.use(express.static('public'));
}

function setViewEngine() {
    router.set('view engine', 'ejs');
    router.set('views', 'views');
}

function useHeaders() {
    router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Cache-Control", "no-store, private, no-cache, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", "0");
    next();
  })
}

function addBasicRouter() {
    siteRouting.init();
}

function addApi() {
    backendApi.init();
}

function startListening() {
    router.listen(3000, () => {
    console.log("server started");
  });
}