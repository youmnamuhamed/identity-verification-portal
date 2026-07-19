interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({
  title = "Something went wrong",
  message,
  onRetry,
}: ErrorMessageProps) {
  return (
    <div className="rounded-lg border border-rejected/20 bg-rejected-bg p-4">
      <p className="text-sm font-medium text-rejected">{title}</p>
      <p className="mt-1 text-sm text-rejected/80">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-3 text-sm font-medium text-rejected underline underline-offset-2 hover:text-rejected/80"
        >
          Try again
        </button>
      )}
    </div>
  );
}
