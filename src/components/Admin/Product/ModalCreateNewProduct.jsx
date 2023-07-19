import React, { useEffect, useState } from "react";
import {
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Col,
  Divider,
  Input,
  InputNumber,
  message,
  Modal,
  notification,
  Row,
  Select,
  Upload,
  Button,
  Form,
} from "antd";
import {
  callCreateAProduct,
  callFetchCategory,
  createNewGallery,
} from "../../../services/api";
const ModalCreateNewProduct = (props) => {
  const [loadingSlider, setLoadingSlider] = useState(false);
  const [loading, setLoading] = useState(false);
  const { openModalCreate, setOpenModalCreate } = props;
  const [isSubmit, setIsSubmit] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const [listCategory, setListCategory] = useState([]);
  const [form] = Form.useForm();
  const [thumbnail, setThumbnail] = useState("");

  const [dataThumbnail, setDataThumbnail] = useState([]);
  const [dataSlider, setDataSlider] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  useEffect(() => {
    const fetchCategory = async () => {
      const res = await callFetchCategory();
      if (res && res.data) {
        const d = res.data.map((item) => {
          return { label: item.name, value: item.id };
        });
        setListCategory(d);
      }
    };
    fetchCategory();
  }, []);

  const onFinish = async (values) => {
    if (dataThumbnail.length === 0) {
      notification.error({
        message: "Lỗi upload",
        description: "Vui lòng upload ảnh thumbnail",
      });
      return;
    }

    if (dataSlider.length === 0) {
      notification.error({
        message: "Lỗi update",
        description: "Vui lòng upload ảnh slider",
      });
      return;
    }
    const { category_id, name, price, quantity, sold } = values;
    const thumbnail = dataThumbnail[0].file;
    console.log("check data slider: ", dataSlider);

    const slider = dataSlider.map((item) => item.file);
    //console.log("check data thumbnail: ", thumbnail);
    console.log("check data slider: ", slider);
    setIsSubmit(true);
    const res = await callCreateAProduct(
      category_id,
      name,
      price,
      quantity,
      sold,
      thumbnail
    );
    console.log(res);
    if (res && res.data) {
      const product_id = res.data.product_id;
      await createNewGallery(product_id, slider);
      if (res && res.data) {
        message.success("Tạo mới sản phẩm thành công");
        form.resetFields();
        setOpenModalCreate(false);
        await props.fetchProduct();
      } else {
        notification.error({
          message: "Đã có lỗi xảy ra",
          description: res.message,
        });
      }
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: res.message,
      });
    }
    setIsSubmit(false);
  };

  ///upload
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info, type) => {
    if (info.file.status === "uploading") {
      type ? setLoadingSlider(true) : setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        type ? setLoadingSlider(false) : setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const handleUploadFileThumbnail = async ({ file, onSuccess, onError }) => {
    // const res = await callUploadBookImg(file);
    // console.log("check file: ", file);
    setDataThumbnail([
      {
        file: file,
        uid: file.uid,
      },
    ]);
    onSuccess("ok");
  };

  const handleUploadFileSlider = async ({ file, onSuccess, onError }) => {
    //const res = await callUploadBookImg(file);
    // console.log("check file: ", file);

    //copy previous state => upload multiple images
    setDataSlider((dataSlider) => [
      ...dataSlider,
      {
        file: file,
        uid: file.uid,
      },
    ]);
    onSuccess("ok");
  };

  const handleRemoveFile = (file, type) => {
    if (type === "thumbnail") {
      setDataThumbnail([]);
    }
    if (type === "slider") {
      const newSlider = dataSlider.filter((x) => x.uid !== file.uid);
      setDataSlider(newSlider);
    }
  };

  const handlePreview = async (file) => {
    getBase64(file.originFileObj, (url) => {
      setPreviewImage(url);
      setPreviewOpen(true);
      setPreviewTitle(
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
      );
    });
  };
  return (
    <>
      <Modal
        title="Thêm mới Sản phẩm"
        open={openModalCreate}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => {
          setOpenModalCreate(false);
          props.fetchProduct();
          form.resetFields();
          setIsSubmit(false);
        }}
        okText={"Tạo mới"}
        cancelText={"Hủy"}
        confirmLoading={isSubmit}
        width={"50vw"}
        maskClosable={false}
      >
        <Divider />

        <Form form={form} name="basic" onFinish={onFinish} autoComplete="off">
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Loại giày"
                name="category_id"
                rules={[
                  { required: true, message: "Vui lòng chọn loại giày!" },
                ]}
              >
                <Select showSearch allowClear options={listCategory} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Tên giày"
                name="name"
                rules={[
                  { required: true, message: "Vui lòng nhập tên hiển thị!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Giá tiền"
                name="price"
                rules={[{ required: true, message: "Vui lòng nhập giá tiền!" }]}
              >
                <InputNumber
                  min={0}
                  style={{ width: "100%" }}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  addonAfter="VND"
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Số lượng"
                name="quantity"
                rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
              >
                <InputNumber min={1} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Đã bán"
                name="sold"
                rules={[
                  { required: true, message: "Vui lòng nhập số lượng đã bán!" },
                ]}
                initialValue={0}
              >
                <InputNumber
                  min={0}
                  //defaultValue={0}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Ảnh Thumbnail"
                name="thumbnail"
              >
                <Upload
                  name="thumbnail"
                  listType="picture-card"
                  className="avatar-uploader"
                  maxCount={1}
                  multiple={false}
                  customRequest={handleUploadFileThumbnail}
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                  onRemove={(file) => handleRemoveFile(file, "thumbnail")}
                  onPreview={handlePreview}
                >
                  <div>
                    {loading ? <LoadingOutlined /> : <PlusOutlined />}
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Ảnh Slider"
                name="slider"
              >
                <Upload
                  multiple
                  name="slider"
                  listType="picture-card"
                  className="avatar-uploader"
                  customRequest={handleUploadFileSlider}
                  beforeUpload={beforeUpload}
                  onChange={(info) => handleChange(info, "slider")}
                  onRemove={(file) => handleRemoveFile(file, "slider")}
                  onPreview={handlePreview}
                >
                  <div>
                    {loadingSlider ? <LoadingOutlined /> : <PlusOutlined />}
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCreateNewProduct;
