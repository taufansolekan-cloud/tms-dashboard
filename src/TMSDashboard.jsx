import React, { useMemo, useState } from "react";
import { Bell, Truck, Star, Clock } from "lucide-react";
import { motion } from "framer-motion";

const Card = ({ children, className = "", onClick }) => (
  <div
    className={"rounded-xl shadow bg-white bg-opacity-90 " + className}
    onClick={onClick}
  >
    {children}
  </div>
);

const CardBody = ({ children, className = "" }) => (
  <div className={"p-3 " + className}>{children}</div>
);

const LOGO_SRC = "/frex.png";
const PROFILE_SRC = "/profile.png";

function computeStarRating(ontime, late) {
  const total = ontime + late;
  if (!total) return 0;
  return Math.round((ontime / total) * 5);
}

export default function TMSDashboard() {
  const data = {
    approvedTrips: 60,
    finishedTrips: 59,
    pendingTrips: 1,
    complaints: 1,
    ontimeTrips: 55,
    lateTrips: 4,
    userName: "Febri Riyadi Wibowo",
    appVersion: "2.2.5",
  };

  const rating = useMemo(
    () => computeStarRating(data.ontimeTrips, data.lateTrips),
    [data.ontimeTrips, data.lateTrips]
  );

  const [logoOk, setLogoOk] = useState(true);
  const [avatarOk, setAvatarOk] = useState(true);

  const [currentPage, setCurrentPage] = useState("home");
  const [attendance, setAttendance] = useState([]);
  const [tripExpanded, setTripExpanded] = useState(false);

  const totalTripPerf = data.ontimeTrips + data.lateTrips;
  const ontimePct = totalTripPerf
    ? Math.round((data.ontimeTrips / totalTripPerf) * 100)
    : 0;
  const latePct = 100 - ontimePct;

  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // 🔹 Tambahin fungsi Clock In & Clock Out
  const handleClockIn = () => {
    setAttendance((prev) => [
      ...prev,
      { type: "Clock In", time: new Date().toLocaleTimeString("id-ID") },
    ]);
  };

  const handleClockOut = () => {
    setAttendance((prev) => [
      ...prev,
      { type: "Clock Out", time: new Date().toLocaleTimeString("id-ID") },
    ]);
  };

  return (
    <div className="min-h-screen relative pb-40 bg-gray-50">
      <div className="relative z-10 p-3">
        {/* HEADER */}
        <Card className="mb-4">
          <CardBody className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-sky-200 flex items-center justify-center overflow-hidden">
                {logoOk ? (
                  <img
                    src={LOGO_SRC}
                    alt="Frex Logo"
                    className="w-full h-full object-contain"
                    onError={() => setLogoOk(false)}
                  />
                ) : (
                  <span className="text-sky-700 font-bold text-xs">Fr-ex</span>
                )}
              </div>
              <div>
                <h2 className="text-base font-bold text-sky-700 leading-tight">
                  Halo, {data.userName}
                </h2>
                <p className="text-[11px] text-gray-500">
                  Fresh Express • v{data.appVersion}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                {avatarOk ? (
                  <img
                    src={PROFILE_SRC}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={() => setAvatarOk(false)}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    👤
                  </div>
                )}
              </div>
              <div className="p-2 rounded-full bg-sky-100 text-sky-700">
                <Bell size={18} />
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Rating */}
        <Card className="mb-3">
          <CardBody>
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-xs text-gray-500">Rating Ketepatan Waktu</p>
                <div className="flex items-center gap-1 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
              </div>
              <div className="text-right">
                <p className="text-[11px] text-gray-500">Ontime / Late</p>
                <p className="text-sm font-semibold text-sky-800">
                  {data.ontimeTrips} / {data.lateTrips}
                </p>
              </div>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-sky-500"
                style={{ width: `${ontimePct}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-gray-500 mt-1">
              <span>{ontimePct}% ontime</span>
              <span>{latePct}% late</span>
            </div>
          </CardBody>
        </Card>

        {/* Map fullscreen */}
        {currentPage === "home" && (
          <Card className="mb-4">
            <CardBody className="p-0">
              <div className="w-full h-[calc(100vh-300px)] overflow-hidden border">
                <iframe
                  title="Lokasi Kendaraan"
                  src="https://maps.google.com/maps?width=600&height=400&hl=en&q=fresh%20factory&t=&z=14&ie=UTF8&iwloc=B&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                ></iframe>
              </div>
            </CardBody>
          </Card>
        )}

        {/* Absensi */}
        {currentPage === "absensi" && (
          <Card>
            <CardBody>
              <h3 className="text-lg font-bold text-sky-700 mb-2">Absensi</h3>
              <p className="text-sm text-gray-500 mb-3">{today}</p>
              <div className="flex gap-3 mb-3">
                <button
                  onClick={handleClockIn}
                  className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                >
                  Clock In
                </button>
                <button
                  onClick={handleClockOut}
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                >
                  Clock Out
                </button>
              </div>
              <ul className="space-y-1">
                {attendance.map((a, idx) => (
                  <li key={idx} className="text-sm">
                    <Clock size={14} className="inline mr-1 text-sky-600" />
                    {a.type} • {a.time}
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        )}

        {/* POD */}
        {currentPage === "pod" && (
          <Card>
            <CardBody>
              <h3 className="text-lg font-bold text-sky-700 mb-3">POD</h3>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-blue-600 text-white rounded-lg p-3 text-center">
                  <p className="text-xs font-semibold">POD TOTAL</p>
                  <p className="text-lg font-bold">{data.approvedTrips}</p>
                </div>
                <div className="bg-blue-600 text-white rounded-lg p-3 text-center">
                  <p className="text-xs font-semibold">POD DITUNGGU</p>
                  <p className="text-lg font-bold">{data.pendingTrips}</p>
                </div>
                <div className="bg-blue-600 text-white rounded-lg p-3 text-center">
                  <p className="text-xs font-semibold">POD DITERIMA</p>
                  <p className="text-lg font-bold">{data.finishedTrips}</p>
                </div>
              </div>
            </CardBody>
          </Card>
        )}

        {/* Floating Bubble Sidebar */}
        {currentPage === "home" && (
          <motion.div
            drag
            dragMomentum={false}
            className="fixed right-3 bottom-28 z-30 flex flex-col items-end gap-2"
          >
            <button
              onClick={() => setTripExpanded(!tripExpanded)}
              className="w-12 h-12 rounded-full bg-sky-600 text-white flex items-center justify-center shadow-lg"
            >
              <Truck size={20} />
            </button>
            {tripExpanded && (
              <div className="space-y-2">
                <Card>
                  <CardBody className="flex items-center gap-2 text-sm">
                    🚚 Trip Disetujui: {data.approvedTrips}
                  </CardBody>
                </Card>
                <Card>
                  <CardBody className="flex items-center gap-2 text-sm">
                    ✅ Trip Selesai: {data.finishedTrips}
                  </CardBody>
                </Card>
                <Card>
                  <CardBody className="flex items-center gap-2 text-sm">
                    ⏳ Trip Tertunda: {data.pendingTrips}
                  </CardBody>
                </Card>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md flex justify-around py-3 border-t rounded-t-2xl z-20 safe-area-inset-b">
        <button className="flex flex-col items-center text-gray-600">
          <span>❗</span>
          <span className="text-xs">Complain</span>
        </button>
        <button
          onClick={() => setCurrentPage("pod")}
          className={`flex flex-col items-center ${
            currentPage === "pod"
              ? "text-sky-600 font-semibold"
              : "text-gray-600"
          }`}
        >
          <span>📦</span>
          <span className="text-xs">POD</span>
        </button>
        <button
          onClick={() => setCurrentPage("home")}
          className={`flex flex-col items-center ${
            currentPage === "home"
              ? "text-sky-600 font-semibold"
              : "text-gray-600"
          }`}
        >
          <span>🏠</span>
          <span className="text-xs">Home</span>
        </button>
        <button className="flex flex-col items-center text-gray-600">
          <span>📜</span>
          <span className="text-xs">History</span>
        </button>
        <button
          onClick={() => setCurrentPage("absensi")}
          className={`flex flex-col items-center ${
            currentPage === "absensi"
              ? "text-sky-600 font-semibold"
              : "text-gray-600"
          }`}
        >
          <span>🗓️</span>
          <span className="text-xs">Absensi</span>
        </button>
        <button className="flex flex-col items-center text-gray-600">
          <span>💰</span>
          <span className="text-xs">Pendapatan</span>
        </button>
      </div>
    </div>
  );
}
