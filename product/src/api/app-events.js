// const ProductService = require('../services/product-service');

module.exports = (app) => {
//   const service = new ProductService();

  app.post('/app-events', async (req, res, next) => {
    const { payload } = req.body;

    // await service.SubscribeEvents(payload);

    console.log("========== Products Service received event ==========");

    return res.status(200).json({ payload});
  });
};
