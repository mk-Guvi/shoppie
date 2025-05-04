import { Button } from "../components/ui/button";
import { toast } from "sonner"


function HomePage() {
  return (
    <div className="container flex gap-2 flex-col items-center justify-center overflow-auto h-full">
      <h1>HomePage</h1>
      <Button onClick={()=>{
        toast("Hello World Deployed")
      }}>Click</Button>
    </div>
  );
}

export default HomePage;
