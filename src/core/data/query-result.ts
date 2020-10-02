export type QueryResult<T> = {
  data: T[],
  total: number
}

export const emptyQueryResult = {
  data: [],
  total: 0
};
