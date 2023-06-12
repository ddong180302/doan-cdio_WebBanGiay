import { DeleteTwoTone, LoadingOutlined } from "@ant-design/icons";
import {
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  message,
  notification,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import {
  doPlaceOrderAction,
  doUpdateCartAction,
} from "../../redux/order/orderSlice";
import { callPlaceOrder } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";

const Payment = (props) => {
  const carts = useSelector((state) => state.order.carts);
  const user = useSelector((state) => state.account.user);
  const [isSubmit, setIsSubmit] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const dispatch = useDispatch();
  const [form] = Form.useForm();

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

  const onFinish = async (values) => {
    setIsSubmit(true);
    const detailOrder = carts.map((item) => {
      return {
        product_id: item.detail.id,
        price: item.detail.price,
        quantity: item.quantity,
        product_name: item.detail.name,
        sold: item.detail.sold,
        total_money: +item.quantity * +item.detail.price,
      };
    });
    const data = {
      user_id: values.id,
      email: values.email,
      fullName: values.name,
      address: values.address,
      note: values.note,
      phone: values.phone,
      total_money: totalPrice,
      detail: detailOrder,
    };
    console.log(data);
    const res = await callPlaceOrder(data);

    if (res && res.data) {
      message.success("Đặt hàng thành công!");
      dispatch(doPlaceOrderAction());
      props.setCurrentStep(2);
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: res.message,
      });
    }
    setIsSubmit(false);
  };
  return (
    <div style={{ background: "#efefef", padding: "20px 0" }}>
      <Row gutter={[20, 20]}>
        <Col md={16} xs={24}>
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
        </Col>
        <Col md={8} xs={24}>
          <div className="order-sum">
            <Form onFinish={onFinish} form={form}>
              <Form.Item
                hidden
                labelCol={{ span: 24 }}
                label="ID"
                name="id"
                initialValue={user?.id}
                rules={[{ required: true, message: "Vui lòng nhập id!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                hidden
                labelCol={{ span: 24 }}
                label="Email"
                name="email"
                initialValue={user?.email}
                rules={[
                  {
                    type: "email",
                    message: "E-mail bạn nhập không đúng định dạng!",
                  },
                  {
                    required: true,
                    message: "Vui lòng nhập E-mail!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                style={{ margin: 0 }}
                labelCol={{ span: 24 }}
                label="Tên người nhận"
                name="name"
                initialValue={user?.fullName}
                rules={[
                  {
                    required: true,
                    message: "Tên người nhận không được để trống!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                style={{ margin: 0 }}
                labelCol={{ span: 24 }}
                label="Số điện thoại"
                name="phone"
                initialValue={user?.phone}
                rules={[
                  {
                    required: true,
                    message: "Số điện thoại không được để trống!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                style={{ margin: 0 }}
                labelCol={{ span: 24 }}
                label="Địa chỉ"
                name="address"
                initialValue={user?.address}
                rules={[
                  {
                    required: true,
                    message: "Địa chỉ không được để trống!",
                  },
                ]}
              >
                <TextArea autoFocus rows={4} />
              </Form.Item>
              <Form.Item
                style={{ margin: 0 }}
                labelCol={{ span: 24 }}
                label="Ghi chú"
                name="note"
                rules={[
                  {
                    required: false,
                    message: "Địa chỉ không được để trống!",
                  },
                ]}
              >
                <TextArea autoFocus rows={4} />
              </Form.Item>
            </Form>

            <div className="info">
              <div className="method">
                <div className="text-method">Hình thức thanh toán</div>
                <Radio checked>Thanh toán khi nhận hàng</Radio>
              </div>
            </div>
            <Divider style={{ margin: "5px 0" }} />
            <div className="calculate">
              <span>Tổng tiền</span>
              <span className="sum-final">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(totalPrice || 0)}
              </span>
            </div>
            <Divider style={{ margin: "5px 0" }} />
            <button onClick={() => form.submit()} disabled={isSubmit}>
              {isSubmit && (
                <span>
                  <LoadingOutlined /> &nbsp;{" "}
                </span>
              )}
              Đặt hàng ({carts?.length ?? 0})
            </button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Payment;
