import manifestSchema from '../index';

describe('@xsightme/manifest-schema-definition', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('Schema should be with draft 07', async () => {
    expect(manifestSchema.$schema).toBe('http://json-schema.org/draft-07/schema#');
  });
});
