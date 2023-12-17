import { LogoRader, LogoResult } from "@pages/content/ui/logo";

interface SpeedMeterProps {
  tsuriScore: number;
  isLoading: boolean;
};

const SpeedMeter = (props: SpeedMeterProps) => {
  const size = 30;
  return (
    <div>
      {props.isLoading ? <LogoRader size={size}/> : <LogoResult size={size} score={props.tsuriScore}/> }
    </div>
  );
};

export default SpeedMeter;