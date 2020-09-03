/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { PureComponent } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ToastAndroid,
  FlatList,
  TextInput
} from "react-native";
import ItemsClass from "./components/comps";

const listData = [
  { id: "0", name: "Aditya", email: "adityaprakash159@gmail.com" },
  { id: "1", name: "Ashad", email: "ashadnasim@gmail.com" },
  { id: "2", name: "Pranav", email: "pranav@gmail.com" },

];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selected: (new Map(): Map<string, boolean>),
      value: ""
    };

    this.arrayholder = [];
  }

  componentWillMount() {
    this._fetchdata();
  }

  _fetchdata = async () => {
    const response = await fetch("https://randomuser.me/api?results=10");
    const json = await response.json();
    this.setState({ data: json.results });

    this.arrayholder = json.results;
  };

  _onPressItem = id => {
    // copy the map rather than modifying state.
    const selected1 = new Map(this.state.selected);
    selected1.set(id, !selected1.get(id)); // toggle

    // updater functions are preferred for transactional updates
    this.setState({ selected: selected1 });
  };

  searchFilterFunction = text => {
    this.setState({
      value: text
    });

    console.log(this.arrayholder);

    const newData = this.arrayholder.filter(item => {
      const itemData = item.email.toLowerCase();

      const textData = text.toLowerCase();

      return itemData.indexOf(textData) > -1;
    });

    this.setState({ data: newData });
  };

  _renderItems = data => {
    let { item, index } = data;
    return (
      <ItemsClass
        onPressItem={this._onPressItem}
        name={item.name.first}
        email={item.email}
        picUrl={item.picture.thumbnail}
        id={index}
        selected={!!this.state.selected.get(index)}
      />
    );
  };

  render() {
    return (
      <View>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={text => this.searchFilterFunction(text)}
        />

        <FlatList
          data={this.state.data}
          extraData={this.state}
          renderItem={this._renderItems}
        />
      </View>
    );
  }
}

// export default class App extends React.PureComponent {
//   state = { selected: (new Map(): Map<string, boolean>) };

//   _keyExtractor = (item, index) => item.id;

//   _onPressItem = (id: string) => {
//     // updater functions are preferred for transactional updates
//     this.setState(state => {
//       // copy the map rather than modifying state.
//       const selected = new Map(state.selected);
//       selected.set(id, !selected.get(id)); // toggle
//       return { selected };
//     });
//   };

//   _renderItem = ({ item }) => (
//     <MyListItem
//       id={item.id}
//       onPressItem={this._onPressItem}
//       selected={!!this.state.selected.get(item.id)}
//       name={item.name}
//     />
//   );

//   render() {
//     return (
//       <FlatList
//         data={[
//           { id: "0", name: "Aditya", email: "adityaprakash159@gmail.com" },
//           { id: "1", name: "Ashad", email: "ashadnasim@gmail.com" },
//           { id: "2", name: "Pranav", email: "pranav@gmail.com" },
//           { id: "3", name: "Aakash", email: "aakash@gmail.com" }
//         ]}
//         extraData={this.state}
//         keyExtractor={this._keyExtractor}
//         renderItem={this._renderItem}
//       />
//     );
//   }
// }
