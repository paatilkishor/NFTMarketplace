import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import firebase from "../../firebase.js";
import ether from "../../assets/ether.svg";
import { fontWeight, style, width } from "@mui/system";

import { fontGrid } from "@mui/material/styles/cssUtils";
import Web3 from "web3";

export default function FormDialog(props) {
  const [Img, setImg] = React.useState();

  // const getTokenImage=async(props)=> {
  //     const ref = firebase.storage().ref('token/' + this.props.token.fileName);
  //     const url = await ref.getDownloadURL();
  //     setImg(url)
  // }

  const handleOnclick = async () => {
    await window.ethereum.enable();
    window.web3 = new Web3(window.ethereum);
    var et = window.web3.utils.toWei(props.token.price, "ether");

    props.buy(props.token.to, props.token.id);
    window.web3.eth.sendTransaction({
      from: props.account,
      to: props.token.to,
      value: et,
    });
    const myaddress = { receiver_address: props.account };
    console.log(props.account);

    const { receiver_address } = myaddress;
    //console.log(receiver_address);
    const response = await fetch("/accept", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        receiver_address,
      }),
    });
  };
  console.log(props);

  return (
    <div>
      <Dialog open={props.open} onClose={props.onClose}>
        <DialogTitle style={{ "font-weight": "bold" }}>
          <img src={props.token.url} style={{ width: 100, height: 100 }}></img>
          <br></br>
          Name:{props.token.name}
        </DialogTitle>
        <DialogContent
          style={{ "font-family": "Georgia", "font-weight": "bold" }}
        >
          <DialogContentText
            style={{ "font-family": "Georgia", "font-weight": "bold" }}
          >
            Owner:
            <br></br>
            {props.token.to}
          </DialogContentText>
          <br></br>
          <DialogContentText
            style={{ "font-family": "Georgia", "font-weight": "bold" }}
          >
            Price :{props.token.price}
            <img src={ether} alt="ether" class="icon" />
            (${parseInt(props.token.price) * props.token.ethPrice})
          </DialogContentText>
          <DialogContentText
            style={{ "font-family": "Georgia", "font-weight": "bold" }}
          >
            Description:<br></br>
            {props.token.description}
          </DialogContentText>

          <Button onClick={handleOnclick}>Accept</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
