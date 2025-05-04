import logo from "../../assets/logo.webp";
function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="container py-4 flex justify-between items-center">
        <img
          src={logo}
          className="w-24"
          alt="Shoppie"
        />
      </div>
    </header>
  );
}

export default Navbar;
