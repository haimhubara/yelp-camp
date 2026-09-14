import { useEffect } from "react";
import { UseTitle } from "../hooks/UseTitle";
import { Map, MapStyle, config, Marker } from "@maptiler/sdk";

export const HomePage = () => {
    UseTitle("Home");

    useEffect(() => {
        config.apiKey = process.env.REACT_APP_MAPTILER_KEY;

        const map = new Map({
            container: "map",
            style: MapStyle.STREETS,
            center: [16.62662018, 49.2125578],
            zoom: 14
        });

        new Marker()
            .setLngLat([16.62662018, 49.2125578])
            .addTo(map);

        return () => map.remove();
    }, []);

    return (
        <main>
            <div id="map" className="w-full h-96"></div>
        </main>
    );
};