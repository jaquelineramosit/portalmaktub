import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import api from '../services/api';


const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
  },
  paper: {
    width: 200,
    height: 230,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function TransferList() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const [listaFerramentasRight, setListaFerramentasRight] = useState([]);
  const [listaFerramentasLeft, setListaFerramentasLeft] = useState([]);

  let action = 'edit';
  let tipoprojetoIdParam = 8;
  //REGRA: CASO
  useEffect(() => {
    if (action === 'edit' && tipoprojetoIdParam !== '') {
        api.get(`tipo-projeto-ferramenta-id/${tipoprojetoIdParam}`).then(response => {
          setRight(response.data)
            // let arr = response.data;
            // let output = [];
            // for (var i=0; i < arr.length ; ++i)
            //     output.push(arr[i]['id']);
            
            // setRight(output);                
        });

        api.get(`tipo-projeto-ferramenta-disponiveis/${tipoprojetoIdParam}`).then(response => {
          setLeft(response.data)
            // let arr = response.data;
            // let output = [];
            // for (var i=0; i < arr.length ; ++i)
            //     output.push(arr[i]['id']);
            
            // setLeft(output);
        });

    } else {
        api.get(`ferramentas`).then(response => {
          setLeft(response.data)
            // let arr = response.data;
            // let output = [];
            // for (var i=0; i < arr.length ; ++i)
            //     output.push(arr[i]['id']);
            
            // setLeft(output);                
        });
    }
  }, [tipoprojetoIdParam]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    console.log(newChecked);
  };

  const handleAllRight = () => {
    console.log("Right")
    console.log(right)
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    console.log("left")
    console.log(left)
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (items) => (
    <Paper className={classes.paper}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value['id']}-label`;
          console.log(labelId)
          return (
            <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value['codferramenta']}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  // const customList = (items) => (
  //   <Paper className={classes.paper}>
  //     <List dense component="div" role="list">
  //       {items.map((value) => {
  //         const labelId = `transfer-list-item-${value}-label`;
  //         console.log(labelId)
  //         return (
  //           <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
  //             <ListItemIcon>
  //               <Checkbox
  //                 checked={checked.indexOf(value) !== -1}
  //                 tabIndex={-1}
  //                 disableRipple
  //                 inputProps={{ 'aria-labelledby': labelId }}
  //               />
  //             </ListItemIcon>
  //             <ListItemText id={labelId} primary={`campo ${value}`} />
  //           </ListItem>
  //         );
  //       })}
  //       <ListItem />
  //     </List>
  //   </Paper>
  // );



  return (
    <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
      <Grid item>{customList(left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label="move all right"
          >
            ≫
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList(right)}</Grid>
    </Grid>
  );
}
