import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import UserAvatar from "../components/UserAvatar";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/");
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-400 ${
        scrolled
          ? "bg-[rgba(8,8,14,0.88)] backdrop-blur-2xl border-b border-[rgba(212,175,55,0.12)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 h-[72px] flex items-center justify-between gap-3">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-[10px] no-underline flex-shrink-0"
        >
          <div className="w-[34px] h-[34px] rounded-[9px] bg-gradient-to-br from-[#D4AF37] to-[#F5E090] flex items-center justify-center">
            <span className="text-[17px] font-black text-[#08080E] font-[Georgia,serif]">
              T
            </span>
          </div>
          <span className="text-[22px] text-[#F5F0E8] tracking-[-0.2px] font-[Georgia,'Times New Roman',serif] hidden sm:inline">
            Techly
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-1">
          {[
            { to: "/", l: "Home" },
            { to: "/products", l: "Products" },
            { to: "#trending", l: "Trending" },
          ].map(({ to, l }) => (
            <Link
              key={l}
              to={to}
              className="px-4 py-2 rounded-lg text-sm font-medium text-[rgba(245,240,232,0.72)] font-['DM_Sans',system-ui,sans-serif] transition-all duration-200 hover:text-[#F5F0E8] hover:bg-[rgba(255,255,255,0.06)]"
            >
              {l}
            </Link>
          ))}
        </div>

        {/* Right side - Auth, Cart, Profile for all screen sizes */}
        <div className="flex gap-[10px] items-center">
          {user ? (
            <>
              {/* Cart Button - visible on all screens */}
              <Link
                to="/cart"
                className="no-underline px-[16px] sm:px-[20px] py-[9px] rounded-[10px] border border-[rgba(245,240,232,0.15)] text-[rgba(245,240,232,0.85)] text-sm font-medium font-['DM_Sans',system-ui,sans-serif] hover:text-[#D4AF37] transition-colors"
              >
                Cart
              </Link>

              {/* User Profile - visible on all screens */}
              <div className="flex items-center gap-2">
                <UserAvatar name={user.name} avatarLink={user.avatar} />
                <span className="text-[#F5F0E8] text-sm font-medium hidden sm:inline">
                  {user.name}
                </span>
              </div>

              {/* Sign Out - hidden on mobile, visible on desktop */}
              <button
                onClick={handleLogout}
                className="hidden md:block px-[22px] py-[9px] rounded-[10px] border border-[rgba(212,175,55,0.4)] bg-transparent text-[#D4AF37] text-sm font-medium font-['DM_Sans',system-ui,sans-serif] hover:bg-[rgba(212,175,55,0.1)] transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                className="hidden sm:block no-underline px-[20px] py-[9px] rounded-[10px] border border-[rgba(245,240,232,0.15)] text-[rgba(245,240,232,0.85)] text-sm font-medium font-['DM_Sans',system-ui,sans-serif]"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="hidden sm:block no-underline px-[22px] py-[9px] rounded-[10px] bg-gradient-to-br from-[#D4AF37] to-[#B8941E] text-[#08080E] text-sm font-semibold font-['DM_Sans',system-ui,sans-serif] shadow-[0_0_20px_rgba(212,175,55,0.3)]"
              >
                Get Started
              </Link>
            </>
          )}

          {/* Mobile Menu Button - Only visible on mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden bg-none border-none cursor-pointer text-[#F5F0E8] p-[6px]"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              {menuOpen ? (
                <>
                  <line
                    x1="4"
                    y1="4"
                    x2="18"
                    y2="18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <line
                    x1="18"
                    y1="4"
                    x2="4"
                    y2="18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </>
              ) : (
                <>
                  <line
                    x1="3"
                    y1="6"
                    x2="19"
                    y2="6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <line
                    x1="3"
                    y1="11"
                    x2="19"
                    y2="11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <line
                    x1="3"
                    y1="16"
                    x2="19"
                    y2="16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="bg-[rgba(8,8,14,0.97)] backdrop-blur-2xl border-t border-[rgba(212,175,55,0.12)] px-6 pt-4 pb-6 flex flex-col gap-[2px] md:hidden">
          {user ? (
            <>
              {[
                { to: "/", l: "Home" },
                { to: "/products", l: "Products" },
                { to: "/cart", l: "Cart" },
              ].map(({ to, l }) => (
                <Link
                  key={l}
                  to={to}
                  className="no-underline px-[14px] py-[12px] text-[#F5F0E8] text-[15px] rounded-[10px] font-['DM_Sans',system-ui,sans-serif] hover:bg-[rgba(255,255,255,0.06)] transition-colors"
                >
                  {l}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="px-[14px] py-[12px] text-left text-[#D4AF37] text-[15px] rounded-[10px] font-['DM_Sans',system-ui,sans-serif] hover:bg-[rgba(212,175,55,0.1)] transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              {[
                { to: "/", l: "Home" },
                { to: "/products", l: "Products" },
                { to: "/signin", l: "Sign In" },
                { to: "/signup", l: "Get Started" },
              ].map(({ to, l }) => (
                <Link
                  key={l}
                  to={to}
                  className="no-underline px-[14px] py-[12px] text-[#F5F0E8] text-[15px] rounded-[10px] font-['DM_Sans',system-ui,sans-serif] hover:bg-[rgba(255,255,255,0.06)] transition-colors"
                >
                  {l}
                </Link>
              ))}
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
