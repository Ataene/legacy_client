import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Entries = () => {
  const params = useParams();
  const id = params.id;
  const [currentAsset, setCurrentAsset] = useState("");
  const [fixedAssets, setFixedAssets] = useState("");
  const [currentLiability, setCurrentLiability] = useState("");
  const [LongTermAsset, setLongTermAsset] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleSubmit = async (e) => {
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
      const response = await fetch("/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: information,
      });
      setCurrentAsset("");
      setFixedAssets("");
      setCurrentLiability("");
      setLongTermAsset("");
      if (response.status === 200) {
        setRefresh((n) => n + 1);
      }
      setIsPending(false);
    } catch (error) {
      console.log(error);
    }
  };
  const [theBalance, setTheBalance] = useState([]);
  useEffect(() => {
    const allData = async () => {
      let response = await fetch("/data");
      let all = await response.json();
      setTheBalance(all);
    };
    allData();
  }, []);
  const totalValue =
    Number(currentAsset) +
    Number(fixedAssets) +
    Number(LongTermAsset) -
    Number(currentLiability);
  const finalAssets = Number(
    Number(currentAsset) + Number(fixedAssets) + Number(LongTermAsset)
  );
  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <table>
          <tr>
            <th style={{ color: "red" }}>Assets Types</th>
            <th style={{ color: "red" }}>Year 2021</th>
            <th style={{ color: "red" }}>Year 2022</th>
          </tr>
          <tr>
            <td>Current Assets</td>
            <td>2,000</td>
            <td>
              <input
                placeholder="currentAsset"
                type="text"
                required
                value={currentAsset}
                onChange={(event) => {
                  setCurrentAsset(event.target.value);
                }}
              />
            </td>
          </tr>
          <tr>
            <td>Fixed Assets</td>
            <td>3,000</td>
            <td>
              <input
                placeholder="fixedAssets"
                type="text"
                required
                value={fixedAssets}
                onChange={(event) => {
                  setFixedAssets(event.target.value);
                }}
              />
            </td>
          </tr>
          <tr>
            <td>Current Liability</td>
            <td>6,000</td>
            <td>
              <input
                placeholder="currentLiability"
                type="text"
                required
                value={currentLiability}
                onChange={(event) => {
                  setCurrentLiability(event.target.value);
                }}
              />
            </td>
          </tr>
          <tr>
            <td>Long-term Assets</td>
            <td>4,000</td>
            <td>
              <input
                placeholder="LongTermAsset"
                type="text"
                required
                value={LongTermAsset}
                onChange={(event) => {
                  setLongTermAsset(event.target.value);
                }}
              />
            </td>
          </tr>
          <tr>
            <td>Total Assets</td>
            <td>9,000</td>
            <td>{finalAssets}</td>
          </tr>
          <tr>
            <td style={{ color: "blue" }}>Balance</td>
            <td>6,000</td>
            <td>
              <td style={{ color: "blue", fontSize: 25 }}>{totalValue}</td>
            </td>
          </tr>
          <tr>
            <td style={{ color: "green" }}>Final</td>
            <td style={{ color: "green", fontSize: 25 }}>{totalValue}</td>
            <td>
              <button type="submit" style={{backgroundColor: "yellow"}}>Submit</button>
            </td>
          </tr>
        </table>
      </form>
    </>
  );
};

export default Entries;
