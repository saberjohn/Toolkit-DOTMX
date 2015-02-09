'use strict';

angular.module('dotmxApp').controller('MainCtrl', function ($scope,$document) {
    $scope.first = {
		isFirstOpen: true
    };
    
	$document.on('scroll', function() {
		var topPosition = angular.element(document.getElementById('topcontrol'));
		if($document.scrollTop() >= 65) {
			topPosition.addClass('dark');
		} else {
			topPosition.removeClass('dark');	
		}
	});
	
	
	$("#focus-city > li > a").click( function() {
		$("#focus-city > li").removeClass("active");
		$(this).parent().addClass("active");
		
		var city = $(this).attr("id");
		
		if(city == "cdmx") {
			print(estaciones_zmvm, lineas_zmvm, city);
			map.setView([19.432711775616433, -99.13325428962708], 13);
		} else if(city == "puebla") {
			print(estaciones_puebla, lineas_puebla, city);
			map.setView([19.044918668412617, -98.20747375488281], 13);
		} else if(city == "gdl") {
			print(estaciones_gdl, lineas_gdl, city);
			map.setView([20.674929132304698, -103.35479378700256], 13);
		} else if(city == "mty") {
			print(estaciones_mty, lineas_mty, city);
			map.setView([25.68713198895331, -100.33032417297363], 13);
		} else if(city == "juarez") {
			print(estaciones_juarez, lineas_juarez, city);
			map.setView([31.669526781976998, -106.45245552062987], 13);
		} else if(city == "leon") {
			print(estaciones_leon, lineas_leon, city);
			map.setView([21.125937978524263, -101.70035362243652], 13);
		} else if(city == "chihua") {
			print(estaciones_chihuahua, lineas_chihuahua, city);
			map.setView([28.642690467330326, -106.08458518981934], 13);
		}			
	});
	
	L.mapbox.accessToken = 'pk.eyJ1IjoiY2Fhcmxvc2h1Z28xIiwiYSI6IklmZGNsNmMifQ.JJksWU3hBP-Vd3S9WtjFsA';
	var map = L.mapbox.map('map-box', 'caarloshugo1.h9bggm26').setView([19.432711775616433, -99.13325428962708], 14);
	
	var circleLayer		= new L.LayerGroup();
	var estacionesLayer	= new L.LayerGroup();
	var lineasLayer 	= new L.LayerGroup();
	
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
	
	var lineStyle = {
		"color": "#ff7800",
		"weight": 5,
		"opacity": 0.65
	};
	
	var agencies = new Array();
	print(estaciones_zmvm, lineas_zmvm, "cdmx");
	
	function print(estaciones, lineas, ciudad, filter) {
		agencies = new Array();
		
		/*clear layers*/
		estacionesLayer.clearLayers();
		lineasLayer.clearLayers();
		circleLayer.clearLayers();
		
		if(filter == undefined) {
			/*lineas*/
			var lineasGeo = L.geoJson(lineas, {
				style: lineStyle
			});
			lineasLayer.addLayer(lineasGeo);
			lineasLayer.addTo(map);
			
			/*estaciones*/
			var estacionesGeo = L.geoJson(estaciones, {
				onEachFeature: onEachFeature,
				pointToLayer: function (feature, latlng) {
					return L.circleMarker(latlng, geojsonMarkerOptions);
				}
			});
			estacionesLayer.addLayer(estacionesGeo);
			estacionesLayer.addTo(map);
			
			/*Agencias*/
			$("#focus-agency").html("");
			if(agencies.length > 1) {
				agencies.forEach(function(entry) {
					$("#focus-agency").append('<li><a id="' + entry + '">' + entry +'</a></li>');
				});
				
				$("#focus-agency > li > a").click( function () {
					if($(this).hasClass("active-agency")) {
						$(this).removeClass("active-agency");
					} else {
						$(this).addClass("active-agency");
					}
					print(estaciones, lineas, ciudad, true);
				});
			}
		} else {
			var arrayAgencies  = $(".active-agency").toArray();
			var agenciesSelect = new Array();
			arrayAgencies.forEach(function(entry) {
				agenciesSelect.push($(entry).attr("id"));
			});
			
			/*lineas*/
			var lineasGeo = L.geoJson(lineas, {
				style: lineStyle,
				filter: function (feature, layer) {
					if(agenciesSelect.indexOf(feature.properties.Agencia) != -1) return feature.properties;
					return false;
				}
			});
			lineasLayer.addLayer(lineasGeo);
			lineasLayer.addTo(map);
			
			/*estaciones*/
			var estacionesGeo = L.geoJson(estaciones, {
				filter: function (feature, layer) {
					if(agenciesSelect.indexOf(feature.properties.Agencia) != -1) return feature.properties;
					return false;
				},
				onEachFeature: onEachFeature,
				pointToLayer: function (feature, latlng) {
					return L.circleMarker(latlng, geojsonMarkerOptions);
				}
			});
			estacionesLayer.addLayer(estacionesGeo);
			estacionesLayer.addTo(map);

			if(agenciesSelect.length != 0) {
				map.fitBounds(lineasGeo);
			}		
		}
		
		function onEachFeature(feature, layer) {
			/*Agencias*/
			if(feature.properties.Agencia != "" && feature.properties.Agencia != undefined && agencies.indexOf(feature.properties.Agencia) == -1) {
				agencies.push(feature.properties.Agencia);
			}
			
			/*styles*/
			layer.on('click', function(e) {
				estacionesGeo.setStyle({
					radius: 10,
					fillColor: "#47c9af",
					color: "#fff",
					stroke: "#fff",
					weight: 2,
					dashArray: '2',
					opacity: 1,
					fillOpacity: 0.8
				});
				
				this.setStyle({
					color: '#2262CC',
					weight: 3,
					opacity: 0.6,
					fillOpacity: 0.65,
					fillColor: '#2262CC'
				});
					
				circleLayer.clearLayers();
				var circle = L.circle([layer._latlng.lat, layer._latlng.lng], 800, geojsonMarkerOptions2);
				
				//datos
				$("#info-Name").html("");
				$("#info-Agencia").html("");
				$("#info-Descriptio").html("");
				$("#info-Escuelas").html("");
				$("#info-AsistMed").html("");
				$("#info-CComerc").html("");
				$("#info-Mercados").html("");
				$("#info-Templos").html("");
				$("#info-Plazas").html("");
				$("#info-Deport").html("");
				$("#info-PerRemPrim").html("");
				$("#info-PerRemSecu").html("");
				$("#info-PerRemTerc").html("");
				$("#info-UEprim").html("");
				$("#info-UEsecu").html("");
				$("#info-UEterc").html("");
				$("#info-PobTot").html("");
				$("#info-VivTot").html("");
				$("#info-VivDeshab").html("");
				$("#info-VivConAuto").html("");
				$("#info-VivTodServ").html("");
				$("#info-PobOcupada").html("");
				$("#info-PobDesocup").html("");
				$("#info-DensPobAvg").html("");
				
				if(ciudad=="puebla") {
					$("#info-Name").html(feature.properties.Name);
				} else {
					$("#info-Name").html(feature.properties.Nombre);
				}
				
				$("#info-Agencia").html(feature.properties.Agencia);
				$("#info-Descriptio").html(feature.properties.Descriptio);
				$("#info-Escuelas").html(feature.properties.Escuelas);
				$("#info-AsistMed").html(feature.properties.AsistMed);
				$("#info-CComerc").html(feature.properties.CComerc);
				$("#info-Mercados").html(feature.properties.Mercados);
				$("#info-Templos").html(feature.properties.Templos);
				$("#info-Plazas").html(feature.properties.Plazas);
				$("#info-Deport").html(feature.properties.Deport);
				$("#info-PerRemPrim").html(feature.properties.PerRemPrim);
				$("#info-PerRemSecu").html(feature.properties.PerRemSecu);
				$("#info-PerRemTerc").html(feature.properties.PerRemTerc);
				$("#info-UEprim").html(feature.properties.UEprim);
				$("#info-UEsecu").html(feature.properties.UEsecu);
				$("#info-UEterc").html(feature.properties.UEterc);
				$("#info-PobTot").html(feature.properties.PobTot);
				$("#info-VivTot").html(feature.properties.VivTot);
				$("#info-VivDeshab").html(feature.properties.VivDeshab);
				$("#info-VivConAuto").html(feature.properties.VivConAuto);
				$("#info-VivTodServ").html(feature.properties.VivTodServ);
				$("#info-PobOcupada").html(feature.properties.PobOcupada);
				$("#info-PobDesocup").html(feature.properties.PobDesocup);
				$("#info-DensPobAvg").html(feature.properties.DensPobAvg);
				
				circleLayer.addLayer(circle);
				circleLayer.addTo(map);
				estacionesGeo.bringToFront();
				
				$(".leaflet-popup-close-button").click( function() {
					circleLayer.clearLayers();
					sidebar.close();
				});
				
				map.panTo(new L.LatLng(layer._latlng.lat, layer._latlng.lng));
				sidebar.open("home");
			});
		}
	}
	
	map.on('click', function(e) {
		circleLayer.clearLayers();
		sidebar.close();
	});
});
