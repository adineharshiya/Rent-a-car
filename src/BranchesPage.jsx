import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// اصلاح آیکون پیش‌فرض Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

// داده‌های ثابت شعبه‌ها (بر اساس Checkout.jsx)
const branchesData = [
  {
    id: 1,
    name: "Central Branch",
    address: "Downtown Avenue, Tehran",
    lat: 35.6892,
    lng: 51.3890,
  },
  {
    id: 2,
    name: "West Branch",
    address: "Western District Blvd, Tehran",
    lat: 35.7000,
    lng: 51.3000,
  },
  {
    id: 3,
    name: "East Branch",
    address: "Eastern Highway, Tehran",
    lat: 35.7200,
    lng: 51.5000,
  },
];

export default function BranchesPage({ onBack }) {
  return (
    <div className="min-h-screen bg-gray-100 pt-5 px-5 font-sans relative pb-6">
      {/* هدر با دکمه بازگشت */}
      <div className="flex items-center justify-between mt-2 mb-4 px-1 relative">
        <button
          onClick={onBack}
          className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-md text-gray-800 hover:bg-white transition-colors z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="absolute left-1/2 -translate-x-1/2 text-2xl font-bold text-gray-900 tracking-tight">
          Our Branches
        </h1>
        <div className="w-10"></div>
      </div>

      {/* نقشه */}
      <div className="w-full h-64 rounded-3xl overflow-hidden shadow-sm border border-gray-200 mb-6 z-0">
        <MapContainer
          center={[35.6892, 51.3890]} // مرکزیت روی شعبه مرکزی
          zoom={11}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {branchesData.map((branch) => (
            <Marker key={branch.id} position={[branch.lat, branch.lng]}>
              <Popup>
                <strong>{branch.name}</strong>
                <br />
                {branch.address}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* لیست شعبه‌ها */}
      <div className="flex flex-col gap-4">
        {branchesData.map((branch) => (
          <div
            key={branch.id}
            className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center justify-between"
          >
            <div>
              <h3 className="text-lg font-bold text-gray-900">{branch.name}</h3>
              <p className="text-sm text-gray-400 mt-1">{branch.address}</p>
            </div>
            <div className="bg-[#EBF3FF] p-2 rounded-full text-[#2b4eff]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}