
exports.handler = async function (event, context, callback) {
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            status: 200,
            message: 'hello world aws github actions',
            data: {}
        })
    };

    return response;
};
