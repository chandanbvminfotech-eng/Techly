// pages/ProfilePage.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../profileSlice.js";
import ProfileEditForm from "../components/ProfileEditForm";
import AddressForm from "../../../components/AddressForm.jsx";

const ProfilePage = () => {
  const { user, loading } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  const handleEditSuccess = () => {
    setIsEditing(false);
    dispatch(getUserProfile());
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#08080E] flex items-center justify-center text-[#F5F0E8] font-['DM_Sans'] tracking-widest uppercase text-xs">
        Loading...
      </div>
    );

  return (
    <>
      <div className="min-h-screen bg-[#08080E] pt-[120px] pb-20 px-6 selection:bg-[#D4AF37]/30">
        <div className="max-w-[1100px] mx-auto">
          {/* Editorial Page Header */}
          <div className="flex flex-col mb-12 border-l-2 border-[#D4AF37] pl-6">
            <span className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] font-bold mb-2">
              Member Account
            </span>
            <h2 className="text-[40px] md:text-[52px] font-[Georgia,serif] text-[#F5F0E8] leading-none">
              Your <span className="italic">Profile</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column: Avatar Card - Always visible */}
            <div className="md:col-span-1">
              <div className="relative group">
                <div className="absolute -inset-[1px] bg-gradient-to-b from-[#D4AF37]/20 to-transparent rounded-[24px] blur-md opacity-50" />
                <div className="relative bg-[#0C0C12]/80 border border-white/5 rounded-[24px] p-8 flex flex-col items-center backdrop-blur-3xl">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-[#D4AF37] blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
                    <img
                      src={user?.avatar?.[0].url || "/default-avatar.png"}
                      alt={user?.name}
                      className="relative h-32 w-32 rounded-full object-cover border-2 border-[#D4AF37]/30 p-1"
                    />
                  </div>
                  <h3 className="mt-6 text-[#F5F0E8] text-xl font-[Georgia,serif] text-center">
                    {user?.name}
                  </h3>
                  <span className="mt-2 px-4 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-[10px] uppercase tracking-widest font-bold">
                    {user?.role || "Member"}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Either View Mode or Edit Mode */}
            <div className="md:col-span-2">
              <div className="bg-[#0C0C12]/80 border border-white/5 rounded-[24px] overflow-hidden backdrop-blur-3xl h-full">
                <div className="px-8 py-6 border-b border-white/5 bg-white/[0.02]">
                  <h4 className="text-[#F5F0E8] text-xs uppercase tracking-[0.2em] font-black">
                    {isEditing ? "Edit Profile" : "Account Specifications"}
                  </h4>
                </div>

                <div className="p-8">
                  {!isEditing ? (
                    // VIEW MODE - Your existing display
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12">
                        {/* Info Block */}
                        <div className="flex flex-col gap-1">
                          <span className="text-[rgba(245,240,232,0.4)] text-[10px] uppercase tracking-widest font-bold">
                            Full Name
                          </span>
                          <p className="text-[#F5F0E8] text-base font-medium">
                            {user?.name || "N/A"}
                          </p>
                        </div>

                        {/* Info Block */}
                        <div className="flex flex-col gap-1">
                          <span className="text-[rgba(245,240,232,0.4)] text-[10px] uppercase tracking-widest font-bold">
                            Email Address
                          </span>
                          <p className="text-[#F5F0E8] text-base font-medium">
                            {user?.email || "N/A"}
                          </p>
                        </div>

                        {/* Info Block */}
                        <div className="flex flex-col gap-1">
                          <span className="text-[rgba(245,240,232,0.4)] text-[10px] uppercase tracking-widest font-bold">
                            Access Level
                          </span>
                          <p className="text-[#F5E090] text-base font-medium capitalize">
                            {user?.role || "Standard"}
                          </p>
                        </div>

                        {/* Info Block */}
                        <div className="flex flex-col gap-1">
                          <span className="text-[rgba(245,240,232,0.4)] text-[10px] uppercase tracking-widest font-bold">
                            Unique Identifier
                          </span>
                          <p className="text-[#F5F0E8]/50 text-[10px] font-mono tracking-tighter truncate">
                            {user?._id}
                          </p>
                        </div>
                      </div>

                      {/* Action Footer - View Mode */}
                      <div className="mt-8 pt-8 border-t border-white/5 flex flex-wrap gap-4">
                        <button
                          onClick={() => setIsEditing(true)}
                          className="px-8 py-3 rounded-full bg-[#D4AF37] text-[#08080E] text-[10px] font-black uppercase tracking-widest hover:shadow-[0_10px_30px_rgba(212,175,55,0.3)] transition-all active:scale-95"
                        >
                          Edit Profile
                        </button>
                        <button className="px-8 py-3 rounded-full border border-white/10 text-[rgba(245,240,232,0.6)] text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all">
                          Security Settings
                        </button>
                      </div>
                    </>
                  ) : (
                    // EDIT MODE - Your separate form component
                    <ProfileEditForm
                      user={user}
                      onCancel={() => setIsEditing(false)}
                      onSuccess={handleEditSuccess}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-[#ffffff]">
          <AddressForm/>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
