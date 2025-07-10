import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";

const isRecordingSuport =
  !!navigator.mediaDevices
  && typeof navigator.mediaDevices.getUserMedia === 'function'
  && typeof window.MediaRecorder === 'function'



export function RecordRoomAudio() {

  const [isRecording, setIsRecording] = useState(false)
  const recorder = useRef<MediaRecorder | null>(null)

  function stopRecord() {
    setIsRecording(false)
    if (recorder.current && recorder.current.state !== "inactive") {
      recorder.current.stop()
    }
  }

  async function startRecording() {
    if (!isRecordingSuport) {
      alert('Seu navegador não suporta gravação')
      return
    }
    setIsRecording(true)


    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100,
      },
    })

    recorder.current = new MediaRecorder(audio, {
      mimeType: "audio/webm",
      audioBitsPerSecond: 64_000,
    })
    recorder.current.ondataavailable = event => {
      if (event.data.size > 0) {
        console.log(event.data)
      }
    }
    recorder.current.onstart = () => {
      console.log("gravação iniciada")
    }
    recorder.current.onstop = () => {
      console.log("gravação pausada")
    }
    recorder.current.start()
  }


  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3">

      {isRecording ?
        <Button onClick={stopRecord} >Parar gravação</Button>
        : <Button onClick={startRecording} >Iniciar gravação</Button>
      }
    </div>
  )
}