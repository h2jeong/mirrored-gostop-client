import React, { Component } from 'react';
import {
  AsyncStorage,
  View, 
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import fakeserver from '../fakeserver';
import { Fonts } from '../fonts';

interface signinState {
  email : string;
  password : string;
  passwordmsg : string;
}

export default class Signin extends Component<any, signinState> {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordmsg : '비밀번호를 한 번 더 입력해주세요',
    };
    };
  
  handleEmail = text => {
    this.setState({ email: text });
  };
 
  handlePassword = text => {
    this.setState({ password: text });
  };

   login = (email, password) => {
    const logindata = {
      email : email,
      password : password,
    };

    console.log('logindata', logindata)
    
    fetch(`${fakeserver}/auth/login`, {
      method : 'POST',
      body : JSON.stringify(logindata),
      headers : {
        'Content-Type' : 'application/json',
      },
    }).then((res) => {
      const cookie = res.headers['map']['set-cookie'];
      console.log('쿠키니? 이게 원래 받은 토큰!!!', cookie);

      AsyncStorage.setItem('token', cookie);
      if (res.status === 200 || res.status === 201) {
        res.json()
      .then((data) =>  {
        console.log('로그인 시에 받아온 데이터에 refresh token 있니?----------', data)
        const refreshtoken = data["refreshToken"];
        console.log('refreshtoken---------------', refreshtoken);
        AsyncStorage.setItem('refreshtoken', refreshtoken);
        this.props.navigation.navigate('Habits');
      });
      }
    })
    .catch((error) => console.log('fetch error', error))
  };

  google_login = () =>{
    const req = new Request(`${fakeserver}/auth/google`);
    fetch(req).then((res) => {
      if (res.status === 200 || res.status === 201) {
        res.text().then(text => console.log(text));
      } else {
        console.error(res.statusText);
      }
    });
  }
 
  render() {
    return (
      <View style={styles.container}>

        <View style = {styles.top}>
        <Text style = {{ marginBottom : '5%', color : '#ffdc34', alignSelf : 'center',
         fontSize : 50, fontStyle : 'italic', fontWeight : 'bold' }}>Go?! Stop?!</Text>

        {/* <Text>E-mail</Text> */}
        <TextInput
          style={styles.input}
          underlineColorAndroid='transparent'
          placeholder='Email'
          placeholderTextColor='#3C5087'
          autoCapitalize='none'
          onChangeText={this.handleEmail}
        />

        {/* <Text>Password</Text> */}
        <TextInput
          style={styles.input}
          underlineColorAndroid='transparent'
          placeholder='Password'
          placeholderTextColor='#3C5087'
          autoCapitalize='none'
          onChangeText={this.handlePassword}
          secureTextEntry={true}
        />
        </View>


        <View style = {styles.bottom}>
          <View style = {styles.loginButton}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.login(this.state.email, this.state.password)}
        >
          <Text style={styles.submitButtonText}>로그인</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.google_login()}
        >
          <Text style={styles.submitButtonText}>구글 로그인</Text>
        </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.props.navigation.navigate('Signup')}
        >
          <Text style={styles.submitButtonText}>회원가입</Text>
        </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor : 'white',
    flex: 1,
    height : '100%',
    width : '100%',
    alignItems : 'stretch',
  },
  top : {
    backgroundColor : '#110133',
    paddingBottom : 15,
    // marginBottom : 10,
    height : '40%',
    justifyContent : 'flex-end',

  },
  bottom : {
    backgroundColor : '#ffdc34',
    height : '60%',
    paddingTop : 15,
  },
  input: {
    // margin: 15,
    marginTop : 15,
    height: 40,
    borderColor: '#dadada',
    borderWidth: 1,
    backgroundColor : 'white',
    width : '70%',
    alignSelf : 'center',
  },
  loginButton : {
    // flexDirection : 'row',
    // justifyContent : 'center',
  },
  submitButton: {
    backgroundColor: '#110133',
    padding: 10,
    marginBottom: 15,
    height: 40,
    width : '70%',
    // borderColor : 'black',
    // borderWidth : 1,
    // width : '50%',
    alignSelf : 'center',
  },
  submitButtonText: {
    color: 'white',
    alignSelf : 'center',
    fontSize : 18,
    fontWeight : 'bold',
  },
});
