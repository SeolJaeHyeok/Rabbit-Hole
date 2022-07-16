import React, { useCallback, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import roomAtom, { ParticipantProps, RoomProps } from '@/recoil/chat/roomAtom';
import chatAtom, { ChatProps } from '@/recoil/chat/chatAtom';
import { useRecoilState, useSetRecoilState } from 'recoil';

export interface newUserMessage{
  message:string,
  clientList:ParticipantProps[],
  time: string,
}

export default function useSocket() {
  const [chatSocket, setChatSocket] = useState<Socket|null>(null);
  const [siteSocket, setSiteSocket] = useState<Socket|null>(null);
  const [chat, setChat] = useRecoilState(chatAtom); // 접속중인 방의 채팅
  const setRoom = useSetRecoilState(roomAtom); // 전체 채팅방
  const [newChat, setNewChat] = useState<(newUserMessage | ChatProps)>();

  useEffect(() => {
    if (newChat)setChat([...chat, newChat]);
  }, [newChat]);

  useEffect(() => {
    if (!chatSocket || !siteSocket) {
      setChatSocket(io('http://localhost:8080/chat'));
      setSiteSocket(io('http://localhost:8080/site'));
    }
    if (chatSocket && chatSocket.disconnected) {
      chatSocket.connect();
    }
    if (siteSocket && siteSocket.disconnected) {
      siteSocket.connect();
    }
    return () => {
      if (siteSocket)siteSocket.disconnect();
      if (chatSocket)chatSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (siteSocket) {
      siteSocket.on('connect', () => { console.log('siteSocket connected'); });
    }
  }, [siteSocket]);

  useEffect(() => {
    if (chatSocket) {
      chatSocket.on('connect', () => {
        console.log('chatSocket connected');
      });
      // 채팅방 목록 fetch
      chatSocket.on('showRoomList', (data) => {
        console.log(data);
        if (data.length === 0) {
          setRoom([{ roomName: 'Room-전체', participants: [] }]);
        } else {
          setRoom(data);
        }
      });
      // 채팅방 입장 메시지
      chatSocket.on('updateForNewUser', (data:newUserMessage) => {
        setNewChat(data);
        chatSocket.emit('fetchRoom');
      });
      // 채팅 목록 업데이트
      chatSocket.on('responseMessage', (data:newUserMessage|ChatProps) => {
        setNewChat(data);
      });
    }
  }, [chatSocket]);

  return [siteSocket, chatSocket];
}
