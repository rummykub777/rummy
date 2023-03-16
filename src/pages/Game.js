import React from "react"
import { Unity, useUnityContext } from "react-unity-webgl";

export default function Home() {
    const { unityProvider } = useUnityContext({
        loaderUrl: "build/rummy.loader.js",
        dataUrl: "build/rummy.data",
        frameworkUrl: "build/rummy.framework.js",
        codeUrl: "build/rummy.wasm",
    });
    return <Unity unityProvider={unityProvider} style={{ width: "100wh", height: "100vh" }} />;
}
