const { createCabin } = require("./src/create_cabin");

module.exports.handler = async function (event, context, callback) {

    switch (event.route_key) {
        case "create_cabin":
            const result = await createCabin(event, context);
            callback(result);
            break;

        default:
            throw new Error(`Unsupported route: "${event.routeKey}"`);

    }
};
