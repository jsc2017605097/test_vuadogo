import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Switch from "../switch";
import "./index.css";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function BasicTable() {
  const classes = useStyles();
  const donhang = useSelector((state) => state.donhang);
  const dispatch = useDispatch();
  function tinhtoan(array) {
    let total = 0;
    array.forEach((element) => {
      total += element.soluong * element.price;
    });
    return total;
  }

  React.useEffect(() => {
    axios({
      method: "get",
      url: "/api/donhang",
    })
      .then((res) => dispatch({ type: "INIT_DONHANG", data: res.data }))
      .catch((error) => console.log(error.response.data));
  });
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>STT</TableCell>
            <TableCell align="right">Tên</TableCell>
            <TableCell align="right">Điện thoại </TableCell>
            <TableCell align="right">Địa chỉ</TableCell>
            <TableCell align="right">Ngày</TableCell>
            <TableCell align="right">Sản phẩm</TableCell>
            <TableCell align="right">Thành tiền</TableCell>
            <TableCell align="right">Trạng thái</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {donhang.map((row, key) => (
            <TableRow key={key} className={row.status ? " dathanhtoan" : ""}>
              <TableCell component="th" scope="row">
                {key + 1}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>
              <TableCell align="right">{row.address}</TableCell>
              <TableCell align="right">
                {new Date(row.created_at).toString()}
              </TableCell>
              <TableCell align="right">
                {row.product.map((item, key) => (
                  <p key={key}>
                    {item.name}({item.soluong})
                  </p>
                ))}
              </TableCell>
              <TableCell align="right">
                {new Intl.NumberFormat().format(tinhtoan(row.product))} VNĐ
              </TableCell>
              <TableCell align="right" className="flex">
                <Switch status={row.status} id={row._id} />
                chưa thanh toán
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
