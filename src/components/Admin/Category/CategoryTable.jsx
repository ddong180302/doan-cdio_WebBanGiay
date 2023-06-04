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
import {
  callDeleteCategory,
  callFetchListCategory,
} from "../../../services/api";
import CategoryViewDetail from "./CategoryViewDetail";
import {
  DeleteTwoTone,
  EditTwoTone,
  ExportOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import ModalCreateNewCategory from "./ModalCreateNewCategory";
import * as XLSX from "xlsx";
import CategoryModalUpdate from "./CategoryModalUpdate";
import moment from "moment";

const TableCategory = (props) => {
  const [listCategory, setlistCategory] = useState([]);
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
    fetchCategory();
  }, [current, pageSize, filter, sortQuery]);

  const fetchCategory = async () => {
    setIsLoading(true);
    let query = `current=${current}&pageSize=${pageSize}`;
    if (filter) {
      query += `&${filter}`;
    }

    if (sortQuery) {
      query += `&${sortQuery}`;
    }
    // const query = `current=${current}&pageSize=${pageSize}`;
    const res = await callFetchListCategory(query);
    if (res && res.data) {
      setlistCategory(res.data.result);
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
      title: "Tên danh mục",
      dataIndex: "name",
      sorter: true,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createAt",
      sorter: true,
      render: (text, record) => {
        return moment(text).format("DD-MM-YYYY hh:mm:ss");
      },
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
              title={"Xác nhận xoá danh mục"}
              description={"Bạn có chắc chắn muốn xoá danh mục này ?"}
              onConfirm={() => handleDeleteUser(record.id)}
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

  const handleDeleteUser = async (categoryId) => {
    const res = await callDeleteCategory(categoryId);
    if (res && res.data) {
      message.success("Xoá danh mục thành công");
      fetchCategory();
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
    if (listCategory.length > 0) {
      const worksheet = XLSX.utils.json_to_sheet(listCategory);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, "ExportCategory.csv");
    }
  };
  const renderHeader = () => {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Table List Categories</span>
        <span style={{ display: "flex", gap: 15 }}>
          <Button
            icon={<ExportOutlined />}
            type="primary"
            onClick={() => handleExportData()}
          >
            Export
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
            dataSource={listCategory}
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
      <CategoryViewDetail
        openViewDetail={openViewDetail}
        setOpenViewDetail={setOpenViewDetail}
        dataViewDetail={dataViewDetail}
        setDataViewDetail={setDataViewDetail}
      />
      <ModalCreateNewCategory
        openModalCreate={openModalCreate}
        setOpenModalCreate={setOpenModalCreate}
        fetchCategory={fetchCategory}
      />

      <CategoryModalUpdate
        openModalUpdate={openModalUpdate}
        setOpenModalUpdate={setOpenModalUpdate}
        dataUpdate={dataUpdate}
        fetchCategory={fetchCategory}
        setDataUpadte={setDataUpadte}
      />
    </>
  );
};

export default TableCategory;
