import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {SidebarContextProvider} from "./store/sidebarContext";
import {LangContextProvider} from "./store/langContext";
import {ThemeContextProvider} from "./store/themeContext";
import {LoginContextProvider} from "./store/loginContext";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";

ReactDOM.render(
    <LangContextProvider>
        <LoginContextProvider>
            <ThemeContextProvider>
                <SidebarContextProvider>
                    <DevSupport ComponentPreviews={ComponentPreviews}
                                useInitialHook={useInitial}
                    >
                        <App/>
                    </DevSupport>
                </SidebarContextProvider>
            </ThemeContextProvider>
        </LoginContextProvider>
    </LangContextProvider>,
    document.getElementById("root")
);
