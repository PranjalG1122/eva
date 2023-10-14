export default function MessageBox({
  user,
  bot,
}: {
  user: string;
  bot: string;
}) {
  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <p className="text-white w-fit bg-user px-4 py-2 rounded ml-auto max-w-lg">
        {user}
      </p>
      <div className="w-full flex flex-row items-start mr-auto max-w-lg bg-bot px-4 py-2 rounded text-ellipsis gap-2">
        {/* <span className="h-10 w-10 rounded-full bg-white" /> */}
        <div className="flex flex-col items-start w-fit">
          <p className="font-semibold text-user">EVA</p>
          <p
            className={
              "text-black w-fit " +
              (bot === "EVA is thinking..." ? "italic" : "")
            }
          >
            {bot}
          </p>
        </div>
      </div>
    </div>
  );
}
