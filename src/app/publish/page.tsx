import { PublishButton } from "./publish-button";

const PublishPage = () => {
  return (
    <div className="m-2 flex gap-2">
      <div>
        <p className="font-bold text-2xl">Redis Publish Page</p>
        <ul className="list-disc list-inside">
          <li>
            <a className="underline text-blue-500" href="/subscribe">
              Subscribe Page
            </a>
          </li>
          <li>
            <a className="underline text-blue-500" href="/">
              Top Page
            </a>
          </li>
        </ul>
      </div>
      <PublishButton />
    </div>
  );
};

export default PublishPage;
