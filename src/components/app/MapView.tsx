"use client";

import { useEffect, useRef } from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { fromLonLat } from "ol/proj";

export function MapView() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Baguio City, Philippines coordinates
    const baguioCoords = fromLonLat([120.5992, 16.4119]);

    // Google Maps Hybrid layer (satellite + labels)
    const googleHybridLayer = new TileLayer({
      source: new XYZ({
        url: "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
        maxZoom: 20,
      }),
    });

    const map = new Map({
      target: mapRef.current,
      layers: [googleHybridLayer],
      view: new View({
        center: baguioCoords,
        zoom: 13,
      }),
    });

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setTarget(undefined);
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full" />
      
      {/* Map controls overlay */}
      <div className="absolute top-4 right-4 bg-card border border-border rounded-lg shadow-lg p-2">
        <div className="text-xs text-muted-foreground">
          Baguio City, Philippines
        </div>
      </div>
    </div>
  );
}