import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Text,
  ActivityIndicator 
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

import { imagesRes, icons , COLORS, SIZES, FONTS, GOOGLE_API_KEY} from '../../constants';

const customHTMLElementModels = {
  /* If HTML Element Tag is not found on this react-native-render-html libray, Create your custom HTML Element inside this.*/
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
  button: {
    width: 200,
    height: "auto",
    borderRadius: 5,
    fontSize: "20px",
    padding: 5,
    color: "white",
    textAlign: "center",
    alignSelf: 'center',
    backgroundColor: COLORS.primary,
    marginTop: 0,
    marginBottom: 20,
  },
  span: {
    width: "auto",
    height: "auto",
    fontSize: "20px",
    marginTop: 15,
    marginBottom: 10,
  },
};

const footerStyles = {
  footer: {
    color: COLORS.white,
    textAlign: "center",
    padding: 5,
    backgroundColor: COLORS.darkgray2
  }
};


{/* React-native component Styles */ }
const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
    textAlign: "center",
  },

  lineStyle: {
    marginBottom: 0,
    borderWidth: 0.5,
    borderColor: "grey",
  },

  buttonText: {
    color: COLORS.lightGray4,
  },
  inputContainer: {
    paddingHorizontal: 20,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: COLORS.black,
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 2,
    marginTop: 15,
  },
  multiineStyle: {
    paddingVertical: 4,
  },
  scrollView:{
    paddingHorizontal: SIZES.padding * 2,
    paddingBottom: 30
  },
  container: {
    marginBottom: SIZES.padding * 4,
  },
  itemWrapper: {
    marginBottom: SIZES.padding,
  },
  itemImage: {
    width: '100%',
    height: 200,
    borderRadius: SIZES.radius,
  },
  itemLabel: {
    position: 'absolute',
    bottom: 0,
    height: 40,
    width: SIZES.width * 0.3,
    backgroundColor: COLORS.darkgray,
    borderTopRightRadius: SIZES.radius,
    borderBottomLeftRadius: SIZES.radius,
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemRatingContainer: {
    marginTop: SIZES.padding,
    flexDirection: 'row',
  },
  itemRatingImage: {
    height: 20,
    width: 20,
    tintColor: COLORS.orange,
    marginRight: 10,
  },
  itemRatingText: {
    ...FONTS.body3, 
    marginRight: 10,
  },
  itemLocation: {
    flexDirection: 'row',
    marginLeft: 10,
    width: '70%',
  },
  itemCategory: {
    flexDirection: 'row',
  },
});


var source = {
  html: `<body>
          <h3>
          Finding all restaurants in Bangsue district area (an area in Bangkok).
          </h3>
        </body>`
};

var button = {
  html: `<button type="button">Find Restaurants</button>`
};

var disabled_button = {
  html: `<button type="button" style="background-color:grey;" >Find Restaurants</button>`
};


var footer = {
  html: `<footer> Assignment App by Piyapong W.</footer>`
};



const Place = () => {

    var TempImage = imagesRes.no_image;

    const {
      width
    } = useWindowDimensions();

    const [isStopLoadingAnim, setIsStopLoadingAnim] = React.useState(true);
    const [isResultUpadate, setIsResultUpadate] = React.useState(true);
    const [isStopWorking, setIsStopWorking] = React.useState(true);
    const [ResultUpadate, setResultUpadate] = React.useState([]);
    const [Cache, setCache] = React.useState([]);


 
    {/* Find Restaurants function */ }
    const FindRestaurants = async () =>  {

        const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))

        setIsStopWorking(false);
        setIsResultUpadate(false);
        setIsStopLoadingAnim(false);
        await wait(200);

        var PlaceArea = 'Bangsue';

        let radMetter = 10 * 1000; // Search withing 10 KM radius

        var textsearch_url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?' + 'query='+ PlaceArea +'&radius=' + radMetter + '&type=restaurant&key=' + GOOGLE_API_KEY + '&language=th';

        var URL = textsearch_url;
        
        var restaurantNum = 0;
        
        var ResultComponent = [];

        var tempNameArray = Cache;

        {/* use Cache the search result */ }
        if(ResultUpadate.length > 0 && PlaceArea == 'Bangsue'){
          printResultComponent(ResultUpadate);
          await wait(200);
        }

        var isDifferentResult = true;


        const loopFetchAPI = async () => {
       
          while(true){

                console.log('\nlooping................\n')

                let response = await fetch(URL);
  
                let responseJson = await response.json();
        
                var results = responseJson.results;

                if(responseJson.status == 'OK'){
                  
                      {/* Check New search result are Different to Cache search result */ }
                      if(tempNameArray.length > 0){

                        console.log('tempNameArray > 0')

                        for(var i = 0; i < tempNameArray.length ; i++ ){

                              var res = results[i].name;

                              var found = tempNameArray.findIndex(element => element == res);
                                              
                              if (found != -1) {
                                isDifferentResult = false;
                              }

                              {/* Stop When loop count is first 20 result */ }
                              if(i == 19 ){
                                i = tempNameArray.length 
                              }
                        }

                        {/* Break this While loop if New search result are Not Different. */ }
                        if(isDifferentResult != true){
                            break;
                        }

                    }

                }
      

               results.forEach( async element => {
  
                      restaurantNum = restaurantNum + 1;
        
                      var photos = element.photos;
        
                      var photoSource = {};
        
                      if( photos != undefined &&  photos[0] != undefined){
        
                        photoSource = {
                          uri: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="+ photos[0].photo_reference +"&key="+ GOOGLE_API_KEY ,
                        }
                        
                      }else{
                        photoSource = TempImage
                      }

                      
                      console.log(element.name)
  
                      tempNameArray.push(element.name);
  
                      ResultComponent.push(<View>
                                      <View style={styles.itemWrapper} >
                                          <Image
                                            source={photoSource}
                                            resizeMode="cover"
                                            style={styles.itemImage}
                                          />
                                          {/* Restaurant number */}
                                          <View style={styles.itemLabel}>
                                            <Text style={{...FONTS.h4 ,color:COLORS.white}}>{restaurantNum}</Text>
                                          </View>
                                        </View>
                                        {/* Restaurant name */}
                                        <Text style={{fontWeight: '700',color:COLORS.black}}>{element.name}</Text>
                                        {/* Restaurant rating */}
                                        <View style={styles.itemRatingContainer}>
                                          {/* Rating */}
                                          <Image source={icons.star} style={styles.itemRatingImage} />
                                          <Text style={styles.itemRatingText}>{element.rating}</Text>
                                          {/* Restaurant location */}
                                          <View style={styles.itemLocation}>
                                
                                            {/* Location */}
                                            <Text>
                                              {element.formatted_address}
                                            </Text>
                                              
                                          </View>
                                        </View>
                                </View>);
                    
                    {/* Upadate Result Component every 5 new result */}
                    if((restaurantNum % 5) == 0 || restaurantNum == results.length){

                        printResultComponent(ResultComponent)
                        await wait(200);
                    }
                      
                });
  
                {/* Check is has been next page result or not (But the maximum possible result is 60 result) */}
                if(responseJson.next_page_token == undefined){

                      setIsStopLoadingAnim(true);
                      console.log('has been next page undefined')
                      setIsStopWorking(true);
                      await wait(200);

                      {/* Break this While loop . */ }
                      break;

                }else{

                      URL = textsearch_url + '&pagetoken='+responseJson.next_page_token ;
    
                      {/* Delay before making a new request to prevent INVALID_REQUEST error case. (Reference to https://stackoverflow.com/questions/21265756/paging-on-google-places-api-returns-status-invalid-request) */}
                      await wait(500);
                        
                }
          }

          {/* Stop FindRestaurants Function if New search result are Not Different. */ }
          if(isDifferentResult != true){

                console.log('Stop FindRestaurants Function if New search result are Not Different.')
                setIsStopLoadingAnim(true);
                setIsStopWorking(true);
                await wait(200);
                
                return;

          }else{
            
            setCache(tempNameArray);
          }

        }

        loopFetchAPI(); // Start fetch API loop

    }



    const printResultComponent = (ResultComponent) =>{

        {/* Upadate Result */} 
     
        setResultUpadate(ResultComponent);
        setIsResultUpadate(false);
        setIsResultUpadate(true);
    }


    return (
      <View style={styles.mainContainer}>
        {/* NavigetionBar React-native component*/}
        <View style={styles.menuStyle}>
          <View style={styles.lineStyle}></View>
          <Menu page={"Place"}/>
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
            source={source}
        />

       { isStopWorking == true && <TouchableOpacity style={styles.buttonContainer} onPress={() => {FindRestaurants() }}>
              {/* Button HTML*/}
              <RenderHtml
                    contentWidth={width}
                    tagsStyles={tagsStyles}
                    source={button}
                    customHTMLElementModels={customHTMLElementModels}
              />
          </TouchableOpacity>
        }

        { isStopWorking == false && <TouchableOpacity disabled={false} style={styles.buttonContainer} >
              {/* Disabled Button HTML*/}
              <RenderHtml
                    contentWidth={width}
                    tagsStyles={tagsStyles}
                    source={disabled_button}
                    customHTMLElementModels={customHTMLElementModels}
              />
          </TouchableOpacity>
        }

        <ScrollView style={styles.scrollView}>

            {/* Body Result React component*/}
            {isResultUpadate && ResultUpadate.map((subItems, sIndex) => {
                return  <TouchableOpacity style={styles.container} key={sIndex}>
                              {subItems} 
                        </TouchableOpacity> 
              })
            }

            {/* Loading Animetion React component*/}
            { isStopLoadingAnim == false &&<View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginBottom:20 }}>
               <ActivityIndicator size="large" color={ COLORS.black } />
            </View>}

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

    export default Place;