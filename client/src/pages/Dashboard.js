import React from "react";
import DialogAddProduct from "../quantri/dialog_add_product";
import DialogAddCategory from "../quantri/dialog_add_category";
import Category from "../quantri/category";
import Product from "../quantri/product";
import Logout from "../quantri/logout";
import Avatar from "../quantri/avatar";
import Footer from "../quantri/footer";
import Search from "../components/search";
import { useSelector } from "react-redux";
import { useRouteMatch, Switch, Route, Link } from "react-router-dom";
import DialogEditProduct from "../quantri/dialog_edit_product";
import bill from "../images/bill.png";
import Bill from "../quantri/bill";

export default function Dashboard() {
  const [search, setSearch] = React.useState("");
  const match = useRouteMatch("/dashboard/category/:id");
  const products = useSelector((state) => {
    if (match) {
      return state.product.filter((p) => p.category === match.params.id);
    }
    return state.product;
  });
  document.title = "VUA ĐỒ GỖ";
  return (
    <div>
      <div className="container">
        <Avatar />
      </div>
      <div className="flex  margin-bottom-30">
        <DialogAddProduct />
        <DialogAddCategory />
        <div style={{ marginLeft: "40px" }}>
          <Link to="/dashboard/bill" style={{ color: "#000" }}>
            <img src={bill} alt="bill.png" width="50px" />
            &nbsp; ĐƠN HÀNG
          </Link>
        </div>
      </div>
      <div style={{ padding: "10px" }}>
        <Category />
      </div>
      <div className="container">
        <Switch>
          <Route path="/dashboard/product/:id">
            <DialogEditProduct />
          </Route>
          <Route path="/dashboard/bill">
            <Bill />
          </Route>
          <Route path="/dashboard">
            <Search setSearch={setSearch} />
            <Product search={search} products={products} />
          </Route>
        </Switch>
      </div>
      <div
        className="flex container"
        style={{ justifyContent: "flex-start", paddingTop: "10px" }}
      >
        <div>
          <Logout />
        </div>
        &nbsp; ĐĂNG XUẤT
      </div>
      <Footer />
    </div>
  );
}
