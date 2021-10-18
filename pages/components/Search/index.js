import * as React from "react";
import style from "../../../styles/Search.module.css";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const Search = (props) => {
  return (
    <Grid container spacing={2} className={style.SearchContainer}>
      <Grid item xs={7}>
        <Box
          component="form"
          noValidate
          sx={{
            display: "grid",
            gap: 2,
          }}
        >
          <TextField
            label="Search"
            id="custom-css-outlined-input"
            value={props.searchValue}
            onChange={(e) => {
              props.onChange(e.target.value);
            }}
          />
        </Box>
      </Grid>
      <Grid item xs={5}>
        <Button
          className={style.ButtonContainer}
          variant={props.filtered7Day ? "contained" : "outlined"}
          onClick={() => props.last7Days()}
        >
          Last 7 Days
        </Button>
      </Grid>
    </Grid>
  );
};

export default Search;
