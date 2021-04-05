import React, { useEffect } from 'react';

function ArticleModal({ articleId }) {
  useEffect(() => {
    // TODO: Fetch API for article info using the /article/id endpoint
    console.log(articleId);
  }, [articleId]);

  return <span>{articleId}</span>;
}

export default ArticleModal;
