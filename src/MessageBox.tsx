import { useRef } from "react";
import { emit, listen } from '@tauri-apps/api/event';
import { MessageBoxLines } from './lib/types';
import { nickFromPrefix } from './lib/common';
import nickColor from './lib/nickColor';

interface Props {
  lines: MessageBoxLines;
};

export default function MessageBox(props: Props) {
  const mbRef = useRef(null);

  listen("nhex://servers_and_chans/selected", () => {
    mbRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  });

  return (
    <div>
      <div className="min-w-[600px] h-[600px] overflow-y-auto border">
        <div id="message_area" ref={mbRef}>
          {props.lines.map(({ message, isUs }, i) => {
            if (message.command.toLowerCase() === "privmsg") {
              const nick = nickFromPrefix(message.prefix);
              const color = nickColor(nick);

              return (
                <>
                  <div id={`mb_line_${i}`}>
                    &lt;<span
                      className={`name ${isUs ? 'ourName' : ''}`}
                      style={{ color }}>
                      {nick}
                    </span>&gt;
                    <span className={`message ${isUs ? 'ourMessage' : ''}`}>
                      {message.params.slice(1).join(" ")}
                    </span>
                  </div>
                </>
              );
            }
            return (
              <>
                <div id={`mb_line_${i}`}>
                  {message.raw}
                </div>
              </>
            );
          })}
        </div>
      </div>
      <div>
        <input type="text" className="w-full bg-zinc-900 " onKeyDown={(e) => {
          if (e.key === "Enter") {
            const userInput = e.currentTarget.value;
            e.currentTarget.value = "";

            const uiSplit = userInput.split(" ");
            let command = "privmsg";

            if (userInput[0] === "/") {
              command = uiSplit[0].slice(1);
            }

            const args = uiSplit.slice((command === "privmsg") ? 0 : 1);
            emit("nhex://user_input/raw", {
              raw: userInput,
              command,
              args,
              argsStr: args.join(" "),
            }).catch(console.error);
          }
        }} />
      </div>
    </div>
  );
}
