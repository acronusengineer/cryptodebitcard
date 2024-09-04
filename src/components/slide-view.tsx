import {
  View,
  StyleSheet
} from "react-native";
import { useRecoilValue } from "recoil";
import { themeState } from "../states/appState";
import GetStyle from "../styles";

export const SlideView = (props: any)=> {
    const style = GetStyle();
    const theme = useRecoilValue(themeState);

    const SlideComponent = () =>{
        const rows = [];
        for(let i = 0; i < props.count; i++ ){
            if(i == props.active) {
                rows.push(<View style= {[styles.activeColor, styles.active]} key={i}></View>)
            }else{
                rows.push(<View style= {[styles.default, {backgroundColor: theme === 'dark' ? '#222222' : '#EAEAEA'}]} key={i}></View>)
            }
        }
        return <>{rows}</>
    }
    return (
        <View style={[style.VContainer, styles.cmpWidth, props.style]}>
            <SlideComponent />
        </View>
    );
};

const styles = StyleSheet.create({
    cmpWidth: {
        width: 50,
        marginLeft: 15
    },
    default: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 1,
        marginLeft: 2,
        marginRight:2,
        height:5,
        borderRadius:30
    },
    active: {
        flexGrow: 5,
        flexShrink: 1,
        flexBasis: 2,
        height:5,
        borderRadius:30
    },
    defaultColor: {
        backgroundColor: '#EAEAEA'
    },
    activeColor: {
        backgroundColor: '#F9B180'
    }
});