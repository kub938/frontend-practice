const search_ClientId = 'nBcrF_omljd_AL2WOV0n'
const search_Secret = 'QuroIWuHzI'
var keyword = '검색어';


axios.get("https://openapi.naver.com/v1/search/local.json?query=대전역", {
    headers: {

        'X-Naver-Client-Id': search_ClientId,
        'X-Naver-Client-Secret': search_Secret,
    }
})
    .then(res => {
        console.log()("응답", res.data);
    })
    .catch(e => {
        console.log("에러", e);
    })


var map = new naver.maps.Map('map', {
    center: new naver.maps.LatLng(37.3595704, 127.105399),
    zoom: 10
});

naver.maps.Event.addListener(map, 'mousemove', function (e) {
    console.log('마우스 포인터 위치 : ' + e.coord);
});

// 마우스 클릭 이벤트 핸들러
naver.maps.Event.addListener(map, 'click', function (e) {
    console.log('마우스 클릭 위치 : ' + e.coord);
});

var search = new naver.maps.places.Search();

// 식당 검색 이벤트 핸들러
function searchRestaurant(query) {
    search.search(query, function (status, response) {
        if (status === naver.maps.Service.Status.ERROR) {
            console.log('검색 결과가 없습니다.');
            return;
        }

        var items = response.result.items;
        var markers = [];

        for (var i = 0, len = items.length; i < len; i++) {
            var item = items[i];
            var marker = new naver.maps.Marker({
                position: new naver.maps.LatLng(item.point.y, item.point.x),
                map: map
            });

            markers.push(marker);

            var infoWindow = new naver.maps.InfoWindow({
                content: '<h4>' + item.title + '</h4><p>' + item.address + '</p>'
            });

            naver.maps.Event.addListener(marker, 'click', function (e) {
                infoWindow.open(map, e.overlay);
            });
        }

        map.panTo(markers[0].getPosition());
    });
}

// 검색 버튼 클릭 이벤트 핸들러
document.getElementById('searchBtn').addEventListener('click', function () {
    var query = document.getElementById('queryInput').value;
    searchRestaurant(query);
});


