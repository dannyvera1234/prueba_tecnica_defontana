export const GET_CHARACTER_QUERY = `
  query ($id: ID!) {
    character(id: $id) {
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
        residents {
          id
          name
        }
      }
      location {
        name
        dimension
        type
        residents {
          id
          name
        }
      }
      episode {
        id
        name
        air_date
        episode
      }
    }
  }
`;
