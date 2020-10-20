import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { PlusOutlined } from "@ant-design/icons";
import Axios from "axios";

function MyDropzone(props) {
  const [Images, setImages] = useState([]);
  const deleteImg = (i) => {
    let newImages = [...Images];
    newImages.splice(i, 1); //状态不能直接更改
    //更新数据
    setImages(newImages);
    props.refresh(newImages);
  };

  //return event handle function
  const onDrop = useCallback(
    (acceptedFiles) => {
      // Do something with the files
      //上传文件,参数是文件
      const formData = new FormData();
      const config = {
        enctype: "multipart/form-data",
      };
      formData.append("file", acceptedFiles[0]);

      Axios.post("/api/product/uploadImage", formData, config).then((res) => {
        if (res.data.success) {
          //保存图片数据-数组
          setImages([...Images, res.data.image]);
          //保存数据到主页里去,方便form保存数据到数据库里
          props.refresh([...Images, res.data.image]);
        } else {
        }
      });
    },
    [Images]
  );

  // return UI
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <article style={{ display: "flex", justifyContent: "space-beween" }}>
      <div
        {...getRootProps()}
        style={{
          width: "400px",
          border: "1px solid lightgray",
          height: "250px",
          display: "flex",
          flexDirection: "column", //排列方向
          alignItems: "center", //居中
          justifyContent: "center", //排列方式
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
        <PlusOutlined style={{ fontSize: "3rem" }} />
      </div>
      <div
        style={{
          display: "flex",
          width: "300px",
          minWidth: "300px",
          height: "250px",
          overflowX: "scroll",
        }}
      >
        {/* 循环图片 */}
        {Images.map((d, i) => (
          <div onClick={(i) => deleteImg(i)} key={`key${i}`}>
            <img src={`http://127.0.0.1:5000\\${d}`} alt={`product${i}`} />
          </div>
        ))}
      </div>
    </article>
  );
}


export default MyDropzone;
