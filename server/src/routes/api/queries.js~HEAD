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
    }
  }
}
`;

exports.apiKeys = {
  'gameKey': '79769a8f06d18985b556a6168b26fbe5',
  'filmKey': '60499dc6462cce225388f95c2412a563'
};

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
    fields: ['id', 'name', 'summary'],
    limit: '20',
    offset: (page - 1) * 20,
    //order: 'name:asc',
    scroll: 1,
    search: name,
  };
}
