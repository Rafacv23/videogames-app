import { create } from "zustand"

interface State {
  bears: number
  increase: (by: number) => void
}

interface Action {
  increase: (bears: State["bears"]) => void
}

const useBearStore = create<State & Action>()((set) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
}))
