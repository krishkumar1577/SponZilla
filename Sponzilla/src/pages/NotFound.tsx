import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <p className="text-8xl font-bold text-[#121516]">404</p>
      <p className="mt-4 text-xl font-semibold text-[#121516]">Page not found</p>
      <p className="mt-2 text-sm text-[#617989] max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center justify-center rounded-xl bg-[#121516] px-6 py-3 text-sm font-bold text-white hover:bg-[#2a2d2f] transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
