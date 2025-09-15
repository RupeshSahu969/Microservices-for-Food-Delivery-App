const CustomerService = require("../services/customer-service");
const UserAuth = require("./middlewares/auth");

module.exports = (app) => {
  const service = new CustomerService();

  /**
   * @swagger
   * tags:
   *   name: Customers
   *   description: Customer management APIs
   */

  /**
   * @swagger
   * /signup:
   *   post:
   *     summary: Register a new user
   *     tags: [Customers]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - password
   *               - phone
   *             properties:
   *               email:
   *                 type: string
   *                 example: user@example.com
   *               password:
   *                 type: string
   *                 example: strongpassword123
   *               phone:
   *                 type: string
   *                 example: "+1234567890"
   *     responses:
   *       200:
   *         description: User registered successfully
   */
  app.post("/signup", async (req, res, next) => {
    try {
      const { email, password, phone } = req.body;
      const { data } = await service.SignUp({ email, password, phone });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  /**
   * @swagger
   * /login:
   *   post:
   *     summary: Login a user
   *     tags: [Customers]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - password
   *             properties:
   *               email:
   *                 type: string
   *                 example: user@example.com
   *               password:
   *                 type: string
   *                 example: strongpassword123
   *     responses:
   *       200:
   *         description: User logged in successfully, returns auth data
   */
  app.post("/login", async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const { data } = await service.SignIn({ email, password });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  /**
   * @swagger
   * /address:
   *   post:
   *     summary: Add new address for logged-in user
   *     tags: [Customers]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               street:
   *                 type: string
   *                 example: "123 Main St"
   *               postalCode:
   *                 type: string
   *                 example: "12345"
   *               city:
   *                 type: string
   *                 example: "New York"
   *               country:
   *                 type: string
   *                 example: "USA"
   *     responses:
   *       200:
   *         description: Address added successfully
   */
  app.post("/address", UserAuth, async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { street, postalCode, city, country } = req.body;
      const { data } = await service.AddNewAddress(_id, {
        street,
        postalCode,
        city,
        country,
      });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  /**
   * @swagger
   * /profile:
   *   get:
   *     summary: Get logged-in user profile
   *     tags: [Customers]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Returns user profile data
   */
  app.get("/profile", UserAuth, async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { data } = await service.GetProfile({ _id });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  /**
   * @swagger
   * /shoping-details:
   *   get:
   *     summary: Get shopping details for logged-in user
   *     tags: [Customers]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Returns shopping details
   */
  app.get("/shoping-details", UserAuth, async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { data } = await service.GetShopingDetails(_id);
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  /**
   * @swagger
   * /wishlist:
   *   get:
   *     summary: Get wishlist for logged-in user
   *     tags: [Customers]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Returns wishlist items
   */
  app.get("/wishlist", UserAuth, async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { data } = await service.GetWishList(_id);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });
};
