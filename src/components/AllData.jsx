import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Update from "./Update";

const AllData = () => {
  const navigate = useNavigate();
  const [allEntries, setAllEntries] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);

  useEffect(() => {
    const allData = async () => {
      let response = await fetch(`/data`);
      let all = await response.json();
      setAllEntries(all);
    };
    allData();
  }, []);

  const deleteItem = async (id) => {
    try {
      const response = await fetch(`/data/${id}`, {
        method: "DELETE",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const [itemToEdit, setItemToEdit] = useState(false);

  const handleEdit = (item) => {
    setItemToEdit(item);
  };
  return (
    <>
      <div>
        {allEntries &&
          allEntries.map((item) => (
            <div key={item._id}>
              <div style={{ margin: "20px" }}>
                <div>current Asset: {item.currentAsset}</div>
                <div>fixedAssets: {item.fixedAssets}</div>
                <div>currentLiability: {item.currentLiability}</div>
                <div>LongTermAsset: {item.LongTermAsset}</div>
                <button
                style={{margin: 5}}
                  onClick={() => {
                    deleteItem(item._id);
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    handleEdit(item);
                    setOpenEditModal(true);
                  }}
                >
                  Update
                </button>
                <div>{openEditModal && <Update itemToEdit={itemToEdit} />}</div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default AllData;
