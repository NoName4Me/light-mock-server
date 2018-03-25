const nunjucks = require('nunjucks');
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

function addCreateMockApi(router) {
    router.post('/', async (ctx, next) => {
        if (!ctx.request.body) {
            ctx.response.status = 400;
            ctx.response.body = {
                code: '-1',
                msg: 'illegal parameters'
            }
            return;
        }

        let mockFilePath = './controllers/' + ctx.request.body.fileName + '.js';
        if (fs.existsSync(mockFilePath)) {
            ctx.response.status = 500;
            ctx.response.body = {
                code: '-1',
                msg: 'file exists'
            }
            return;
        }

        let template = fs.readFileSync('./controllers/mock.template').toString();
        let data = {
            dateTime: new Date().getFullYear() + '-' + new Date().getMonth() + 1 + '-' + new Date().getDate()
        };
        let mappers = {};
        ctx.request.body.mappers.forEach(mapper => {
            if (!mappers[mapper.method]) {
                mappers[mapper.method] = [];
            }
            mappers[mapper.method].push({
                fn: mapper.fnName,
                url: mapper.urlReg,
                mock: JSON.parse(mapper.mockData)
            });
        });
        data.mappers = mappers;

        let compiledData = nunjucks.renderString(template, data);

        fs.writeFileSync(mockFilePath, compiledData);

        ctx.response.status = 200;
        ctx.response.body = {
            code: '0',
            msg: 'created: ' + mockFilePath
        };
    });
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

    addCreateMockApi(router);


    addControllers(router, controllers_dir);
    return router.routes();
};