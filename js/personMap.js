// 카카오지도 API 자바스크립트
var map;
var infowindow;
var currentMarker = null;
var markers = [];

// 유관순 관련 장소들
const youPlaces = [
  {
    name: "독립기념관",
    latLng: new kakao.maps.LatLng(36.781872, 127.2303981),
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Independence_Hall_of_Korea_01.JPG/1200px-Independence_Hall_of_Korea_01.JPG",
    desc: "한국 독립운동의 역사를 전시한 대표 기념관입니다.",
  },
  {
    name: "이동녕 선생 생가지",
    latLng: new kakao.maps.LatLng(36.7795, 127.228),
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4JmvFaHezpOndvXEdEQllw3yCYi0LW8Lomw&s",
    desc: "대한민국 임시정부 의정원장을 지낸 이동녕 선생의 생가입니다.",
  },
  {
    name: "아우내장터",
    latLng: new kakao.maps.LatLng(36.776, 127.281),
    img: "https://www.gospeltoday.co.kr/news/photo/201902/3167_6645_4450.jpg",
    desc: "1919년 3·1운동 당시 유관순 열사가 만세운동을 펼친 장소입니다.",
  },
  {
    name: "조병옥 박사 생가",
    latLng: new kakao.maps.LatLng(36.775, 127.275),
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRooopt2o0sBbmsZV4rLr16z0knj7m2hUcmGA&s",
    desc: "민주주의 발전에 기여한 조병옥 박사의 생가입니다.",
  },
  {
    name: "천안 유관순 열사 유적",
    latLng: new kakao.maps.LatLng(36.774, 127.28),
    img: "https://cheonan.grandculture.net/Image?localName=cheonan&id=GC045P01224&t=middle",
    desc: "유관순 열사의 생가와 기념관이 있는 유적지입니다.",
  },
];

// 이순신 관련 장소들
const leePlaces = [
  {
    name: "선소",
    latLng: new kakao.maps.LatLng(34.7592, 127.7223),
    img: "https://minio.nculture.org/amsweb-opt/multimedia_assets/31/85987/95269/c/%EC%97%AC%EC%88%98-%EC%84%A0%EC%86%8C%EC%9C%A0%EC%A0%81_%EB%B6%80%EC%82%B0%EC%A7%84%EC%88%9C%EC%A0%88%EB%8F%842_%EB%AC%B8%ED%99%94%EC%9E%AC%EC%B2%AD_%EC%A0%9C1%EC%9C%A0%ED%98%95-medium-size.jpg",
    desc: "조선시대 군선과 어선을 만들던 곳으로, 역사적인 배 제조 장소입니다.",
  },
  {
    name: "이충무공자당기거지",
    latLng: new kakao.maps.LatLng(34.7512, 127.7306),
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgfPerM4B9CACJ0h2QOo9K1oHYUoYuj_XaJQ&s",
    desc: "이순신 장군의 가족이 살던 옛집으로 역사적인 의미가 깊습니다.",
  },
  {
    name: "진남관",
    latLng: new kakao.maps.LatLng(34.7542, 127.7322),
    img: "https://lh5.googleusercontent.com/proxy/mKMMukQIt03gZriA98aHrVQstZy03tsmwl1s74xpumlfl8fY1A3cPrrk3j5ArHjTZQ1UFJO32NRW7_YYkvq67oZZT1LyhnohDOlKcZ28cpv1vg6jilr2lPdFI6iQ0yJ-R-M",
    desc: "전라좌수영의 중심지였던 조선시대 건축물입니다.",
  },
  {
    name: "이순신광장",
    latLng: new kakao.maps.LatLng(34.7465, 127.7329),
    img: "https://mblogthumb-phinf.pstatic.net/MjAyMzA5MTNfMTA2/MDAxNjk0NTk3NDEyOTQ3.6Fe7mVk0Z65bd8kOp8tZ9htaPWh2nmvlo51SX3xLM30g.qnkQ7DQ1nJo7pURNIBjI4SeJSyibxr1xITBeMxQCoxsg.JPEG.suk4408/061A8464.jpg?type=w800",
    desc: "이순신 장군을 기리는 동상이 있는 광장으로 관광 명소입니다.",
  },
  {
    name: "고소동천사벽화골목",
    latLng: new kakao.maps.LatLng(34.7489, 127.7432),
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6IrmSDE50rTZ1yQSmG_O4byAX_CfbcSY2jw&s",
    desc: "형형색색의 벽화가 있는 골목으로 사진 찍기 좋은 장소입니다.",
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
          '<div style="padding:10px; width:250px; height:330px; background:#fffaf3; border:2px solid #e0c5a1; border-radius:10px; box-shadow:0 4px 12px rgba(0,0,0,0.2); font-family:\'Nanum Gothic\', sans-serif; display:flex; flex-direction:column; justify-content:space-between;">' +
            "<div>" +
              "<strong style='font-size:16px; color:#5c4033;'>" + place.name + "</strong><br>" +
              '<img src="' + place.img + '" style="width:100%; height:auto; max-height:150px; margin-top:5px; border-radius:6px;"><br>' +
              "<p style='margin-top:5px; font-size:14px; color:#555;'>" + place.desc + "</p>" +
            "</div>" +
            '<div style="text-align:right; margin-top:10px;">' +
              '<a href="personDetail.html?name=' +
              encodeURIComponent(place.name) +
              "&img=" +
              encodeURIComponent(place.img) +
              "&desc=" +
              encodeURIComponent(place.desc) +
              '" style="color:#fff; background-color:#8b5e3c; padding:6px 10px; border-radius:6px; text-decoration:none; font-size:13px;">>> 자세히 보기</a>' +
            "</div>" +
          "</div>";

        infowindow.setContent(content);
        infowindow.open(map, marker);
        currentMarker = marker;
      }
    });

    markers.push(marker);
  });

  map.setBounds(bounds);

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

  if (type === "you") {
    addMarkers(youPlaces);
  } else if (type === "lee") {
    addMarkers(leePlaces);
  }
}

function initialize() {
  map = new kakao.maps.Map(document.getElementById("map"), {
    center: new kakao.maps.LatLng(36.774, 127.28),
    level: 12,
  });
  infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

  // 기본 지도는 유관순
  loadMap("you");
}

window.onload = initialize;
