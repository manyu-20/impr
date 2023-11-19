
import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const SummaryPage = ({ match }) => {
  const [jsonText, setJsonText] = useState('');
  const [editedText, setEditedText] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const location = useLocation();
  const [showLoader, setShowLoder] = useState(false);


  useEffect(() => {
    console.log("use effect is running");
    const params = new URLSearchParams(location.search);
    let url = params.get('url');

    if (url) {
        url = "https://baconipsum.com/api/?type=meat-and-filler&paras=8&format=text"

      // Fetch JSON text from the provided URL
      axios.get(url)
        .then((response) => {
          setJsonText(response.data);
        })
        .catch((error) => {
          console.error('Error fetching JSON:', error);
        });
    }
  }, [location.search]);






  const handleTextEdit = (e) => {
    setEditedText(e.target.value);
  };

  const handlePostRequest = async () => {
    try {
      const response = await axios.post(location.pathname, { editedText });
      setPdfUrl(response.data.pdfUrl);
      
    } catch (error) {
      console.error('Error sending POST request:', error);
    }
  };

//   const handlePostRequest = () => {
//     // Send POST request with edited text
//     axios.post(match.params.url, { editedText })
//       .then((response) => {
//         setPdfUrl(response.data.pdfUrl);
//       })
//       .catch((error) => {
//         console.error('Error sending POST request:', error);
//       });
//   };

  const handleDownload = () => {
    // Trigger a download for the Word (.docx) file using the retrieved URL
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
    }
  };

  return (
    <Container className="py-4">
      <Form.Group className="mb-3">
        <Form.Label>JSON Text:</Form.Label>
        <Form.Control as="textarea" rows={8} value={editedText || jsonText} onChange={handleTextEdit} />
      </Form.Group>
      {
        !showLoader ? (
            <Button variant="primary" onClick={handlePostRequest} className="mb-3">
            Send Edited Text (POST)
            </Button>
        ) : (
            <Spinner></Spinner>
        )
      }
      {pdfUrl && (
        <Button variant="success" onClick={handleDownload} className="mb-3 mx-2">
          Download Word File
        </Button>
      )}
    </Container>
  );
};

export default SummaryPage;
