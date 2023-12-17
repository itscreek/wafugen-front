interface SpeedMeterProps {
  tsuriScore: number;
  isLoading: boolean;
};

const SpeedMeter = (props: SpeedMeterProps) => {
  return (
    <div>
      {props.isLoading ? 'loading...' : props.tsuriScore}
    </div>
  );
};

export default SpeedMeter;