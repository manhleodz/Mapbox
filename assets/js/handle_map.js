class handle_map {
    constructor(map) {
        this.map = map;
        // this.initiallize();
        this._coordinates = null;
    }

    handle_navigate() {

        //Hide box chat
        document.getElementById("hide-box").addEventListener('click', function () {
            document.getElementById("box-chat").style.display = "none";
            document.getElementById("open-btn").style.display = "block";
        });

        //open box chat
        document.getElementById("open-btn").addEventListener('click', function () {
            document.getElementById("box-chat").style.display = "block";
            document.getElementById("open-btn").style.display = "none";
        });

        // Voice
        const synth = window.speechSynthesis;

        function voiceControl(string) {
            let u = new SpeechSynthesisUtterance(string);
            u.text = string;
            u.lang = "en-aus";
            u.volume = 1;
            u.rate = 1;
            u.pitch = 1;
            synth.speak(u);
        }

        // Tạo một danh sách để lưu trữ các marker và popup
        var markers = [];
        var popups = [];
        //reload box chat
        function resetMessageList() {
            var messageList = document.getElementById('list_message');
            messageList.innerHTML = '';
            // Xóa tất cả các popup và marker
            markers.forEach(function (marker) {
                marker.remove();
            })

            popups.forEach(function (popup) {
                popup.remove();
            })
        }

        // buttom zoom map
        const navigationCtr = new mapboxgl.NavigationControl({
            showCompass: true,
            showZoom: true,
            visualizePitch: false,
        });

        map.addControl(navigationCtr, "top-right");

        const geoCtr = new mapboxgl.GeolocateControl({
            fitBoundsOptions: {
                maxZoom: 15,
            },
            showAccuracyCircle: false,
            trackUserLocation: true,
            showUserHeading: true,
            showUserLocation: true,
        });

        map.addControl(geoCtr, "top-right");
        map.addControl(new mapboxgl.FullscreenControl());

        //Search address
        function handleSearch(address) {
            var geocoderUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + mapboxgl.accessToken;

            fetch(geocoderUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    var result = data.features[0];
                    var coordinates = result.center;
                    // Di chuyển bản đồ đến tọa độ
                    map.flyTo({
                        center: coordinates,
                        zoom: 12
                    });

                    console.log(result);

                    // Tạo marker
                    var marker = new mapboxgl.Marker()
                        .setLngLat(coordinates)
                        .addTo(map);

                    const markerHeight = 50;
                    const markerRadius = 10;
                    const linearOffset = 25;
                    const popupOffsets = {
                        'top': [0, 0],
                        'top-left': [0, 0],
                        'top-right': [0, 0],
                        'bottom': [0, -markerHeight],
                        'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
                        'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
                        'left': [markerRadius, (markerHeight - markerRadius) * -1],
                        'right': [-markerRadius, (markerHeight - markerRadius) * -1]
                    };

                    const openMoreInfo = () => {
                        const moreInfo = new more_info(result);
                        moreInfo.show();
                    }
                    const popup = new mapboxgl.Popup({ offset: popupOffsets, className: 'my-class' })
                        .setLngLat(coordinates)
                        .setHTML(`
                            <div class="w-full h-full">
                                <h1 class="text-lg w-full break-words">${result.place_name}</h1>
                                <h1 class="break-words">${JSON.stringify(result).slice(200)}</h1>
                                <span onclick="openMoreInfo()" class="text-blue-500 underline-offset-1 hover:text-blue-600 cursor-pointer">Hiển thị thêm</span>
                            </div>
                        `)
                        .setMaxWidth("400px")
                        .addTo(map);
                    popups.push(popup);

                    // Thiết lập popup cho marker
                    marker.setPopup(popup);

                    // Mở popup khi marker được nhấp
                    marker.getElement().addEventListener('click', function () {
                        marker.togglePopup();
                    });

                    markers.push(marker);
                    if (localStorage.getItem("voice") && localStorage.getItem("voice") == "true") {
                        voiceControl(result.place_name);
                    }

                    var divItem = document.createElement('div');
                    divItem.className = 'w-full';
                    divItem.innerHTML = `
                            <div class=" flex items-center space-x-2 justify-start w-full mb-1"><img
                                    src="https://vpi.pvn.vn/wp-content/uploads/2020/07/VPI_logo.png"
                                    class=" w-8 h-8 rounded-full object-cover">
                                <h1 class=" p-2 rounded-2xl text-black bg-gray-300 text-[14.5px] break-words"
                                    style="max-width: 230px;">${result.place_name}</h1>
                            </div>
                    `;
                    document.getElementById('list_message').appendChild(divItem);
                    var messageContainer = document.getElementById('list_message');
                    messageContainer.scrollTop = messageContainer.scrollHeight;

                })
                .catch(function (error) {
                    console.log('Error:', error);
                });
        }

        let form_chat = document.getElementById("form_chat");
        form_chat.addEventListener("submit", (e) => {
            e.preventDefault();

            // document.addEventListener("DOMContentLoaded", () => {
            const inputField = document.getElementById("input");

            // inputField.addEventListener("keydown", function (e) {
            //   if (e.code === "Enter") {
            let input = inputField.value.trim();

            if (input != "") {
                var divItem = document.createElement('div');
                divItem.className = 'w-full';
                divItem.innerHTML = `
                    <div class="flex items-center justify-end w-full mb-1 space-x-2">
                    <h1 class="p-2 rounded-2xl text-white bg-blue-500 text-[14.5px] break-words" style="max-width: 230px;">${input}</h1>
                    </div>
                `;
                document.getElementById('list_message').appendChild(divItem);
                var messageContainer = document.getElementById('list_message');
                messageContainer.scrollTop = messageContainer.scrollHeight;
                handleSearch(input);
            }
            inputField.value = "";

            document.getElementById('reload').addEventListener('click', function () {
                resetMessageList();
            });

        })
    }
}