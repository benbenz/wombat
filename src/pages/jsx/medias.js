import { useRouter } from 'next/router';

export default function Medias() {
  const router = useRouter();
  let withReset = (router.query['reset'])
    return (
      <h1 className="text-2xl font-semibold">This is the MEDIAS page (JSX{withReset && " with CSS reset"})</h1>
    )
  }