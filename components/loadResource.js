import { useEffect, useState } from "react";
import * as Font from "expo-font";

export default function useCachedResources() {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const [table, setTable] = useState(null)

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await Font.loadAsync({
            "Gmarket_B": require('../assets/fonts/GmarketSansTTFBold.ttf'),
            "Gmarket_M": require('../assets/fonts/GmarketSansTTFMedium.ttf'),
            "Gmarket_L": require('../assets/fonts/GmarketSansTTFLight.ttf'),
        });
        var res = await fetch("http://35.221.213.98:3000/api/getSc", { method: "GET" })
        res = await res.json()
        setTable(res.result)
      } catch (e) {
        console.warn(e);
      } finally {
        setIsLoadingComplete(true);
      }
    }
    loadResourcesAndDataAsync();
  }, [isLoadingComplete]);
  return [isLoadingComplete, table];
}