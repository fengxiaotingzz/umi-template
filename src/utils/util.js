export const handlePayload = ({state, key, action}) => {
    return {
        ...state,
        [key]: {
            ...state[key],
            ...action.payload
        }
    }
}

export const handleClearCondition = ({state, defaultCondition, key = 'condition'}) => {
    return {
        ...state,
        [key]: {
            ...state[key],
            ...defaultCondition
        }
    }
}