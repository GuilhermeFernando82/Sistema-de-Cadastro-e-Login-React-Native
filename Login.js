import { StyleSheet, View, Text, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState} from 'react';
import firebase from './firebaseconection';
import Logado from './logado';
import failedLogin from './failedlogin';
import {Button} from 'react-native-elements';
function HomeLogin({navigation}){
    const style = StyleSheet.create({
        button: {
          backgroundColor:'green',
          borderRadius:15,
          borderWidth:5,
          borderColor:'yellow',
          width:300,
          margin:5,
        },
        texto: {
            fontSize:35,
            color:'red',
        }
      })
    function navegarSucess(){
        navigation.navigate('Logado')
    }
    function navegarFailed(){
        navigation.navigate('failedLogin')
    }
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const onChangeEmail = (txtEmail) => {
        setEmail(txtEmail)
    }
    const onChangePassword = (txtPassword) =>{
        setPassword(txtPassword)
    }
    const login = () =>{
        firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
            navegarSucess()
        }).catch(()=>{
            navegarFailed()
        })
    }
    return(
        <View style={{ flex: 1,alignItems: 'center', justifyContent: 'center', backgroundColor:'gray' }}>
            <Text style={style.texto}>Login de Usuários</Text>
            <Text>E-mail</Text>
            <TextInput
             style={{backgroundColor:'white', textAlign:'center' ,borderRadius:15, borderWidth:7, borderColor:'red', width:300}} 
             value={email}
             onChangeText={txtEmail => onChangeEmail(txtEmail)}>
            </TextInput>
            <Text>Senha</Text>
            <TextInput
             secureTextEntry={true}
            style={{backgroundColor:'white',textAlign:"center" ,borderRadius:15, borderWidth:7, borderColor:'red', width:300}} 
             value={password}
             onChangeText={txtPassword => onChangePassword(txtPassword)}>
            </TextInput>
            <Button 
            buttonStyle={style.button}
            title="Entrar"
            onPress={login}/>
        </View>
    );
}
const Stack = createStackNavigator();

function LoginForm() {
  return (
   
      <Stack.Navigator>
        <Stack.Screen name="HomeLogin" component={HomeLogin} />
        <Stack.Screen name="Logado" component={Logado} />
        <Stack.Screen name="failedLogin" component={failedLogin} />
      </Stack.Navigator>
   
  );
}
export default LoginForm;