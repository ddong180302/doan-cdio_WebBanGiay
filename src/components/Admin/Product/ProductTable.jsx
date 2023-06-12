import {
  Col,
  Row,
  Table,
  Button,
  Popconfirm,
  message,
  notification,
} from "antd";
import InputSearch from "./InputSearch";
import { useEffect, useState } from "react";
import { callDeleteProduct, callFetchListProduct } from "../../../services/api";
import ProductViewDetail from "./ProductViewDetail";
import {
  CloudUploadOutlined,
  DeleteTwoTone,
  EditTwoTone,
  ExportOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import ModalCreateNewProduct from "./ModalCreateNewProduct";
import ProductImport from "./data/ProductImport";
import * as XLSX from "xlsx";
import ProductModalUpdate from "./ProductModalUpdate";
import moment from "moment";

const TableProduct = (props) => {
  const [listProduct, setListProduct] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [sortQuery, setSortQuery] = useState("");
  const [dataViewDetail, setDataViewDetail] = useState("");
  const [openViewDetail, setOpenViewDetail] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalImport, setOpenModalImport] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [dataUpdate, setDataUpadte] = useState("");

  useEffect(() => {
    fetchProduct();
  }, [current, pageSize, filter, sortQuery]);

  const fetchProduct = async () => {
    setIsLoading(true);
    let query = `current=${current}&pageSize=${pageSize}`;
    if (filter) {
      query += `&${filter}`;
    }

    if (sortQuery) {
      query += `&${sortQuery}`;
    }
    // const query = `current=${current}&pageSize=${pageSize}`;
    const res = await callFetchListProduct(query);
    if (res && res.data) {
      setListProduct(res.data.result);
      setTotal(res.data.meta.total);
    }
    setIsLoading(false);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (text, record, index) => {
        return (
          <a
            href="#"
            onClick={() => {
              setDataViewDetail(record);
              setOpenViewDetail(true);
            }}
          >
            {record.id}
          </a>
        );
      },
    },
    {
      title: "Category",
      dataIndex: "category_id",
      sorter: true,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      sorter: true,
    },
    {
      title: "Giá",
      dataIndex: "price",
      sorter: true,
      render: (text, record) => {
        return Number(text).toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        });
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      sorter: true,
    },
    {
      title: "Đã bán",
      dataIndex: "sold",
      sorter: true,
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      sorter: true,
      render: (text, record) => {
        return moment(text).format("DD-MM-YYYY hh:mm:ss");
      },
    },
    {
      title: "Action",
      render: (text, record, index) => {
        return (
          <>
            <Popconfirm
              placement="leftTop"
              title={"Xác nhận xoá user"}
              description={"Bạn có chắc chắn muốn xoá user này ?"}
              onConfirm={() => handleDeleteProduct(record.id)}
              okText={"Xác nhận"}
              cancelText={"Huỷ"}
            >
              <span style={{ cursor: "pointer", margin: "0 20px" }}>
                <DeleteTwoTone twoToneColor={"#ff4d4f"} />
              </span>
            </Popconfirm>
            <EditTwoTone
              twoToneColor={"#f57800"}
              style={{ cursor: "pointer" }}
              onClick={() => {
                setOpenModalUpdate(true);
                setDataUpadte(record);
              }}
            />
          </>
        );
      },
    },
  ];

  const handleDeleteProduct = async (productId) => {
    const res = await callDeleteProduct(productId);
    if (res && res.data) {
      message.success("Xoá product thành công");
      fetchProduct();
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: res.message,
      });
    }
  };

  const onChange = (pagination, filters, sorter, extra) => {
    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current);
    }

    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrent(1);
    }

    if (sorter && sorter.field) {
      const q =
        sorter.order === "ascend"
          ? `order=${sorter.field} ASC`
          : `order=${sorter.field} DESC`;
      setSortQuery(q);
    }
  };
  const handleSearch = (query) => {
    setFilter(query);
  };

  const handleExportData = () => {
    if (listProduct.length > 0) {
      const worksheet = XLSX.utils.json_to_sheet(listProduct);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, "ExportUser.csv");
    }
  };
  const handleImportData = () => {
    setOpenModalImport(true);
  };
  const renderHeader = () => {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Table List Product</span>
        <span style={{ display: "flex", gap: 15 }}>
          <Button
            icon={<ExportOutlined />}
            type="primary"
            onClick={() => handleExportData()}
          >
            Export
          </Button>
          <Button
            icon={<CloudUploadOutlined />}
            type="primary"
            onClick={() => handleImportData()}
          >
            Import
          </Button>
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => setOpenModalCreate(true)}
          >
            Thêm mới
          </Button>
          <Button
            type="ghost"
            onClick={() => {
              setFilter("");
              setSortQuery("");
            }}
          >
            <ReloadOutlined />
          </Button>
        </span>
      </div>
    );
  };

  return (
    <>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <InputSearch handleSearch={handleSearch} setFilter={setFilter} />
        </Col>
        <Col span={24}>
          <Table
            title={renderHeader}
            loading={isLoading}
            className="def"
            columns={columns}
            dataSource={listProduct}
            onChange={onChange}
            rowKey={"id"}
            pagination={{
              current: current,
              pageSize: pageSize,
              total: total,
              showSizeChanger: true,
              showTotal: (total, range) => {
                return (
                  <div>
                    {range[0]}-{range[1]} trên {total} rows
                  </div>
                );
              },
            }}
          />
        </Col>
      </Row>
      <ProductViewDetail
        openViewDetail={openViewDetail}
        setOpenViewDetail={setOpenViewDetail}
        dataViewDetail={dataViewDetail}
        setDataViewDetail={setDataViewDetail}
      />
      <ModalCreateNewProduct
        openModalCreate={openModalCreate}
        setOpenModalCreate={setOpenModalCreate}
        fetchProduct={fetchProduct}
      />

      <ProductImport
        openModalImport={openModalImport}
        setOpenModalImport={setOpenModalImport}
        fetchProduct={fetchProduct}
      />

      <ProductModalUpdate
        openModalUpdate={openModalUpdate}
        setOpenModalUpdate={setOpenModalUpdate}
        dataUpdate={dataUpdate}
        fetchProduct={fetchProduct}
        setDataUpadte={setDataUpadte}
      />
    </>
  );
};

export default TableProduct;
