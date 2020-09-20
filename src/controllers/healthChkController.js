const healthChkController = async (request, response) => {
    return response.send("Health check passed");
}
//unchanged
module.exports = healthChkController;