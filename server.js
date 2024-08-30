// const express = require('express');
// const mongoose = require('mongoose');
// const multer = require('multer');
// const cors = require('cors');
// const path = require('path');
// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Connect to MongoDB
// mongoose.connect('mongodb+srv://thanishmamilla:thanish123@cluster0.1x0tmmk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

// // Define File schema and model
// const fileSchema = new mongoose.Schema({
//     filename: String,
//     fileType: String,
//     filePath: String,
// });

// const File = mongoose.model('File', fileSchema);

// // Multer setup for file storage
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });

// const upload = multer({ storage });

// // Endpoint to upload a file
// app.post('/upload', upload.single('file'), async (req, res) => {
//     const newFile = new File({
//         filename: req.file.filename,
//         fileType: req.body.fileType,
//         filePath: `/uploads/${req.file.filename}`,
//     });
//     await newFile.save();
//     res.json({ message: 'File uploaded successfully' });
// });

// // Endpoint to get all files
// app.get('/files', async (req, res) => {
//     const files = await File.find();
//     res.json(files);
// });
// // Endpoint to serve a file for download
// app.get('/download/:filename', (req, res) => {
//     const filePath = path.join(__dirname, 'uploads', req.params.filename);
//     res.download(filePath);  // This will force the download
// });


// // Start server
// app.listen(5000, () => {
//     console.log('Server running on port 5000');
// });
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Connect to MongoDB
mongoose.connect('mongodb+srv://thanishmamilla:thanish123@cluster0.1x0tmmk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

// Define File schema and model
const fileSchema = new mongoose.Schema({
    filename: String,
    fileType: String,
    filePath: String,
});

const File = mongoose.model('File', fileSchema);

// Multer setup for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Endpoint to upload a file
app.post('/upload', upload.single('file'), async (req, res) => {
    const newFile = new File({
        filename: req.file.filename,
        fileType: req.body.fileType,
        filePath: `/uploads/${req.file.filename}`,
    });
    await newFile.save();
    res.json({ message: 'File uploaded successfully' });
});

// Endpoint to get all files
app.get('/files', async (req, res) => {
    const files = await File.find();
    res.json(files);
});

// Endpoint to serve a file for download
app.get('/download/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.params.filename);
    res.download(filePath);
});

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start server
app.listen(5000, () => {
    console.log('Server running on port 5000');
});
