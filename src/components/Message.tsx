interface MessageProps {
  message: string;
  type: 'error' | 'success' | 'info' | '';
}

export function Message({ message, type }: MessageProps) {
  if (!message || !type) return null;

  const bgColor = {
    error: 'rgba(255, 100, 100, 0.2)',
    success: 'rgba(100, 255, 100, 0.2)',
    info: 'rgba(100, 200, 255, 0.2)',
  }[type];

  const textColor = {
    error: '#FF6464',
    success: '#64FF64',
    info: '#64C8FF',
  }[type];

  return (
    <div
      className="text-center p-2 rounded-sm mb-2 animate-in fade-in text-sm"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        fontWeight: 'bold',
      }}
    >
      {message}
    </div>
  );
}
