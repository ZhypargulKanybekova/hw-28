import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFoods } from "../../store/meals/mealsThunk";
import { Button, TableRow, styled } from "@mui/material";
import { useState } from "react";
import { AdminMealsForum } from "./AdminMealsForum";
import { deleteAdminMeals } from "../../store/admin/AdminMealThunk";
import { EtitAdminForum } from "./EtitAdminForum";
import { snackbarActions } from "../../store/snackbar";
import { Snackbar } from "../../components/UI/Snackbar";

export const MealsAdmin = () => {
  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState();
  console.log("editData", editData);
  const [toggle, setToggle] = useState(false);

  const { meals } = useSelector((state) => state.meals);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFoods());
  }, [dispatch]);

  const toggleHandler = () => {
    setToggle((prev) => !prev);
  };

  const toggleEditHandler = () => {
    setEditModal((prev) => !prev);
  };

  const deleteAdminMealsHandler = async (id) => {
    try {
      await dispatch(deleteAdminMeals(id)).unwrap();
      dispatch(snackbarActions.doSuccess({ message: `Успешно удалено` }));
    } catch (error) {
      dispatch(snackbarActions.doError({ message: `Что то пошло не так` }));
    }
  };

  const editMealHandler = (data) => {
    setEditData(data);
    toggleEditHandler();
  };

  return (
    <>
      <Snackbar />
      <div>
        {editModal ? (
          <EtitAdminForum
            editData={editData}
            open={editModal}
            onClose={toggleEditHandler}
          />
        ) : (
          <PaperMeals component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Price($)</TableCell>
                <TableCell>edit</TableCell>
                <TableCell>delete</TableCell>
              </TableHead>
              <TableBody>
                {meals.map((item) => (
                  <TableRoww
                    key={item.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="right">{item.title}</TableCell>
                    <TableCell align="right">{item.description}</TableCell>
                    <TableCell align="right">{item.price}</TableCell>

                    <TableCell>
                      <Button onClick={() => editMealHandler(item)}>
                        edit
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => deleteAdminMealsHandler(item._id)}>
                        delete
                      </Button>
                    </TableCell>
                  </TableRoww>
                ))}
              </TableBody>
            </Table>
          </PaperMeals>
        )}

        {toggle ? (
          <AdminMealsForum open={toggle} onClose={toggleHandler} />
        ) : null}
        <Buttonn variant="outlined" onClick={toggleHandler}>
          Add new product
        </Buttonn>
      </div>
    </>
  );
};

const PaperMeals = styled(TableContainer)`
  margin: 200px;
  padding: 0 80px;
  width: 1200px;
`;

const Buttonn = styled(Button)`
  background-color: #993108;
  color: white;
  border-color: #993108;
  margin-left: 200px;

  &:hover {
    background-color: #7e2a0a;
    border-color: white;
  }
`;

const TableRoww = styled(TableRow)`
  text-align: start;
`;
