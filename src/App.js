import React,{useState} from 'react'
// Import the main component
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library
import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import PdfUploader from './Pages/PdfUploader';
import SummaryPage from './Pages/SummaryPage';




export const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<PdfUploader />} />
          <Route path="/content" element={<SummaryPage />} />
        </Routes>
    </Router>
  );
}

export default App;


// export const App = () => {

//   // Create new plugin instance
//   const defaultLayoutPluginInstance = defaultLayoutPlugin();
  
//   // for onchange event
//   const [pdfFile, setPdfFile]=useState(null);
//   const [pdfFileError, setPdfFileError]=useState('');
//   const [showSendButton,setShowSendButton]=useState(false);
//   const [showDownloadButton,setshowDownloadButton]=useState(false);

//   // for submit event
//   const [viewPdf, setViewPdf]=useState(null);
//   const [pdfUrl, setPdfUrl] = useState('');

//   const [formFields, setFormFields] = useState([{ heading: '', charCount: '' }]);

//   const addFields = () => {
//     setFormFields([...formFields, { heading: '', charCount: '' }]);
//   };

//   const removeFields = (index) => {
//     const updatedFields = [...formFields];
//     updatedFields.splice(index, 1);
//     setFormFields(updatedFields);
//   };

//   const handleInputChange = (index, event) => {
//     const { name, value } = event.target;
//     const updatedFields = [...formFields];
//     updatedFields[index][name] = value;
//     setFormFields(updatedFields);
//   };
  
  
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     console.log(formFields);
//     const formData = new FormData();
//     formData.append('pdf', pdfFile);
//     formData.append('jsonData', JSON.stringify(formFields));

//     try {
//       const response = await axios.post('YOUR_API_ENDPOINT', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.status === 200) {
//         setPdfUrl(response.data.url);
//         setshowDownloadButton(true);
//       }
//     } catch (error) {
//       console.error('Error occurred:', error);
//     }
    
//   };

//   // onchange event
//   const fileType=['application/pdf'];
//   const handlePdfFileChange=(e)=>{
//     let selectedFile=e.target.files[0];
//     if(selectedFile){
//       if(selectedFile&&fileType.includes(selectedFile.type)){
//         let reader = new FileReader();
//             reader.readAsDataURL(selectedFile);
//             reader.onloadend = (e) =>{
//               setPdfFile(e.target.result);
//               setPdfFileError('');
//             }
//       }
//       else{
//         setPdfFile(null);
//         setPdfFileError('Please select valid pdf file');
//       }
//     }
//     else{
//       console.log('select your file');
//     }
//   }

//   // form submit
//   const handlePdfFileSubmit=(e)=>{
//     e.preventDefault();
//     if(pdfFile!==null){
//       setViewPdf(pdfFile);
//       setShowSendButton(true)
//     }
//     else{
//       setViewPdf(null);
//     }
//   }

//   const handleDownload = async () => {
//     try {
//       const response = await axios.get(pdfUrl, {
//         responseType: 'blob', 
//       });

//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', 'file.pdf');
//       document.body.appendChild(link);
//       link.click();
//       link.parentNode.removeChild(link);
//     } catch (error) {
//       console.error('Error downloading PDF:', error);
//     }
//   };

//   return (
//     <div className='container'>

//     <br></br>
    
//       <Container className='mt-5'>

//       <form onSubmit={handlePdfFileSubmit} >
//       <Form.Group className='mb-3'>
//         {/* <input type="file" className='form-control'
//           required onChange={handlePdfFileChange}
//         /> */}
//         <Form.Label>Upload File</Form.Label>
//         <Form.Control type="file" placeholder="Select File" onChange={handlePdfFileChange} />
//         </Form.Group>
//         {pdfFileError&&<div className='error-msg'>{pdfFileError}</div>}
//         <br></br>
//         <Button type='submit' variant="primary">
//                 UPLOAD
//               </Button>
//       </form>

//       </Container>
//       {
//         showSendButton &&  <Container className="mt-5">
//         <Form onSubmit={handleSubmit}>
//           {formFields.map((field, index) => (
//             <Row key={index} className="mb-3">
//               <Col md={5}>
//                 <Form.Group>
//                   <Form.Control
//                     type="text"
//                     name="heading"
//                     placeholder="Heading"
//                     value={field.heading}
//                     onChange={(e) => handleInputChange(index, e)}
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={5}>
//                 <Form.Group>
//                   <Form.Control
//                     type="number"
//                     name="charCount"
//                     placeholder="Character Count"
//                     value={field.charCount}
//                     onChange={(e) => handleInputChange(index, e)}
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={2}>
//                 {index !== 0 && (
//                   <Button variant="danger" onClick={() => removeFields(index)}>
//                     Remove
//                   </Button>
//                 )}
//               </Col>
//             </Row>
//           ))}
//           <Row className="mb-3">
//             <Col>
//               <Button variant="primary" onClick={addFields}>
//                 Add Fields
//               </Button>
//             </Col>
//           </Row>
//           <Row>
//             <Col>
//               <Button variant="success" type="submit">
//                 Submit
//               </Button>
//             </Col>
//           </Row>
//         </Form>
        
//       </Container>
//       }
//       {
//         showDownloadButton && <Container className='mt-5'>
//           <Row className="mb-3">
//         <Col>
//           <Button variant="primary" onClick={handleDownload}>
//             Download PDF
//           </Button>
//         </Col>
//       </Row>

//         </Container>
//       }
//       <br></br>
//       <h4>View PDF</h4>
//       <div className='pdf-container'>
//         {/* show pdf conditionally (if we have one)  */}
//         {viewPdf&&<><Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
//           <Viewer fileUrl={viewPdf}
//             plugins={[defaultLayoutPluginInstance]} />
//       </Worker></>}

//       {/* if we dont have pdf or viewPdf state is null */}
//       {!viewPdf&&<>No pdf file selected</>}
//       </div>

//     </div>
//   )
// }

// export default App
