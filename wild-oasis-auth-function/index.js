export const handler = async (event, context) => {
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
