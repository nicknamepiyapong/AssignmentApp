import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView
} from "react-native";
import Menu from "../component/Menu";

import React from 'react';
import {
  useWindowDimensions
} from 'react-native';
import RenderHtml, {
  HTMLElementModel,
  HTMLContentModel
} from 'react-native-render-html';
import { COLORS } from "../../constants";

const customHTMLElementModels = { /* If HTML Element Tag is not found on this react-native-render-html libray, Create your custom HTML Element inside this.*/
  'button': HTMLElementModel.fromCustomModel({
    tagName: 'button',
    contentModel: HTMLContentModel.mixed
  })
};

{/* CSS Styles */ }
const tagsStyles = {
  body: {
    marginHorizontal: 10,
    paddingHorizontal: 20,
  },
  span: {
    width: "auto",
    height: "auto",
    fontSize: "20px",
    marginTop: 15,
    marginBottom: 10,
  },
};

const butoonStyles = {
  button: {
    width: "100%",
    height: "auto",
    borderRadius: 5,
    fontSize: "15px",
    paddingTop: "10px",
    paddingBottom: "10px",
    paddingHorizontal: 0,
    color: COLORS.white,
    textAlign: "center",
    alignSelf: 'center',
    backgroundColor: '#0085E6',
    marginTop: 15,
    marginBottom: 20,
  }
};

const footerStyles = {
  footer: {
    color: "#FFFF",
    textAlign: "center",
    padding: 5,
    backgroundColor: '#3C424D'
  }
};


{/* React-native component Styles */ }
const styles = StyleSheet.create({

  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  mainContainer: {
    height: "100%",
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    textAlign: "center",
  },

  lineStyle: {
    marginBottom: 0,
    borderWidth: 0.5,
    borderColor: "grey",
  },

  buttonText: {
    color: "#eee",
  },
  inputContainer: {
    paddingHorizontal: 20,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.3)",
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 2,
    marginTop: 5,
  },
  multiineStyle: {
    paddingVertical: 4,
  }
});


var topBody = {
  html: `<body>
            <h3>
              Find the next value in the given sequence: 3, 5, 9, 15, and so forth.
            </h3>
         </body>`
};

var ButtonFindNextValue = {
  html: `<button type="button">Find Next Value</button> `
};

var ButtonClearScreen = {
  html: `<button type="button">Clear Screen</button> `
};

var result = `<body>
                    <span>Enter value of the given sequence.</span>
                    </br></br>
                    <span> <b>Now Sequence</b></br>3,5,9,15</span>
              </body>`

var footer = {
  html: `<footer> Assignment App by Piyapong W.</footer>`
};



const Test = () => {

    const {
      width
    } = useWindowDimensions();

    const [InputText, setInputUpadate] = React.useState("");
    const [Sequence, setSequence] = React.useState([3, 5, 9, 15]);
    const [ResultUpadate, setResultUpadate] = React.useState(result);
    const [CacheSequence, setCacheSequence] = React.useState("");

    {/* Find Next Value function */ }
    const FindNextValue = async () => {

      const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))

      var SequenceArray = Sequence;

      var lastIndex = SequenceArray.length - 1;

      if (InputText != '') {

        var found = SequenceArray.findIndex(element => element == InputText);
        var NextValue = 0;

        if (found == -1) {
          found = `<span><b style="color:#F73B09">This value out of sequence.</b></span></br></br>`
        } else if (found == lastIndex) {

          var LastDifferenceValue = SequenceArray[lastIndex] - SequenceArray[lastIndex - 1];

          var NextDifferenceValue = LastDifferenceValue + 2;

          NextValue = SequenceArray[lastIndex] + NextDifferenceValue;

          SequenceArray.push(NextValue);

          setSequence(SequenceArray);

          found = `<span>Next value is <b style="color:#439416">` + NextValue + `</b></span></br></br>`

        } else {

          NextValue = SequenceArray[found + 1]
          found = `<span>Next value is <b style="color:#439416">` + NextValue + `</b></span></br></br>`
        }

      } else {
        found = `<span>Enter value of the given sequence.</span></br></br>`
      }



      {/* use Cache Sequence result */ }
      if (CacheSequence != "") {
        result = `<body>` + found + `<span>` + CacheSequence + `</span> </body>`
      } else {
        result = `<body>` + found + `<span> <b>Now Sequence</b></br>3,5,9,15</span> </body>`
      }
      setResultUpadate(result)

      {/* Do this work if check SequenceArray is has been length update */ }
      if (SequenceArray.length - 1 != lastIndex) {

        {/* show Now Sequence */ }

          SequenceArray = Sequence;

          var showNowSequence = '<b>Now Sequence</b></br>'
          var i = 0;

          lastIndex = SequenceArray.length - 1;

          SequenceArray.forEach(async element => {

                showNowSequence += element;

                if (i != lastIndex) {
                  showNowSequence += ','
                }

                i = i + 1;

                {/* Upadate Result every 5 new result */}
                if( (i % 5) == 0 || i == Sequence.length ){

                    result = `<body>` + found + `<span>` + showNowSequence + `</span> </body>`

                    printResult(result);
                    await wait(200);
                  
                }

          });

          {/* Set Cache Sequence result */ }
          setCacheSequence(showNowSequence);

      }

    }

    function printResult(result){

        setResultUpadate(result)
    }


    {/* Clear Screen function */ }
    async function ClearScreen() {

      const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))
      setInputUpadate("");
      setResultUpadate("")
      await wait(200);
    }


    {/* Generate Result Display function */ }
    function ResultDisplay({
      html
    }) {
      return ( <
        RenderHtml contentWidth = {
          width
        }
        source = {
          {
            html
          }
        }
        tagsStyles = {
          tagsStyles
        }
        />
      );
    }



    return (
      <View style={styles.mainContainer}>
        {/* NavigetionBar React-native component*/}
        <View style={styles.menuStyle}>
          <View style={styles.lineStyle}></View>
          <Menu page={"Test"}/>
          <View
            style={[
              styles.lineStyle,
              {
                marginVertical: 10,
              },
            ]}></View>
        </View>


        {/* Top Body HTML*/}
        <RenderHtml
            contentWidth={width}
            tagsStyles={tagsStyles}
            source={topBody}
        />

        {/* Input Text React-native component*/}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputStyle}
            keyboardType="numeric"
            placeholder="Enter Value"
            value={InputText}
            onChangeText={(text) => setInputUpadate(text)}
          />
        </View>

        <View style={styles.container}>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => FindNextValue()}>
                {/* Button HTML*/}
                <RenderHtml
                      contentWidth={width}
                      tagsStyles={butoonStyles}
                      source={ButtonFindNextValue}
                      customHTMLElementModels={customHTMLElementModels}
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => ClearScreen()}>
                {/* Button HTML*/}
                <RenderHtml
                      contentWidth={width}
                      tagsStyles={butoonStyles}
                      source={ButtonClearScreen}
                      customHTMLElementModels={customHTMLElementModels}
                />
            </TouchableOpacity>
        </View>

        <ScrollView >
            {/* Body Result HTML*/}
            {<ResultDisplay 
               html={ResultUpadate}
            />}

        </ScrollView>


        {/* Footer HTML*/}
        <RenderHtml
            contentWidth={width}
            tagsStyles={footerStyles}
            source={footer}
        />
        
      </View>
    );
};

    export default Test;