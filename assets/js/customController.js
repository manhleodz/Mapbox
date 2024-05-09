class custom_controller {
    constructor(map) {
        this.map = map;
    }

    handActivities() {
        let listener = {};
        listener["evtClickMap"] = evtClickMap.bind(this);

        function evtClickMap(e) {
            console.log(e);
        }

        map.on("click", listener["evtClickMap"]);
        map.on("moveend", (e) => {
            console.log(e);
        });
    }
}
