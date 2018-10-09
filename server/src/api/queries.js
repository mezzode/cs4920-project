var queries = require('./apiTokens');

exports.entryA = `
query ($id: Int) { 
  Media (id: $id, type: ANIME) {
    id
    title {
      english
    }
  }
}
`;

exports.searchA = `

`;

exports.apiKeys = {
  'gameKey': '79769a8f06d18985b556a6168b26fbe5'
};
