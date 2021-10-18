import React, { useEffect, useState } from "react";
import JobList from "./components/JobList";
import Search from "./components/Search";
import style from "../styles/JobList.module.css";
import moment from "moment";

function Index({ data }) {
  const [filterJobs, setFilterJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [filtered7Day, setFiltered7Day] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const SearchCompany = (value) => {
    setSearchValue(value);
    if (filtered7Day) {
      var filterData = allJobs.filter(
        (obj) =>
          obj.companyName.toUpperCase().indexOf(value.toUpperCase()) > -1 &&
          moment().diff(moment(obj.OBJpostingDate), "days") <= 7
      );
      setFilterJobs(filterData);
    } else {
      var filterData = allJobs.filter(
        (obj) => obj.companyName.toUpperCase().indexOf(value.toUpperCase()) > -1
      );
      setFilterJobs(filterData);
    }
  };

  const last7Days = () => {
    if (searchValue && !filtered7Day) {
      var filterData = allJobs.filter(
        (obj) =>
          obj.companyName.toUpperCase().indexOf(searchValue.toUpperCase()) >
            -1 && moment().diff(moment(obj.OBJpostingDate), "days") <= 7
      );
      setFilterJobs(filterData);
    } else if (searchValue && filtered7Day) {
      var filterData = allJobs.filter(
        (obj) =>
          obj.companyName.toUpperCase().indexOf(searchValue.toUpperCase()) > -1
      );
      setFilterJobs(filterData);
    } else if (!searchValue && !filtered7Day) {
      var filterData = allJobs.filter(
        (obj) => moment().diff(moment(obj.OBJpostingDate), "days") <= 7
      );
      setFilterJobs(filterData);
    } else if (!searchValue && filtered7Day) {
      setFilterJobs(allJobs);
    }

    setFiltered7Day(!filtered7Day);
  };

  useEffect(() => {
    if (data && data.jobs) {
      setAllJobs(data.jobs);
      setFilterJobs(data.jobs);
    }
  }, [data]);

  return (
    <main className="lockup">
      <div className={style.Title}>
        <h1>Zippia Jobs</h1>
      </div>
      <Search
        searchValue={searchValue}
        onChange={SearchCompany}
        filtered7Day={filtered7Day}
        last7Days={last7Days}
      />
      <JobList jobs={filterJobs} />
    </main>
  );
}

export async function getServerSideProps({ query }) {
  const body = {
    companySkills: true,
    dismissedListingHashes: [],
    fetchJobDesc: true,
    jobTitle: "Business Analyst",
    locations: [],
    numJobs: 10,
    previousListingHashes: [],
  };

  const res = await fetch(`https://www.zippia.com/api/jobs/`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(body),
  });
  const data = await res.json();

  return { props: { data } };
}

export default Index;
