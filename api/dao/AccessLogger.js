const { Pool, } = require('pg')

class AccessLogger {
    constructor(dbUri) {
        this.pool = new Pool({
            connectionString: dbUri,
            max: 10,
        })
    }

    // fire an asynchronous DB update
    log(clientIp, precinctQuery) {
        this.pool
            .connect()
            .then(client => {
                client.query("INSERT $1, $2, NOW() INTO access_log", [clientIp, precinctQuery])
            }).then(() => {
                console.log("Successfully recorded access log")
            }).catch(error => console.log(`Failed to record access log for ${clientIp} ${precinctQuery}`, error))
    }
}

module.exports = AccessLogger