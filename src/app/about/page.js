import Desc from "@/components/fragments/about/desc";
import Vision from "@/components/fragments/about/vision";
import Mission from "@/components/fragments/about/mission";
import History from "@/components/fragments/about/history";

export default function About() {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">About Us</h1>
        <p>This is the about page of your Next.js app.</p>
        <Desc/>
        <Vision/>
        <Mission/>
        <History/>
      </div>
    );
  }