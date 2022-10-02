module.exports = AsyncErrorHandler => (req, res, next) => {
    Promise.resolve(AsyncErrorHandler(req, res, next)).catch(next);
}