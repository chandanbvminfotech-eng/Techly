import { addProductToCart, deleteDataFromCart, deleteSingleProductDataFromCart, getCartData } from "../services/cart.service.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addToCart = asyncHandler(async (req, res) => {
    const {productId,quantity} = req.body
    const result = await addProductToCart({
        productId,
        userId:req.user?._id,
        quantity,
    });
    return res.status(200)
        .json(
        new ApiResponse(200,result,"Item added to cart")
    )
})

const getCart = asyncHandler(async (req, res) => {
    const result = await getCartData( req.user?._id);
    return res
      .status(200)
      .json(new ApiResponse(200, result, "Item fetched from cart"));
})

const deleteCart = asyncHandler(async (req, res) => {
    const result = await deleteDataFromCart(req.user?._id);
    return res
      .status(200)
      .json(new ApiResponse(200, result));
})

const deleteProductFromCart = asyncHandler(async (req, res) => {
    const result = await deleteSingleProductDataFromCart({
        productId: req.params.id,
        userId:req.user._id
     });
     return res.status(200).json(new ApiResponse(200, result));
})


export {addToCart,getCart,deleteCart,deleteProductFromCart}