import React from 'react';
import { useAsync } from 'react-use';
import { Video, Link, Link2 } from 'react-feather';
import ReactMarkdown from 'react-markdown';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

// Error display for the modal body when data is inaccessible
function ErrorModal() {
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Error getting article data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="alert alert-danger" role="alert">
          <strong>Sorry!</strong> Unable to load data. Try again momentarily.
        </div>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </>
  );
}
// Loading animation for the modal body while data is being fetched
function LoadingModal() {
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Getting article data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="col-sm-12 d-flex justify-content-center align-items-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </>
  );
}

function ArticleDescription({ articleData }) {
  return (
    <div id="article-description" className="mb-2 font-italic">
      <div id="article-status">
        {articleData.status.toLowerCase() === 'pass' ? 'Article Passed' : 'Article Failed'}
        {' | '}
        {articleData.for}
        {' Yes,  '}
        {articleData.against}
        {' No,  '}
        {articleData.abstain}
        {' Abstain '}
      </div>
    </div>
  );
}

function ArticleModalWithData({ articleData }) {
  console.log('articleData', articleData);
  const isVideoExplanation = articleData.video;
  const isOfficialLink = articleData.official;
  const isMenotomyMattersLink = articleData.urls && articleData.urls.menotomyMatters;

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{articleData.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ArticleDescription articleData={articleData} />
        {/* <p>{articleData.text} </p> */}
        <ReactMarkdown source={articleData.text} />
      </Modal.Body>
      <Modal.Footer>
        {/* Video explanation button */}
        <Button
          variant="primary"
          disabled={!isVideoExplanation}
          href={isVideoExplanation ? articleData.video : ''}
          target="_blank"
          rel="noopener noreferrer"
          className="d-flex align-items-center"
        >
          <Video size={24} className="pr-2" />
          {!isVideoExplanation && 'No '}Video Explanation
        </Button>

        {/* Official Text Link */}
        <Button
          variant="primary"
          disabled={!isOfficialLink}
          href={isOfficialLink ? articleData.official : ''}
          target="_blank"
          rel="noopener noreferrer"
          className="d-flex align-items-center"
        >
          <Link size={24} className="pr-2" />
          {!isOfficialLink && 'No '}Official Text
        </Button>

        {/* Menotomy Matters Link */}
        <Button
          variant="primary"
          disabled={!isMenotomyMattersLink}
          href={isMenotomyMattersLink ? articleData.urls.menotomyMatters : ''}
          target="_blank"
          rel="noopener noreferrer"
          className="d-flex align-items-center"
        >
          <Link2 size={24} className="pr-2" />
          {!isMenotomyMattersLink && 'No '}Menotomy Matters Link
        </Button>
      </Modal.Footer>
    </>
  );
}

function ArticleModal({ articleId, handleClose }) {
  const apiURL = process.env.REACT_APP_API_BASEURL + process.env.REACT_APP_API_SLUG;
  const articleDataState = useAsync(async () => {
    const response = await fetch(`${apiURL}/article/${articleId}`);
    return await response.json();
  }, [articleId]);

  return (
    <Modal show={articleId !== null} size="lg" onHide={handleClose}>
      {articleDataState.loading ? (
        <LoadingModal />
      ) : articleDataState.error ? (
        <ErrorModal />
      ) : (
        <ArticleModalWithData articleData={articleDataState.value} />
      )}
    </Modal>
  );
}

export default ArticleModal;
