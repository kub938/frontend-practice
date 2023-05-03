

var mapOptions = {
    center: new naver.maps.LatLng(37.35, 127, 10), zoom: 20
};

var map = new naver.maps.Map('map', mapOptions);

// 클릭위치에 마커표시, 마우스 오른쪽 버튼 클릭시 정보 레이어 표시-----------------------
var map = new naver.maps.Map('map', {
    zoom: 5,
    center: new naver.maps.LatLng(37.3614483, 127.1114883)
});

var markerList = [];
var menuLayer = $('<div style="position:absolute;z-index:10000;background-color:#fff;border:solid 1px #333;padding:10px;display:none;"></div>');

map.getPanes().floatPane.appendChild(menuLayer[0]);


naver.maps.Event.addListener(map, 'click', function (e) {
    var marker = new naver.maps.Marker({
        position: e.coord,
        map: map
    });

    markerList.push(marker);
});

naver.maps.Event.addListener(map, 'keydown', function (e) {
    var keyboardEvent = e.keyboardEvent,
        keyCode = keyboardEvent.keyCode || keyboardEvent.which;

    var ESC = 27;

    if (keyCode === ESC) {
        keyboardEvent.preventDefault();

        for (var i = 0, ii = markerList.length; i < ii; i++) {
            markerList[i].setMap(null);
        }

        markerList = [];

        menuLayer.hide();
    }
});

naver.maps.Event.addListener(map, 'mousedown', function (e) {
    menuLayer.hide();
});

naver.maps.Event.addListener(map, 'rightclick', function (e) {
    var coordHtml =
        'Coord: ' + '(우 클릭 지점 위/경도 좌표)' + '<br />' +
        'Point: ' + e.point + '<br />' +
        'Offset: ' + e.offset;

    menuLayer.show().css({
        left: e.offset.x,
        top: e.offset.y
    }).html(coordHtml);

    console.log('Coord: ' + e.coord.toString());
});

//----------------------------------------------------------
// 마우스 클릭 옮기기
var position = new naver.maps.LatLng(37.3595704, 127.105399);

var map = new naver.maps.Map('map', {
    center: position,
    zoom: 15
});

var marker = new naver.maps.Marker({
    position: position,
    map: map
});

naver.maps.Event.addListener(map, 'click', function (e) {
    marker.setPosition(e.coord);
});

//---------------------------------------------------------
//정보창 표시하기(핀 이동, 핀의 좌표에 대한 정보)
// var HOME_PATH = window.HOME_PATH || '.';
// var cityhall = new naver.maps.LatLng(37.5666805, 126.9784147),
//     map = new naver.maps.Map('map', {
//         center: cityhall,
//         zoom: 15
//     }),
//     marker = new naver.maps.Marker({
//         map: map,
//         position: cityhall
//     });

// var contentString = [
//     '<div class="iw_inner">',
//     '   <h3>서울특별시청</h3>',
//     '   <p>서울특별시 중구 태평로1가 31 | 서울특별시 중구 세종대로 110 서울특별시청<br />',
//     '       <img src="' + HOME_PATH + '/img/example/hi-seoul.jpg" width="55" height="55" alt="서울시청" class="thumb" /><br />',
//     '       02-120 | 공공,사회기관 &gt; 특별,광역시청<br />',
//     '       <a href="http://www.seoul.go.kr" target="_blank">www.seoul.go.kr/</a>',
//     '   </p>',
//     '</div>'
// ].join('');

// var infowindow = new naver.maps.InfoWindow({
//     content: contentString,
//     maxWidth: 140,
//     backgroundColor: "#eee",
//     borderColor: "#2db400",
//     borderWidth: 5,
//     anchorSize: new naver.maps.Size(30, 30),
//     anchorSkew: true,
//     anchorColor: "#eee",
//     pixelOffset: new naver.maps.Point(20, -20)
// });

// naver.maps.Event.addListener(marker, "click", function (e) {
//     if (infowindow.getMap()) {
//         infowindow.close();
//     } else {
//         infowindow.open(map, marker);
//     }
// });


//------------------------------------------------------------
//주소와 좌표 검색 API 사용하기

// var map = new naver.maps.Map("map", {
//     center: new naver.maps.LatLng(37.3595316, 127.1052133),
//     zoom: 15,
//     mapTypeControl: true
// });

var infoWindow = new naver.maps.InfoWindow({
    anchorSkew: true
});

map.setCursor('pointer');

function searchCoordinateToAddress(latlng) {

    infoWindow.close();

    naver.maps.Service.reverseGeocode({
        coords: latlng,
        orders: [
            naver.maps.Service.OrderType.ADDR,
            naver.maps.Service.OrderType.ROAD_ADDR
        ].join(',')
    }, function (status, response) {
        if (status === naver.maps.Service.Status.ERROR) {
            return alert('Something Wrong!');
        }

        var items = response.v2.results,
            address = '',
            htmlAddresses = [];

        for (var i = 0, ii = items.length, item, addrType; i < ii; i++) {
            item = items[i];
            address = makeAddress(item) || '';
            addrType = item.name === 'roadaddr' ? '[도로명 주소]' : '[지번 주소]';

            htmlAddresses.push((i + 1) + '. ' + addrType + ' ' + address);
        }

        infoWindow.setContent([
            '<div style="padding:10px;min-width:200px;line-height:150%;">',
            '<h4 style="margin-top:5px;">검색 좌표</h4><br />',
            htmlAddresses.join('<br />'),
            '</div>'
        ].join('\n'));

        infoWindow.open(map, latlng);
    });
}

function searchAddressToCoordinate(address) {
    naver.maps.Service.geocode({
        query: address
    }, function (status, response) {
        if (status === naver.maps.Service.Status.ERROR) {
            return alert('Something Wrong!');
        }

        if (response.v2.meta.totalCount === 0) {
            return alert('totalCount' + response.v2.meta.totalCount);
        }

        var htmlAddresses = [],
            item = response.v2.addresses[0],
            point = new naver.maps.Point(item.x, item.y);

        if (item.roadAddress) {
            htmlAddresses.push('[도로명 주소] ' + item.roadAddress);
        }

        if (item.jibunAddress) {
            htmlAddresses.push('[지번 주소] ' + item.jibunAddress);
        }

        if (item.englishAddress) {
            htmlAddresses.push('[영문명 주소] ' + item.englishAddress);
        }

        infoWindow.setContent([
            '<div style="padding:10px;min-width:200px;line-height:150%;">',
            '<h4 style="margin-top:5px;">검색 주소 : ' + address + '</h4><br />',
            htmlAddresses.join('<br />'),
            '</div>'
        ].join('\n'));

        map.setCenter(point);
        infoWindow.open(map, point);
    });
}

function initGeocoder() {
    map.addListener('click', function (e) {
        searchCoordinateToAddress(e.coord);
    });

    $('#address').on('keydown', function (e) {
        var keyCode = e.which;

        if (keyCode === 13) { // Enter Key
            searchAddressToCoordinate($('#address').val());
        }
    });

    $('#submit').on('click', function (e) {
        e.preventDefault();

        searchAddressToCoordinate($('#address').val());
    });

    searchAddressToCoordinate('정자동 178-1');
}

function makeAddress(item) {
    if (!item) {
        return;
    }

    var name = item.name,
        region = item.region,
        land = item.land,
        isRoadAddress = name === 'roadaddr';

    var sido = '', sigugun = '', dongmyun = '', ri = '', rest = '';

    if (hasArea(region.area1)) {
        sido = region.area1.name;
    }

    if (hasArea(region.area2)) {
        sigugun = region.area2.name;
    }

    if (hasArea(region.area3)) {
        dongmyun = region.area3.name;
    }

    if (hasArea(region.area4)) {
        ri = region.area4.name;
    }

    if (land) {
        if (hasData(land.number1)) {
            if (hasData(land.type) && land.type === '2') {
                rest += '산';
            }

            rest += land.number1;

            if (hasData(land.number2)) {
                rest += ('-' + land.number2);
            }
        }

        if (isRoadAddress === true) {
            if (checkLastString(dongmyun, '면')) {
                ri = land.name;
            } else {
                dongmyun = land.name;
                ri = '';
            }

            if (hasAddition(land.addition0)) {
                rest += ' ' + land.addition0.value;
            }
        }
    }

    return [sido, sigugun, dongmyun, ri, rest].join(' ');
}

function hasArea(area) {
    return !!(area && area.name && area.name !== '');
}

function hasData(data) {
    return !!(data && data !== '');
}

function checkLastString(word, lastString) {
    return new RegExp(lastString + '$').test(word);
}

function hasAddition(addition) {
    return !!(addition && addition.value);
}
//----------------------------------------
//json파일에서 title, category, description 값을 가져와서 html 요소에 출력하는 코드
//위 코드에서 jsonFile 변수에는 불러올 JSON 파일의 경로를 입력하면 됩니다. XMLHttpRequest 객체를 이용하여 해당 JSON 파일을 비동기적으로 요청하고, 요청이 완료되면 onreadystatechange 이벤트 핸들러에서 readyState와 status 값을 확인하여 요청이 성공적으로 완료됐는지 검사합니다. 요청이 성공적으로 완료되면 responseText 프로퍼티에 담긴 JSON 문자열을 JSON.parse() 메소드를 이용하여 파싱하고, 파싱된 JSON 객체에서 title, category, description 값을 추출하여 각각 해당하는 HTML 요소의 textContent 프로퍼티에 할당합니다. 이렇게 하면 HTML 페이지에 title, category, description 값이 출력됩니다.
// naver.maps.onJSContentLoaded = initGeocoder;

// // JSON 파일 경로
// const jsonFile = '파일경로.json';

// // XMLHttpRequest 객체 생성
// const xhr = new XMLHttpRequest();
// xhr.onreadystatechange = function () {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//         // JSON 데이터 파싱
//         const data = JSON.parse(xhr.responseText);

//         // title, category, description 값 추출
//         const { title, category, description } = data;

//         // HTML 요소에 값 적용
//         document.getElementById('title').textContent = title;
//         document.getElementById('category').textContent = category;
//         document.getElementById('description').textContent = description;
//     }
// };
// xhr.open('GET', jsonFile, true);
// xhr.send();


var webSocket = new WebSocket("ws://localhost:9998");



socket.onopen = event => {
    const data = { name: "John", age: 30 };
    socket.send(JSON.stringify(data));
};

socket.onmessage = event => {
    const data = JSON.parse(event.data);
    console.log(data);
};