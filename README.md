# light-mock-server

An easy mock server, `nodeJs`, `koa` driven. Have fun~ :metal:

## Usage

1. Add your mock data `.js` files under directory `controllers`

Reference to this [DEMO FILE](./controllers/demo.js), create a new `.js` file, add your own bussiness mock data.

Support full `string` mapping, `regExp` mapping, and multi-mapping in one methond, like this:

```js
'get': [{url: '/api', handler: fn_api_get1},{url: /some\/regexp/, handler: fn_api_get2},{url: '/api/jonge', handler: fn_api_get3}], 
'post': //...
```

2. Install dependencies and start the server

```bash
npm install
npm start
```

**Note**: the server is default listening to port `3001`, you can change it in `index.js` at this line: `app.listen(3001);`.
