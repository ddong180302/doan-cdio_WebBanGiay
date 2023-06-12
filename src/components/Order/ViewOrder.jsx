import { DeleteTwoTone } from "@ant-design/icons";
import { Col, Divider, Empty, InputNumber, Row } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  doDeleteItemCartAction,
  doUpdateCartAction,
} from "../../redux/order/orderSlice";

const ViewOrder = (props) => {
  const carts = useSelector((state) => state.order.carts);
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  console.log("carts: ", carts);

  useEffect(() => {
    if (carts && carts.length > 0) {
      let sum = 0;
      carts.map((item) => {
        sum += item?.quantity * item?.detail?.price;
      });
      setTotalPrice(sum);
    } else {
      setTotalPrice(0);
    }
  }, [carts]);

  const handleOnchangeInput = (value, product) => {
    console.log(product);
    if (!value || value < 1) return;
    if (!isNaN(value)) {
      dispatch(
        doUpdateCartAction({
          quantity: value,
          detail: product.detail,
          id: product.id,
        })
      );
    }
  };

  return (
    <div style={{ background: "#efefef", padding: "20px 0" }}>
      <Row gutter={[20, 20]}>
        <Col md={18} xs={24}>
          {carts?.map((product, index) => {
            const currentProductPrice = product?.detail?.price ?? 0;
            return (
              <div className="order-product" key={`index-${index}`}>
                <div className="product-content">
                  <img
                    src={`data:image/jpeg;base64,${product?.detail?.thumbnail}`}
                  />
                  <div className="name">{product?.detail?.name}</div>
                  <div className="price">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(currentProductPrice)}
                  </div>
                </div>
                <div className="action">
                  <div className="quantity">
                    <InputNumber
                      onChange={(value) => handleOnchangeInput(value, product)}
                      value={product.quantity}
                    />
                  </div>
                  <div className="sum">
                    Tổng:{" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(currentProductPrice * product?.quantity)}
                  </div>
                  <DeleteTwoTone
                    style={{ cursor: "pointer", paddingRight: "20px" }}
                    onClick={() =>
                      dispatch(doDeleteItemCartAction({ id: product?.id }))
                    }
                    twoToneColor={"#eb2f96"}
                  />
                </div>
              </div>
            );
          })}
          {carts.length === 0 && (
            <div className="order-product-empty">
              <Empty description={"Không có sản phẩm trong giỏ hàng"} />
            </div>
          )}
        </Col>
        <Col md={6} xs={24}>
          <div className="order-sum">
            <div className="calculate">
              <span>Tạm tính</span>
              <span>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(totalPrice || 0)}
              </span>
            </div>
            <Divider style={{ margin: "10px 0" }} />
            <div className="calculate">
              <span>Tổng tiền</span>
              <span className="sum-final">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(totalPrice || 0)}
              </span>
            </div>
            <Divider style={{ margin: "10px 0" }} />
            <button onClick={() => props.setCurrentStep(1)}>
              Mua Hàng ({carts?.length ?? 0})
            </button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ViewOrder;
