import React from "react";

const ViewMessageCircular = (ele) => {
  // console.log(ele);
  return (
    <>
      <div className="card">
        <div className="row m-2">
          {/* <p>
            <span style={{ fontWeight: "bold" }}>Message</span> : &nbsp;{" "}
            {ele?.showData}
          </p> */}
           <div
        className="body-news"
        dangerouslySetInnerHTML={{ __html: ele?.showData }}
      ></div>
        </div>
      </div>
    </>
  );
};
export default ViewMessageCircular;
