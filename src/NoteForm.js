import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

import { getToken } from './utils/token';

const useStyles = makeStyles(theme => ({
  content: {
    padding: theme.spacing(8, 0, 6),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  buttonField: {
    marginTop: theme.spacing(1),
  },
}))

export default function NoteForm (props) {
  const classes = useStyles()
  const [ noteText, updateNoteText ] = useState('');
  const [ error, updateError ] = useState(undefined);

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const token = getToken();
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: noteText }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      props.history.push('/');
    } catch (err) {
      console.log(err);
      updateError('error creating note');
    }
  }

  return (
    <Container className={classes.content} maxWidth='md'>
      <form onSubmit={handleSubmit}>
        <div>
          <Typography component='h6' variant='h6' align='left' color='textPrimary'>
            Add a Note
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
        </div>
        <div>
          <TextField
            id='standard-multiline-flexible'
            label='Note text'
            multiline
            rowsMax='2'
            className={classes.textField}
            margin='normal'
            value={noteText}
            onChange={(e) => { updateNoteText(e.target.value); } }
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Add Note
        </Button>
      </form>
    </Container>
  )
}
