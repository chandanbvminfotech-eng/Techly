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

const createAddress = async ({
  userId,
  body,
  name,
  phone,
  pincode,
  city,
  state,
  addressLine,
  isDefault,
}) => {
  if (!userId) {
    throw new ApiError(400, "Invalid user");
  }
  const isAddressCheck = await Address.find({ userId });
  if (isDefault === false && isAddressCheck.length < 1) {
    isDefault = true;
  } else {
    if (isDefault === true) {
       await Address.updateMany(
        { userId },
        { $set: { isDefault: false } },
      );
      // My Logic to update all addresses isDefault value to false if they are true
      // const addresses = await Address.find({userId});
      // addresses.map((address) => {
      //   if (address.isDefault === true) {
      //     address.isDefault = false;
      //   }
      // });

    }
  }

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
    isDefault,
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

  const addressCount = await Address.countDocuments({ userId });
  if (addressCount === 1) {
    throw new ApiError(400, "Cannot delete the only address that is default");
  }

  if (address.isDefault === true) {
    const addressToMakeDefault = await Address.findOne({
      userId,
      _id: { $ne: { addressId } },
    });
    if (addressToMakeDefault) {
      addressToMakeDefault.isDefault = true;
      await addressToMakeDefault.save();
    }
  }

  await Address.findByIdAndDelete(addressId);
  return {message : "Address deleted successfully"};
};

const updateAddress = async ({
  addressId,
  userId,
  name,
  phone,
  pincode,
  city,
  state,
  addressLine,
  isDefault,
}) => {
  if (!addressId || !userId) {
    throw new ApiError(400, "Address and user both Ids are needed");
  }
  if (!mongoose.Types.ObjectId.isValid(addressId)) {
    throw new ApiError(400, "Invalid address ID");
  }
  if (!name || !phone || !pincode || !city || !state || !addressLine) {
    throw new ApiError(400, "All fields are required");
  }

  const address = await Address.findById(addressId);

  if (!address) {
    throw new ApiError(404, "Address Not Found");
  }
  if (address.userId.toString() !== userId.toString()) {
    throw new ApiError(400, "You are not owner of this address");
  }

  // Handle default address logic
  if (isDefault === true) {
    // If setting this address as default, clear default from all other addresses
    await Address.updateMany(
      { userId, _id: { $ne: addressId } }, // Exclude current address
      { $set: { isDefault: false } },
    );
  } else if (isDefault === false && address.isDefault === true) {
    // If unsetting default on the only default address, prevent it
    const defaultAddressCount = await Address.countDocuments({
      userId,
      isDefault: true,
    });

    if (defaultAddressCount === 1) {
      throw new ApiError(
        400,
        "Cannot remove default status from your only default address",
      );
    }
  }

  // Update the address including isDefault field
  const updatedAddress = await Address.findByIdAndUpdate(
    addressId,
    {
      name,
      phone,
      pincode,
      city,
      state,
      addressLine,
      isDefault: isDefault || false, // Explicitly set isDefault
    },
    {
      new: true,
      runValidators: true,
    },
  );

  return updatedAddress;
};

export { createAddress, getAddresses, deleteAddress, updateAddress };
