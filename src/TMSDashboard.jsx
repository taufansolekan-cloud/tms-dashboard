import React, { useMemo, useState } from "react";
import { Bell, Truck, Star, Clock } from "lucide-react";

const Card = ({ children, className = "" }) => (
  <div className={"rounded-xl shadow bg-white bg-opacity-90 " + className}>
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
  if (!Number.isFinite(total) || total < 0) return 0;
  if (total === 0) return 0;
  const ratio = ontime / total;
  return Math.round(ratio * 5);
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

  const [showPodMenu, setShowPodMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [attendance, setAttendance] = useState([]);

  const [expandedTrip, setExpandedTrip] = useState(null); // 👈 kontrol expand bubble

  const totalTripPerf = data.ontimeTrips + data.lateTrips;
  const ontimePct = totalTripPerf
    ? Math.round((data.ontimeTrips / totalTripPerf) * 100)
    : 0;
  const latePct = totalTripPerf ? 100 - ontimePct : 0;

  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleClockIn = () => {
    setAttendance((prev) => [
      ...prev,
      { type: "Clock In", time: new Date().toLocaleTimeString() },
    ]);
  };

  const handleClockOut = () => {
    setAttendance((prev) => [
      ...prev,
      { type: "Clock Out", time: new Date().toLocaleTimeString() },
    ]);
  };

  return (
    <div className="min-h-screen relative pb-36 bg-gray-50">
      <div className="relative z-10 p-4">
        {/* HEADER */}
        <Card className="mb-4">
          <CardBody className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-sky-200 flex items-center justify-center overflow-hidden">
                {logoOk ? (
                  <img
                    src={LOGO_SRC}
                    alt="Frex Logo"
                    className="w-full h-full object-contain"
                    onError={() => setLogoOk(false)}
                  />
                ) : (
                  <span className="text-sky-700 font-bold">Fr-ex</span>
                )}
              </div>
              <div>
                <h2 className="text-lg font-bold text-sky-700">
                  Halo, {data.userName}
                </h2>
                <p className="text-xs text-gray-500">
                  Fresh Express • v{data.appVersion}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                {avatarOk ? (
                  <img
                    src={PROFILE_SRC}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={() => setAvatarOk(false)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                    👤
                  </div>
                )}
              </div>
              <div className="p-2 rounded-full bg-sky-100 text-sky-700">
                <Bell />
              </div>
            </div>
          </CardBody>
        </Card>

        {/* MAIN CONTENT */}
        {currentPage === "home" && (
          <>
            {/* Rating */}
            <Card className="mb-4">
              <CardBody>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-xs text-gray-500">
                      Rating Ketepatan Waktu
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={16}
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
                    <p className="text-xs text-gray-500">Ontime / Late</p>
                    <p className="text-sm font-semibold text-sky-800">
                      {data.ontimeTrips} / {data.lateTrips}
                    </p>
                  </div>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-2 bg-sky-500"
                    style={{ width: `${ontimePct}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{ontimePct}% ontime</span>
                  <span>{latePct}% late</span>
                </div>
              </CardBody>
            </Card>

            {/* Map Embed */}
            <Card className="mb-6 w-full md:w-3/4">
              <CardBody>
                <p className="text-xs text-gray-500 mb-2">
                  Lokasi Kendaraan Saat Ini
                </p>
                <div className="w-full h-80 rounded-lg overflow-hidden border">
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
          </>
        )}

        {currentPage === "absensi" && (
          <Card className="mb-6">
            <CardBody>
              <h3 className="text-lg font-bold text-sky-700 mb-2">Absensi</h3>
              <p className="text-sm text-gray-500 mb-4">{today}</p>

              <div className="flex gap-4 mb-4">
                <button
                  onClick={handleClockIn}
                  className="flex-1 bg-green-500 text-white py-2 rounded-lg shadow hover:bg-green-600"
                >
                  Clock In
                </button>
                <button
                  onClick={handleClockOut}
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg shadow hover:bg-red-600"
                >
                  Clock Out
                </button>
              </div>

              <ul className="space-y-2">
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

        {/* SIDEBAR EXPANDABLE */}
        {currentPage === "home" && (
          <div className="fixed right-3 top-1/3 flex flex-col gap-3 z-20 w-44">
            {/* Approved Trips */}
            <Card
              onClick={() =>
                setExpandedTrip(expandedTrip === "approved" ? null : "approved")
              }
              className="cursor-pointer"
            >
              <CardBody className="flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center text-white rounded-full bg-sky-500">
                  <Truck size={16} />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Trip Disetujui</p>
                  <h3 className="text-sm font-semibold text-sky-900">
                    {data.approvedTrips}
                  </h3>
                </div>
              </CardBody>
              {expandedTrip === "approved" && (
                <div className="p-2 border-t text-xs text-gray-600 bg-sky-50">
                  <p>- Hari Ini: 5</p>
                  <p>- Minggu Ini: 20</p>
                  <p>- Bulan Ini: 60</p>
                </div>
              )}
            </Card>

            {/* Finished Trips */}
            <Card
              onClick={() =>
                setExpandedTrip(expandedTrip === "finished" ? null : "finished")
              }
              className="cursor-pointer"
            >
              <CardBody className="flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center text-white rounded-full bg-green-500">
                  <Truck size={16} />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Trip Selesai</p>
                  <h3 className="text-sm font-semibold text-sky-900">
                    {data.finishedTrips}
                  </h3>
                </div>
              </CardBody>
              {expandedTrip === "finished" && (
                <div className="p-2 border-t text-xs text-gray-600 bg-green-50">
                  <p>- Hari Ini: 3</p>
                  <p>- Minggu Ini: 15</p>
                  <p>- Bulan Ini: 59</p>
                </div>
              )}
            </Card>

            {/* Pending Trips */}
            <Card
              onClick={() =>
                setExpandedTrip(expandedTrip === "pending" ? null : "pending")
              }
              className="cursor-pointer"
            >
              <CardBody className="flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center text-white rounded-full bg-amber-500">
                  <Truck size={16} />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Trip Tertunda</p>
                  <h3 className="text-sm font-semibold text-sky-900">
                    {data.pendingTrips}
                  </h3>
                </div>
              </CardBody>
              {expandedTrip === "pending" && (
                <div className="p-2 border-t text-xs text-gray-600 bg-amber-50">
                  <p>- Hari Ini: 1</p>
                  <p>- Minggu Ini: 2</p>
                  <p>- Bulan Ini: 4</p>
                </div>
              )}
            </Card>
          </div>
        )}
      </div>

      {/* Bottom Nav (tetap sama) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md flex justify-around py-3 border-t rounded-t-2xl z-20">
        <button className="relative flex flex-col items-center text-gray-600">
          <span>❗</span>
          <span className="text-xs">Complain</span>
        </button>

        <button
          onClick={() => setShowPodMenu(!showPodMenu)}
          className={`flex flex-col items-center ${
            showPodMenu ? "text-sky-600 font-semibold" : "text-gray-600"
          }`}
        >
          <span>📦</span>
          <span className="text-xs">POD</span>
        </button>

        <button
          onClick={() => {
            setCurrentPage("home");
            setShowPodMenu(false);
          }}
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
          onClick={() => {
            setCurrentPage("absensi");
            setShowPodMenu(false);
          }}
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

      {/* POD Submenu */}
      {showPodMenu && (
        <div className="fixed bottom-20 left-0 right-0 flex justify-around px-4 z-30">
          <div className="bg-blue-600 text-white rounded-lg shadow-md p-4 w-28 text-center">
            <p className="text-xs font-semibold">POD TOTAL</p>
            <p className="text-lg font-bold">{data.approvedTrips}</p>
          </div>
          <div className="bg-blue-600 text-white rounded-lg shadow-md p-4 w-28 text-center">
            <p className="text-xs font-semibold">POD DITUNGGU</p>
            <p className="text-lg font-bold">{data.pendingTrips}</p>
          </div>
          <div className="bg-blue-600 text-white rounded-lg shadow-md p-4 w-28 text-center">
            <p className="text-xs font-semibold">POD DITERIMA</p>
            <p className="text-lg font-bold">{data.finishedTrips}</p>
          </div>
        </div>
      )}
    </div>
  );
}
