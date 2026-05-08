import SectionHeading from "@/components/SectionHeading";
import RoomCard from "@/components/RoomCard";
import { fallbackRooms } from "@/services/api"; // already exists

const Rooms = () => {
  return (
    <div className="pt-20">
      <section className="py-24 px-6">
        <div className="container mx-auto">

          <SectionHeading
            subtitle="Accommodations"
            title="Our Rooms & Suites"
            description="Luxury static rooms (no backend)"
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {fallbackRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>

        </div>
      </section>
    </div>
  );
};

export default Rooms;