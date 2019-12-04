import React, { Component } from "react";
import { View, AsyncStorage } from "react-native";
import { readBuilderProgram } from "typescript";
import { connect } from 'react-redux';
import savereward from '../actions/rewardaction'
import fakeserver from '../fakeserver'
import styles from './cssStyles'

import AddOrModifyButton from './commonComponents/AddOrModifyButton'
import ResetButton from './commonComponents/ResetButton'
import CoinSection from './commonComponents/CoinSection'
import ContentsSection from "./commonComponents/ContentsSection";

class AddReward extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            coin: ''
        }        
    }

    clearText = () => {    
        this.setState({
            title: '',
            description: '',
            coin: ''                     
        })
    }

    sendData = async() => {   
        let reward = this.state;        
        let arr = this.props.rewardarr
       
        if (arr) {
            this.props.savereward([...arr, reward])
        }
        else {
            this.props.savereward([reward])
        }
        
        let token = '';
        await AsyncStorage.getItem('token', (err, result) => {
            token = result
        })
        let header = new Headers();
        header.append('Cookie', token)
        header.append('Content-Type', 'application/json')

        const myInit = {
            method : 'POST',
            body: JSON.stringify(reward),
            headers : header,
            Cookie : token
        }

        fetch(`${fakeserver}/rewards`, myInit)
        .then(res => res.json())
        .then(res => console.log('Success : ', JSON.stringify(res)))
        .catch(error => console.error('Error : ', error));
    }
    
    render() {
        return (
            <View style={styles.mainContainer}>

                <ContentsSection 
                    titleDefaultValue={this.state.title}
                    onChangeTitle={(text) =>                         
                        { this.setState({ title: text })
                    }}
                    onChangeContents={(text) =>                         
                        { this.setState({ description: text })
                    }}
                    TextAreaDefaultValue={this.state.description}
                    category={'Reward'}
                />

                <CoinSection coin={this.state.coin}
                    onPressFunction={(coin) => 
                        { this.setState({ coin: coin })
                    }} 
                />

                <View style={styles.ButtonContainer}>
                    <AddOrModifyButton addOrModify='add'
                    func={this.sendData} category='Reward'
                    navigation={this.props.navigation}/>

                    <ResetButton clearText={this.clearText} /> 
                    
                </View>

            </View>
        )
    }
}

// store 조회
const mapStateToProps = (state) => {  
    return {
      rewardarr : state.rewardreducer.rewardarr
    }
}  

// store 변경
const mapDispatchToProps = dispatch => {
    return {      
      savereward : (arr) => {
        dispatch(savereward(arr));
      },
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(AddReward);