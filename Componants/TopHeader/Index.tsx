import {View, Text, StyleSheet} from 'react-native';

export default function TopHeader()
{
    return(
        
    <View style={styles.TopHeaderView}>
        <Text style={styles.TopHeaderText}>YoYo</Text>
    </View>
    );
}

const styles = StyleSheet.create({
    TopHeaderView:{
       flex:1,
       flexDirection:'column',
       maxHeight:'7%',
       
    },
    TopHeaderText:{
     color:"#fff",
     textAlign:'center',
     justifyContent:'center',
     fontSize:16,
     fontWeight:'600',
    backgroundColor:"#ff6f00",
    //height:'15%',
    //paddingTop:35,
    
    },
  });