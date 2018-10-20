exports.entryA = `
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

exports.searchA = `query ($page: Int, $perPage: Int, $search: String) {
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

exports.gameFetchQuery = function (id) {
  return {
    ids: [id],
    fields: [
      'id',
      'name',
      'summary',
      'category',
      'genres.name',
      'themes.name',
      'publishers.name',
      'developers.name',
      'first_release_date',
      'status',
      'cover',
    ],
    expand: [
      'genres',
      'themes',
      'publishers',
      'developers',
    ],

  };
}

exports.gameSearchQuery = function (name, page) {
  return {
    fields: ['id', 'name', 'summary', 'cover'],
    limit: '20',
    offset: (page - 1) * 20,
    //order: 'name:asc',
    scroll: 1,
    search: name,
  };
}
