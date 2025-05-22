var map;
var infowindow;
var currentMarker = null;
var markers = [];

// 서울 지역 역사적 장소
const seoulPlaces = [
  {
    name: "경복궁",
    latLng: new kakao.maps.LatLng(37.579617, 126.977041),
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Gyeongbokgung_Geunjeongjeon_2.jpg/1200px-Gyeongbokgung_Geunjeongjeon_2.jpg",
    desc: "조선 시대의 법궁으로 서울의 대표적인 고궁입니다.",
  },
  {
    name: "서대문형무소역사관",
    latLng: new kakao.maps.LatLng(37.5745, 126.9575),
    img: "https://www.sscmc.or.kr/resources/contents/image/04.jpg",
    desc: "일제강점기 독립운동가들이 수감되었던 역사적인 장소입니다.",
  },
  {
    name: "탑골공원",
    latLng: new kakao.maps.LatLng(37.5704, 126.9895),
    img: "https://upload.wikimedia.org/wikipedia/commons/0/02/Tapgol_Park.jpg",
    desc: "3.1 운동의 발상지로서 역사적 가치가 높은 공원입니다.",
  },
];

// 대구 지역 역사적 장소
const daeguPlaces = [
  {
    name: "국채보상운동기념공원",
    latLng: new kakao.maps.LatLng(35.8698, 128.5937),
    img: "https://www.daegu.go.kr/u/culture/bbs/view.do?ptIdx=322&mId=0201020000&idx=265155&searchCategory=&page=1",
    desc: "1907년 국채보상운동이 시작된 장소로 민족 자주정신을 기리는 공원입니다.",
  },
  {
    name: "계산성당",
    latLng: new kakao.maps.LatLng(35.8692, 128.5947),
    img: "https://upload.wikimedia.org/wikipedia/commons/1/18/Daegu_Kyesan_Cathedral_Church.jpg",
    desc: "대구에서 가장 오래된 고딕양식 성당으로 1902년 완공되었습니다.",
  },
  {
    name: "3.1만세운동길",
    latLng: new kakao.maps.LatLng(35.8757, 128.5956),
    img: "https://www.daegu.go.kr/u/culture/bbs/view.do?ptIdx=322&mId=0201020000&idx=265168&searchCategory=&page=1",
    desc: "대구에서 3.1 운동이 전개된 거리로 조형물과 안내판이 있습니다.",
  },
];

function clearMarkers() {
  markers.forEach((marker) => marker.setMap(null));
  markers = [];
  infowindow.close();
  currentMarker = null;
  if (window.polyline) {
    window.polyline.setMap(null);
  }
}

function addMarkers(places) {
  var bounds = new kakao.maps.LatLngBounds();
  var path = [];

  places.forEach(function (place) {
    bounds.extend(place.latLng);
    path.push(place.latLng);

    var marker = new kakao.maps.Marker({
      position: place.latLng,
      map: map,
    });

    marker.placeInfo = place;

    kakao.maps.event.addListener(marker, "click", function () {
      if (infowindow.getMap() && currentMarker === marker) {
        infowindow.close();
        currentMarker = null;
      } else {
        var content =
          '<div style="padding:10px; width:250px; height:300px;">' +
          "<strong>" +
          place.name +
          "</strong><br>" +
          '<img src="' +
          place.img +
          '" style="width:100%; height:auto; max-height:150px; margin-top:5px;"><br>' +
          "<p style='margin-top:5px;'>" +
          place.desc +
          "</p></div>";

        infowindow.setContent(content);
        infowindow.open(map, marker);
        currentMarker = marker;
      }
    });

    markers.push(marker);
  });

  window.polyline = new kakao.maps.Polyline({
    path: path,
    strokeWeight: 5,
    strokeColor: "#FF0000",
    strokeOpacity: 1,
    strokeStyle: "solid",
  });
  window.polyline.setMap(map);
}

function loadMap(type) {
  clearMarkers();

  if (type === "seoul") {
    map.setCenter(new kakao.maps.LatLng(37.5665, 126.978)); // 서울 시청 근처
    map.setLevel(11); // 서울 전역이 적당히 보임
    addMarkers(seoulPlaces);
  } else if (type === "daegu") {
    map.setCenter(new kakao.maps.LatLng(35.8714, 128.6014)); // 대구 중심
    map.setLevel(11); // 대구 전역이 적당히 보임
    addMarkers(daeguPlaces);
  } else {
    console.warn("지원하지 않는 지역입니다.");
  }
}

function initialize() {
  map = new kakao.maps.Map(document.getElementById("map"), {
    center: new kakao.maps.LatLng(37.5665, 126.978), // 기본 서울 중심
    level: 11,
  });
  infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

  // 기본 지도는 서울
  loadMap("seoul");
}

window.onload = initialize;
