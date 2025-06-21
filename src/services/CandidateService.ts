import { Candidate, CreateCandidateRequest, UpdateCandidateRequest } from '../types/Candidate';
import { initialCandidates } from '../data/initialCandidates';
import { faker } from '@faker-js/faker';

export class CandidateService {
  private candidates: Candidate[] = [...initialCandidates];
  private nextId: number = Math.max(...initialCandidates.map(c => c.id), 0) + 1;
  private generationInterval: NodeJS.Timeout | null = null;
  private isGenerating: boolean = false;


  getAllCandidates(): Candidate[] {
    return [...this.candidates];
  }


  getCandidateById(id: number): Candidate | null {
    return this.candidates.find(c => c.id === id) || null;
  }

  createCandidate(candidateData: CreateCandidateRequest): Candidate {
    const newCandidate: Candidate = {
      id: this.nextId++,
      ...candidateData
    };
    
    this.candidates.push(newCandidate);
    return newCandidate;
  }

  
  updateCandidate(id: number, updateData: UpdateCandidateRequest): Candidate | null {
    const index = this.candidates.findIndex(c => c.id === id);
    if (index === -1) return null;

    this.candidates[index] = {
      ...this.candidates[index],
      ...updateData
    };

    return this.candidates[index];
  }


  deleteCandidate(id: number): boolean {
    const index = this.candidates.findIndex(c => c.id === id);
    if (index === -1) return false;

    this.candidates.splice(index, 1);
    return true;
  }


  private generateNewCandidate(): Candidate {
    const parties = [
      "Partidul Verde", "Partidul Liberal", "Partidul Albastru", 
      "Partidul Nou", "Partidul Centrist", "Partidul Democrat",
      "Partidul Social", "Partidul Conservator", "Partidul Progresist",
      "Partidul Tradițional", "Partidul Reformist", "Partidul Unitar"
    ];

    return {
      id: this.nextId++,
      name: faker.person.fullName(),
      party: faker.helpers.arrayElement(parties),
      photo: faker.image.avatar()
    };
  }


  startGeneration(): boolean {
    if (this.isGenerating) return false;

    this.isGenerating = true;
    this.generationInterval = setInterval(() => {
      const newCandidate = this.generateNewCandidate();
      this.candidates.push(newCandidate);
      console.log(`Candidat nou generat: ${newCandidate.name} - ${newCandidate.party}`);
    }, 2000); // Generează la fiecare 2 secunde

    return true;
  }

 
  stopGeneration(): boolean {
    if (!this.isGenerating) return false;

    this.isGenerating = false;
    if (this.generationInterval) {
      clearInterval(this.generationInterval);
      this.generationInterval = null;
    }

    return true;
  }


  isGenerationActive(): boolean {
    return this.isGenerating;
  }

 
  getPartyStats(): { party: string; count: number }[] {
    const partyCounts = this.candidates.reduce((acc, candidate) => {
      acc[candidate.party] = (acc[candidate.party] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(partyCounts).map(([party, count]) => ({
      party,
      count
    }));
  }

 
  getGeneralStats() {
    const partyStats = this.getPartyStats();
    return {
      totalCandidates: this.candidates.length,
      activeParties: partyStats.length,
      partyStats
    };
  }

 
  resetToInitial(): void {
    this.candidates = [...initialCandidates];
    this.nextId = Math.max(...initialCandidates.map(c => c.id), 0) + 1;
    this.stopGeneration();
  }
} 