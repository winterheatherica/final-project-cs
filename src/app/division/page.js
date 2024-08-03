import DivisionSwitch from "@/components/fragments/divison/division-switch";
import DivisionAbout from "@/components/fragments/divison/division-about";
import DivisionFocus from "@/components/fragments/divison/division-focus";
import DivisionActivity from "@/components/fragments/divison/division-activity";

export default function Division() {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Division Us</h1>
        <p>This is the division page of your Next.js app.</p>
        <DivisionSwitch/>
        <DivisionAbout/>
        <DivisionFocus/>
        <DivisionActivity/>
      </div>
    );
  }
  