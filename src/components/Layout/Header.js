import React from "react";

//importing images
import coverPicture from '../../assets/coverpic.jpg';
import classes from './Header.module.css';
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
          <h1>ReactMeals</h1>
          <HeaderCartButton onClick={props.onShowCart}/>
      </header>
      <div className={classes['main-image']}>
          <img src={coverPicture} alt="greenveggie" />
      </div>
    </>
  );
};

export default Header;


//we cant write like this: {classes.main-image} as there is a hyphen between the class name.
//we write {classes['main-image']}