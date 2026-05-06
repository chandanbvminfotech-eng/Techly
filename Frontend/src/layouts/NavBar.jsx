import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import UserAvatar from "../components/UserAvatar";
import { clearCart } from "../features/cart/cartSlice";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    dispatch(clearCart());
    navigate("/");
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const navLinks = [
    { to: "/", l: "Home" },
    { to: "/products", l: "Products" },
    { to: "/orders", l: "Orders" },
  ];

  if (user?.role === "seller")
    navLinks.push({ to: "/seller/dashboard", l: "Dashboard" });
  if (user?.role === "admin")
    navLinks.push({ to: "/admin/dashboard", l: "Dashboard" });

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
          {navLinks.map(({ to, l }) => (
            <Link
              key={l}
              to={to}
              className="px-4 py-2 rounded-lg text-sm font-medium text-[rgba(245,240,232,0.72)] font-['DM_Sans',system-ui,sans-serif] transition-all duration-200 hover:text-[#F5F0E8] hover:bg-[rgba(255,255,255,0.06)]"
            >
              {l}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex gap-[10px] items-center">
          {user ? (
            <>
              <Link
                to="/cart"
                className="no-underline px-[16px] sm:px-[20px] py-[9px] rounded-[10px] border border-[rgba(245,240,232,0.15)] text-[rgba(245,240,232,0.85)] text-sm font-medium hover:text-[#D4AF37] transition-colors"
              >
                Cart
              </Link>
              <Link to="/profile" className="flex items-center gap-2">
                <UserAvatar
                  name={user.name}
                  avatarLink={user.avatar?.[0]?.url}
                />
                <span className="text-[#F5F0E8] text-sm font-medium hidden sm:inline">
                  {user.name}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="hidden md:block px-[22px] py-[9px] rounded-[10px] border border-[rgba(212,175,55,0.4)] text-[#D4AF37] text-sm font-medium hover:bg-[rgba(212,175,55,0.1)] transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                className="hidden sm:block no-underline px-[20px] py-[9px] rounded-[10px] border border-[rgba(245,240,232,0.15)] text-[rgba(245,240,232,0.85)] text-sm font-medium"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="hidden sm:block no-underline px-[22px] py-[9px] rounded-[10px] bg-gradient-to-br from-[#D4AF37] to-[#B8941E] text-[#08080E] text-sm font-semibold shadow-[0_0_20px_rgba(212,175,55,0.3)]"
              >
                Get Started
              </Link>
            </>
          )}

          {/* Mobile Menu Button - Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden bg-none border-none cursor-pointer text-[#F5F0E8] p-[6px] z-[110]"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              {menuOpen ? (
                <path
                  d="M4 4L18 18M18 4L4 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M3 6H19M3 11H19M3 16H19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* --- MOBILE DRAWER SECTION --- */}

      {/* Overlay: Darkens background when drawer is open */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 left-0 h-screen w-[280px] bg-[#08080E] border-r border-[rgba(212,175,55,0.12)] shadow-2xl z-[105] transform transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-20 px-6 pb-10">
          <div className="flex flex-col gap-2">
            {navLinks.map(({ to, l }) => (
              <Link
                key={l}
                to={to}
                className="no-underline px-4 py-3 text-[#F5F0E8] text-lg rounded-xl font-medium hover:bg-white/5 transition-colors"
              >
                {l}
              </Link>
            ))}

            <div className="h-[1px] bg-white/5 my-4" />

            {user ? (
              <>
                <Link
                  to="/cart"
                  className="no-underline px-4 py-3 text-[#F5F0E8] text-lg rounded-xl hover:bg-white/5 transition-colors"
                >
                  Cart
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-3 text-left text-[#D4AF37] text-lg rounded-xl font-medium hover:bg-[#D4AF37]/10 transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="no-underline px-4 py-3 text-[#F5F0E8] text-lg rounded-xl hover:bg-white/5 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="no-underline px-4 py-3 text-[#D4AF37] text-lg rounded-xl font-semibold"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Decorative Bottom element */}
          <div className="mt-auto opacity-20 italic font-[Georgia] text-[#D4AF37] text-sm">
            Techly Luxury Curation
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
