import EventSwitch from "@/components/fragments/event/event-switch";
import EventInternal from "@/components/fragments/event/event-internal";
import EventExternal from "@/components/fragments/event/event-external";

export default function Event() {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Event Us</h1>
        <p>This is the event page of your Next.js app.</p>
        <EventSwitch/>
        <EventInternal/>
        <EventExternal/>
      </div>
    );
  }
  