const { Pool } = require('pg');

class AccessLogger {
  constructor(dbUri) {
    this.pool = new Pool({
      connectionString: dbUri,
      max: 10,
      ssl: { rejectUnauthorized: false }
    });
  }

  // fire an asynchronous DB update
  log(clientIp, precinctQuery, url) {
    this.pool
      .query('INSERT INTO access_log(client_ip, precinct_query, access_time, url) VALUES ($1, $2, NOW(), $3)', [
        clientIp,
        precinctQuery,
        url
      ])
      .then(() => {
        console.log('Successfully recorded access log');
      })
      .catch(error => console.log(`Failed to record access log for ${clientIp} ${precinctQuery}`, error));
  }
}

module.exports = AccessLogger;
