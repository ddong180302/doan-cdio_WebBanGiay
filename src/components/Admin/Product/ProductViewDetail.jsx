import { Badge, Descriptions, Divider, Drawer, Image } from "antd";
import moment from "moment";
const ProductViewDetail = (props) => {
  const {
    openViewDetail,
    setOpenViewDetail,
    dataViewDetail,
    setDataViewDetail,
  } = props;
  const onClose = () => {
    setOpenViewDetail(false);
    setDataViewDetail(null);
  };
  return (
    <>
      <Drawer
        title="Chức năng xem chi tiết"
        placement="right"
        onClose={onClose}
        open={openViewDetail}
        width="50vw"
      >
        <Descriptions title="Thông tin Book" bordered column={2}>
          <Descriptions.Item label="Id">{dataViewDetail?.id}</Descriptions.Item>
          <Descriptions.Item label="Category Id">
            {dataViewDetail?.category_id}
          </Descriptions.Item>
          <Descriptions.Item label="Tên sản phẩm" span={2}>
            {dataViewDetail?.title}
          </Descriptions.Item>
          <Descriptions.Item label="Giá tiền">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(dataViewDetail?.price ?? 0)}
          </Descriptions.Item>

          <Descriptions.Item label="Giá đã giảm">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(dataViewDetail?.discount ?? 0)}
          </Descriptions.Item>

          <Descriptions.Item label="Mô tả" span={2}>
            <Badge status="processing" text={dataViewDetail?.description} />
          </Descriptions.Item>

          <Descriptions.Item label="Created At">
            {moment(dataViewDetail?.createdAt).format("DD-MM-YYYY hh:mm:ss")}
          </Descriptions.Item>

          <Descriptions.Item label="Updated At">
            {moment(dataViewDetail?.updatedAt).format("DD-MM-YYYY hh:mm:ss")}
          </Descriptions.Item>
        </Descriptions>
        <Divider orientation="left"> Ảnh Books </Divider>
        <Image
          width={200}
          src={`${`data:image/jpeg;base64,${dataViewDetail?.image}`}`}
          placeholder={
            <Image
              preview={false}
              src={`${`data:image/jpeg;base64,${dataViewDetail?.image}`}`}
              width={200}
            />
          }
        />
      </Drawer>
    </>
  );
};

export default ProductViewDetail;
