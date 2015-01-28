'use strict';

angular.module('dotmxApp')
  .controller('MainCtrl', function ($scope,$document) {
    $scope.first = {
      isFirstOpen: true
    };
	$document.on('scroll', function() {
		var topPosition = angular.element(document.getElementById('topcontrol'));
		if($document.scrollTop() >= 65){
			topPosition.addClass('dark');
		}
		else{
			topPosition.removeClass('dark');	
		}
	});
	
	L.mapbox.accessToken = 'pk.eyJ1IjoiY2Fhcmxvc2h1Z28xIiwiYSI6IklmZGNsNmMifQ.JJksWU3hBP-Vd3S9WtjFsA';
	var map = L.mapbox.map('map-box', 'caarloshugo1.h9bggm26').setView([19.044918668412617, -98.20747375488281], 13);
	
	var geojsonMarkerOptions = {
		radius: 8,
		fillColor: "#ff7800",
		color: "#000",
		weight: 1,
		opacity: 1,
		fillOpacity: 0.8
	};

	var estaciones = L.geoJson(estaciones_puebla, {
		onEachFeature: onEachFeature,
		pointToLayer: function (feature, latlng) {
			return L.circleMarker(latlng, geojsonMarkerOptions);
		}
	}).addTo(map);
	
	function onEachFeature(feature, layer) {
		//console.log(layer);
		//var sMarker = L.circleMarker([layer._latlng.lat, layer._latlng.lng], geojsonMarkerOptions).addTo(map);
		
		layer.on('click', function(e) {
			layer.bindPopup("Código postal: " + feature.properties.Name).openPopup();
		});
	}
  });
