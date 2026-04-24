import { ApiError } from "../utils/apiError.js";
import Address from "../models/address.model.js";
import mongoose from "mongoose";

const getAddresses = async (userId) => {
  if (!userId) {
    throw new ApiError(400, "Invalid userId");
  }
  const addresses = await Address.find({
    userId: userId,
  });
  if (!addresses) {
    throw new ApiError(400, "No Saved address found, add a new address");
  }
  return addresses;
};

const createAddress = async ({ userId, body }) => {
  if (!userId) {
    throw new ApiError(400, "Invalid user");
  }
  const { name, phone, pincode, city, state, addressLine } = body;

  if (!name || !phone || !pincode || !city || !state || !addressLine) {
    throw new ApiError(400, "All fields are necessary to be filled");
  }
  const address = await Address.create({
    userId,
    name,
    phone,
    pincode,
    city,
    state,
    addressLine,
  });

  if (!address) {
    throw new ApiError(400, "Error in saving a address");
  }
  return address;
};

const deleteAddress = async ({ addressId, userId }) => {
  if (!addressId && !userId) {
    throw new ApiError(400, "Address and user both Ids are needed");
  }
  if (!mongoose.Types.ObjectId.isValid(addressId)) {
    throw new ApiError(400, "Invalid address ID");
  }
  const address = await Address.findById(addressId);

  if (!address) {
    throw new ApiError(404, "Address not deleted");
  }
  if (address.userId.toString() !== userId.toString()) {
    throw new ApiError(400, "You are not owner of this address");
  }
  await Address.findByIdAndDelete({ _id: addressId });
  return address;
};

const updateAddress = async ({ addressId, userId, body }) => {
  if (!addressId && !userId) {
    throw new ApiError(400, "Address and user both Ids are needed");
  }
  if (!mongoose.Types.ObjectId.isValid(addressId)) {
    throw new ApiError(400, "Invalid address ID");
  }
  const { name, phone, pincode, city, state, addressLine } = body;
  if (!name || !phone || !pincode || !city || !state || !addressLine) {
    throw new ApiError(400, "Please provide at least a field to update");
  }
  const address = await Address.findById({ _id: addressId });

  if (!address) {
    throw new ApiError(404, "Address Not Found");
  }
  if (address.userId.toString() !== userId.toString()) {
    throw new ApiError(400, "You are not owner of this address");
  }
    const updatedAddress = await Address.findById(
      { _id: addressId },
      {
        name,
        phone,
        pincode,
        city,
        state,
        addressLine,
        },
        {
            new: true,
            runValidators:true
      }
    );

  return updatedAddress;
};

export { createAddress, getAddresses, deleteAddress, updateAddress };
