interface CustomPayloadProps {
  payload: any;
}

const CustomPayload = ({ payload }: CustomPayloadProps) => {
  return (
    <div className="rounded-lg bg-background p-2 text-center text-sm">
      {/* <p>{label}</p> */}
      <p>
        {payload[0].payload?.books <= 1
          ? `${payload[0].payload?.books} book`
          : `${payload[0].payload?.books} books`}
      </p>
      <p>
        {payload[0].payload?.pages <= 1
          ? `${payload[0].payload?.pages} page`
          : `${payload[0].payload?.pages} pages`}
      </p>
    </div>
  );
};

export const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: any;
  label?: any;
}) => {
  if (active && payload && payload.length) {
    if (payload[0].payload?.pages) {
      return <CustomPayload payload={payload} />;
    }

    return (
      <div className="rounded-lg bg-background p-2 text-center text-sm">
        <p>{label}</p>
        <p>
          {payload[0].value <= 1
            ? `${payload[0].value} book`
            : `${payload[0].value} books`}
        </p>
      </div>
    );
  }

  return null;
};
