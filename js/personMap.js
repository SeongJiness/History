var map;
var infowindow;
var markers = [];
var labels = []; // ✅ CustomOverlay 추적을 위한 배열
var polyline = null;

// 유관순 관련 장소
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

// 유관순 주변 맛집/카페 추천
const youFoodPlaces = [
  {
    name: "천안맛집 소문난집",
    latLng: new kakao.maps.LatLng(36.7755, 127.279),
    img: "https://cdn.pixabay.com/photo/2017/05/07/08/56/korean-food-2294769_1280.jpg",
    desc: "현지인 추천 맛집으로 한식 전문점입니다.",
  },
  {
    name: "아우내카페",
    latLng: new kakao.maps.LatLng(36.7745, 127.282),
    img: "https://cdn.pixabay.com/photo/2017/01/20/00/30/cafe-1999564_1280.jpg",
    desc: "편안한 분위기의 카페로 커피와 디저트가 유명합니다.",
  },
];

// 이순신 관련 장소
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

// 이순신 주변 맛집/카페 추천
const leeFoodPlaces = [
  {
    name: "부산 해물찜 맛집",
    latLng: new kakao.maps.LatLng(34.752, 127.735),
    img: "https://cdn.pixabay.com/photo/2016/03/05/19/02/seafood-1238244_1280.jpg",
    desc: "신선한 해산물을 이용한 해물찜 전문점입니다.",
  },
  {
    name: "이순신카페",
    latLng: new kakao.maps.LatLng(34.7505, 127.731),
    img: "https://cdn.pixabay.com/photo/2016/11/29/04/06/coffee-1869716_1280.jpg",
    desc: "편안한 분위기의 카페로 휴식하기 좋은 곳입니다.",
  },
];

// 추천 경로 1번 (유관순)
const youRoute1 = [
  youPlaces[0], // 독립기념관
  youPlaces[2], // 아우내장터
  youPlaces[4], // 천안 유관순 열사 유적
];

// 추천 경로 2번 (유관순)
const youRoute2 = [
  youPlaces[1], // 이동녕 선생 생가지
  youPlaces[3], // 조병옥 박사 생가
  // 아우내장터 대신 천안 유관순 열사 유적 유지 (중요 장소)
  youPlaces[4],
];

// 추천 경로 1번 (이순신)
const leeRoute1 = [
  leePlaces[0], // 선소
  leePlaces[2], // 진남관
  leePlaces[3], // 이순신광장
];

// 추천 경로 2번 (이순신)
const leeRoute2 = [
  leePlaces[1], // 이충무공자당기거지
  leePlaces[4], // 고소동천사벽화골목
  leePlaces[3], // 이순신광장
];

// 마커 생성 함수 - 아이콘 구분
function createMarker(place, isFood = false) {
  let markerImageUrl = isFood
    ? "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png"
    : "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

  const markerImage = new kakao.maps.MarkerImage(
    markerImageUrl,
    new kakao.maps.Size(24, 35)
  );

  const marker = new kakao.maps.Marker({
    map: map,
    position: place.latLng,
    image: markerImage,
  });

  // ✅ 장소 이름을 항상 띄우는 CustomOverlay 추가
  const label = new kakao.maps.CustomOverlay({
    map: map,
    position: place.latLng,
    content:
      '<div style="background: rgba(255,255,255,0.9); border:1px solid #888; padding:2px 6px; border-radius:4px; font-size:13px; font-weight:bold; color:#333; white-space:nowrap;">' +
      place.name +
      "</div>",
    yAnchor: 1.7,
  });

  kakao.maps.event.addListener(marker, "click", function () {
    const content =
      "<div style=\"padding:10px; width:250px; height:330px; background:#fffaf3; border:2px solid #e0c5a1; border-radius:10px; box-shadow:0 4px 12px rgba(0,0,0,0.2); font-family:'Nanum Gothic', sans-serif; display:flex; flex-direction:column; justify-content:space-between;\">" +
      "<div>" +
      "<strong style='font-size:16px; color:#5c4033;'>" +
      place.name +
      "</strong><br>" +
      '<img src="' +
      place.img +
      '" style="width:100%; height:auto; max-height:150px; margin-top:5px; border-radius:6px;"><br>' +
      "<p style='margin-top:5px; font-size:14px; color:#555;'>" +
      place.desc +
      "</p>" +
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

    if (!infowindow) {
      infowindow = new kakao.maps.InfoWindow({ removable: true });
    }
    infowindow.setContent(content);
    infowindow.open(map, marker);
  });

  markers.push(marker);
  labels.push(label); // ✅ CustomOverlay 추적
}

// 마커, 오버레이, 경로 초기화
function clearMarkers() {
  for (let marker of markers) {
    marker.setMap(null);
  }
  markers = [];

  for (let label of labels) {
    label.setMap(null); // ✅ CustomOverlay 제거
  }
  labels = [];

  if (infowindow) infowindow.close();

  if (polyline) {
    polyline.setMap(null);
    polyline = null;
  }
}

// 경로 그리기
function drawPolyline(places) {
  const path = places.map((place) => place.latLng);
  polyline = new kakao.maps.Polyline({
    map: map,
    path: path,
    strokeWeight: 5,
    strokeColor: "#FF0000",
    strokeOpacity: 0.7,
    strokeStyle: "solid",
  });
}

// 유관순 추천 경로 1번 표시 함수
function loadYouRoute1() {
  clearMarkers();
  const center = new kakao.maps.LatLng(36.778, 127.27);
  map.setCenter(center);

  for (let place of youRoute1) {
    createMarker(place, false);
  }
  for (let place of youFoodPlaces) {
    createMarker(place, true);
  }
  drawPolyline(youRoute1);
}

// 유관순 추천 경로 2번 표시 함수
function loadYouRoute2() {
  clearMarkers();
  const center = new kakao.maps.LatLng(36.778, 127.27);
  map.setCenter(center);

  for (let place of youRoute2) {
    createMarker(place, false);
  }
  for (let place of youFoodPlaces) {
    createMarker(place, true);
  }
  drawPolyline(youRoute2);
}

// 이순신 추천 경로 1번 표시 함수
function loadLeeRoute1() {
  clearMarkers();
  const center = new kakao.maps.LatLng(34.75, 127.73);
  map.setCenter(center);

  for (let place of leeRoute1) {
    createMarker(place, false);
  }
  for (let place of leeFoodPlaces) {
    createMarker(place, true);
  }
  drawPolyline(leeRoute1);
}

// 이순신 추천 경로 2번 표시 함수
function loadLeeRoute2() {
  clearMarkers();
  const center = new kakao.maps.LatLng(34.75, 127.73);
  map.setCenter(center);

  for (let place of leeRoute2) {
    createMarker(place, false);
  }
  for (let place of leeFoodPlaces) {
    createMarker(place, true);
  }
  drawPolyline(leeRoute2);
}

let currentPerson = "you"; // 현재 선택된 인물 저장 (기본은 유관순)

function loadMap(who, route = 1) {
  currentPerson = who; // 현재 선택 인물 업데이트

  if (who === "you") {
    if (route === 1) loadYouRoute1();
    else if (route === 2) loadYouRoute2();
  } else if (who === "lee") {
    if (route === 1) loadLeeRoute1();
    else if (route === 2) loadLeeRoute2();
  }
}

// 초기 지도 생성 (유관순 추천경로 1)
function initMap() {
  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(36.778, 127.27),
    level: 6,
  };
  map = new kakao.maps.Map(container, options);

  loadYouRoute1();
}

// 페이지 로드 시 초기화
window.onload = initMap;
