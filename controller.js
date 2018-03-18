const fs = require('fs');

function registerMapper(router, method, mapper) {
    router[method](mapper.url, mapper.handler);
    console.log(`register URL mapping: ${method.toUpperCase()} ${typeof mapper.url==='object'?'regExp:':'string:'} ${mapper.url}`);
}

function addMapping(router, mapping) {
    for (var method in mapping) {
        if (Array.isArray(mapping[method])) {
            mapping[method].forEach(function (mapper) {
                registerMapper(router, method, mapper);
            });
        } else {
            registerMapper(router, method, mapping[method]);
        }

    }
}

function addControllers(router, dir) {
    let path = '/' + dir;
    var files = fs.readdirSync(__dirname + path);
    var js_files = files.filter((f) => {
        return f.endsWith('.js');
    });

    for (var f of js_files) {
        console.log(`process controller: ${f}...`);
        let mapping = require(__dirname + path + '/' + f);
        addMapping(router, mapping);
    }
}

module.exports = function (dir) {
    let
        controllers_dir = dir || 'controllers',
        router = require('koa-router')();

    // defualt page to add mock data
    router.get('/', async (ctx, next) => {
        ctx.response.type = 'text/html';
        ctx.response.body = fs.readFileSync('./entrence.html');
    });
    
    addControllers(router, controllers_dir);
    return router.routes();
};