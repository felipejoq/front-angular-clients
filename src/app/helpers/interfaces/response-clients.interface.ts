export interface Response {
  content: any[]
  pageable: Pageable
  last: boolean
  totalPages: number
  totalElements: number
  first: boolean
  size: number
  number: number
  sort: Sort2
  numberOfElements: number
  empty: boolean
}

export interface Pageable {
  sort: Sort
  offset: number
  pageNumber: number
  pageSize: number
  paged: boolean
  unpaged: boolean
}

export interface Sort {
  empty: boolean
  unsorted: boolean
  sorted: boolean
}

export interface Sort2 {
  empty: boolean
  unsorted: boolean
  sorted: boolean
}
