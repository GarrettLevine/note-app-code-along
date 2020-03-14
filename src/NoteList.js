import React, { useEffect, useState }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import NoteCard from './NoteCard';
import { getToken } from './utils/token';

const useStyles = makeStyles(theme => ({
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
}));

export default function NoteList(props) {
  const classes = useStyles();
  const [notes, updateNotes] = useState([]);

  useEffect(() => {
    async function getNotes() {
      try {
        const token = getToken();
        const response = await fetch('/api/notes', {
          headers: { 
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }
        updateNotes(data.data);
      } catch(err) {
        console.log(err);
      }
    }

    getNotes();
  }, []);

  return (
    <div>
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            Make Some Notes
          </Typography>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => { props.history.push('/note/create'); }}
                >
                  New Note
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
      <Container className={classes.cardGrid} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {notes.map(note => <NoteCard key={note._id} text={note.text} />)}
        </Grid>
      </Container>
    </div>
  );
}