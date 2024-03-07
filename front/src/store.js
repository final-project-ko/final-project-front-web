import create from 'zustand';

const useStore = create((set) => ({
  userId: '', // 초기 상태 설정
  auth: '',
  setUserInfo: (userId, auth) => set({ userId, auth }), // 사용자 정보 설정 함수
}));

export default useStore;