import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const Update = ({ itemToEdit }) => {
  const [currentAsset, setCurrentAsset] = useState("");
  const [fixedAssets, setFixedAssets] = useState("");
  const [currentLiability, setCurrentLiability] = useState("");
  const [LongTermAsset, setLongTermAsset] = useState("");
  const [balance, setBalance] = useState("");
  const [refresh, setRefresh] = useState("");
  const [isPending, setIsPending] = useState("");

  const { id } = useParams();
  const updateItem = async (e) => {
    e.preventDefault();
    const newData = {
      currentAsset,
      fixedAssets,
      currentLiability,
      LongTermAsset,
    };
    setIsPending(true);
    const information = JSON.stringify(newData);
    try {
      const id = itemToEdit._id
      const response = await fetch(`/data/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: information,
      });
      setCurrentAsset("");
      setFixedAssets("");
      setCurrentLiability("");
      setLongTermAsset("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (itemToEdit) {
      setCurrentAsset(itemToEdit.currentAsset);
      setFixedAssets(itemToEdit.fixedAssets);
      setCurrentLiability(itemToEdit.currentAsset);
      setLongTermAsset(itemToEdit.LongTermAsset);
    }
  }, [itemToEdit]);
  return (
    <>
      <form onSubmit={updateItem} style={{ margin: "20px" }}>
        <div>
          <input
            style={{ margin: 10 }}
            placeholder="currentAsset"
            type="text"
            required
            value={currentAsset}
            onChange={(event) => {
              setCurrentAsset(event.target.value);
            }}
          />
        </div>
        <div>
          <input
            style={{ margin: 10 }}
            placeholder="fixedAssets"
            type="text"
            required
            value={fixedAssets}
            onChange={(event) => {
              setFixedAssets(event.target.value);
            }}
          />
        </div>
        <div>
          <input
            style={{ margin: 10 }}
            placeholder="currentLiability"
            type="text"
            required
            value={currentLiability}
            onChange={(event) => {
              setCurrentLiability(event.target.value);
            }}
          />
        </div>
        <div>
          <input
            style={{ margin: 10 }}
            placeholder="LongTermAsset"
            type="text"
            required
            value={LongTermAsset}
            onChange={(event) => {
              setLongTermAsset(event.target.value);
            }}
          />
        </div>
        <button type="submit" style={{ marginRight: 10 }}>
          Submit
        </button>
      </form>
    </>
  );
};

export default Update;
