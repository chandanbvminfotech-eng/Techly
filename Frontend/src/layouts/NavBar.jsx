import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import UserAvatar from "../components/UserAvatar";
import { clearCart } from "../features/cart/cartSlice";
import { useTheme } from "../context/ThemeContext";



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
      style={{
        background: scrolled ? "var(--nav-bg)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottomColor: scrolled ? "var(--border-subtle)" : "transparent",
      }}
      className="fixed top-0 left-0 right-0 z-[100] transition-all duration-400 border-b"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 h-[68px] flex items-center justify-between gap-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-[10px] no-underline flex-shrink-0">
          <div className="w-[34px] h-[34px] rounded-[9px] bg-gradient-to-br from-[#D4AF37] to-[#F5E090] flex items-center justify-center">
            <span className="text-[17px] font-black text-[#08080E] font-[Georgia,serif]">T</span>
          </div>
          <span className="text-[22px] tracking-[-0.2px] font-[Georgia,'Times New Roman',serif] hidden sm:inline" style={{ color: "var(--text-primary)" }}>
            Techly
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-1">
          {navLinks.map(({ to, l }) => (
            <Link
              key={l}
              to={to}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={e => { e.currentTarget.style.color = "var(--text-primary)"; e.currentTarget.style.background = "var(--bg-chip)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.background = "transparent"; }}
            >
              {l}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex gap-[10px] items-center">
          {/* Theme Toggle */}
  

          {user ? (
            <>
              <Link
                to="/cart"
                className="no-underline px-[14px] sm:px-[18px] py-[8px] rounded-[10px] text-sm font-medium transition-colors"
                style={{ border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}
              >
                🛒 Cart
              </Link>
              <Link to="/profile" className="flex items-center gap-2">
                <UserAvatar name={user.name} avatarLink={user.avatar?.[0]?.url} />
                <span className="text-sm font-medium hidden sm:inline" style={{ color: "var(--text-primary)" }}>
                  {user.name}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="hidden md:block px-[18px] py-[8px] rounded-[10px] text-sm font-medium transition-colors"
                style={{ border: "1px solid var(--gold-muted)", color: "var(--gold)" }}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                className="hidden sm:block no-underline px-[18px] py-[8px] rounded-[10px] text-sm font-medium transition-colors"
                style={{ border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="hidden sm:block no-underline px-[20px] py-[8px] rounded-[10px] bg-gradient-to-br from-[#D4AF37] to-[#B8941E] text-[#08080E] text-sm font-semibold shadow-[0_0_20px_rgba(212,175,55,0.3)]"
              >
                Get Started
              </Link>
            </>
          )}

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden bg-none border-none cursor-pointer p-[6px] z-[110]"
            style={{ color: "var(--text-primary)" }}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              {menuOpen ? (
                <path d="M4 4L18 18M18 4L4 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M3 6H19M3 11H19M3 16H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 h-screen w-[280px] border-r shadow-2xl z-[105] transform transition-transform duration-300 ease-in-out md:hidden ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ background: "var(--drawer-bg)", borderColor: "var(--border-subtle)" }}
      >
        <div className="flex flex-col h-full pt-20 px-6 pb-10">
          <div className="flex flex-col gap-2">
            {navLinks.map(({ to, l }) => (
              <Link
                key={l}
                to={to}
                className="no-underline px-4 py-3 text-lg rounded-xl font-medium transition-colors"
                style={{ color: "var(--text-primary)" }}
              >
                {l}
              </Link>
            ))}

            <div className="h-[1px] my-4" style={{ background: "var(--border-subtle)" }} />


            <div className="h-[1px] my-2" style={{ background: "var(--border-subtle)" }} />

            {user ? (
              <>
                <Link to="/cart" className="no-underline px-4 py-3 text-lg rounded-xl transition-colors" style={{ color: "var(--text-primary)" }}>
                  🛒 Cart
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-3 text-left text-lg rounded-xl font-medium transition-colors"
                  style={{ color: "var(--gold)" }}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/signin" className="no-underline px-4 py-3 text-lg rounded-xl transition-colors" style={{ color: "var(--text-primary)" }}>
                  Sign In
                </Link>
                <Link to="/signup" className="no-underline px-4 py-3 text-lg rounded-xl font-semibold" style={{ color: "var(--gold)" }}>
                  Get Started
                </Link>
              </>
            )}
          </div>

          <div className="mt-auto opacity-30 italic font-[Georgia] text-sm" style={{ color: "var(--gold)" }}>
            Techly
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
