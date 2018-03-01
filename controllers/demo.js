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
    'GET /api': fn_api_get,
    'POST /api': fn_api_post,
    'PUT /api': fn_api_put,
    'DELETE /api': fn_api_delete,
};
