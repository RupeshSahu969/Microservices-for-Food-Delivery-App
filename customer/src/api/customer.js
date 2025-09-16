const CustomerService = require('../services/customer-service');
const UserAuth = require('./middlewares/auth');

module.exports = (app, channel) => {
    const service = new CustomerService();

    // Utility function for handling errors and responses
    const handleResponse = (res, data, message = "Success") => {
        return res.json({
            success: true,
            message,
            data
        });
    };

    const handleError = (res, error) => {
        // Log error to a logging system (e.g., winston)
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message || "An unexpected error occurred"
        });
    };

    // Sign up route
    app.post('/signup', async (req, res) => {
        try {
            const { email, password, phone } = req.body;
            const { data } = await service.SignUp({ email, password, phone });
            handleResponse(res, data, "Sign-up successful");
        } catch (error) {
            handleError(res, error);
        }
    });

    // Login route
    app.post('/login', async (req, res) => {
        try {
            const { email, password } = req.body;
            const { data } = await service.SignIn({ email, password });
            handleResponse(res, data, "Login successful");
        } catch (error) {
            handleError(res, error);
        }
    });

    // Add Address route
    app.post('/address', UserAuth, async (req, res) => {
        try {
            const { _id } = req.user;
            const { street, postalCode, city, country } = req.body;
            const { data } = await service.AddNewAddress(_id, { street, postalCode, city, country });
            handleResponse(res, data, "Address added successfully");
        } catch (error) {
            handleError(res, error);
        }
    });

    // Get Profile route
    app.get('/profile', UserAuth, async (req, res) => {
        try {
            const { _id } = req.user;
            const { data } = await service.GetProfile({ _id });
            handleResponse(res, data, "Profile fetched successfully");
        } catch (error) {
            handleError(res, error);
        }
    });

    // Get Shopping Details route
    app.get('/shoping-details', UserAuth, async (req, res) => {
        try {
            const { _id } = req.user;
            const { data } = await service.GetShopingDetails(_id);
            handleResponse(res, data, "Shopping details fetched successfully");
        } catch (error) {
            handleError(res, error);
        }
    });

    // Get Wishlist route
    app.get('/wishlist', UserAuth, async (req, res) => {
        try {
            const { _id } = req.user;
            const { data } = await service.GetWishList(_id);
            handleResponse(res, data, "Wishlist fetched successfully");
        } catch (error) {
            handleError(res, error);
        }
    });

    
};
