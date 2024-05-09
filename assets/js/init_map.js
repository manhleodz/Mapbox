class init_map {
    constructor() {
        mapboxgl.accessToken = "pk.eyJ1IjoiaGF1c3VyYSIsImEiOiJjbHZ1cmNvZW8xbzZ2MmptZzc1aWhmOHcwIn0.cdeEUNXMyKRO73ILEEuUsQ";
        const map = new mapboxgl.Map({
            container: "map", // container ID
            style: 'mapbox://styles/mapbox/satellite-v9',
            center: [106.9230, 16.84769],
            zoom: 3, // starting zoom
            hash: 'map',
            // attributionControl: false,
            // renderWorldCopies: false,
            projection: 'mercator'
        });

        var vietnameBoundary = './boundaries/geoBoundaries-VNM-ADM1.geojson'

        // Vẽ đường biên
        function addDataBoundary() {
            map.addSource('country-boundary', {
                type: 'geojson',
                data: vietnameBoundary
            });

            // Thêm lớp ranh giới
            map.addLayer({
                id: 'country-boundary-layer',
                type: 'line',
                source: 'country-boundary',
                paint: {
                    'line-color': 'yellow',
                    'line-width': 1
                }
            });

        }

        map.on('style.load', () => {
            map.setConfigProperty('basemap', 'lightPreset', 'dusk');
        });

        map.on("load", (e) => {

            addDataBoundary();
            map.flyTo({
                center: [106.85508306716277, 16.722048835190567],
                zoom: 5, // starting zoom
            });

        });

        this.map = map;
    }

    // initiallize() {
    //     mapboxgl.accessToken = "pk.eyJ1IjoiaGF1c3VyYSIsImEiOiJjbHZ1cmNvZW8xbzZ2MmptZzc1aWhmOHcwIn0.cdeEUNXMyKRO73ILEEuUsQ";
    //     const map = new mapboxgl.Map({
    //         container: "map", // container ID
    //         style: 'mapbox://styles/mapbox/satellite-v9',
    //         center: [106.9230, 16.84769],
    //         zoom: 3, // starting zoom
    //         hash: 'map',
    //         // attributionControl: false,
    //         // renderWorldCopies: false,
    //         projection: 'mercator'
    //     });

    //     var vietnameBoundary = './boundaries/geoBoundaries-VNM-ADM1.geojson'

    //     // Vẽ đường biên
    //     function addDataBoundary() {
    //         map.addSource('country-boundary', {
    //             type: 'geojson',
    //             data: vietnameBoundary
    //         });

    //         // Thêm lớp ranh giới
    //         map.addLayer({
    //             id: 'country-boundary-layer',
    //             type: 'line',
    //             source: 'country-boundary',
    //             paint: {
    //                 'line-color': 'yellow',
    //                 'line-width': 1
    //             }
    //         });

    //     }

    //     map.on('style.load', () => {
    //         map.setConfigProperty('basemap', 'lightPreset', 'dusk');
    //     });

    //     map.on("load", (e) => {

    //         addDataBoundary();
    //         map.flyTo({
    //             center: [106.85508306716277, 16.722048835190567],
    //             zoom: 5, // starting zoom
    //         });

    //     });

    //     this.map = map;
    // }
}

