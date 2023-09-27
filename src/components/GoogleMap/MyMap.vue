<!-- MyMap.vue -->
<template>
  <div>
    <div ref="map" style="width: 94%; height: 400px;"></div>
  </div>
</template>

<script>
export default {
  props: {
    startLocation: {
      type: String,
      required: true
    },
    endLocation: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      map: null,
      directionsService: null,
      directionsRenderer: null,
      endMarker: null
    };
  },
  mounted() {
    this.initializeMap();
    this.initializeDirections();
    this.drawRoute();
    // 注释或删除这行，因为我们将不再使用经纬度来绘制标记
    // this.drawEndMarker();
  },
  methods: {
    initializeMap() {
      // 我们暂时将地图中心设置为一个固定的点
      const mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(0, 0)
      };
      this.map = new google.maps.Map(this.$refs.map, mapOptions);
    },
    initializeDirections() {
      this.directionsService = new google.maps.DirectionsService();
      this.directionsRenderer = new google.maps.DirectionsRenderer();
      this.directionsRenderer.setMap(this.map);
    },
    drawRoute() {
      // 直接使用地点名称作为 origin 和 destination
      this.directionsService.route({
        origin: this.startLocation,
        destination: this.endLocation,
        travelMode: 'WALKING'
      }, (response, status) => {
        if (status === 'OK') {
          this.directionsRenderer.setDirections(response);
          // 从这里获取终点的经纬度，然后绘制标记
          const endPoint = response.routes[0].legs[0].end_location;
          this.drawEndMarker(endPoint.lat(), endPoint.lng());
        } else if (status === 'ZERO_RESULTS') {
          window.alert('无法找到从起点到终点的有效路径。');
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    },
    drawEndMarker(lat, lng) {
      if (this.endMarker) {
        this.endMarker.setMap(null);
      }
      this.endMarker = new google.maps.Marker({
        position: { lat, lng },
        map: this.map,
        title: 'Destination'
      });
    }
  },
  watch: {
    startLocation: "drawRoute",
    endLocation() {
      this.drawRoute();
      // 注释或删除这行，因为我们将不再使用经纬度来绘制标记
      // this.drawEndMarker();
    }
  }
};
</script>
