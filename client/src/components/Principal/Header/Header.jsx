import React, { Component } from "react";
import { connect } from "react-redux";
import style from "./Header.module.css";
import { NavLink } from "react-router-dom";
import {
  getRecipesByName,
  getRecipesBackend,
  resetRecipes,
} from "../../../redux/actions";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
    };
  }

  changeHandler = (e) => {
    this.setState({ ...this.state, inputValue: e.target.value });
  };

  searchSubmit = (e) => {
    e.preventDefault();

    if (!!this.state.inputValue) {
      this.props.getRecipesByName(this.state.inputValue);

      this.props.history.push("/recipes");
    }
  };

  returnHome = (e) => {
    e.preventDefault();

    this.props.newRecipeCreate
      ? this.props.getRecipesBackend()
      : this.props.resetRecipes();

    this.props.history.push("/");
  };

  returnPaginate = (e) => {
    e.preventDefault();

    this.props.newRecipeCreate
      ? this.props.getRecipesBackend()
      : this.props.resetRecipes();

    this.props.history.push("/recipes");
  };

  handleClick = (e) => {
    e.preventDefault();
    this.props.getRecipesByName();
    window.location.reload(); // Si quiero recargar la página y limpiar todos los select, esta es una opción.
  };
  render() {
    return (
      <div className={style.header}>
        <img
          onClick={this.returnHome}
          className={style.logo}
          src="https://i.postimg.cc/BQvPbT8J/food-removebg-preview.png"
          alt="logo"
        />
        {/* BOTON PARA REFRESCAR */}
        <div>
          <button className={style.btnReload} onClick={this.handleClick}>
            RELOAD
          </button>
        </div>
        <div className={style.inputsContainer}>
          {this.props.location.pathname === "/recipes/create" ? (
            <button
              onClick={this.returnPaginate}
              className={style.buttonCreate}
            >
              Volver
            </button>
          ) : (
            <>
              <NavLink style={{ textDecoration: "none" }} to="/recipes/create">
                <button className={style.buttonCreate}>Crear Receta</button>
              </NavLink>
              <form onSubmit={this.searchSubmit} className={style.search}>
                <input
                  value={this.state.inputValue}
                  onChange={this.changeHandler}
                  type="text"
                  name="text"
                  className={style.input}
                  placeholder="Buscar Recetas"
                />

                <input
                  className={style.buttonCreate}
                  value={"Buscar"}
                  type="submit"
                />
              </form>
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { newRecipeCreate: state.newRecipeCreate };
};

const mapDispatchToProps = (dispatch) => ({
  getRecipesByName: (name) => dispatch(getRecipesByName(name)),
  resetRecipes: () => dispatch(resetRecipes()),
  getRecipesBackend: () => dispatch(getRecipesBackend()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

/* */
