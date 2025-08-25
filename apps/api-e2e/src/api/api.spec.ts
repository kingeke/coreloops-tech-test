describe('GET /api', () => {
  it('should return a message', () => {
    // very simple test with no logic because we don't have an endpoint set up for api -will eventually test the auth endpoints
    const text = 'hello';
    expect(text).toEqual('hello');
  });
});
