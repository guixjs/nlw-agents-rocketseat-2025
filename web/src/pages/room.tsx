import { Navigate, useParams } from "react-router-dom"


type RoomParam = {
  roomId: string
}



export function Room() {
  const params = useParams<RoomParam>()

  if (!params.roomId) {
    return <Navigate replace to="/" />
  }
  return <div>Room details</div>
}