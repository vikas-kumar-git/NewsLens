function SkeletonCard() {
  return (
    <div className="animate-pulse bg-gray-200 dark:bg-gray-700 p-4 rounded-lg">
      <div className="h-40 bg-gray-300 dark:bg-gray-600 rounded mb-3"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-2"></div>
      <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
    </div>
  );
}
export default SkeletonCard