import React, { useState } from 'react';
import { type Escrow, type Milestone, proofOfWorkAPI } from '../../services/api/proofOfWork';

interface EscrowTrackerProps {
  escrow: Escrow;
  userType: 'club' | 'brand';
  onUpdate: (updatedEscrow: Escrow) => void;
}

export const EscrowTracker: React.FC<EscrowTrackerProps> = ({ escrow, userType, onUpdate }) => {
  const [submittingId, setSubmittingId] = useState<string | null>(null);
  const [evidenceUrl, setEvidenceUrl] = useState('');
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');

  const handleSubmitEvidence = async (milestoneId: string) => {
    if (!evidenceUrl) return;
    setSubmittingId(milestoneId);
    try {
      const res = await proofOfWorkAPI.submitMilestoneEvidence(escrow._id, milestoneId, {
        evidenceData: evidenceUrl,
        evidenceType: 'link'
      });
      if (res.success) {
        onUpdate(res.escrow);
        setEvidenceUrl('');
      }
    } catch (err) {
      console.error('Failed to submit evidence', err);
    } finally {
      setSubmittingId(null);
    }
  };

  const handleVerify = async (milestoneId: string, status: 'verified' | 'rejected') => {
    setVerifyingId(milestoneId);
    try {
      const res = await proofOfWorkAPI.verifyMilestone(escrow._id, milestoneId, {
        status,
        brandFeedback: feedback
      });
      if (res.success) {
        onUpdate(res.escrow);
        setFeedback('');
      }
    } catch (err) {
      console.error('Failed to verify evidence', err);
    } finally {
      setVerifyingId(null);
    }
  };

  const formatCurrency = (amount: number) => `₹${amount.toLocaleString('en-IN')}`;

  const getStatusBadge = (status: Milestone['status']) => {
    switch (status) {
      case 'verified': return <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Verified & Released</span>;
      case 'submitted': return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full">Pending Verification</span>;
      case 'rejected': return <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">Rejected - Needs Fix</span>;
      default: return <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-full">Pending Execution</span>;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-[#dce8f3] overflow-hidden">
      <div className="p-4 bg-[#f0f3f4] border-b border-[#dce8f3] flex justify-between items-center">
        <div>
          <h3 className="font-bold text-[#111518]">Escrow Vault</h3>
          <p className="text-sm text-[#617989]">Total Locked: {formatCurrency(escrow.escrowAmount)}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-[#111518]">Status</p>
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">{escrow.escrowStatus.replace('_', ' ')}</p>
        </div>
      </div>
      
      <div className="p-4 space-y-6">
        {escrow.milestones.map((milestone, idx) => (
          <div key={milestone._id} className="relative pl-6 border-l-2 border-gray-200">
            <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-1"></div>
            
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-bold text-[#111518]">Step {idx + 1}: {milestone.title}</h4>
                <p className="text-sm text-[#617989] mt-1">{milestone.description}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-[#111518]">{formatCurrency(milestone.payoutAmount)}</p>
                {getStatusBadge(milestone.status)}
              </div>
            </div>

            {/* Evidence Display */}
            {milestone.evidenceData && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm">
                <p className="font-semibold text-gray-700">Submitted Evidence:</p>
                <a href={milestone.evidenceData} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline break-all">
                  {milestone.evidenceData}
                </a>
              </div>
            )}
            
            {/* Feedback Display */}
            {milestone.brandFeedback && milestone.status === 'rejected' && (
              <div className="mt-3 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
                <p className="font-semibold">Brand Feedback:</p>
                <p>{milestone.brandFeedback}</p>
              </div>
            )}

            {/* Action Area for Club */}
            {userType === 'club' && (milestone.status === 'pending' || milestone.status === 'rejected') && (
              <div className="mt-4 flex gap-2">
                <input 
                  type="url" 
                  placeholder="Paste URL to proof (Google Drive image, social post link, etc.)" 
                  className="flex-1 h-10 px-3 border border-gray-300 rounded-lg text-sm"
                  value={evidenceUrl}
                  onChange={(e) => setEvidenceUrl(e.target.value)}
                />
                <button 
                  onClick={() => handleSubmitEvidence(milestone._id)}
                  disabled={!evidenceUrl || submittingId === milestone._id}
                  className="h-10 px-4 bg-blue-600 text-white font-bold rounded-lg text-sm disabled:opacity-50"
                >
                  {submittingId === milestone._id ? 'Submitting...' : 'Upload Proof'}
                </button>
              </div>
            )}

            {/* Action Area for Brand */}
            {userType === 'brand' && milestone.status === 'submitted' && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-sm font-semibold mb-2">Review Evidence</p>
                <input 
                  type="text" 
                  placeholder="Optional feedback if rejecting..." 
                  className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm mb-3"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleVerify(milestone._id, 'verified')}
                    disabled={verifyingId === milestone._id}
                    className="flex-1 h-10 bg-green-600 text-white font-bold rounded-lg text-sm disabled:opacity-50"
                  >
                    Approve & Release Funds
                  </button>
                  <button 
                    onClick={() => handleVerify(milestone._id, 'rejected')}
                    disabled={verifyingId === milestone._id || !feedback}
                    className="flex-1 h-10 bg-red-100 text-red-700 font-bold rounded-lg text-sm disabled:opacity-50"
                  >
                    Reject & Request Fix
                  </button>
                </div>
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
};
