function initialize() {
  const mapContainer = document.getElementById("map");
  const map = new kakao.maps.Map(mapContainer, {
    center: new kakao.maps.LatLng(34.7465, 127.7329),
    level: 12, // 초기 줌 레벨
  });

  const places = [
    { name: "선소", latLng: new kakao.maps.LatLng(34.7592, 127.7223) },
    {
      name: "이충무공자당",
      latLng: new kakao.maps.LatLng(34.7512, 127.7306),
    },
    { name: "진남관", latLng: new kakao.maps.LatLng(34.7542, 127.7322) },
    {
      name: "이순신광장",
      latLng: new kakao.maps.LatLng(34.7465, 127.7329),
    },
    {
      name: "고소동천사벽화골목",
      latLng: new kakao.maps.LatLng(34.7489, 127.7432),
    },
  ];

  const bounds = new kakao.maps.LatLngBounds();

  places.forEach((place) => {
    const marker = new kakao.maps.Marker({
      position: place.latLng,
    });
    marker.setMap(map);

    const infowindow = new kakao.maps.InfoWindow({
      content: `<div style="padding:5px;">${place.name}</div>`,
    });
    infowindow.open(map, marker);

    bounds.extend(place.latLng);
  });

  // 경로 표시
  const path = places.map((place) => place.latLng);
  const polyline = new kakao.maps.Polyline({
    path: path,
    strokeWeight: 5,
    strokeColor: "#FF0000",
    strokeOpacity: 1,
    strokeStyle: "solid",
  });
  polyline.setMap(map);

  map.setBounds(bounds); // 마커 전부 보이도록 자동 조정
}

window.onload = function () {
  initialize();
};
