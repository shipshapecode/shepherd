const generateGraphiQLHeader = () => {
  return JSON.stringify(
    {
      'auth-provider': 'dbAuth',
      cookie:
        'session=bw3m26yom7fkT6a4pIDT4Z8c1+MM4psSyislMPpZNsk6olubMDTXpuncVUq8mUN7|PctrzLmNNG2blw63N3og8A==',
      authorization: 'Bearer 2',
    },
    null,
    2
  );
};

console.log(generateGraphiQLHeader());

export default generateGraphiQLHeader;
