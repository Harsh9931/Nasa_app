import React from "react";

const Sidebar = (props) => {
    const {handleToggleModal,data} = props;
  return (
    <div className="sidebar">
      <div onClick={handleToggleModal} className="bgOverlay"></div>
        <div className="sidebarContent">
          <h2>{data?.title}</h2>
           <div className="descriptionConatainer">
              <p className="descriptionTitle">{data?.date}</p>
              <p>{data?.explanation}</p>
          </div>
          <button onClick={handleToggleModal}><i className="fa-solid fa-arrow-right"></i></button>
      </div>
    </div>
  );
};

export default Sidebar;
