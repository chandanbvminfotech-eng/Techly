import {
  createAddress,
  deleteAddress,
  getAddresses,
  updateAddress,
} from "../services/address.service.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const viewAddresses = asyncHandler(async (req, res) => {
  const result = await getAddresses(req.user._id);
  return res
    .status(200)
    .json(new ApiResponse(200, { result }, "Addresses Fetched successfully"));
});

const addAddress = asyncHandler(async (req, res) => {   
  const result = await createAddress({
    userId: req.user._id,
    role: req.role,
    body: req.body,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, result, "address created successfully"));
});

const deleteAddressController = asyncHandler(async (req, res) => {
  const result = await deleteAddress({
    addressId: req.params.id,
    userId: req.user._id,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, result, "address deleted successfully"));
});
const updateAddressController = asyncHandler(async (req, res) => {
  const result = await updateAddress({
    addressId: req.params.id,
    userId: req.user._id,
    body: req.body,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, result, "address update successfully"));
});

export { viewAddresses, addAddress, deleteAddressController,updateAddressController };
