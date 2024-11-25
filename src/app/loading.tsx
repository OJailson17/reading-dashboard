import { ImSpinner2 } from 'react-icons/im';

export default function LoadingScreen() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <ImSpinner2 className="animate-spin" />
    </div>
  );
}
