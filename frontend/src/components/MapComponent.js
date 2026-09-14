import { useEffect } from "react";
import { Map, MapStyle, config, Marker, Popup } from "@maptiler/sdk";

export const MapComponent = ({ coordinates, title, location }) => {

    useEffect(() => {
        if (!Array.isArray(coordinates) || coordinates.length !== 2) {
            return;
        }

        config.apiKey = process.env.REACT_APP_MAPTILER_KEY;

        const map = new Map({
            container: "map",
            style: MapStyle.BRIGHT,
            center: coordinates,
            zoom: 10
        });

        new Marker()
            .setLngLat(coordinates)
            .setPopup(
                new Popup({
                    offset: 25,
                    className: "campground-popup"
                }).setHTML(`
            <h3>${title}</h3>
            <p>${location}</p>
        `)
            )
            .addTo(map);

        return () => map.remove();
    }, [coordinates, title, location]);

    if (!Array.isArray(coordinates)) {
        return null;
    }

    return (
        <div id="map" className="w-full h-96"></div>
    );
};