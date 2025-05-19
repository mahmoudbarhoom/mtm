const express = require('express');
const bodyParser = require('body-parser');
const { sql, poolPromise } = require('./db');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM Products');
        res.render('index', { products: result.recordset });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

const PORT = 3000; // قم بتغيير المنفذ إذا لزم الأمر
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
// تحقق من الاتصال بقاعدة البيانات عند بدء الخادم
poolPromise.then(pool => {
  if (pool) {
    console.log("تم الاتصال بقاعدة البيانات بنجاح!");
  } else {
    console.log("فشل الاتصال بقاعدة البيانات");
  }
}).catch(err => {
  console.error('خطأ في الاتصال بقاعدة البيانات:', err.message);
});

