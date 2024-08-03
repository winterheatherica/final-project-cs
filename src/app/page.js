import Banner from "@/components/fragments/home/banner";
import RecentEvent from "@/components/fragments/home/recent-event";
import DivisionButton from "@/components/fragments/home/division-button";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Home Us</h1>
      <p>This is the home page of your Next.js app.</p>
      <Banner/>
      <RecentEvent/>
      <DivisionButton/>
    </div>
  );
}
