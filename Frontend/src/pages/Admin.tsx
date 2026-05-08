import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BedDouble,
  CalendarDays,
  DollarSign,
  Users,
  Plus,
  Trash2,
  Edit,
} from "lucide-react";

import SectionHeading from "@/components/SectionHeading";
import { useApi } from "@/hooks/useApi";
import {
  getRooms,
  getBookings,
  getDashboardStats,
  addRoom,
  updateRoom,
  deleteRoom,
} from "@/services/api";

type Tab = "dashboard" | "rooms" | "bookings" | "customers";

const Admin = () => {
  const [tab, setTab] = useState<Tab>("dashboard");

  // ✅ API
  const { data: rooms } = useApi(getRooms);
  const { data: bookings } = useApi(getBookings);
  const { data: statsData } = useApi(getDashboardStats);

  // ✅ STATES
  const [newRoom, setNewRoom] = useState({
    name: "",
    price: "",
    capacity: "",
  });

  const [editingRoom, setEditingRoom] = useState<any>(null);

  // ✅ ADD ROOM
  const handleAddRoom = async () => {
    if (!newRoom.name) return alert("Enter room name");

    await addRoom({
      name: newRoom.name,
      price: Number(newRoom.price),
      capacity: Number(newRoom.capacity),
    });

    window.location.reload();
  };

  // ✅ DELETE ROOM
  const handleDelete = async (id: number) => {
    await deleteRoom(id);
    window.location.reload();
  };

  // ✅ UPDATE ROOM
  const handleUpdate = async () => {
    await updateRoom(editingRoom.id.toString(), editingRoom);
    window.location.reload();
  };

  const tabs = [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "rooms", label: "Rooms", icon: BedDouble },
    { key: "bookings", label: "Bookings", icon: CalendarDays },
    { key: "customers", label: "Customers", icon: Users },
  ];

  return (
    <div className="pt-20 min-h-screen">
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <SectionHeading subtitle="Management" title="Admin Panel" />

          {/* TABS */}
          <div className="flex gap-2 mb-12 justify-center flex-wrap">
            {tabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setTab(key as Tab)}
                className={`flex items-center gap-2 px-5 py-2 ${
                  tab === key
                    ? "bg-gold text-black"
                    : "bg-gray-800 text-gray-300"
                }`}
              >
                <Icon size={16} /> {label}
              </button>
            ))}
          </div>

          {/* ================= DASHBOARD ================= */}
          {tab === "dashboard" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              
              {/* STATS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <div className="bg-gray-900 p-6 text-center">
                  <p className="text-2xl">{statsData?.totalBookings || 0}</p>
                  <p>Total Bookings</p>
                </div>

                <div className="bg-gray-900 p-6 text-center">
                  <p className="text-2xl">₹{statsData?.revenue || 0}</p>
                  <p>Revenue</p>
                </div>

                <div className="bg-gray-900 p-6 text-center">
                  <p className="text-2xl">{statsData?.occupancy || 0}%</p>
                  <p>Occupancy</p>
                </div>

                <div className="bg-gray-900 p-6 text-center">
                  <p className="text-2xl">{statsData?.totalGuests || 0}</p>
                  <p>Total Guests</p>
                </div>
              </div>

              {/* RECENT BOOKINGS */}
              <div className="bg-gray-900 p-6">
                <h3 className="mb-4 text-lg">Recent Bookings</h3>

                <table className="w-full border border-gray-600">
                  <thead className="bg-gray-800">
                    <tr>
                      <th className="p-2">ID</th>
                      <th className="p-2">Customer</th>
                      <th className="p-2">Room</th>
                      <th className="p-2">Check-In</th>
                    </tr>
                  </thead>

                  <tbody>
                    {bookings?.slice(0, 5).map((b: any) => (
                      <tr key={b.id} className="border-t">
                        <td className="p-2">{b.id}</td>
                        <td className="p-2">{b.customer?.name}</td>
                        <td className="p-2">{b.room?.name}</td>
                        <td className="p-2">{b.checkIn}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* ================= ROOMS ================= */}
          {tab === "rooms" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

              {/* ADD ROOM */}
              <div className="flex gap-2 mb-4 justify-end">
                <input
                  placeholder="Name"
                  value={newRoom.name}
                  onChange={(e) =>
                    setNewRoom({ ...newRoom, name: e.target.value })
                  }
                  className="px-2 py-1 text-black"
                />

                <input
                  placeholder="Price"
                  value={newRoom.price}
                  onChange={(e) =>
                    setNewRoom({ ...newRoom, price: e.target.value })
                  }
                  className="px-2 py-1 text-black"
                />

                <input
                  placeholder="Capacity"
                  value={newRoom.capacity}
                  onChange={(e) =>
                    setNewRoom({ ...newRoom, capacity: e.target.value })
                  }
                  className="px-2 py-1 text-black"
                />

                <button
                  onClick={handleAddRoom}
                  className="bg-gold px-4 py-2"
                >
                  <Plus size={14} /> Add
                </button>
              </div>

              {/* TABLE */}
              <table className="w-full border border-gray-600">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="p-2">Room</th>
                    <th className="p-2">Price</th>
                    <th className="p-2">Capacity</th>
                    <th className="p-2">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {rooms?.map((r: any) => (
                    <tr key={r.id} className="border-t">
                      <td className="p-2">
                        ID: {r.id} - {r.name}
                      </td>
                      <td className="p-2">₹{r.price}</td>
                      <td className="p-2">{r.capacity}</td>
                      <td className="p-2 flex gap-2">
                        <Edit
                          size={15}
                          onClick={() => setEditingRoom(r)}
                        />
                        <Trash2
                          size={15}
                          onClick={() => handleDelete(r.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* UPDATE */}
              {editingRoom && (
                <div className="mt-4 flex gap-2">
                  <input
                    value={editingRoom.name}
                    onChange={(e) =>
                      setEditingRoom({
                        ...editingRoom,
                        name: e.target.value,
                      })
                    }
                    className="px-2 py-1 text-black"
                  />

                  <input
                    value={editingRoom.price}
                    onChange={(e) =>
                      setEditingRoom({
                        ...editingRoom,
                        price: Number(e.target.value),
                      })
                    }
                    className="px-2 py-1 text-black"
                  />

                  <input
                    value={editingRoom.capacity}
                    onChange={(e) =>
                      setEditingRoom({
                        ...editingRoom,
                        capacity: Number(e.target.value),
                      })
                    }
                    className="px-2 py-1 text-black"
                  />

                  <button
                    onClick={handleUpdate}
                    className="bg-green-600 px-4 py-2"
                  >
                    Update
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* ================= BOOKINGS ================= */}
          {tab === "bookings" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <table className="w-full border border-gray-600">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="p-2">ID</th>
                    <th className="p-2">Customer</th>
                    <th className="p-2">Room</th>
                    <th className="p-2">Check-In</th>
                    <th className="p-2">Check-Out</th>
                  </tr>
                </thead>

                <tbody>
                  {bookings?.map((b: any) => (
                    <tr key={b.id} className="border-t">
                      <td className="p-2">{b.id}</td>
                      <td className="p-2">{b.customer?.name}</td>
                      <td className="p-2">{b.room?.name}</td>
                      <td className="p-2">{b.checkIn}</td>
                      <td className="p-2">{b.checkOut}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}

          {/* ================= CUSTOMERS ================= */}
          {tab === "customers" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <table className="w-full border border-gray-600">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="p-2">ID</th>
                    <th className="p-2">Name</th>
                    <th className="p-2">Email</th>
                  </tr>
                </thead>

                <tbody>
                  {bookings?.map((b: any) => (
                    <tr key={b.customer?.id} className="border-t">
                      <td className="p-2">{b.customer?.id}</td>
                      <td className="p-2">{b.customer?.name}</td>
                      <td className="p-2">{b.customer?.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Admin;