import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
// import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import LinkMaterial from '@material-ui/core/Link'
import logo from "../assets/logo.png";
// import UploadMenu from './components/UploadMenu'
import DatePicker from "../components/DatePicker";
import { FilePond, registerPlugin } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import menuService from "../services/menuService";
import TextField from "@material-ui/core/TextField";
// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { motion } from "framer-motion";
import PDFPreview from "../components/PDFPreview";
import CreateMenu from "../components/CreateMenu";
import moment from "moment";
import Paper from "@material-ui/core/Paper";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Protected from "../components/Protected";
import Unprotected from "../components/Unprotected";
import Home from '../components/HomePage';
import GuardedRoute from '../components/GuardedRoute';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <LinkMaterial color="inherit" href="https://material-ui.com/">
        WiMenu
      </LinkMaterial>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(3),
    width: 200,
  },
}));

export default function HomePage() {
  const[isAutheticated, setisAutheticated] = useState(false);


  function login(){
    setisAutheticated(true);
    console.log("loggedInUser:" + isAutheticated)
  }

  function logout(){
    setisAutheticated(false);
    console.log("loggedInUser:" + isAutheticated)
  }
  


  const [menus, setmenus] = useState(null);
  const [menuname, setmenuname] = useState("");
  const [menudescription, setmenudescription] = useState("");
  const [validFrom, setvalidfrom] = useState("2017-05-24T10:30");
  const [validTo, setvalidto] = useState("2017-05-24T10:30");
  const [upload, setUpload] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      getMenus();
    };

    fetchData();
  }, [upload]);

  const getMenus = async () => {
    let res = await menuService.getAll();
    console.log(res);
    setmenus(res);
  };

  const renderMenu = (menu) => {
    return (
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          <Grid item key={menu} xs={12} sm={6} md={4}>
            <motion.div
              animate={{
                scale: [1, 2, 2, 1, 1],
                rotate: [0, 0, 270, 270, 0],
                borderRadius: ["20%", "20%", "50%", "50%", "20%"],
              }}
            >
              <Card key={menu._id} className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={menu.pdf}
                  title={menu.name}
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {menu.name}
                  </Typography>
                  {menu.description ? (
                    <Typography
                      variant="body2"
                      color="textPrimary"
                      component="p"
                    >
                      {menu.description}
                    </Typography>
                  ) : null}

                  {menu.from ? (
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Valido dal{" "}
                      {moment().format(menu.from, "DD MM YYYY hh:mm:ss", true)}
                    </Typography>
                  ) : null}

                  {menu.to ? (
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Valido al '{" "}
                      {moment().format(menu.to, "DD MM YYYY hh:mm:ss", true)}
                    </Typography>
                  ) : null}
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          {/* ))} */}
        </Grid>
      </Container>
    );
  };

  const classes = useStyles();

  const [cards, setCards] = useState([]);
  const [menuUrls, setMenuUrls] = useState([]);
  const [create, setCreate] = useState(false);

  const UploadMenuHandler = () => {
    setUpload(true);
  };

  const CloseUpload = () => {
    setUpload(false);
  };

  const SaveUpload = async () => {
    try {
      await menuService.saveNew({
        name: menuname,
        from: validFrom,
        to: validTo,
        description: menudescription,
        pdf: menuUrls.url,
      });
      setUpload(false);
    } catch (e) {
      console.log(e);
    }
  };

  const CloseCreate = () => {
    setCreate(false);
  };

  const CreateMenuHandler = () => {
    setCreate(true);
  };

  const onChangeMenuName = (e) => {
    setmenuname(e.target.value);
  };

  const onChangeMenuDescription = (e) => {
    setmenudescription(e.target.value);
  };

  const onChangeFrom = (e) => {
    setvalidfrom(e.target.value);
  };

  const onChangeTo = (e) => {
    setvalidto(e.target.value);
  };

  const [files, setFiles] = useState();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          {/* <CameraIcon className={classes.icon} /> */}
          {/* <Typography variant="h6" color="inherit" noWrap>
            WiMenu
          </Typography> */}
        </Toolbar>
      </AppBar>

      <main>
        <div className="App"></div>
        {/* Hero unit */}
        <div className={classes.heroContent}>
        <Router>
            <div>
              <ul>
                <li>
                  <Link to='/'>
                    Link to Home Page
                </Link>
                </li>
                <li>
                  <Link to='/protected'>
                    Link to Protected Page
                </Link>
                </li>
                <li>
                  <Link to='/unprotected'>
                    Link to Unprotected Page
                </Link>
                </li>
              </ul>
              <button onClick={login}>Login</button>
              <br/>
              <button onClick={logout}>Logout</button>
            </div>
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route path='/unprotected' component={Unprotected} />
              <GuardedRoute path='/protected' component={Protected} auth={isAutheticated} />
            </Switch>
          </Router>
          <Container maxWidth="sm">
            <motion.div
              animate={{
                scale: [1, 2, 2, 1, 1],
                rotate: [0, 0, 270, 270, 0],
                borderRadius: ["20%", "20%", "50%", "50%", "20%"],
              }}
            >
              <Typography
                component="h1"
                variant="h1"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                <img
                  alt="logo"
                  src={logo}
                  style={{ borderRadius: "50%", width: 350, height: 350 }}
                ></img>
              </Typography>
            </motion.div>
            <Typography
              component="h4"
              variant="h4"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Personalizza il tuo menù
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color="textSecondary"
              paragraph
            >
              Rendilo facilmente accessibile alla tua clientela nel rispetto
              delle normative anti Covid-19
            </Typography>

            {upload && (
              <motion.div
                animate={{ scale: 1.2 }}
                transition={{ duration: 0.6 }}
              >
                <div className={classes.heroButtons}>
                  {/* <Grid container spacing={2} justify="center"> */}
                  {/* <UploadMenu></UploadMenu> */}
                  <FilePond
                    server={{
                      process: (
                        fieldName,
                        file,
                        metadata,
                        load,
                        error,
                        progress,
                        abort
                      ) => {
                        // fieldName is the name of the input field
                        // file is the actual file object to send
                        const formData = new FormData();
                        formData.append("file", file);
                        formData.append("upload_preset", "ml_default");
                        // formData.append("format", "jpg");

                        const request = new XMLHttpRequest();
                        request.open(
                          "POST",
                          "https://api.cloudinary.com/v1_1/day71xeyp/upload"
                        );

                        // Should call the progress method to update the progress to 100% before calling load
                        // Setting computable to false switches the loading indicator to infinite mode
                        request.upload.onprogress = (e) => {
                          progress(e.lengthComputable, e.loaded, e.total);
                        };

                        // Should call the load method when done and pass the returned server file id
                        // this server file id is then used later on when reverting or restoring a file
                        // so your server knows which file to return without exposing that info to the client
                        request.onload = function () {
                          if (request.status >= 200 && request.status < 300) {
                            // the load method accepts either a string (id) or an object
                            load(request.responseText);
                            setCards([1]);
                            setMenuUrls(JSON.parse([request.responseText]));
                          } else {
                            // Can call the error method if something is wrong, should exit after
                            error("oh no");
                          }
                        };

                        request.send(formData);

                        // Should expose an abort method so the request can be cancelled
                        return {
                          abort: () => {
                            // This function is entered if the user has tapped the cancel button
                            request.abort();

                            // Let FilePond know the request has been cancelled
                            abort();
                          },
                        };
                      },
                    }}
                    files={files}
                    onupdatefiles={setFiles}
                    labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                  />
                  <Grid container spacing={2} justify="center">
                    <TextField
                      required
                      placeholder={`Inserisci il nome del menù`}
                      variant="outlined"
                      fullWidth
                      onChange={onChangeMenuName}
                      style={{ margin: 15 }}
                    />
                    <TextField
                      required
                      placeholder={`Inserisci una breve descrizione del menù`}
                      variant="outlined"
                      fullWidth
                      onChange={onChangeMenuDescription}
                      style={{ margin: 15 }}
                    />
                  </Grid>
                  <Grid container spacing={2} justify="center">
                    <form className={classes.container} noValidate>
                      <TextField
                        id="datetime-from"
                        onChange={onChangeFrom}
                        label="Valido dal"
                        type="datetime-local"
                        defaultValue="2017-05-24T10:30"
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <TextField
                        id="datetime-to"
                        onChange={onChangeTo}
                        label="Valido al"
                        type="datetime-local"
                        defaultValue="2017-05-24T10:30"
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </form>
                  </Grid>
                  <Grid container spacing={2} justify="center">
                    <Button
                      onClick={CloseUpload}
                      variant="contained"
                      color="primary"
                    >
                      Annulla
                    </Button>
                    <Button
                      onClick={SaveUpload}
                      variant="contained"
                      color="primary"
                      style={{ marginLeft: 6 }}
                    >
                      Salva
                    </Button>
                  </Grid>
                  {/* </Grid> */}
                </div>
              </motion.div>
            )}
            {!upload && !create && (
              <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Button
                      onClick={UploadMenuHandler}
                      variant="contained"
                      color="primary"
                    >
                      Upload menù
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={CreateMenuHandler}
                      variant="outlined"
                      color="primary"
                    >
                      Crea il tuo menù da "ZERO"
                    </Button>
                  </Grid>
                </Grid>
              </div>
            )}
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}

          {menus && menus.length > 0 && !create ? (
            menus.map((menu) => renderMenu(menu))
          ) : (
            <>
              {!create && (
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  spacing={3}
                >
                  <Typography gutterBottom variant="h5" component="h2">
                    Al momento non hai menù disponibili{" "}
                    <span role="img" aria-label="sad">
                      😥
                    </span>
                  </Typography>
                </Grid>
              )}
            </>
          )}

          {create && (
            <>
              <CreateMenu></CreateMenu>
              <Grid container spacing={2} justify="center">
                <Button
                  onClick={CloseCreate}
                  variant="contained"
                  color="primary"
                >
                  Annulla
                </Button>
              </Grid>
            </>
          )}
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
