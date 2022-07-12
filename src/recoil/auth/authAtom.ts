import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

interface AuthProps {
  username: string,
  token: string,
  expire: string
}

const { persistAtom } = recoilPersist({
  key: 'RabbitHoleAuth',
  storage: localStorage,
});

const authAtom = atom<AuthProps | null>({
  key: 'authState', // 해당 atom의 고유 key
  default: null, // 기본값
  effects_UNSTABLE: [persistAtom],
});

export default authAtom;
