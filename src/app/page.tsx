export default function Home() {
  return (
    <div className="m-2">
      <p className="font-bold text-2xl">Next.js Redis Pub/Sub Sample</p>
      <ul className="list-disc list-inside">
        <li>
          <a className="underline text-blue-500" href="/publish">
            Publish Page
          </a>
        </li>
        <li>
          <a className="underline text-blue-500" href="/subscribe">
            Subscribe Page
          </a>
        </li>
      </ul>
    </div>
  );
}
