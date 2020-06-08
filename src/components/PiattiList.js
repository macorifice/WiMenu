import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import InputAdornment from "@material-ui/core/InputAdornment";
import PropTypes from "prop-types";
import _ from "lodash";

const PiattiList = () => {
  const [antipastiArray, setAntipastiArray] = useState([]);

  const removeFromListAntipasti = (idToRemove) => {
    setAntipastiList(
      antipastiList.filter((antipastiList) => antipastiList.id !== idToRemove)
    );
  };

  const onChangeAntipasti = (e) => {
    setAntipastiArray([...antipastiArray, e.target.value]);
  };
  const [antipastiList, setAntipastiList] = useState([]);

  const onAddAntipastiClick = (event) => {
    setAntipastiList(
      antipastiList.concat(
        <TextField
          required
          id={_.uniqueId("antipasto_")}
          placeholder={`Inserisci il nome dell'antipasto`}
          variant="outlined"
          fullWidth
          onChange={onChangeAntipasti}
          style={{ margin: 5 }}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <RemoveCircleIcon
                  onClick={(e) =>
                    removeFromListAntipasti(_.uniqueId("antipasto_"))
                  }
                ></RemoveCircleIcon>
              </InputAdornment>
            ),
          }}
          key={antipastiList.length}
        />
      )
    );
  };

  const [primiList, setPrimiList] = useState([]);

  const onAddPrimiClick = (event) => {
    setPrimiList(
      primiList.concat(
        <TextField
          required
          placeholder={`Inserisci il nome del primo piatto`}
          variant="outlined"
          fullWidth
          style={{ margin: 5 }}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <RemoveCircleIcon></RemoveCircleIcon>
              </InputAdornment>
            ),
          }}
          key={primiList.length}
        />
      )
    );
  };

  const [secondiList, setSecondiList] = useState([]);

  const onAddSecondiClick = (event) => {
    setSecondiList(
      secondiList.concat(
        <TextField
          required
          placeholder={`Inserisci il nome del secondo piatto`}
          variant="outlined"
          fullWidth
          style={{ margin: 5 }}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <RemoveCircleIcon></RemoveCircleIcon>
              </InputAdornment>
            ),
          }}
          key={secondiList.length}
        />
      )
    );
  };

  const [dolciList, setDolciList] = useState([]);

  const onAddDolciClick = (event) => {
    setDolciList(
      dolciList.concat(
        <TextField
          required
          placeholder={`Inserisci il nome del dolce`}
          variant="outlined"
          fullWidth
          style={{ margin: 5 }}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <RemoveCircleIcon></RemoveCircleIcon>
              </InputAdornment>
            ),
          }}
          key={dolciList.length}
        />
      )
    );
  };

  const [bevandeList, setBevandeList] = useState([]);

  const onAddBevandeClick = (event) => {
    setBevandeList(
      bevandeList.concat(
        <TextField
          required
          placeholder={`Inserisci il nome della bevanda`}
          variant="outlined"
          fullWidth
          style={{ margin: 5 }}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <RemoveCircleIcon></RemoveCircleIcon>
              </InputAdornment>
            ),
          }}
          key={bevandeList.length}
        />
      )
    );
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Antipasti{" "}
        <AddCircleIcon
          color="primary"
          onClick={onAddAntipastiClick}
        ></AddCircleIcon>
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          {antipastiList}
        </Grid>
      </Grid>
      <Typography variant="h6">
        Primi{" "}
        <AddCircleIcon
          color="primary"
          onClick={onAddPrimiClick}
        ></AddCircleIcon>
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          {primiList}
        </Grid>
      </Grid>
      <Typography variant="h6">
        Secondi{" "}
        <AddCircleIcon
          color="primary"
          onClick={onAddSecondiClick}
        ></AddCircleIcon>
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          {secondiList}
        </Grid>
      </Grid>
      <Typography variant="h6">
        Dolci{" "}
        <AddCircleIcon
          color="primary"
          onClick={onAddDolciClick}
        ></AddCircleIcon>
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          {dolciList}
        </Grid>
      </Grid>
      <Typography variant="h6">
        Bevande{" "}
        <AddCircleIcon
          color="primary"
          onClick={onAddBevandeClick}
        ></AddCircleIcon>
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          {bevandeList}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default PiattiList;

PiattiList.propTypes = {
  setAntipastiArray: PropTypes.func,
};
