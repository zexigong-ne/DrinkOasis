import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

export default router;