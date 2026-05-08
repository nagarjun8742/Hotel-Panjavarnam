import SectionHeading from "@/components/SectionHeading";

const sections = [
  { title: "1. Reservations & Cancellations", content: "All reservations are subject to availability. Cancellations made 72 hours prior to arrival will receive a full refund. Late cancellations or no-shows will be charged one night's stay. Group bookings of 10 or more rooms require 14 days notice for cancellation." },
  { title: "2. Check-in & Check-out", content: "Standard check-in time is 3:00 PM and check-out is 11:00 AM. Early check-in and late check-out are subject to availability and may incur additional charges. 24-hour check-in/out is available for Privilege members." },
  { title: "3. Guest Policies", content: "A valid government-issued photo ID is required at check-in. The minimum check-in age is 18 years. All guests must be registered at the front desk. Additional guests beyond room capacity may incur extra person charges." },
  { title: "4. Payment Terms", content: "We accept all major credit cards, bank transfers, and digital payments. A pre-authorization hold will be placed on your credit card at check-in to cover incidentals. All rates are quoted in USD and are subject to applicable taxes." },
  { title: "5. Property Rules", content: "Aurelian is a non-smoking property. Smoking is permitted only in designated outdoor areas. Pets are welcome in select room categories with prior arrangement and applicable pet fees. Quiet hours are observed from 10:00 PM to 7:00 AM." },
  { title: "6. Liability", content: "The hotel is not responsible for loss or damage to personal belongings. In-room safes are provided for valuables. The hotel reserves the right to refuse service or ask guests to vacate the premises for violation of hotel policies." },
];

const Terms = () => (
  <div className="pt-20">
    <section className="py-28 px-6">
      <div className="container mx-auto max-w-3xl">
        <SectionHeading subtitle="Legal" title="Terms & Conditions" />
        <div className="space-y-10">
          {sections.map((s) => (
            <div key={s.title}>
              <h3 className="font-heading text-xl text-foreground mb-3">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-[1.9]">{s.content}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground/60 mt-16 text-center">Last updated: April 2026</p>
      </div>
    </section>
  </div>
);

export default Terms;
