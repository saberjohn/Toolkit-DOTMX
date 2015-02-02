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
	var circleLayer = new L.LayerGroup();
	
	//Sidebar
	var sidebar = L.control.sidebar('sidebar').addTo(map);
	
	var geojsonMarkerOptions = {
		radius: 10,
		fillColor: "#47c9af",
		color: "#fff",
		stroke: "#fff",
		weight: 2,
		dashArray: '2',
		opacity: 1,
		fillOpacity: 0.8
	};
	
	var geojsonMarkerOptions2 = {
		radius: 30,
		fillColor: "#5EAF84",
		color: "#fff",
		stroke: "#fff",
		weight: 2,
		dashArray: '2',
		opacity: 1,
		fillOpacity: 0.5
	};

	var estaciones = L.geoJson(estaciones_puebla, {
		onEachFeature: onEachFeature,
		pointToLayer: function (feature, latlng) {
			return L.circleMarker(latlng, geojsonMarkerOptions);
		}
	}).addTo(map);
	
	function onEachFeature(feature, layer) {
		layer.on('click', function(e) {
			circleLayer.clearLayers();
			var circle = L.circle([layer._latlng.lat, layer._latlng.lng], 800, geojsonMarkerOptions2);
			
			//prueba
			var contenthtml = "<p>";
				contenthtml += "Nombre: " + feature.properties.Name + "<br/>";
				contenthtml += "Sum_PerR_1: " + feature.properties.Sum_PerR_1 + "<br/>";
				contenthtml += "PobDesocup: " + feature.properties.PobDesocup + "<br/>";
				contenthtml += "DensPobAvg: " + feature.properties.DensPobAvg + "<br/>";
			contenthtml += "</p>";
			
			//datos - falta meter labels correctos de las propiedades
			$("#info-Name").html(feature.properties.Name);
			$("#info-Sum_PerR_1").html(feature.properties.Sum_PerR_1);
			$("#info-PobDesocup").html(feature.properties.PobDesocup);
			$("#info-DensPobAvg").html(feature.properties.DensPobAvg);
			
			circleLayer.addLayer(circle);
			circleLayer.addTo(map);
			estaciones.bringToFront();
			
			layer.bindPopup(contenthtml).openPopup();
			
			$(".leaflet-popup-close-button").click( function() {
				circleLayer.clearLayers();
				sidebar.close();
			});
			
			sidebar.open("home");
		});
	}
	
	map.on('click', function(e) {
		circleLayer.clearLayers();
		sidebar.close();
	});
  });
