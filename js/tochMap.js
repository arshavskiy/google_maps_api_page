function initialize(map) {
    navigator.geolocation.getCurrentPosition(function (position) {

        let lat = position.coords.latitude;
        let lng = position.coords.longitude;

        let mapLatLng = new google.maps.LatLng(lat, lng);

        map.setCenter(mapLatLng);
        map.setZoom(14);

        google.maps.event.addListener(map, 'click', function (event) {
            addMarker(event.latLng, map, 'נקודה הוספה' ,image_mission);
        });

        addMarker(mapLatLng, map, 'אתה פה');
    });
}


function addMarker(location, map, label, icon) {
    let marker = new google.maps.Marker({
        position: location,
        // label: labels[labelIndex++ % labels.length],
        // label: label,
        map: map,
        icon: icon,
    });

    if (typeof location == 'object'){
        printCordinates(location.lat, location.lng, label, map);
    } else {
        printCordinates(location.lat(), location.lng(), label, map);
    }
}


function addMarkerToMap(map, label) {

    // add to mission gps
    navigator.geolocation.getCurrentPosition(function (position) {

        let lat = position.coords.latitude;
        let lng = position.coords.longitude;

        let mapLatLng = new google.maps.LatLng(lat, lng);

        map.setCenter(mapLatLng);
        map.setZoom(15);

        addMarker(mapLatLng, map, label, image_mission);
    });

//  Add Random cordinates
    // let mapLatLng;
    // if (!pos){
    //     myPosition = {
    //         lat: function () {
    //             return (Math.random() / 100) + 32.085;
    //         },
    //         lng: function () {
    //             return (Math.random() / 100) + 34.771;
    //         }
    //     }
    //     mapLatLng = new google.maps.LatLng(myPosition.lat(), myPosition.lng());
    // } else {
    //     mapLatLng = new google.maps.LatLng(pos.lat, pos.lng);
    // }

    // map.setCenter(mapLatLng);
    // map.setZoom(15);
    // let marker = new google.maps.Marker({
    //     position: mapLatLng,
    //     animation: google.maps.Animation.DROP,
    //     map: map,
    //     icon: image_mission,
    // });
    // printCordinates(mapLatLng.lat(), mapLatLng.lng(), name);
}


function printCordinates(latS, lngS, label, map) {
    let print_cordinates;

    if (label){

        $('<li/>')
        .html(`<label class="label_icon"><div class="icon_span"><img src="${image_pokemon}" class="padding"><b>${label}</b></div></<label>`)
        .appendTo('ul.cordinatedList');

        let li = $('ul.cordinatedList li');
        li = li[li.length-1]
        li.addEventListener('click', function (e) {

            map.setCenter({
                lat: (function(){
                    if (typeof latS == 'function'){
                        return latS()
                    } else return latS
                })(),
                lng: (function(){
                    if (typeof lngS == 'function'){
                        return lngS()
                    } else return lngS
                })(),
            });
            map.setZoom(16);
        });
    }

    if (typeof latS == 'number'){
        print_cordinates = '('+latS.toFixed(7) + '°' + ' : ' + lngS.toFixed(7) + '°)';
    } else {
        print_cordinates = '('+latS().toFixed(7) + '°' + ' : ' + lngS().toFixed(7) + '°)';
    }
   
}

function addSavedLocations(pos, map) {
   
        for (let i = 0; i < pos.length; i++) {
          setTimeout(function() {
            addMarker(pos[i], map, pos[i].label, image_pokemon);
          }, i * 100);
        }
}

function init() {
    let labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let labelIndex = 0;

    let map = new google.maps.Map(document.getElementById('map-canvas'),{ styles: retro});
    image = 'https://raw.githubusercontent.com/arshavskiy/google_maps_api_page/testing/icons/sun.png';
    image_pokemon = 'https://raw.githubusercontent.com/arshavskiy/google_maps_api_page/testing/icons/004-pokeball.png';
    image_mission = 'https://raw.githubusercontent.com/arshavskiy/google_maps_api_page/testing/icons/003-insignia.png';

    let MyPlace;
    let $findMeBtn = $('.find-me');

    google.maps.event.addDomListener(window, 'load', initialize(map));

    $findMeBtn.on('click', function (e) {
        e.preventDefault();
        let inputLabel = $('#labelName').val();
        addMarkerToMap(map, inputLabel);
    });

    addSavedLocations(locations, map);
}

init();