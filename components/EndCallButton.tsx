import React from 'react'
import { Button } from './ui/button'
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation';

const EndCallButton = () => {
    const call = useCall();
    const router = useRouter();

    if (!call) throw new Error('useStreamCall must be used within a StreamCall component.');

    const { useLocalParticipant } = useCallStateHooks();
    const localParticipant = useLocalParticipant();

    const isMeetingHost = 
    localParticipant && 
    call.state.createdBy && 
    call.state.createdBy.id === localParticipant.userId;

    if (!isMeetingHost) return null;

    const endCall = async () => {
        await call.endCall();
        // router.push('/');
        window.location.href = '/';
    }

  return (
    <Button onClick={endCall} className="bg-red-500">
      End call for everyone
    </Button>
  )
}

export default EndCallButton