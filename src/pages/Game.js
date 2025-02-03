/* eslint-disable react-hooks/exhaustive-deps */
import React from "react"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Unity, useUnityContext } from "react-unity-webgl";
import Loading from "../components/Loading";

export default function Game() {
    const navigate = useNavigate()

    useEffect(() => {
        const phone = localStorage.getItem("phone")
        if (!phone) {
            navigate("/")
        }
    }, [])

    const {
      unityProvider,
      isLoaded,
      sendMessage,
      UNSAFE__detachAndUnloadImmediate,
    } = useUnityContext({
      loaderUrl: "./unity/Rummi_Built.loader.js",
      dataUrl: "./unity/Rummi_Built.data.unityweb",
      frameworkUrl: "./unity/Rummi_Built.framework.js.unityweb",
      codeUrl: "./unity/Rummi_Built.wasm.unityweb",
    });

    useEffect(() => {
        if (isLoaded) {
            const query = new URLSearchParams(window.location.search);
            const code = query.get('code')
            if (code)
                sendMessage("WebCommunication", "CreatePublicRoom", "" + code);
            setTimeout(() => {
                if (code)
                    sendMessage("WebCommunication", "CreatePublicRoom", "" + code);
            }, 3000);
        }
    }, [isLoaded])

    useEffect(function () {
        return async function () {
            if (isLoaded) {
                await UNSAFE__detachAndUnloadImmediate()
            }
        };
    }, [UNSAFE__detachAndUnloadImmediate]);

    return (<div style={{ backgroundColor: "#21002e" }}>
        {!isLoaded && <Loading />}
        <Unity unityProvider={unityProvider} />
    </div>);
}
