import { Candidate, CreateCandidateRequest, UpdateCandidateRequest } from '../types/Candidate';
export declare class CandidateService {
    private candidates;
    private nextId;
    private generationInterval;
    private isGenerating;
    getAllCandidates(): Candidate[];
    getCandidateById(id: number): Candidate | null;
    createCandidate(candidateData: CreateCandidateRequest): Candidate;
    updateCandidate(id: number, updateData: UpdateCandidateRequest): Candidate | null;
    deleteCandidate(id: number): boolean;
    private generateNewCandidate;
    startGeneration(): boolean;
    stopGeneration(): boolean;
    isGenerationActive(): boolean;
    getPartyStats(): {
        party: string;
        count: number;
    }[];
    getGeneralStats(): {
        totalCandidates: number;
        activeParties: number;
        partyStats: {
            party: string;
            count: number;
        }[];
    };
    resetToInitial(): void;
}
//# sourceMappingURL=CandidateService.d.ts.map