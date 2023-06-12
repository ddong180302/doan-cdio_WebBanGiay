import { Upload, Button, Form } from "antd";
import {
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useState } from "react";

const HistoryPage = (props) => {
  const [loadingSlider, setLoadingSlider] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const onFinish = (values) => {
    const { [imageUrl]: value, slider } = values;
    for (let i = 0; i < slider.fileList.length; i++) {
      console.log(
        "check slider thứ: ",
        i + 1,
        " là: ",
        slider.fileList[i].thumbUrl
      );
    }
    console.log("check value: ", imageUrl);
    console.log("check value slider: ", slider);
  };

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
      getBase64(info.file.originFileObj, (url) => {
        type ? setLoadingSlider(false) : setLoading(false);
        setImageUrl(url);
      });
    }
    if (info.fileList.status === "done") {
      //Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        type ? setLoadingSlider(false) : setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const handleUploadFile = ({ file, onSuccess, onError }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 1000);
  };
  return (
    <>
      <Form name="basic" onFinish={onFinish} autoComplete="off">
        <Form.Item
          labelCol={{ span: 24 }}
          label="Ảnh Thumbnail"
          name={imageUrl}
        >
          <Upload
            name="thumbnail"
            listType="picture-card"
            className="avatar-uploader"
            maxCount={1}
            multiple={false}
            customRequest={handleUploadFile}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            <div>
              {loading ? <LoadingOutlined /> : <PlusOutlined />}
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item labelCol={{ span: 24 }} label="Ảnh Slider" name="slider">
          <Upload
            multiple
            name="slider"
            listType="picture-card"
            className="avatar-uploader"
            customRequest={handleUploadFile}
            beforeUpload={beforeUpload}
            onChange={(info) => handleChange(info, "slider")}
          >
            <div>
              {loadingSlider ? <LoadingOutlined /> : <PlusOutlined />}
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>

        {/* <Upload name="file" multiple beforeUpload={handleUpload}>
          <Button icon={<UploadOutlined />}>Select Files</Button>
        </Upload> */}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default HistoryPage;
