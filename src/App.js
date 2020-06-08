import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
// import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import logo from './assets/logo.png'
// import UploadMenu from './components/UploadMenu'
import DatePicker from './components/DatePicker'
import { FilePond, registerPlugin } from 'react-filepond';
// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        WiMenu
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
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
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [1];

export default function Album() {
  const classes = useStyles();
  const [upload, setUpload] = useState(false)
  const [menuUrls, setMenuUrls] = useState([])

  const UploadMenuHandler = () => {
    setUpload(true)
  }

  const CloseUpload = () => {
    setUpload(false)
  }


  const [files, setFiles] = useState()

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
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h1" align="center" color="textPrimary" gutterBottom>
              <img alt="logo" src={logo} style={{ borderRadius: '50%', width: 350, height: 350}}></img>
            </Typography>
            <Typography component="h4" variant="h4" align="center" color="textPrimary" gutterBottom>
              Personalizza il tuo menù
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
            Rendilo facilmente accessibile alla tua clientela nel rispetto delle normative anti Covid-19
            </Typography>
            {upload &&
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
                          setMenuUrls(JSON.parse(request.responseText))
                          setTimeout(() => {
                            setUpload(false)  
                          }, 3000);
                          
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
               <DatePicker></DatePicker>                   
              </Grid>
              <Grid container spacing={2} justify="center">
                  <Button onClick={CloseUpload} variant="contained" color="primary">
                    Annulla
                  </Button>
              </Grid>
            {/* </Grid> */}
          </div>
            }
            {!upload &&
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button onClick={UploadMenuHandler} variant="contained" color="primary">
                    Upload menù
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Crea il tuo menù da "ZERO"
                  </Button>
                </Grid>
              </Grid>
            </div>
            }
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.length === 0 && 
            <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
              <Typography gutterBottom variant="h5" component="h2">
                Al momento non hai menù disponibili <span role="img" aria-label="sad">😥</span>
              </Typography>
            </Grid>
            }
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="http://res.cloudinary.com/day71xeyp/image/upload/v1591610825/twitter_profile_image_hl0rot.png"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                    twitter_profile_image
                    </Typography>
                    <Typography>
                      Questo è il tuo menù numero 1°, con validità dal 01-03-2020 al 30-06-2020
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    {/* <Button size="small" color="primary">
                      Edit
                    </Button> */}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
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