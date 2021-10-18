import { Grid } from "@mui/material";
import style from "../../../styles/JobList.module.css";

const JobListItem = (props) => {
  const { job } = props;

  return (
    <li className={style.JobListItem}>
      <div className={style.ImageContainer}>
        <img src={job.companyLogo} alt="Company Logo" />
      </div>

      <div>
        <h2 className={style.Title}>{job.jobTitle}</h2>
        <h5 className={style.Company}>{job.companyName}</h5>
        <h6 className={style.Company}>{job.location}</h6>
        <p className={style.Description}>{job.shortDesc}</p>
      </div>
    </li>
  );
};

export default JobListItem;
