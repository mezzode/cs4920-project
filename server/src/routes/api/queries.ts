export const entryA = `
query ($id: Int) {
  Media(id: $id, type: ANIME) {
    id
    title {
      romaji
    }
    format
    status
    description
    genres
    startDate {
      year
      month
      day
    }
    endDate {
      year
      month
      day
    }
    episodes
    coverImage {
      extraLarge
      medium
    }
  }
}
`;

export const searchA = `query ($page: Int, $perPage: Int, $search: String) {
  Page (page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media (search: $search) {
      id
      title {
        romaji
      }
      description
      coverImage {
        extraLarge
        medium
      }
    }
  }
}
`;

export const gameSearchQuery = (name: string, page: number) => ({
    // order: 'name:asc',
    fields: ['id', 'name', 'summary', 'cover'],
    limit: '20',
    offset: (page - 1) * 20,
    scroll: 1,
    search: name,
});
