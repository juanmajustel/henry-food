import React from "react";
import style from "./Empty.module.css";

class Empty extends React.Component {
  render() {
    return (
      <div className={style.empty}>
        <h2>¡Lo siento, la receta buscada no esta disponible!</h2>
      </div>
    );
  }
}

export default Empty;
