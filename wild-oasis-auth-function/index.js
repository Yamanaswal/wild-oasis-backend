const { createCabin } = require("./src/create_cabin");

module.exports.handler = async function (event, context, callback) {

    try {
        switch (event.route_key) {
            case "create_cabin":
                const result = await createCabin(event, context);
                return result; // Return the result directly

            default:
                throw new Error(`Unsupported route: "${event.route_key}"`);
        }
    } catch (err) {
        // Handle errors appropriately
        console.error(err);
        throw Error("handler error:", err.message);
    }
};
