import React, { useContext, useMemo, useReducer, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const initialState = {  isPause:false, isStart:false, atleta:["Atleta 1", "Atleta 2"] };
const InfoContext = createContext(initialState);
export const Context = ({ children }) => {

  const reducer = (prevState, action) => {
    switch (action.type) {
      
      case 'start':
        return{
          ...prevState, 
          isStart:true,
          
        }
      case 'stop':
        return{
          ...prevState, 
          isStart:false,
          isPause:false,
        }

      case 'tooglePause':
        return{
          ...prevState, 
          isPause:!prevState.isPause,
        }
      case 'setNames':
        return{
          ...prevState, 
          atleta:[...action.payload]
        }


      default:
        return { ...prevState };
    }
  };
  const [states, dispatch] = useReducer(reducer, initialState);
  const actions = useMemo(() => ({
    toogleDialog : (visible) => dispatch({type:'toogleDialog', payload:visible}),
    start:()=>{dispatch({ type: 'start' })},
    stop:()=>{dispatch({ type: 'stop' })},
    pause:()=>{dispatch({ type: 'tooglePause' })},
    setNames:(names)=>{dispatch({ type: 'setNames', payload:names })}

  }),[]);
  return (
    <InfoContext.Provider value={[states, actions]}>
      {children}
    </InfoContext.Provider>
  );
};

export const useInfo = () => useContext(InfoContext);
