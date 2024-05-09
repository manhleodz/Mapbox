const initMap = new init_map();

const map = initMap.map;

const handleMap = new handle_map(map);
handleMap.handle_navigate();

const customController = new custom_controller(map);
customController.handActivities();