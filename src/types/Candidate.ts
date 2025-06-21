export interface Candidate {
  id: number;
  name: string;
  party: string;
  photo: string;
}

export interface CreateCandidateRequest {
  name: string;
  party: string;
  photo: string;
}

export interface UpdateCandidateRequest {
  name?: string;
  party?: string;
  photo?: string;
} 