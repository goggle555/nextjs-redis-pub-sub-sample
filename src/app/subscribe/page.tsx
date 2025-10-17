import { SubscribeMessage } from "./subscribe-message";

const SubscribePage = () => {
  return (
    <div className="m-2 flex gap-2">
      <div>
        <p className="font-bold text-2xl">Redis Subscribe Page</p>
        <ul className="list-disc list-inside">
          <li>
            <a className="underline text-blue-500" href="/publish">
              Publish Page
            </a>
          </li>
          <li>
            <a className="underline text-blue-500" href="/">
              Top Page
            </a>
          </li>
        </ul>
      </div>
      <SubscribeMessage />
    </div>
  );
};

export default SubscribePage;
