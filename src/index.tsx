import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {LangContextProvider} from "./store/langContext";
import {SidebarProvider} from "./store/sidebarContext";
import {ThemeContextProvider} from "./store/themeContext";
import {LoginContextProvider} from "./store/loginContext";
import {DevSupport} from "@react-buddy/ide-toolbox";
import ActiveEmployees from "./pages/Employees/ActiveEmployees";

ReactDOM.render(
    <LangContextProvider>
        <LoginContextProvider>
            <ThemeContextProvider>
                <SidebarProvider>
                        <App/>
                </SidebarProvider>
            </ThemeContextProvider>
        </LoginContextProvider>
    </LangContextProvider>,
    document.getElementById("root")
);
