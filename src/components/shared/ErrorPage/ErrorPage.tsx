export interface ErrorPageProps {
  statusCode: number;
  status: string;
  reason?: string;
}

export function ErrorPage(props: ErrorPageProps) {
  const { statusCode, status, reason } = props;
  return (
    <p>
      {statusCode} - {status} - {reason}
    </p>
  );
}
