import React from 'react';
import preloader from '../../../assets/preloader.gif';

type PropsType ={
  
}

const Preloader: React.FC<PropsType>= (props) => {
  return <img alt="#" src={preloader} />;
};

export default Preloader;
