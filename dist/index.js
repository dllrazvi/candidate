"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const CandidateService_1 = require("./services/CandidateService");
const app = (0, express_1.default)();
const port = 3001;
const service = new CandidateService_1.CandidateService();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// GET all candidates (sorted by name)
app.get('/candidates', (req, res) => {
    const candidates = service.getAllCandidates().sort((a, b) => a.name.localeCompare(b.name));
    res.json(candidates);
});
// GET candidate by id
app.get('/candidates/:id', (req, res) => {
    const id = Number(req.params.id);
    const candidate = service.getCandidateById(id);
    if (!candidate)
        return res.status(404).json({ error: 'Not found' });
    res.json(candidate);
});
// CREATE candidate
app.post('/candidates', (req, res) => {
    const data = req.body;
    if (!data.name || !data.party || !data.photo) {
        return res.status(400).json({ error: 'Missing fields' });
    }
    const candidate = service.createCandidate(data);
    res.status(201).json(candidate);
});
// UPDATE candidate
app.put('/candidates/:id', (req, res) => {
    const id = Number(req.params.id);
    const data = req.body;
    const updated = service.updateCandidate(id, data);
    if (!updated)
        return res.status(404).json({ error: 'Not found' });
    res.json(updated);
});
// DELETE candidate
app.delete('/candidates/:id', (req, res) => {
    const id = Number(req.params.id);
    const ok = service.deleteCandidate(id);
    if (!ok)
        return res.status(404).json({ error: 'Not found' });
    res.status(204).send();
});
// START async generation
app.post('/candidates/generate/start', (req, res) => {
    const started = service.startGeneration();
    res.json({ started });
});
// STOP async generation
app.post('/candidates/generate/stop', (req, res) => {
    const stopped = service.stopGeneration();
    res.json({ stopped });
});
// GET generation status
app.get('/candidates/generate/status', (req, res) => {
    res.json({ active: service.isGenerationActive() });
});
// RESET to initial candidates
app.post('/candidates/reset', (req, res) => {
    service.resetToInitial();
    res.json({ ok: true });
});
// GET party stats (for chart)
app.get('/stats/parties', (req, res) => {
    res.json(service.getPartyStats().sort((a, b) => b.count - a.count));
});
// GET general stats
app.get('/stats/general', (req, res) => {
    res.json(service.getGeneralStats());
});
app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map