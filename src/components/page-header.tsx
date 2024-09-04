import { StyleSheet, View, Text} from "react-native";
import { SlideView } from "./slide-view";

import { BackButton } from "./card/BackButton";
import GetStyle from "../styles";

export const PageHeader = (props: any) => {
  const style = GetStyle();
  return (
      <View style={[styles.container]}>
          <View style={[styles.sectionStyle]}>
            <View style={[style.VContainer, {paddingHorizontal: 19, paddingTop: 20}]}>
              <View style={style.FBase1}>
                <BackButton 
                  onPress={() => {
                    if (props.onBack) props.onBack();
                  }}
                />
              </View>
              <View style={style.FBase5}>
                {props.title && (<Text style={[style.FSizeButton, style.FBColor, {paddingTop: 5, paddingRight: 20, textAlign: "center"}]}>{props.title}</Text>)}
              </View>
              <View style={style.FBase1}>
                <View style= {styles.slideView}>
                  {props.slide && (<SlideView count = {props.count} active = {props.active} />)}
                </View>
              </View>
            </View>
          </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    color: "#000000",
    borderRadius: 1000,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 2,
    marginLeft:5,
    marginRight: 5,
    // marginTop:20
  },
  sectionStyle: {
    width:'100%',
    height: 40,
    margin: 20,
    
  },
  slideView : {
    paddingTop:12.5,
    paddingRight: 40,
    justifyContent: "center",
    alignItems: "center",
  }
});
