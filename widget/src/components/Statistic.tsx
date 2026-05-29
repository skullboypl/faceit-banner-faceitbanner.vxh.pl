export const Statistic = ({
  color,
  value,
  text,
}: {
  color: 'green' | 'red';
  value: string;
  text: string;
}) => {
  return (
    <div className={`stat ${color}`}>
      <p className={'stat-value'}>{value}</p>
      <small className={'stat-label'}>{text}</small>
    </div>
  );
};
