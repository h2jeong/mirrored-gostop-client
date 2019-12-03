import { combineReducers } from 'redux';
// tslint:disable-next-line: ordered-imports
import additem from './AddHead';
import additem2 from './AddPants';
import additem1 from './AddTop';
// tslint:disable-next-line: ordered-imports
import changepointreducer from './ChangePointReducer';
// tslint:disable-next-line: ordered-imports
import datereducer from './DateReducer';
// tslint:disable-next-line: ordered-imports
import getuserreducer from './GetuserReducer';
import habitreducer from './HabitReducer';
import changeReducer from './Itemchange';
import changeReducer1 from './Itemchange1';
import changeReducer2 from './Itemchange2';
import passhabitreducer from './PasshabitReducer';
// tslint:disable-next-line: ordered-imports
import rewardreducer from './RewardReducer';
import todosreducer from './TodosReducer';
import datereducer from './DateReducer';
import StartDateReducer from './StartDateReducer'
import EndDateReducer from './EndDateReducer'


export default combineReducers({
  changeReducer,
  changeReducer1,
  changeReducer2,
  changepointreducer,
  todosreducer,
  passhabitreducer,
  getuserreducer,
  habitreducer,
  rewardreducer,
  datereducer,
  additem,
  additem1,
  additem2,
  StartDateReducer,
  EndDateReducer

});

// StartDateReducer, EndDateReducer 추가로 combine