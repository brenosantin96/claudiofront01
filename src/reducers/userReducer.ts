import { reducerActionType } from '../types/reducerActionType';
import {userType} from '../types/UserType';

interface userInterface {
    id : number,
    email: string,
    password: string,
    isAdmin: boolean,
    token: string
  }

export const userInitialState: userInterface = {
    email: 'teste@gmail.com',
    id: 999,
    password: '999',
    isAdmin: false,
    token: ''
}

export const userReducer = (state: userType, action: reducerActionType) => {

    switch(action.type){
        case 'CHANGE_NAME':
            return {...state, name: action.payload.name};    
        break;
        case 'CHANGE_AGE':
            return {...state, age: action.payload.age};    
        break;
        
    }


    return state;
}


