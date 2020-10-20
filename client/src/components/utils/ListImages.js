import React from "react";
import { Carousel } from "antd";

function ListImages(props) {
  return (
    <Carousel  autoplay>
      {props.images.map((d, i) => (
        <div key={`images${i}`}>
          <img  style={{width:"100%",height:"150px"}} src={`http://localhost:5000/${d}`} />
        </div>
      ))}
    </Carousel>
  );
}

export default ListImages;
