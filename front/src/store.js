import create from 'zustand';

const useStore = create((set) => ({
  userId: '', // 초기 상태 설정
  auth: '',
  userName: '', // 초기 상태 설정
  userEmail: '', // 초기 상태 설정
  setUserInfo: (userId,auth, userName, userEmail) => set({ userId,auth, userName, userEmail }), // 사용자 정보 설정 함수
}));

export default useStore;