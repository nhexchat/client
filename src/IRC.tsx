import ServersAndChans from "./ServersAndChans"
import MessageBox from "./MessageBox"
import ChannelNames from "./ChannelNames"
import { SERV_MSG_NAMES_PANEL_STYLE } from "./style"
import { useState } from "react"

const IRC = ({ servers, names, message }) => {

  const [isServerSelected, setIsServerSelected] = useState(true);

  return (
    <div className={SERV_MSG_NAMES_PANEL_STYLE}>
      {isServerSelected ?
        <>
          <ServersAndChans setIsServerSelected={setIsServerSelected} servers={servers} />
          <MessageBox lines={message} />
        </>
        :
        <>
          <ServersAndChans setIsServerSelected={setIsServerSelected} servers={servers} />
          <MessageBox lines={message} />
          <ChannelNames names={names} />
        </>

      }
    </div>
  )
}

export default IRC
