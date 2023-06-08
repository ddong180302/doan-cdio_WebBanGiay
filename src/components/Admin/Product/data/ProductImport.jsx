import React, { useState } from "react";
import { Button, Modal, message, Upload, Table, notification } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";
import { callBulkCreateUser } from "../../../../services/api";
import templateFile from "./template.xlsx?url";
const ProductImport = (props) => {
  const { openModalImport, setOpenModalImport } = props;
  const [dataExcel, setDataExcel] = useState("");

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 1000);
  };

  const { Dragger } = Upload;
  const propsUpload = {
    name: "file",
    multiple: true,
    maxCount: 1,
    accept:
      ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
    //action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    customRequest: dummyRequest,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        if (info.fileList && info.fileList.length > 0) {
          const file = info.fileList[0].originFileObj;
          const reader = new FileReader();
          reader.readAsArrayBuffer(file);
          reader.onload = function (e) {
            const data = new Uint8Array(reader.result);
            const workbook = XLSX.read(data, { type: "array" });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const json = XLSX.utils.sheet_to_json(sheet, {
              header: ["key", "fullName", "email", "phone"],
              range: 1,
            });
            if (json && json.length > 0) setDataExcel(json);
          };
        }
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const handleSubmit = async () => {
    const data = dataExcel.map((item) => {
      item.password = "123456";
      return item;
    });
    console.log(data);
    const res = await callBulkCreateUser(data);
    if (res.data) {
      notification.success({
        description: `Success: ${res.data.countSuccess}, Error: ${res.data.countError}`,
        message: "Upload thành công",
      });
      setDataExcel([]);
      setOpenModalImport(false);
      props.fetchUser();
    } else {
      notification.error({
        description: res.message,
        message: "Có lỗi xảy ra",
      });
    }
  };

  return (
    <>
      <Modal
        title="Import data user"
        open={openModalImport}
        onOk={() => handleSubmit()}
        okText={"Import data"}
        onCancel={() => {
          setOpenModalImport(false);
          setDataExcel([]);
        }}
        width={"50vw"}
        okButtonProps={{
          disabled: dataExcel.length < 1,
        }}
        maskClosable={false}
      >
        <div>
          <Dragger {...propsUpload}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single upload. Only accept .csv, .xls, .xlsx . or
              &nbsp;
              <a
                onClick={(e) => e.stopPropagation()}
                href={templateFile}
                download
              >
                Download Sample File
              </a>
            </p>
          </Dragger>
        </div>
        <div style={{ marginTop: "10px" }}>
          <Table
            title={() => <span>Dữ liệu upload:</span>}
            dataSource={dataExcel}
            columns={[
              {
                title: "Tên hiển thị",
                dataIndex: "fullName",
                key: "fullName",
              },
              {
                title: "Email",
                dataIndex: "email",
                key: "email",
              },
              {
                title: "Số điện thoại",
                dataIndex: "phone",
                key: "phone",
              },
            ]}
          />
        </div>
      </Modal>
    </>
  );
};

export default ProductImport;
