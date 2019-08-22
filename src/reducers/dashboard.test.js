import reducer from './dashboard';
describe('test reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(
            {
                loading: false,
                fetchError: null,
                leads: [],
                currentLead: {}
            }
        )
    })
})