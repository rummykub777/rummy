import React from "react"
import { Unity, useUnityContext } from "react-unity-webgl";

export default function Home() {
    const { unityProvider } = useUnityContext({
        loaderUrl: "./unity/my.loader.js",
        dataUrl: "./unity/my.data.unityweb",
        frameworkUrl: "./unity/my.framework.js.unityweb",
        codeUrl: "./unity/my.wasm.unityweb",
    });

    return (

        <Unity unityProvider={unityProvider} />

    );
}
