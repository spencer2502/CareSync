const multichain = require('multichain-node')({
    port: process.env.MULTICHAIN_PORT,
    host: process.env.MULTICHAIN_HOST,
    user: process.env.MULTICHAIN_USER,
    pass: process.env.MULTICHAIN_PASS,
});

module.exports = multichain;