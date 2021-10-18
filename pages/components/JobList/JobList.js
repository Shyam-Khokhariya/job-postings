import JobListItem from "./JobListItem";
import style from "../../../styles/JobList.module.css";
import { Grid } from "@mui/material";

const JobList = (props) => {
  const { jobs } = props;

  return jobs && jobs.length !== 0 ? (
    <ul role="list" className={`${style.JobList} grid`}>
      {jobs.map((job) => (
        <JobListItem job={job} key={job.jobId} />
      ))}
    </ul>
  ) : (
    <h1>No Data Found...</h1>
  );
};

export default JobList;
