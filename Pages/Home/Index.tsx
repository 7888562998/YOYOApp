import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  Dimensions,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Button,
  Modal,
  Alert,
  Pressable,
} from "react-native";
import type { StatusBarStyle } from "react-native";
import { useState, useEffect, useRef } from "react";
import TopHeader from "../../Componants/TopHeader/Index";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";

import { SafeAreaView } from "react-native-safe-area-context";

// Helper function to shuffle the numbers array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Array of 20 different colors
const colors = [
  "#f86594",
  "#4a9b7f",
  "#fbb92d",
  "#03fcdf",
  "#fc03c6",
  "#038cfc",
  "#0dfc03",
  "#f80702",
  "#2cfc9d",
  "#e3436b",
  "#e3436b",
  "#f2e713",
  "#eeacdc",
  "#036efc",
  "#f865d1",
  "#fc038c",
  "#038ffc",
  "#5dfc03",
  "#fc5103",
  "#032efc",
  "#dcf180",
  "#195dba",
  "#f7f2ab",
  "#1a2766",
  "#fc9f32",
  "#c63f7b",
  "#e3e3e3",
  "#d46c76",
  "#4a9e48",
  "#e20b8c",
  "#665803",
  "#12dff3",
  "#f756aa",
  "#5a443a",
  "#ccb3d1",
  "#f34a62",
  "#b3e8f7",
  "#e6a5cc",
  "#f0cd97",
  "#f4985a",
  "#d66fee",
  "#c9efdc",
  "#f2bbf1",
  "#caf2ef",
  "#9d7ef3",
  "#e9f0aa",
  "#fcef64",
  "#a478f1",
  "#e85c90",
  "#f74c06",
];

export default function HomePage() {
  const [enterteNumber, setEnteredNumber] = useState("");
  const enterteNumberRef = useRef("");
  const numbersArr = useRef([]);
  const [showNumber, setEnteredShowNumber] = useState("--");
  const [playerTimer, setplayerTimer] = useState("0");
  const intervalStop = useRef(null);
  const PlayerPoint = useRef([]);
  const [sumPlayerFirst, setSumPlayerFirst] = useState<any>();
  const [sumPlayerSecond, setSumPlayerSecond] = useState<any>();
  const [playerFirstResult, setPlayerFirstResult] = useState("");
  const [playerSecondResult, setPlayerSecondResult] = useState("");
  const intervalRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const num = useRef([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

  const backGroundImage = {
    "BgImage1.png": require("../../assets/src/Images/BackgroundImage/BgImage1.png"),
    "BgImage2.png": require("../../assets/src/Images/BackgroundImage/BgImage2.png"),
    "BgImage3.png": require("../../assets/src/Images/BackgroundImage/BgImage3.png"),
    "BgImage4.png": require("../../assets/src/Images/BackgroundImage/BgImage4.png"),
    // "BgImage5.png": require("../../assets/src/Images/BackgroundImage/BgImage5.png"),
    // "BgImage6.png": require("../../assets/src/Images/BackgroundImage/BgImage6.png"),
    // "BgImage7.png": require("../../assets/src/Images/BackgroundImage/BgImage7.png"),
    "BgImage8.png": require("../../assets/src/Images/BackgroundImage/BgImage8.png"),
    "BgImage9.png": require("../../assets/src/Images/BackgroundImage/BgImage9.png"),
  };
  const [currentImage, setCurrentImage] = useState("BgImage1.png");

  useEffect(() => {
    // Set interval to change the image every 1 second
    const interval = setInterval(() => {
      const randomIndex = Math.floor(
        Math.random() * Object.keys(backGroundImage).length
      );
      const randomImageName = Object.keys(backGroundImage)[randomIndex]; // Select random image name
      setCurrentImage(randomImageName); // Update the current image
    }, 60000);
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const refreshBoard = () => {
    const newNumbers = shuffleArray([...Array(100).keys()].map((n) => n + 1));
    setNumbers(newNumbers);
    setBoxColors(
      newNumbers.map(() => colors[Math.floor(Math.random() * colors.length)])
    );
  };

  const timerStart = () => {
    var count = 0;
    intervalStop.current = setInterval(() => {
      count++;
      setplayerTimer(count);
    }, 1000);
  };

  const findFinalResults = () => {
    if (PlayerPoint.current.length == 10) {
      var sumFirst = 0;
      var sumSecond = 0;
      PlayerPoint.current.map((item, key) => {
        // Only render items with even indices
        if (key % 2 === 0) {
          sumFirst = sumFirst + item;
        } else {
          sumSecond = sumSecond + item;
        }
      });

      setSumPlayerFirst(sumFirst);
      setSumPlayerSecond(sumSecond);

      const finalWinnerResult = "Winner";
      const finalLooserResult = "Looser";

      if (sumFirst < sumSecond) {
        setPlayerFirstResult(finalLooserResult);
        setPlayerSecondResult(finalWinnerResult);
      } else {
        setPlayerFirstResult(finalWinnerResult);
        setPlayerSecondResult(finalLooserResult);
      }
      sumFirst = 0;
      sumSecond = 0;
      4;
    }
  };

  const findNumberHandler = () => {
    enterteNumberRef.current ="";
    setModalVisible(!modalVisible)
    Keyboard.dismiss();
    if (playerTimer == "0") {
      if (PlayerPoint.current.length <= 10) {
        if (Number(enterteNumber) >= 1 && Number(enterteNumber) <= 100) {
          if (enterteNumber && enterteNumber !== "") {
            timerStart();
            setEnteredShowNumber(enterteNumber);
            setEnteredNumber("");
          } else {
            ToastAndroid.showWithGravityAndOffset(
              "Enter number between 1-100 only",
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50
            );
          }
        } else {
          ToastAndroid.showWithGravityAndOffset(
            "Enter number between 1-100 only",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
          );
          setEnteredShowNumber("--");
        }
      }
    }
  };

  const [numbers, setNumbers] = useState(
    shuffleArray([...Array(100).keys()].map((n) => n + 1))
  );

  const [boxColors, setBoxColors] = useState(
    numbers.map(() => colors[Math.floor(Math.random() * colors.length)])
  );

  const numColumns = 10;
  const screenWidth = Dimensions.get("window").width;
  const boxSize = screenWidth / numColumns - 4;

  useEffect(() => {
    const interval = setInterval(() => {
      setBoxColors(
        numbers.map(() => colors[Math.floor(Math.random() * colors.length)])
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [numbers]);

  const reloadGame = () => {
    setEnteredNumber();
    setEnteredShowNumber("--");
    setplayerTimer("0");
    clearInterval(intervalStop.current);
    // setPlayerPoints([]);
    PlayerPoint.current = [];
    setSumPlayerFirst();
    setSumPlayerSecond();
    setPlayerFirstResult("");
    setPlayerSecondResult("");
  };

  const handlerPopUp = () => {
    setModalVisible(true);
  };

  const handleBoxClick = (clickedNumber) => {
    if (PlayerPoint.current.length <= 10) {
      if (clickedNumber == showNumber) {
        var timer = playerTimer;
        clearInterval(intervalStop.current);
        // setPlayerPoints((prevPoints) => [...prevPoints, timer]);
        PlayerPoint.current.push(timer);
        setplayerTimer("0");
        setEnteredShowNumber("");
        console.log(
          "--PlayerPoint.current.length--",
          PlayerPoint.current.length
        );
        if (PlayerPoint.current.length == 10) {
          findFinalResults();
        }
      } else {
        ToastAndroid.showWithGravityAndOffset(
          "Wrong no selected.",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      }
    }
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => handleBoxClick(item)}>
      <View
        style={[
          styles.box,
          {
            width: boxSize,
            height: boxSize,
            backgroundColor: boxColors[index],
          },
        ]}
      >
        <Text style={styles.number}>{item}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"} // Use 'height' for Android
      >
        <SafeAreaView style={styles.TopHeaderView}>
          {/* <TopHeader /> */}
          <StatusBar animated={true} backgroundColor="#f070b7" />
          <ImageBackground
            source={backGroundImage[currentImage]}
            style={styles.backgroundImage}
          >
            <View style={styles.TopContainerView}>
              <View style={styles.NumbersView}>
                <FlatList
                  data={numbers}
                  keyExtractor={(item) => item.toString()}
                  numColumns={numColumns}
                  renderItem={renderItem}
                  contentContainerStyle={styles.grid}
                />
              </View>

              <View style={styles.MiddleView}>
                <TouchableOpacity style={styles.textAdd} onPress={handlerPopUp}>
                  <Text style={styles.numberText}>Choose Number</Text>
                </TouchableOpacity>

                {/* <TextInput
                  style={styles.input}
                  onChangeText={setEnteredNumber}
                  value={enterteNumber}
                  placeholder="Enter Number"
                  keyboardType="numeric"
                  color="#fff"
                  onSubmitEditing={findNumberHandler}
                /> */}

                <TouchableOpacity
                  style={styles.btnAdd}
                  onPress={findNumberHandler}
                >
                  <Text style={styles.btnText}>Go</Text>
                </TouchableOpacity>

                <View style={styles.showEnteredNumbersView}>
                  <Text style={styles.noText}>{showNumber}</Text>
                </View>

                <View style={styles.showTimer}>
                  <Text style={styles.noText}>{playerTimer}</Text>
                </View>

                <TouchableOpacity onPress={refreshBoard}>
                  <View style={styles.refreshBoard}>
                    <FontAwesome5 name="sync-alt" size={24} color="black" />
                  </View>
                </TouchableOpacity>

                <View style={styles.showHelp}>
                  <Entypo name="help-with-circle" size={36} color="yellow" />
                </View>

                <TouchableOpacity onPress={reloadGame}>
                  <View style={styles.reload}>
                    <Ionicons name="reload-circle" size={36} color="green" />
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.BottomView}>
                <View style={styles.PointView}>
                  <Text style={styles.PointsHeading}>Player 1</Text>
                  {PlayerPoint.current.map((item, key) => {
                    // Only render items with even indices
                    if (key % 2 === 0) {
                      return (
                        <Text key={key} style={styles.PlayerPoints}>
                          {item}
                        </Text>
                      );
                    }
                    return null; // Skip odd index items
                  })}
                  {sumPlayerFirst !== null ? (
                    <Text style={styles.finalResult}>
                      {playerFirstResult} {sumPlayerFirst}
                    </Text>
                  ) : (
                    ""
                  )}
                </View>
                <View style={styles.PointView}>
                  <Text style={styles.PointsHeading}>Player 2</Text>
                  {PlayerPoint.current.map((item, key) => {
                    // Only render items with even indices
                    if (key % 2 != 0) {
                      return (
                        <Text key={key} style={styles.PlayerPoints}>
                          {item}
                        </Text>
                      );
                    }
                    return null; // Skip odd index items
                  })}
                  {sumPlayerSecond !== null ? (
                    <Text style={styles.finalResult}>
                      {playerSecondResult} {sumPlayerSecond}
                    </Text>
                  ) : (
                    ""
                  )}
                </View>
              </View>
            </View>
          </ImageBackground>
        </SafeAreaView>
      </KeyboardAvoidingView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              onChangeText={setEnteredNumber}
              value={enterteNumberRef.current}
              placeholder="Enter Number"
              keyboardType="numeric"
              onSubmitEditing={findNumberHandler}
            />
            <View style={styles.numContainer}>
              {num.current.map((item) => {
                return (
                  <TouchableOpacity
                    style={styles.numBoxes}
                    onPress={() => {
                      console.log(
                        "numbersArr.current.",
                        numbersArr.current.length
                      );
                      //

                      //}
                      if (numbersArr.current.length == 0) {
                        numbersArr.current.push(item);
                        setEnteredNumber(item.toString());
                        enterteNumberRef.current = item.toString();
                      } else {
                        var result = numbersArr.current.join("");
                        if (Number(result) <100) {
                          numbersArr.current.push(item);
                          result = numbersArr.current.join("");
                          console.log("result", result);
                          setEnteredNumber(result);
                          enterteNumberRef.current = result;
                        }
                      }
                    }}
                  >
                    <Text>{item}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                numbersArr.current.pop();
                const result = numbersArr.current.join("");
                console.log(result);
                setEnteredNumber(result);
                enterteNumberRef.current = result;
              }}
            >
              <Text style={styles.textStyle}>Back</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={findNumberHandler}
            >
              <Text style={styles.textStyle}>Continue</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  TopHeaderView: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    justifyContent: "center",
    textAlign: "center",
  },
  TopContainerView: {
    flex: 1.1,
    flexDirection: "column",
  },

  NumbersView: {
    flex: 0.9,
  },

  MiddleView: {
    flex: 0.1,
    flexDirection: "row",
    alignContent: "center",
    textAlign: "center",
    justifyContent: "space-between",
    marginRight: 10,
    marginLeft: 10,
  },

  BottomView: {
    flex: 0.8,
    flexDirection: "row",
    marginTop: 5,
  },
  PointView: {
    flex: 1,
    flexDirection: "column",
    textAlign: "center",
    borderColor: "white",
    borderWidth: 2,
  },
  PointsHeading: {
    fontSize: 20,
    fontWeight: "900",
    textAlign: "center",
    color: "#fff",
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  finalResult: {
    fontSize: 20,
    fontWeight: "900",
    //textAlign: "center",
    color: "#fff",
    paddingLeft: 25,
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },

  numberText: {
    margin: 0,
    padding: 0,
    color: "white",
  },
  textAdd: {
    borderColor: "#fff",
    borderWidth: 3,
    textAlign: "center",
    margin: 0,
    padding: 10,
    justifyContent: "center",
    borderRadius: 8,
    color: "white",
    backgroundColor: "orange",
  },

  PlayerPoints: {
    fontSize: 20,
    textAlign: "center",
    color: "#fff",
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  input: {
    borderWidth: 1,
    padding: 3,
    margin: 10,
  },
  fixToText: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  grid: {
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    justifyContent: "center",
    alignItems: "center",
    margin: 1,
    borderRadius: 5,
    marginTop: 1,
    marginBottom: 1,
    marginRight: 1,
    marginLeft: 1,
  },
  number: {
    fontSize: 18,
    color: "#000", // Text color
  },
  btnAdd: {
    backgroundColor: "#f194ff",
    borderRadius: 50, // Circular button
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    marginLeft: 4,
    borderColor: "#aefb2a",
    borderWidth: 2,
  },
  btnText: {
    fontSize: 20,
    color: "white",
  },

  showEnteredNumbersView: {
    backgroundColor: "#60efff",
    borderRadius: 50, // Circular button
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    marginLeft: 4,
    borderColor: "#f187fb",
    borderWidth: 2,
  },

  showTimer: {
    backgroundColor: "#cbff49",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    marginLeft: 4,
    borderColor: "#5612d6",
    borderWidth: 2,
  },
  showHelp: {
    backgroundColor: "blue",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    marginLeft: 4,
    borderColor: "#5612d6",
    borderWidth: 2,
  },
  reload: {
    backgroundColor: "#fff",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    marginLeft: 4,
    borderColor: "green",
    borderWidth: 2,
  },

  noText: {
    fontSize: 20,
    color: "black",
  },

  refreshBoard: {
    backgroundColor: "#fff",
    borderRadius: 50, // Circular button
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    marginLeft: 4,
    borderColor: "#f13c77",
    borderWidth: 2,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    margin: 10,
    backgroundColor: "red",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  numContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  numBoxes: {
    borderColor: "blue",
    borderWidth: 2,
    padding: 8,
    borderRadius: 8,
    backgroundColor: "orange",
  },
});
