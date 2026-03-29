const express = require("express");
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");
const authMiddleware = require("../middleware/authMiddleware");
router.use(authMiddleware);
router.get("/", getCart);
router.post("/add", addToCart);
router.put("/update", updateCartItem);
router.delete("/:productId", removeFromCart);
router.delete("/", clearCart);

module.exports = router;