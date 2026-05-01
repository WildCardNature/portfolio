import { useStore } from "./state/store";
import CRTOverlay from "./components/crt/CRTOverlay";
import PostScreen from "./components/boot/PostScreen";
import DosTerminal from "./components/dos/DosTerminal";
import Win31Boot from "./components/boot/Win31Boot";
import Desktop from "./components/win31/Desktop";

function App() {
  const phase = useStore((s) => s.phase);
  const crtEffects = useStore((s) => s.crtEffects);

  return (
    <>
      <CRTOverlay enabled={crtEffects} />
      {phase === "post" && <PostScreen />}
      {phase === "dos" && <DosTerminal />}
      {phase === "win31-boot" && <Win31Boot />}
      {phase === "win31" && <Desktop />}
    </>
  );
}

export default App;
