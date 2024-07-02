export interface Conference {
  id: string
  name: string
  url?: string
  release_date: string
  time?: string
}

export type Conferences = Conference[]

export interface Game {
  id: string
  name: string
  description: string
  developer: string
  publisher: string
  release_date: string
  img: string
  trailer: string
  url?: string
  dlc?: string
  remaster?: string
  early_access?: string
}

export type Games = Game[]