"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateService = void 0;
const initialCandidates_1 = require("../data/initialCandidates");
const faker_1 = require("@faker-js/faker");
class CandidateService {
    constructor() {
        this.candidates = [...initialCandidates_1.initialCandidates];
        this.nextId = Math.max(...initialCandidates_1.initialCandidates.map(c => c.id), 0) + 1;
        this.generationInterval = null;
        this.isGenerating = false;
    }
    getAllCandidates() {
        return [...this.candidates];
    }
    getCandidateById(id) {
        return this.candidates.find(c => c.id === id) || null;
    }
    createCandidate(candidateData) {
        const newCandidate = {
            id: this.nextId++,
            ...candidateData
        };
        this.candidates.push(newCandidate);
        return newCandidate;
    }
    updateCandidate(id, updateData) {
        const index = this.candidates.findIndex(c => c.id === id);
        if (index === -1)
            return null;
        this.candidates[index] = {
            ...this.candidates[index],
            ...updateData
        };
        return this.candidates[index];
    }
    deleteCandidate(id) {
        const index = this.candidates.findIndex(c => c.id === id);
        if (index === -1)
            return false;
        this.candidates.splice(index, 1);
        return true;
    }
    generateNewCandidate() {
        const parties = [
            "Partidul Verde", "Partidul Liberal", "Partidul Albastru",
            "Partidul Nou", "Partidul Centrist", "Partidul Democrat",
            "Partidul Social", "Partidul Conservator", "Partidul Progresist",
            "Partidul Tradițional", "Partidul Reformist", "Partidul Unitar"
        ];
        return {
            id: this.nextId++,
            name: faker_1.faker.person.fullName(),
            party: faker_1.faker.helpers.arrayElement(parties),
            photo: faker_1.faker.image.avatar()
        };
    }
    startGeneration() {
        if (this.isGenerating)
            return false;
        this.isGenerating = true;
        this.generationInterval = setInterval(() => {
            const newCandidate = this.generateNewCandidate();
            this.candidates.push(newCandidate);
            console.log(`Candidat nou generat: ${newCandidate.name} - ${newCandidate.party}`);
        }, 2000); // Generează la fiecare 2 secunde
        return true;
    }
    stopGeneration() {
        if (!this.isGenerating)
            return false;
        this.isGenerating = false;
        if (this.generationInterval) {
            clearInterval(this.generationInterval);
            this.generationInterval = null;
        }
        return true;
    }
    isGenerationActive() {
        return this.isGenerating;
    }
    getPartyStats() {
        const partyCounts = this.candidates.reduce((acc, candidate) => {
            acc[candidate.party] = (acc[candidate.party] || 0) + 1;
            return acc;
        }, {});
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
    resetToInitial() {
        this.candidates = [...initialCandidates_1.initialCandidates];
        this.nextId = Math.max(...initialCandidates_1.initialCandidates.map(c => c.id), 0) + 1;
        this.stopGeneration();
    }
}
exports.CandidateService = CandidateService;
//# sourceMappingURL=CandidateService.js.map