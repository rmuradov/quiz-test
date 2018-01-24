let devConfig = {
    basePath: 'localhost',
    protocol: 'http://',
    port: '8000',
    v: 'api'
};

module.exports = {
    API: {
        basePath: devConfig.basePath,
        protocol: devConfig.protocol,
        port: devConfig.port,
        v: devConfig.v
    }
}
