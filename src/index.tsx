import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {LangContextProvider} from "./store/langContext";
import {SidebarProvider} from "./store/sidebarContext";
import {ThemeContextProvider} from "./store/themeContext";
import {LoginContextProvider} from "./store/loginContext";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";

ReactDOM.render(
    <LangContextProvider>
        <LoginContextProvider>
            <ThemeContextProvider>
                <SidebarProvider>
                    <DevSupport ComponentPreviews={ComponentPreviews}
                                useInitialHook={useInitial}
                    >
                        <App/>
                    </DevSupport>
                </SidebarProvider>
            </ThemeContextProvider>
        </LoginContextProvider>
    </LangContextProvider>,
    document.getElementById("root")
);
