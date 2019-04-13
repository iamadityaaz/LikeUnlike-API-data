import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ToastAndroid,
  FlatList
} from "react-native";

export default class ItemsClass extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  _presss = () => {
    this.props.onPressItem(this.props.id);

    console.log(this.props.selected);
  };

  render() {
    const textColor = this.props.selected ? "red" : "black";

    return (
      <TouchableOpacity
        style={{ justifyContent: "space-evenly", flexDirection: "row" }}
      >
        <Image
          style={{ width: 50, height: 50, borderRadius: 120 }}
          source={{
            uri: this.props.picUrl
          }}
        />
        <Text>{this.props.email}</Text>

        <TouchableOpacity onPress={() => this._presss()}>
          <Text style={{ color: textColor, fontWeight: "bold" }}>
            {this.props.selected ? "UnFollow" : "Follow"}
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}
