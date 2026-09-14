import { useEffect } from "react";
import { Map, MapStyle, config, Popup } from "@maptiler/sdk";

export const CampgroundMap = ({ campgrounds }) => {

    useEffect(() => {
        if (!campgrounds?.length) {
            return;
        }

        config.apiKey = process.env.REACT_APP_MAPTILER_KEY;

        const geoJson = {
            type: "FeatureCollection",
            features: campgrounds
                .filter(campground => campground.geometry?.coordinates)
                .map(campground => ({
                    type: "Feature",
                    geometry: campground.geometry,
                    properties: {
                        id: campground._id,
                        title: campground.title,
                        location: campground.location,
                        popUpMarkup: campground.properties?.popUpMarkup
                    }
                }))
        };

        const map = new Map({
            container: "campground-map",
            style: MapStyle.BRIGHT,
            center: [-103.59179687498357, 40.66995747013945],
            zoom: 3
        });

        map.on("load", () => {

            map.addSource("campgrounds", {
                type: "geojson",
                data: geoJson,
                cluster: true,
                clusterMaxZoom: 14,
                clusterRadius: 50
            });

            map.addLayer({
                id: "clusters",
                type: "circle",
                source: "campgrounds",
                filter: ["has", "point_count"],
                paint: {
                    "circle-color": [
                        "step",
                        ["get", "point_count"],
                        "#00BCD4",
                        10,
                        "#2196F3",
                        30,
                        "#3F51B5"
                    ],
                    "circle-radius": [
                        "step",
                        ["get", "point_count"],
                        15,
                        10,
                        20,
                        30,
                        25
                    ]
                }
            });

            map.addLayer({
                id: "cluster-count",
                type: "symbol",
                source: "campgrounds",
                filter: ["has", "point_count"],
                layout: {
                    "text-field": "{point_count_abbreviated}",
                    "text-font": [
                        "DIN Offc Pro Medium",
                        "Arial Unicode MS Bold"
                    ],
                    "text-size": 12
                }
            });

            map.addLayer({
                id: "unclustered-point",
                type: "circle",
                source: "campgrounds",
                filter: ["!", ["has", "point_count"]],
                paint: {
                    "circle-color": "#11b4da",
                    "circle-radius": 4,
                    "circle-stroke-width": 1,
                    "circle-stroke-color": "#fff"
                }
            });

            // Click cluster
            map.on("click", "clusters", async (e) => {

                const features = map.queryRenderedFeatures(e.point, {
                    layers: ["clusters"]
                });

                const clusterId = features[0].properties.cluster_id;

                const zoom = await map
                    .getSource("campgrounds")
                    .getClusterExpansionZoom(clusterId);

                map.easeTo({
                    center: features[0].geometry.coordinates,
                    zoom
                });
            });

            // Click campground
            map.on("click", "unclustered-point", (e) => {

                const feature = e.features[0];

                const coordinates =
                    feature.geometry.coordinates.slice();

                // Handle world copies
                while (
                    Math.abs(e.lngLat.lng - coordinates[0]) > 180
                ) {
                    coordinates[0] +=
                        e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                const { popUpMarkup } = feature.properties;

                new Popup()
                    .setLngLat(coordinates)
                    .setHTML(popUpMarkup)
                    .addTo(map);
            });

            // Cluster cursor
            map.on("mouseenter", "clusters", () => {
                map.getCanvas().style.cursor = "pointer";
            });

            map.on("mouseleave", "clusters", () => {
                map.getCanvas().style.cursor = "";
            });
        });

        return () => map.remove();

    }, [campgrounds]);

    return (
        <div
            id="campground-map"
            className="w-full h-96"
        ></div>
    );
};
