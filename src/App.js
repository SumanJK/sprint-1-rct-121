import React, { useState, useEffect } from "react";
import Button from "./components/Button";
import CandidateCard from "./components/CandidateCard";
import axios from "axios";
import "./styles.css";

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [salaryOrder, setSalaryOrder] = useState("ASC");
  const [page, setPage] = useState(1);
  const [totalUser, setTotalUser] = useState(0);

  useEffect(() => {
    getData({ page, salaryOrder });
  }, [page, salaryOrder]);

  const getData = async ({ page, salaryOrder }) => {
    const totalUsers = await axios
      .get("https://json-server-mocker-masai.herokuapp.com/candidates")
      .then((res) => {
        setTotalUser(res.data.length);
      });
    const userData = await axios("https://json-server-mocker-masai.herokuapp.com/candidates", {
      method: "GET",
      params: {
        _page: page,
        _limit: 5,
        _sort: "salary",
        _order: salaryOrder,
      },
    });
    setLoading(false);
    console.log(userData.data);
    setData(userData.data);
  };
  console.log(Math.floor(totalUser / 5), "next");
const handleOrder=()=>{
  salaryOrder === "ASC" ? setSalaryOrder("DESC") : setSalaryOrder("ASC");
  setPage(1)
}
  return (
    <div className="App">
      <div style={{margin:"10px 0"}}> <span style={{color:"red"}}>{page}</span>/{ totalUser===0 ? 1 : Math.ceil(totalUser / 5)}</div>
      <div>
        {loading && <div id="loading-container">...Loading</div>}
        <Button
          id="SORT_BUTTON"
          title={`Sort by ${
            salaryOrder === "DESC" ? "Ascending" : "Descending"
          } Salary`}
          onClick={() => {
            handleOrder()
          }}
        />
        <Button
          title="PREV"
          id="PREV"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        />
        <Button
          id="NEXT"
          title="NEXT"
          disabled={totalUser===0 ? page ===1 : page === Math.ceil(totalUser / 5)}
          onClick={() => setPage(page + 1)}
        />
      </div>
      {data.map((item) => {
        return <CandidateCard item={item} key={item.id} />;
      })}
    </div>
  );
}
