import React, { useState, useEffect } from "react";
import AllData from "../components/AllData";
import Entries from "../components/Entries";
import Update from "../components/Update";

const Home = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [refresh, setRefresh] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newData = {
      firstName,
      lastName,
      email,
      firstNumber,
      secondNumber,
    };
    setIsPending(true);
    const information = JSON.stringify(newData);
    console.log("999", newData);
    try {
      const response = await fetch("/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: information,
      });
      if (response.status === 200) {
        setRefresh((n) => n + 1);
      }
      setIsPending(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Entries />
      <AllData />
    </>
  );
};

export default Home;
