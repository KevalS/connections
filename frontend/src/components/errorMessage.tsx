export const ErrorMessage = ({ error }: { error: string | null }) => {
  if (!error) return null;
  return (
    <p style={{ margin: "5px 0 0 0", fontSize: 12, color: "#d32f2f" }}>
      {error}
    </p>
  );
};
