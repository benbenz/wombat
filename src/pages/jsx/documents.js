import { useRouter } from 'next/router';

export default function Docs() {
  const router = useRouter();
  let withReset = (router.query['reset'])
    return (
      <h1 className="text-2xl font-semibold">This is the DOCUMENTS page (JSX{withReset && " with CSS reset"})</h1>
    )
  }