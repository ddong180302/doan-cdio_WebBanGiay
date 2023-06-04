import { Drawer, Badge, Descriptions } from "antd";
import moment from "moment";

const CategoryViewDetail = (props) => {
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
        <Descriptions title="Thông tin Category" bordered column={2}>
          <Descriptions.Item label="ID">{dataViewDetail?.id}</Descriptions.Item>
          <Descriptions.Item label="Tên Danh Mục">
            {dataViewDetail?.name}
          </Descriptions.Item>
          <Descriptions.Item label="Created At">
            {moment(dataViewDetail?.createdAt).format("DD-MM-YYYY hh:mm:ss")}
          </Descriptions.Item>
          <Descriptions.Item label="Updated At">
            {moment(dataViewDetail?.updatedAt).format("DD-MM-YYYY hh:mm:ss")}
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    </>
  );
};

export default CategoryViewDetail;
