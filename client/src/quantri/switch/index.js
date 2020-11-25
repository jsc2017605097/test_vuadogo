import React from "react";
import Switch from "@material-ui/core/Switch";
import axios from "axios";
import { useDispatch } from "react-redux";

export default function Switches({ status, id }) {
  const [state, setState] = React.useState({
    checkedA: status,
    checkedB: true,
  });
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    axios({
      method: "get",
      url: "/api/donhang",
    })
      .then((res) => dispatch({ type: "INIT_DONHANG", data: res.data }))
      .catch((error) => console.log(error.response.data));
    axios({
      method: "put",
      url: "/api/donhang/" + id,
    });
  };
  return (
    <div>
      <Switch
        checked={state.checkedA}
        onChange={handleChange}
        name="checkedA"
        inputProps={{ "aria-label": "secondary checkbox" }}
      />
    </div>
  );
}
