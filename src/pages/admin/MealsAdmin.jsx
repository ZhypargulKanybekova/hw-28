import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFoods } from "../../store/meals/mealsThunk";
import {  Button, TableRow, styled } from "@mui/material";
import { useState } from "react";
import { AdminMealsForum } from "./AdminMealsForum";
import { deleteAdminMeals } from "../../store/admin/AdminMealThunk";
// import { snackbarActions } from "../../store/snackbar";


export const MealsAdmin = () => {

  const [toggle, setToggle] = useState(false);

  const { meals } = useSelector((state) => state.meals);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFoods());
  }, [dispatch]);

  const toggleHandler = () => {
    setToggle((prev) => !prev);
  };

  const deleteAdminMealsHandler = (id)=>{
    dispatch(deleteAdminMeals(id))
  }



  return (
    <div>
    <PaperMeals component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
        
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Price($)</TableCell>
            <TableCell>
                edit
                 </TableCell>
              <TableCell>
                delete
              </TableCell>
           
        </TableHead>
        <TableBody>
          {meals.map((item) => (

            <TableRow key={item.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              
              <TableCell align="right">{item.title}</TableCell>
              <TableCell align="right">{item.description}</TableCell>
              <TableCell align="right">{item.price}</TableCell>
              <TableCell>
                <Button>edit</Button>
                 </TableCell>
              <TableCell>
                <Button onClick={()=>deleteAdminMealsHandler(item.id)}>delete</Button>
              </TableCell>
              </TableRow>
            
          ))}
        </TableBody>
      </Table>

    </PaperMeals>
 
 {toggle ? (
  <AdminMealsForum open={toggle} onClose={toggleHandler} />
  ) : null}
  <Button onClick={toggleHandler}>Add new product</Button>

</div>
  );
};

const PaperMeals = styled(TableContainer)`
  margin: 200px;
  padding: 0 80px;
  width:1200px;
  
`


