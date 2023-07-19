import React, { useState } from "react";
import { FaReact } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { VscSearchFuzzy } from "react-icons/vsc";
import { Divider, Badge, Drawer, message, Avatar, Popover } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { useNavigate } from "react-router";
import { callLogout } from "../../services/api";
import { Link } from "react-router-dom";
import "./header.scss";
import { doLogoutAction } from "../../redux/account/accountSlice";

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const user = useSelector((state) => state.account.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.order.carts);
  console.log("coi cart: ", carts);
  const handleLogout = async () => {
    const res = await callLogout();
    if (res && res.data) {
      dispatch(doLogoutAction());
      message.success("Đăng xuất thành công");
      navigate("/");
    }
  };

  let items = [
    {
      label: <Link to="/user">Quản lý tài khoản</Link>,
      key: "account",
    },
    {
      label: (
        <label style={{ cursor: "pointer" }} onClick={() => handleLogout()}>
          Đăng xuất
        </label>
      ),
      key: "logout",
    },
  ];
  if (user?.role === "ADMIN") {
    items.unshift({
      label: <Link to="/admin">Trang quản trị</Link>,
      key: "admin",
    });
  }

  if (user?.role === "STAFF") {
    items.unshift({
      label: <Link to="/staff">Trang quản trị</Link>,
      key: "staff",
    });
  }

  const urlAvatar = `${`data:image/jpeg;base64,${user?.avatar}`}`;
  console.log("use: ", user);
  const contentPopover = () => {
    return (
      <div className="pop-cart-body">
        <div className="pop-cart-content">
          {carts?.map((product, index) => {
            return (
              <div className="product" key={`product-${index}`}>
                <img
                  src={`data:image/jpeg;base64,${product?.detail?.thumbnail}`}
                />
                <div className="name">{product?.detail?.name}</div>
                <div className="price">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(product?.detail?.price)}
                </div>
              </div>
            );
          })}
        </div>
        <div className="pop-cart-footer">
          <button onClick={() => navigate("/order")}>Xem giỏ hàng</button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="header-container">
        <header className="page-header">
          <div className="page-header__top">
            <div
              className="page-header__toggle"
              onClick={() => {
                setOpenDrawer(true);
              }}
            >
              ☰
            </div>
            <div className="page-header__logo">
              <span className="logo" onClick={() => navigate("/")}>
                <FaReact className="rotate icon-react" /> Đồ Án Cdio
                <VscSearchFuzzy className="icon-search" />
              </span>
              <input
                className="input-search"
                type={"text"}
                placeholder="Bạn tìm gì hôm nay"
              />
            </div>
          </div>
          <nav className="page-header__bottom">
            <ul id="navigation" className="navigation">
              <li className="navigation__item">
                <Popover
                  className="popover-carts"
                  placement="topRight"
                  rootClassName="popover-carts"
                  title={"Sản phẩm mới thêm"}
                  content={contentPopover}
                  arrow={true}
                >
                  <Badge count={carts?.length ?? 0} size={"small"} showZero>
                    <FiShoppingCart className="icon-cart" />
                  </Badge>
                </Popover>
              </li>
              <li className="navigation__item mobile">
                <Divider type="vertical" />
              </li>
              <li className="navigation__item mobile">
                {!isAuthenticated ? (
                  <span onClick={() => navigate("/login")}> Tài Khoản</span>
                ) : (
                  <Dropdown menu={{ items }} trigger={["click"]}>
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        <Avatar src={urlAvatar} />
                        {user?.fullName}
                        <DownOutlined />
                      </Space>
                    </a>
                  </Dropdown>
                )}
              </li>
            </ul>
          </nav>
        </header>
      </div>
      <Drawer
        title="Menu chức năng"
        placement="left"
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
      >
        <p>Quản lý tài khoản</p>
        <Divider />

        <p>Đăng xuất</p>
        <Divider />
      </Drawer>
    </>
  );
};

export default Header;
