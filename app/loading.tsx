export default function Loading() {
  return (
    <div role="status" aria-live="polite" className="flex items-center justify-center h-96">
      <div 
        role="status"
        aria-hidden="true" 
        className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"
      ></div>
    </div>
  );
}
