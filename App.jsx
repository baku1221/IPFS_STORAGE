import  { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState("");
  const [lawyerName, setLawyerName] = useState("");
  const [caseDescription, setCaseDescription] = useState("");
  const [documentDescription, setDocumentDescription] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fileData = new FormData();
      fileData.append("file", file);

      const responseData = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: fileData,
        headers: {
          pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
          pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_KEY,
          "Content-Type": "multipart/form-data",
        },
      });

      const fileHash = responseData.data.IpfsHash;
      console.log("File Hash:", fileHash);
      setUploadSuccess(true); // Set upload success state to true
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3em', marginBottom: '20px', color: '#00000' }}>IPFS Storage</h1>
      <div style={{ marginBottom: '20px', backgroundColor: '#fef9e7', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h2 style={{ fontSize: '1.5em', marginBottom: '20px' }}>Upload Document</h2>
        {uploadSuccess && <p style={{ color: 'green' }}>Uploaded Successfully</p>} {/* Render upload success message */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <div style={{ marginBottom: '10px' }}>
              <input type="text" value={lawyerName} onChange={(e) => setLawyerName(e.target.value)} placeholder="Lawyer Name" style={{ padding: '8px', border: '2px solid #f1c40f', borderRadius: '4px', marginRight: '10px' }} />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <input type="text" value={caseDescription} onChange={(e) => setCaseDescription(e.target.value)} placeholder="Case Description" style={{ padding: '8px', border: '2px solid #f1c40f', borderRadius: '4px', marginRight: '10px' }} />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <input type="text" value={documentDescription} onChange={(e) => setDocumentDescription(e.target.value)} placeholder="Document Description" style={{ padding: '8px', border: '2px solid #f1c40f', borderRadius: '4px', marginRight: '10px' }} />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <input type="file" onChange={(e) => setFile(e.target.files[0])} style={{ padding: '8px', border: '2px solid #f1c40f', borderRadius: '4px', marginRight: '10px' }} />
            </div>
            <div>
              <button type='submit' style={{ padding: '8px 16px', borderRadius: '4px', backgroundColor: '#f1c40f', color: '#fff', border: 'none' }}>UPLOAD</button>
            </div>
          </div>
        </form>
        
      </div>
    </div>
  );
}

export default App;
