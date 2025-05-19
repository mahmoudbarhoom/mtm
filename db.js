const sql = require('mssql');

// إعدادات الاتصال بـ SQL Server
const config = {
    server: 'DESKTOP-LHEA3GL\\SQLEXPRESS', // اسم الخادم
    database: 'NurseryDB',                // اسم قاعدة البيانات
    driver: 'msnodesqlv8',                // السائق المستخدم
    options: {
        encrypt: false,                   // تعطيل التشفير إذا لم يكن ضروريًا
        trustServerCertificate: true,     // السماح بالاتصال بدون شهادة موثقة
    },
};

// إنشاء اتصال
const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then((pool) => {
        console.log('Connected to SQL Server');
        return pool;
    })
    .catch((err) => {
        console.error('Database Connection Failed!', err.message);
        console.error('Details:', err);
        return null;
    });

// تصدير الاتصال
module.exports = { sql, poolPromise };

