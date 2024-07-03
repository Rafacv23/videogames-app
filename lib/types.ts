export interface Conference {
  id: string
  name: string
  url?: string
  release_date: string
  time?: string
  year?: string
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
  platforms?: string
  conference_name?: string
  conference_date?: string
  conference_url?: string
}

export type Games = Game[]

export interface ConferenceListProps {
  data: Game[]
  year: string
  searchTerm: string
}

export interface NavBarProps {
  conferences: Conference[]
  nextConference: Conference | null
  searchTerm: string
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  position: string
  setPosition: (value: string) => void
  year: string
  platforms: Platform[]
}

export interface FilterMenuProps {
  conferences: { id: string; name: string }[]
  platforms: Platform[]
}

export interface ConferencesDropdownProps {
  conferences: Conference[]
}

export interface ConferenceLinkProps {
  nextConference: Conference | null
  year: string
}

export interface SearchBarProps {
  searchTerm: string
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export interface SortMenuProps {
  position: string
  setPosition: (value: string) => void
}

export interface Platform {
  id: string
  name: string
  img?: string
  url?: string
  release_date?: string
  manufacturer?: string
}
