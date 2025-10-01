interface Props {
  seconds: number;
}

export default function Time(props: Props) {
  return (
    <>
      {Math.floor(props.seconds / 60)
        .toString()
        .padStart(2, "0")}
      :{(props.seconds % 60).toString().padStart(2, "0")}
    </>
  );
}
