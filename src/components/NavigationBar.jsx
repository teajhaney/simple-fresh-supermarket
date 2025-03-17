import { useState, useRef } from "react";
import { GiShoppingCart } from "react-icons/gi";
import { IoMdMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { CiSearch, CiShoppingCart, CiUser } from "react-icons/ci";
import { useEffect } from "react";
import { accounts, categories, shops, gorceryProducts } from "../constants";
import { CgMenuGridR } from "react-icons/cg";
import { OptionMenu } from "./export_components";
import { NavLink, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/useStateContext";

//code
const NavigationBar = () => {
  const {
    setActiveSideBarNav,
    activeSideBarNav,
    setActiveCartSideBar,
    cartCount,
  } = useStateContext();
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
  const [departmentSelected, setDepartmentSelected] =
    useState("All Departments");
  const departmentRef = useRef(null);
  const searchDropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        departmentRef.current &&
        !departmentRef.current.contains(event.target)
      ) {
        setIsDepartmentOpen(false);
      }
    };

    if (isDepartmentOpen) {
      window.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDepartmentOpen]);
  //search query and state
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchDropdown, setSearchDropdown] = useState(false);
  const navigate = useNavigate();
  //click outside search driopdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchDropdownRef &&
        !searchDropdownRef.current.contains(event.target)
      ) {
        setSearchDropdown(false);
      }
    };
    if (searchDropdown) {
      window.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchDropdown]);

  //handle input change
  const handleSearchInputChange = (e) => {
    e.stopPropagation();
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (query.length >= 0) {
      const filtered = gorceryProducts.filter((gorceryProduct) =>
        gorceryProduct.productName.toLowerCase().includes(query)
      );
      setFilteredProducts(filtered);
      setSearchDropdown(true);
    } else {
      setFilteredProducts([]);
      setSearchDropdown(false);
    }
  };
  const handleProductSearchSelection = (product) => {
    setSearchQuery("");
    setSearchDropdown(false);
    navigate("/products-details-page", { state: { product } });
  };

  return (
    <nav className=" flex flex-col gap-3 lg:pb-5  border-b-2 border-b-accents">
      <div className="bodyContent h-16 flex justify-between items-center">
        <div className="flex items-center gap-16 text-4xl">
          {/* Logo */}
          <div className="flex items-center gap-2 text-4xl">
            {activeSideBarNav ? (
              <RxCross2
                className="lg:hidden cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveSideBarNav((prevState) => !prevState);
                }}
              />
            ) : (
              <IoMdMenu
                className="lg:hidden cursor-pointer"
                onClick={() => setActiveSideBarNav((prevState) => !prevState)}
              />
            )}

            <NavLink to="/">
              <div className="flex items-center gap-2 text-4xl">
                <GiShoppingCart className="text-primary" />
                <h1 className="text-2xl font-bold">SimpleCart</h1>
              </div>
            </NavLink>
          </div>
          {/* search */}
          <div className="relative">
            <input
              type="text"
              name="search"
              id="search"
              value={searchQuery}
              onChange={handleSearchInputChange}
              placeholder="Search for products..."
              className="w-200  h-10 hidden lg:flex rounded-sm border-2 text-secondary outline-primary px-3 text-lg  border-accents"
            />
            {searchDropdown && filteredProducts.length > 0 && (
              <ul
                ref={searchDropdownRef}
                className="absolute bg-white  shadow-lg rounded w-200 h-100 overflow-auto z-10">
                {filteredProducts.map((filteredProduct) => (
                  <li
                    key={filteredProduct.id}
                    className="m-2 text-secondary hover:bg-grayed cursor-pointer"
                    onClick={() =>
                      handleProductSearchSelection(filteredProduct)
                    }>
                    <div className="gap-5 flex items-center">
                      <img
                        className="h-10 w-10"
                        src={filteredProduct.productImage}
                        alt={filteredProduct.productName}
                      />
                      <p className="text-sm"> {filteredProduct.productName}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* right icons */}
        </div>
        <div className="flex items-center gap-2 text-2xl">
          <CiSearch className="hidden lg:flex" />
          <NavLink
            to="/sign-in"
            className={({ isActive }) =>
              isActive ? "text-primary font-bold" : ""
            }>
            <CiUser />
          </NavLink>
          <button className="relative">
            <CiShoppingCart
              className=" cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setActiveCartSideBar((prevState) => !prevState);
              }}
            />
            <div
              onClick={(e) => {
                e.stopPropagation();
                setActiveCartSideBar((prevState) => !prevState);
              }}
              className="w-4 h-4 text-white bg-primary rounded-full absolute left-0 bottom-0 flex justify-center items-center text-[10px] cursor-pointer transition-all duration-500 ease-in-out">
              {cartCount}
            </div>
          </button>
        </div>
      </div>
      {/* Navbar */}
      <div className="bodyContent hidden lg:flex gap-8 items-center text-secondary">
        {/* departments */}
        <div className="relative w-52 h-10" ref={departmentRef}>
          {/* Select Box */}
          <div
            className="  flex justify-center text-white gap-3 items-center bg-primary  p-3 rounded-md  cursor-pointer"
            onClick={() => setIsDepartmentOpen(!isDepartmentOpen)}>
            <CgMenuGridR className="" />
            <span>{departmentSelected}</span>
          </div>
          {/* Dropdown Options */}
          {isDepartmentOpen && (
            <ul className="absolute w-full bg-white  border-2 border-accents  rounded-md my-2 shadow-md z-10">
              {categories.map((category, index) => (
                <NavLink key={index} to="/products-page">
                  <li
                    className="p-1 hover:bg-accents text-sm text-tertiary rounded-md mx-3 my-2 cursor-pointer transition"
                    onClick={() => {
                      setDepartmentSelected(category.title);
                      setIsDepartmentOpen(false);
                    }}>
                    {category.title}
                  </li>
                </NavLink>
              ))}
            </ul>
          )}
        </div>
        {/* Nav items */}
        <div>
          <ul className=" flex gap-10 items-center cursor-pointer ">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "text-primary" : "")}>
              Home
            </NavLink>
            {/* shop */}
            <li>
              <OptionMenu navItem={"Products"} navDropDownItems={shops} />
            </li>
            {/* account */}
            <li>
              {" "}
              <OptionMenu navItem={"Account"} navDropDownItems={accounts} />
            </li>
            <li>
              <NavLink
                to="/blog"
                className={({ isActive }) => (isActive ? "text-primary" : "")}>
                Blog
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;

// //search query and state management
// const [searchQuery, setSearchQuery] = useState("");
// const [filteredProducts, setFilteredProducts] = useState([]);
// const [searchDropdown, setSearchDropdown] = useState(false);

// const handleSearchChange = (e) => {
//   const query = e.target.value.toLowerCase();
//   setSearchQuery(query);

//   if (query.length > 0) {
//     const filtered = gorceryProducts.filter((gorceryProduct) =>
//       gorceryProduct.productName.toLowerCase().includes(query)
//     );
//     setFilteredProducts(filtered);
//     setSearchDropdown(true); //shows dropdown if result exist
//   } else {
//     setFilteredProducts([]);
//     setSearchDropdown(false);
//   }
// };
// const navigate = useNavigate();

// const handleProductSelect = (product) => {
//   setSearchDropdown(false); // Hide dropdown
//   setSearchQuery(""); // Clear search input
//   navigate("/products-details-page", { state: { product } }); // Navigate to product details page
// };
