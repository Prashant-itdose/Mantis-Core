import { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MenuItem = ({ menuItem, isSearched }) => {
  // console.log("isSearched", isSearched);

  const [t] = useTranslation();
  const [isMenuExtended, setIsMenuExtended] = useState(isSearched);
  const [isExpandable, setIsExpandable] = useState(isSearched);
  const [isMainActive, setIsMainActive] = useState(false);
  const [isOneOfChildrenActive, setIsOneOfChildrenActive] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuExtended(!isMenuExtended);
  };

  const handleMainMenuAction = () => {
    if (isExpandable) {
      toggleMenu();
      return;
    }
    navigate(menuItem.url ? menuItem.url : "/");
  };

  const calculateIsActive = (url) => {
    setIsMainActive(false);
    setIsOneOfChildrenActive(false);
    if (isExpandable && menuItem && menuItem.Files) {
      menuItem.Files.forEach((item) => {
        if (item.URLName === url.DispName || isSearched) {
          setIsOneOfChildrenActive(true);
          setIsMenuExtended(true);
        }
      });
    } else if (menuItem.URLName === url.DispName) {
      setIsMainActive(true);
    }
  };

  useEffect(() => {
    if (location) {
      calculateIsActive(location);
    }
  }, [location, isExpandable, menuItem, isSearched]);

  useEffect(() => {
    if (!isMainActive && !isOneOfChildrenActive && !isSearched) {
      setIsMenuExtended(false);
    }
  }, [isMainActive, isOneOfChildrenActive, isSearched]);

  useEffect(() => {
    setIsExpandable(
      Boolean(menuItem && menuItem.Files && menuItem.Files.length > 0)
    );
  }, [menuItem]);
  // console.log("asdasdasd", menuItem);

  return (
    <li className={`nav-item${isMenuExtended ? " menu-open" : ""}`}>
      <a
        className={`nav-link${
          isMainActive || isOneOfChildrenActive ? "active" : ""
        }`}
        role="link"
        onClick={handleMainMenuAction}
        style={{ cursor: "pointer", margin: 0 }}
      >
        <i className={`${menuItem?.menuIcon} mr-2`} />
        <p>{t(menuItem.MenuName)}</p>
        {isExpandable ? <i className="right fas fa-angle-left" /> : null}
      </a>
      <ul className="nav nav-treeview nav-link">
        {isExpandable &&
          menuItem &&
          menuItem.Files &&
          menuItem?.Files?.map((item) => (
            <li className="nav-item" key={item?.DispName}>
              <NavLink
                className="nav-link"
                to={`${item?.URLName}`}
                state={{ data: item?.BreadCrumb }}
              >
                <i className={`${item?.icon} mr-2`} />
                <p>{t(item?.DispName)}</p>
              </NavLink>
            </li>
          ))}
      </ul>
    </li>
  );
};

export default MenuItem;
