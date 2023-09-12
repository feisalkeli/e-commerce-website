export const styles = {
  appBar: {
    position: "relative",
  },
  toolbar: {
    minHeight: 64, // Adjust this value as needed
  },
  layout: {
    marginTop: "5%",
    width: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    "@media (min-width:600px)": {
      width: 600,
    },
  },
  paper: {
    marginTop: 3,
    marginBottom: 3,
    padding: 2,
    "@media (max-width:600px)": {
      width: "100%",
      marginTop: 60,
    },
    "@media (min-width:600px)": {
      marginTop: 6,
      marginBottom: 6,
      padding: 3,
    },
  },
  stepper: {
    padding: "20px 0 50px",
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: 3,
    marginLeft: 1,
  },
  divider: {
    margin: "20px 0",
  },
  spinner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
