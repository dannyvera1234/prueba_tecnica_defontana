export const GET_CHARACTERS_QUERY = `
  query ($name: String, $species: String, $status: String, $page: Int) {
    characters(filter: { name: $name, species: $species, status: $status }, page: $page) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        status
        species
        type
        gender
        image
        created
        origin {
          name
        }
        location {
          name
        }
        episode {
          id
          name
        }
      }
    }
  }
`;
