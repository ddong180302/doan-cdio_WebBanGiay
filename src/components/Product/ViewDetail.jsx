import { Row, Col, Rate, Divider, Button } from "antd";
import "./product.scss";
import ImageGallery from "react-image-gallery";
import { useRef, useState } from "react";
import ModalGallery from "./ModalGallery";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { BsCartPlus } from "react-icons/bs";
import ProductLoader from "./ProductLoader";
import { useDispatch, useSelector } from "react-redux";
import { doAddProductAction } from "../../redux/order/orderSlice";
import { useNavigate } from "react-router-dom";

const ViewDetail = (props) => {
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const nagivate = useNavigate();
  const { dataProduct } = props;
  console.log("dataProduct", dataProduct);
  const dispatch = useDispatch();
  const [isOpenModalGallery, setIsOpenModalGallery] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [currentQuantity, setCurrentQuantity] = useState(1);

  const refGallery = useRef(null);

  const images = dataProduct?.items ?? [];

  const handleOnClickImage = () => {
    //get current index onClick
    // alert(refGallery?.current?.getCurrentIndex());
    setIsOpenModalGallery(true);
    setCurrentIndex(refGallery?.current?.getCurrentIndex() ?? 0);
    // refGallery?.current?.fullScreen()
  };

  const onChange = (value) => {
    console.log("changed", value);
  };

  const handleChangeButton = (type) => {
    if (type === "MINUS") {
      if (currentQuantity - 1 <= 0) return;
      setCurrentQuantity(currentQuantity - 1);
    }
    if (type === "PLUS") {
      if (currentQuantity === +dataProduct.quantity) return;
      setCurrentQuantity(currentQuantity + 1);
    }
  };

  const handleChangeInput = (value) => {
    //console.log(value);
    if (!isNaN(value)) {
      console.log(value);

      if (+value > 0 && +value < +dataProduct.dataProduct.quantity) {
        setCurrentQuantity(+value);
      }
    }
  };

  const handleAddToCart = (quantity, product) => {
    console.log("product", product);
    console.log("quantity", quantity);
    dispatch(
      doAddProductAction({
        quantity,
        detail: product.dataProduct,
        id: product.dataProduct.id,
      })
    );
  };

  return (
    <div style={{ background: "#efefef", padding: "20px 0" }}>
      <div
        className="view-detail-book"
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          minHeight: "calc(100vh - 150px)",
        }}
      >
        <div style={{ padding: "20px", background: "#fff", borderRadius: 5 }}>
          {dataProduct ? (
            <Row gutter={[20, 20]}>
              <Col md={10} sm={0} xs={0}>
                <ImageGallery
                  ref={refGallery}
                  items={images}
                  showPlayButton={false} //hide play button
                  showFullscreenButton={false} //hide fullscreen button
                  renderLeftNav={() => <></>} //left arrow === <> </>
                  renderRightNav={() => <></>} //right arrow === <> </>
                  slideOnThumbnailOver={true} //onHover => auto scroll images
                  maxWidth={"450px"}
                  maxHeight={"450px"}
                  width={"450px"}
                  height={"450px"}
                  onClick={() => handleOnClickImage()}
                />
              </Col>
              <Col md={14} sm={24}>
                <Col md={0} sm={24} xs={24}>
                  <ImageGallery
                    ref={refGallery}
                    items={images}
                    showPlayButton={false} //hide play button
                    showFullscreenButton={false} //hide fullscreen button
                    renderLeftNav={() => <></>} //left arrow === <> </>
                    renderRightNav={() => <></>} //right arrow === <> </>
                    showThumbnails={false}
                    maxWidth={"450px"}
                    maxHight={"450px"}
                  />
                </Col>
                <Col span={24}>
                  <div className="author">
                    Thương Hiệu:{" "}
                    <a href="#">{dataProduct.dataProduct.category_id}</a>{" "}
                  </div>
                  <div className="title">{dataProduct.dataProduct.name}</div>
                  <div className="rating">
                    <Rate
                      value={5}
                      disabled
                      style={{ color: "#ffce3d", fontSize: 12 }}
                    />
                    <span className="sold">
                      <Divider type="vertical" />
                      Đã bán {dataProduct.dataProduct.sold}
                    </span>
                  </div>
                  <div className="price">
                    <span className="currency">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(dataProduct.dataProduct.price)}
                    </span>
                  </div>
                  <div className="delivery">
                    <div>
                      <span className="left">Vận chuyển</span>
                      <span className="right">Miễn phí vận chuyển</span>
                    </div>
                  </div>
                  <div className="quantity">
                    <span className="left">Số lượng</span>
                    <span className="right">
                      <button onClick={() => handleChangeButton("MINUS")}>
                        <MinusOutlined />
                      </button>
                      <input
                        defaultValue={1}
                        onChange={(event) =>
                          handleChangeInput(event.target.value)
                        }
                        value={currentQuantity}
                      />
                      <button onClick={() => handleChangeButton("PLUS")}>
                        <PlusOutlined />
                      </button>
                    </span>
                  </div>
                  <div className="buy">
                    <button
                      className="cart"
                      //{isAuthenticated === true ? }
                      onClick={
                        isAuthenticated === true
                          ? () => handleAddToCart(currentQuantity, dataProduct)
                          : () => nagivate("/login")
                      }
                    >
                      <BsCartPlus className="icon-cart" />
                      <span>Thêm vào giỏ hàng</span>
                    </button>
                    <button className="now">Mua ngay</button>
                  </div>
                </Col>
              </Col>
            </Row>
          ) : (
            <ProductLoader />
          )}
        </div>
      </div>
      <ModalGallery
        isOpen={isOpenModalGallery}
        setIsOpen={setIsOpenModalGallery}
        currentIndex={currentIndex}
        items={images}
        title={"Image gallery"}
      />
    </div>
  );
};

export default ViewDetail;
