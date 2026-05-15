const mysql = require('mysql2/promise');

let pool;
let initPromise;

function getEnvConfig() {
  const host = process.env.MYSQL_HOST || '127.0.0.1';
  const port = Number(process.env.MYSQL_PORT || 3306);
  const user = process.env.MYSQL_USER || 'root';
  const password = process.env.MYSQL_PASSWORD || '';
  const database = process.env.MYSQL_DATABASE || 'mern_students';

  return { host, port, user, password, database };
}

async function createDatabaseIfMissing(config) {
  const connection = await mysql.createConnection({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${config.database}\``);
  await connection.end();
}

async function ensurePool() {
  if (pool) {
    return pool;
  }

  if (!initPromise) {
    initPromise = (async () => {
      const config = getEnvConfig();
      await createDatabaseIfMissing(config);

      pool = mysql.createPool({
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.password,
        database: config.database,
        waitForConnections: true,
        connectionLimit: 10,
        namedPlaceholders: false,
      });

      await pool.query(`
        CREATE TABLE IF NOT EXISTS students (
          id INT UNSIGNED NOT NULL AUTO_INCREMENT,
          name VARCHAR(255) NOT NULL,
          age INT NOT NULL,
          department VARCHAR(255) NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          PRIMARY KEY (id)
        )
      `);

      return pool;
    })();
  }

  return initPromise;
}

async function connectDB() {
  try {
    const activePool = await ensurePool();
    await activePool.query('SELECT 1');
    const config = getEnvConfig();
    console.log(`MySQL connected: ${config.host}:${config.port}/${config.database}`);
    return activePool;
  } catch (err) {
    console.error('MySQL connection error:', err.message);
    process.exit(1);
  }
}

async function query(sql, params = []) {
  const activePool = await ensurePool();
  return activePool.query(sql, params);
}

module.exports = connectDB;
module.exports.query = query;
module.exports.getPool = () => pool;
