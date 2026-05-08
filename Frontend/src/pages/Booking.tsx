import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { fallbackRooms } from "@/services/api";
import { toast } from "sonner";

const steps = ["Select Room", "Your Details", "Confirmation"];

const Booking = () => {
  const rooms = fallbackRooms;

  const [step, setStep] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  // ✅ availability + roomIds
  const [available, setAvailable] = useState<{ [key: string]: number }>({});
  const [roomIds, setRoomIds] = useState<{ [key: string]: number[] }>({});
  const [loadingAvail, setLoadingAvail] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    checkin: "",
    checkout: "",
    roomId: "", // manual
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const selectedRoomData = rooms.find((r) => r.id === selectedRoom);

  // ✅ CHECK AVAILABILITY (FIXED)
  const checkAvailability = async (room: any) => {
    if (!form.checkin || !form.checkout) {
      toast.error("Please select check-in & check-out first");
      return;
    }

    setLoadingAvail(true);

    try {
      const res = await fetch(
        `http://localhost:8080/api/bookings/availability?roomName=${room.name}&checkIn=${form.checkin}&checkOut=${form.checkout}`
      );

      const data = await res.json();

      console.log("AVAILABLE:", data);

      setAvailable((prev) => ({
        ...prev,
        [room.id]: data.available ?? 0,
      }));

      setRoomIds((prev) => ({
        ...prev,
        [room.id]: data.roomIds ?? [],
      }));

    } catch (err) {
      console.error(err);

      setAvailable((prev) => ({ ...prev, [room.id]: 0 }));
      setRoomIds((prev) => ({ ...prev, [room.id]: [] }));
    } finally {
      setLoadingAvail(false);
    }
  };

  // ✅ SUBMIT
  const handleSubmit = async () => {
  if (!form.name || !form.email || !form.checkin || !form.checkout) {
    toast.error("Please fill all required fields");
    return;
  }

  if (!form.roomId) {
    toast.error("Please enter Room ID");
    return;
  }

  setSubmitting(true);

  try {
    const res = await fetch("http://localhost:8080/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        phone: form.phone,
        roomId: form.roomId,
        checkIn: form.checkin,
        checkOut: form.checkout,
      }),
    });

    const data = await res.json();
    console.log("BOOKING:", data);

    setSuccess(true);

  } catch (err) {
    console.error(err);
    toast.error("Booking failed");
  } finally {
    setSubmitting(false);
  }
};

  // ✅ SUCCESS PAGE
  if (success) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center glass p-16 max-w-lg mx-auto"
        >
          <CheckCircle2 size={64} className="text-gold mx-auto mb-6" />
          <h2 className="text-3xl mb-4">Booking Confirmed!</h2>
          <p>Room: {selectedRoomData?.name}</p>
          <p>Room ID: {form.roomId}</p>
          <p>{form.checkin} → {form.checkout}</p>
        </motion.div>
      </div>
    );
  }

  const inputClass =
    "w-full bg-muted/50 border border-border/60 px-4 py-3 text-sm";

  return (
    <div className="pt-20">
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <SectionHeading title="Book Your Stay" />

          {/* STEP UI */}
          <div className="flex justify-center gap-4 mb-10">
            {steps.map((s, i) => (
              <div key={s}>
                <span>{i + 1}. {s}</span>
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">

            {/* ================= STEP 1 ================= */}
            {step === 0 && (
              <motion.div key="step0">

                {/* ✅ CHECK-IN / CHECK-OUT MOVED HERE */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <input
                    type="date"
                    value={form.checkin}
                    onChange={(e) =>
                      setForm({ ...form, checkin: e.target.value })
                    }
                    className={inputClass}
                  />

                  <input
                    type="date"
                    value={form.checkout}
                    onChange={(e) =>
                      setForm({ ...form, checkout: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>

                <div className="grid md:grid-cols-4 gap-6">

                  {rooms.map((room) => (
                    <div
                      key={room.id}
                      className={`p-4 border ${
                        selectedRoom === room.id
                          ? "border-gold"
                          : "border-gray-500"
                      }`}
                    >
                      <img
                        src={room.image}
                        className="w-full h-40 object-cover"
                      />

                      <h3>{room.name}</h3>
                      <p>₹{room.price}</p>

                      {/* CHECK AVAILABILITY */}
                      <button
                        onClick={() => checkAvailability(room)}
                        className="bg-blue-500 px-3 py-1 mt-2"
                      >
                        {loadingAvail ? "Checking..." : "Check Availability"}
                      </button>

                      {/* AVAILABLE */}
                      {available[room.id] !== undefined && (
                        <p className="mt-2 text-green-400">
                          Available: {available[room.id]}
                        </p>
                      )}

                      {/* ROOM IDS */}
                      {roomIds[room.id]?.length > 0 && (
                        <p className="text-xs text-yellow-300">
                          Room IDs: {roomIds[room.id].join(", ")}
                        </p>
                      )}

                      {/* FULL */}
                      {available[room.id] === 0 && (
                        <p className="text-red-500 text-xs">
                          Fully Booked
                        </p>
                      )}

                      {/* SELECT */}
                      <button
                        disabled={available[room.id] === 0}
                        onClick={() => setSelectedRoom(room.id)}
                        className="bg-gold px-4 py-2 mt-3 disabled:opacity-30"
                      >
                        Select
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    disabled={!selectedRoom}
                    onClick={() => setStep(1)}
                    className="bg-gold px-6 py-2"
                  >
                    Next →
                  </button>
                </div>
              </motion.div>
            )}

            {/* ================= STEP 2 ================= */}
            {step === 1 && (
              <motion.div key="step1" className="max-w-md mx-auto">

                <input
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className={inputClass}
                />

                <input
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  className={inputClass}
                />

                <input
                  placeholder="Phone"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                  className={inputClass}
                />

                {/* ✅ manual room ID */}
                <input
                  placeholder="Enter Room ID"
                  value={form.roomId}
                  onChange={(e) =>
                    setForm({ ...form, roomId: e.target.value })
                  }
                  className={inputClass}
                />

                <div className="flex justify-between mt-6">
                  <button onClick={() => setStep(0)}>← Back</button>
                  <button onClick={() => setStep(2)}>Next →</button>
                </div>
              </motion.div>
            )}

            {/* ================= STEP 3 ================= */}
            {step === 2 && (
              <motion.div key="step2" className="text-center">

                <h3>Confirm Booking</h3>

                <p>Name: {form.name}</p>
                <p>Email: {form.email}</p>
                <p>Phone: {form.phone}</p>
                <p>Room: {selectedRoomData?.name}</p>
                <p>Room ID: {form.roomId}</p>
                <p>{form.checkin} → {form.checkout}</p>

                <div className="mt-4">
                  <input placeholder="Card Number" className={inputClass} />
                  <input placeholder="MM/YY" className={inputClass} />
                  <input placeholder="CVV" className={inputClass} />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="bg-gold px-6 py-2 mt-4"
                >
                  {submitting ? "Processing..." : "Confirm"}
                </button>

              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default Booking;