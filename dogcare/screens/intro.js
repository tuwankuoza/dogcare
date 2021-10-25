import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";

const slides = [
  {
    key: "one",
    title: "Hi, welcome to",
    text: "DogCare!",
    image:
      "https://ik.imagekit.io/xvfgr2ixls8/undraw_Dog_walking_re_l61p-removebg-preview_-wPGgdcT6.png?updatedAt=1635156159438",
    backgroundColor: "#59b2ab",
  },
  {
    key: "two",
    title: "Find Information About Your Dog",
    text: "",
    image:
      "https://ik.imagekit.io/xvfgr2ixls8/undraw_Modern_woman_lxh7_X_OlOxsWB.png?updatedAt=1635156399347",
    backgroundColor: "#febe29",
  },
  {
    key: "three",
    title: "See Moments",
    text: "",
    image:
      "https://ik.imagekit.io/xvfgr2ixls8/undraw_woman_mevk__FzZnTaxJ.png?updatedAt=1635156461340",
    backgroundColor: "#22bcb5",
  },
];

export default class intro extends React.Component {
  _renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        <Image source={{ uri: item.image }} style={styles.imageItem}></Image>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };
  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.props.navigation.navigate('Home')
    this.setState({ showRealApp: true });
  };
  render() {
    return (
      <AppIntroSlider
        renderItem={this._renderItem}
        data={slides}
        onDone={this._onDone}
        activeDotStyle={{ backgroundColor: "#FFC163", width: 30 }}
      />
    );
  }
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 32,
    color: '#FFC163',
    fontWeight: 'bold'
  },
  imageItem: {
    height: 300,
    width: 340,
    margin: 30,
    marginLeft: "auto",
    marginRight: "auto",
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    color: '#FFC163',
    margin: 30,
    fontWeight: 'bold'
  },
});
