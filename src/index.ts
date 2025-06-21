import express, { Request, Response } from 'express';
import cors from 'cors';
import { CandidateService } from './services/CandidateService';
import { CreateCandidateRequest, UpdateCandidateRequest } from './types/Candidate';

const app = express();
const port = 3001;
const service = new CandidateService();

app.use(cors());
app.use(express.json());

// GET all candidates (sorted by name)
app.get('/candidates', (req: Request, res: Response) => {
  const candidates = service.getAllCandidates().sort((a, b) => a.name.localeCompare(b.name));
  res.json(candidates);
});

// GET candidate by id
app.get('/candidates/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const candidate = service.getCandidateById(id);
  if (!candidate) return res.status(404).json({ error: 'Not found' });
  res.json(candidate);
});

// CREATE candidate
app.post('/candidates', (req: Request, res: Response) => {
  const data: CreateCandidateRequest = req.body;
  if (!data.name || !data.party || !data.photo) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  const candidate = service.createCandidate(data);
  res.status(201).json(candidate);
});

// UPDATE candidate
app.put('/candidates/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const data: UpdateCandidateRequest = req.body;
  const updated = service.updateCandidate(id, data);
  if (!updated) return res.status(404).json({ error: 'Not found' });
  res.json(updated);
});

// DELETE candidate
app.delete('/candidates/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const ok = service.deleteCandidate(id);
  if (!ok) return res.status(404).json({ error: 'Not found' });
  res.status(204).send();
});

// START async generation
app.post('/candidates/generate/start', (req: Request, res: Response) => {
  const started = service.startGeneration();
  res.json({ started });
});

// STOP async generation
app.post('/candidates/generate/stop', (req: Request, res: Response) => {
  const stopped = service.stopGeneration();
  res.json({ stopped });
});

// GET generation status
app.get('/candidates/generate/status', (req: Request, res: Response) => {
  res.json({ active: service.isGenerationActive() });
});

// RESET to initial candidates
app.post('/candidates/reset', (req: Request, res: Response) => {
  service.resetToInitial();
  res.json({ ok: true });
});

// GET party stats (for chart)
app.get('/stats/parties', (req: Request, res: Response) => {
  res.json(service.getPartyStats().sort((a, b) => b.count - a.count));
});

// GET general stats
app.get('/stats/general', (req: Request, res: Response) => {
  res.json(service.getGeneralStats());
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
}); 