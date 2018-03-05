var fn_api_get = async (ctx, next) => {
    let requestParams = ctx.request.body;

    ctx.response.body = { 'id': '12345', desc: 'jonge' };
};

var fn_api_post = async (ctx, next) => {
    console.dir(ctx.request.body);
    ctx.response.body = { 'id': ctx.request.body.id, desc: 'created!' };
};

var fn_api_put = async (ctx, next) => {
    let requestParams = ctx.request.body;

    ctx.response.body = { 'id': '12345', desc: 'updated!' };
};

var fn_api_delete = async (ctx, next) => {
    let requestParams = ctx.request.body;

    ctx.response.body = { 'id': '12345', desc: 'deleted!' };
};

module.exports = {
    // you can add more functions for each one HTTP Method
    'get': {url: '/api', handler: fn_api_get}, // multi use array: [{url:'',handler:xx},{url:'',handler:xx}]
    'post': {url: '/api', handler: fn_api_post},
    'put': {url: '/api', handler: fn_api_put},
    'delete': {url: '/api', handler: fn_api_delete},
};
