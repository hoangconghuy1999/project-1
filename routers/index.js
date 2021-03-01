var userRouter = require('./userRouter');
var display = require('./display')

function initRouter(app) {
    app.use("/user", userRouter);
    app.use("/", display);
    return app;
}

module.exports = initRouter