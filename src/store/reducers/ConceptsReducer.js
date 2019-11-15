const initialState = {
  loading: false,
  items: [],
}

const Concepts = (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
    case 'CONCEPTS_FETCH_REQUEST':
      return {
        ...state,
        loading: true,
      }
    case 'CONCEPTS_FETCH_RESPONSE':
      return { ...state, loading: false, items: payload }
    case 'CONCEPTS_FETCH_FAILED':
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}

export default Concepts
