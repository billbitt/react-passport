// import dependencies 
import React from "react";
import ReactDom from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

// import components 
import HomePage from "./components/HomePage.jsx";

// render the components
const App = () => {
    return (
        <MuiThemeProvider>
                <HomePage />
        </MuiThemeProvider>
    )
};

ReactDom.render(<App />, document.getElementById("react-app"));

