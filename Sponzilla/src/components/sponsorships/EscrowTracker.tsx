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

  // Sign agreement state
  const [signatoryName, setSignatoryName] = useState('');
  const [taxId, setTaxId] = useState('');
  const [signing, setSigning] = useState(false);
  const [signError, setSignError] = useState('');

  // Invoice modal state
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

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

  const handleSignAgreement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signatoryName) {
      setSignError('Signatory name is required.');
      return;
    }
    setSigning(true);
    setSignError('');
    try {
      const res = await proofOfWorkAPI.signAgreement(escrow._id, {
        signatoryName,
        taxId
      });
      if (res.success) {
        onUpdate(res.escrow);
      }
    } catch (err: any) {
      setSignError(err.message || 'Signature failed. Please try again.');
    } finally {
      setSigning(false);
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

  const getClubName = () => escrow.clubId?.clubName || 'Student Club';
  const getBrandName = () => escrow.brandId?.companyName || escrow.brandId?.brandName || 'Brand Partner';
  const getEventName = () => escrow.eventId?.title || 'Sponsorship Event';

  return (
    <div className="bg-white rounded-xl border border-[#dce8f3] overflow-hidden relative text-left">
      {/* Header */}
      <div className="p-4 bg-[#f0f3f4] border-b border-[#dce8f3] flex justify-between items-center">
        <div>
          <h3 className="font-bold text-[#111518]">Escrow Vault</h3>
          <p className="text-sm text-[#617989]">Total Locked: {formatCurrency(escrow.escrowAmount)}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsInvoiceOpen(true)}
            className="px-3 py-1.5 border border-[#1383eb] text-[#1383eb] hover:bg-blue-50 text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
          >
            <span>📄</span> View Invoice
          </button>
          <div className="text-right">
            <p className="text-sm font-medium text-[#111518]">Status</p>
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
              {escrow.escrowStatus.replace('_', ' ')}
            </p>
          </div>
        </div>
      </div>

      {/* Signature View */}
      {escrow.escrowStatus === 'pending_signatures' ? (
        <div className="p-6">
          <div className="mb-6 p-4 rounded-xl border border-yellow-200 bg-yellow-50 text-left">
            <p className="text-xs font-bold uppercase tracking-wider text-yellow-700 mb-1">✍️ Digital Signature Required</p>
            <p className="text-xs text-yellow-800">
              This contract is in drafting status. Both parties must type their full representative names and optional Tax ID numbers below to execute the agreement and initiate the sponsorship escrow vault.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Club Signature status */}
            <div className="p-4 rounded-xl border border-[#dce8f3] bg-[#f8fafc] text-left">
              <h4 className="font-bold text-gray-800 text-sm mb-2">Club Sign-off ({getClubName()})</h4>
              {escrow.clubSignatory ? (
                <div>
                  <p className="text-xs text-green-700 font-semibold mb-1">✓ Signed digitally</p>
                  <p className="text-sm font-mono text-gray-700">Name: <span className="font-bold">{escrow.clubSignatory}</span></p>
                  <p className="text-xs text-gray-500">Date: {new Date(escrow.clubSignedAt || '').toLocaleDateString()}</p>
                  {escrow.clubTaxId && <p className="text-xs text-gray-500">Tax/Org ID: {escrow.clubTaxId}</p>}
                </div>
              ) : (
                <p className="text-xs text-gray-500 italic">Pending Club signature...</p>
              )}
            </div>

            {/* Brand Signature status */}
            <div className="p-4 rounded-xl border border-[#dce8f3] bg-[#f8fafc] text-left">
              <h4 className="font-bold text-gray-800 text-sm mb-2">Brand Sign-off ({getBrandName()})</h4>
              {escrow.brandSignatory ? (
                <div>
                  <p className="text-xs text-green-700 font-semibold mb-1">✓ Signed digitally</p>
                  <p className="text-sm font-mono text-gray-700">Name: <span className="font-bold">{escrow.brandSignatory}</span></p>
                  <p className="text-xs text-gray-500">Date: {new Date(escrow.brandSignedAt || '').toLocaleDateString()}</p>
                  {escrow.brandTaxId && <p className="text-xs text-gray-500">Tax ID: {escrow.brandTaxId}</p>}
                </div>
              ) : (
                <p className="text-xs text-gray-500 italic">Pending Brand signature...</p>
              )}
            </div>
          </div>

          {/* Standard Contract Text */}
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 max-h-60 overflow-y-auto mb-6 text-left text-xs font-mono whitespace-pre-line text-gray-600 leading-relaxed">
            {escrow.agreementText}
          </div>

          {/* Signature Action Box */}
          {((userType === 'club' && !escrow.clubSignatory) || (userType === 'brand' && !escrow.brandSignatory)) ? (
            <form onSubmit={handleSignAgreement} className="p-5 border border-blue-200 rounded-xl bg-blue-50/50 text-left">
              <h4 className="font-bold text-blue-900 text-sm mb-3">Sign as {userType === 'club' ? 'Club President' : 'Brand Sponsor'}</h4>
              
              {signError && <p className="text-xs text-red-600 mb-3 font-semibold">{signError}</p>}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Full Representative Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm bg-white"
                    value={signatoryName}
                    onChange={(e) => setSignatoryName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {userType === 'club' ? 'University Club/Org ID (Optional)' : 'Corporate Tax ID / PAN (Optional)'}
                  </label>
                  <input
                    type="text"
                    placeholder={userType === 'club' ? 'e.g. CSE-1029' : 'e.g. AAACD1234F'}
                    className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm bg-white"
                    value={taxId}
                    onChange={(e) => setTaxId(e.target.value)}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={signing}
                className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-sm transition-colors"
              >
                {signing ? 'Signing Contract...' : 'Sign Agreement & Authorize Escrow Lock'}
              </button>
            </form>
          ) : (
            <div className="p-4 bg-gray-100 rounded-xl text-center text-xs text-gray-600">
              You have already signed. Waiting for the other party to complete sign-off.
            </div>
          )}
        </div>
      ) : (
        /* Deliverables Stepper View */
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
      )}

      {/* Invoice Modal Overlay */}
      {isInvoiceOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-[680px] p-6 max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-6 print:hidden">
              <h4 className="font-bold text-gray-900">Sponsorship Invoice</h4>
              <div className="flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 bg-[#f0f3f4] text-gray-800 font-bold rounded-lg text-xs hover:bg-gray-200 transition-colors"
                >
                  🖨️ Print / Save PDF
                </button>
                <button
                  onClick={() => setIsInvoiceOpen(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 font-bold text-gray-700 text-sm flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Print Container */}
            <div className="text-left font-sans text-gray-800 leading-normal p-4 border border-gray-100 rounded-xl bg-[#fafbfc] print:bg-white print:border-0 print:p-0">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h1 className="text-2xl font-black tracking-tight text-gray-900">SponZilla Facilitated Invoice</h1>
                  <p className="text-xs text-gray-500 mt-1">Facilitator: SponZilla Enterprise Platform</p>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    escrow.escrowStatus === 'fully_released' 
                      ? 'bg-green-100 text-green-700' 
                      : escrow.escrowStatus === 'funded' 
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {escrow.escrowStatus === 'fully_released' ? 'PAID / RELEASED' : 'ESCROW LOCKED'}
                  </span>
                  <p className="text-xs text-gray-500 mt-2">Invoice #: INV-SZ-{escrow._id.slice(-6).toUpperCase()}</p>
                  <p className="text-xs text-gray-500">Date: {new Date(escrow.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8 border-b border-gray-200 pb-6 text-xs">
                <div>
                  <p className="font-bold uppercase tracking-wider text-gray-400 mb-2">Billed From (Recipient Club)</p>
                  <p className="font-bold text-sm text-gray-900">{getClubName()}</p>
                  {escrow.clubSignatory && <p className="mt-1">Rep: {escrow.clubSignatory}</p>}
                  {escrow.clubTaxId && <p>Org/Tax ID: {escrow.clubTaxId}</p>}
                  <p className="text-gray-500">facilitated via SponZilla Platform</p>
                </div>
                <div>
                  <p className="font-bold uppercase tracking-wider text-gray-400 mb-2">Billed To (Corporate Sponsor)</p>
                  <p className="font-bold text-sm text-gray-900">{getBrandName()}</p>
                  {escrow.brandSignatory && <p className="mt-1">Rep: {escrow.brandSignatory}</p>}
                  {escrow.brandTaxId && <p>Tax ID: {escrow.brandTaxId}</p>}
                </div>
              </div>

              <div className="mb-8">
                <p className="font-bold text-xs uppercase tracking-wider text-gray-400 mb-3">Sponsorship Event Details</p>
                <div className="p-3 bg-white border border-gray-100 rounded-lg text-xs">
                  <p className="font-bold text-gray-900">{getEventName()}</p>
                  <p className="text-gray-500 mt-0.5">Performance-based escrow structure. Payments released strictly upon verification of deliverables.</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="font-bold text-xs uppercase tracking-wider text-gray-400 mb-3">Milestone Deliverables breakdown</p>
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-500 font-bold">
                      <th className="py-2">Milestone Description</th>
                      <th className="py-2 text-center">Status</th>
                      <th className="py-2 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {escrow.milestones.map((milestone) => (
                      <tr key={milestone._id} className="border-b border-gray-100">
                        <td className="py-3 font-semibold text-gray-900">
                          {milestone.title}
                          <p className="font-normal text-[10px] text-gray-400 mt-0.5">{milestone.description}</p>
                        </td>
                        <td className="py-3 text-center">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            milestone.status === 'verified' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {milestone.status === 'verified' ? 'Verified / Released' : 'Held / Pending'}
                          </span>
                        </td>
                        <td className="py-3 text-right font-mono font-medium">{formatCurrency(milestone.payoutAmount)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end pt-4 border-t border-gray-200">
                <div className="w-60 text-xs">
                  <div className="flex justify-between py-1 text-gray-500">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(escrow.escrowAmount)}</span>
                  </div>
                  <div className="flex justify-between py-1 text-gray-500">
                    <span>SponZilla Service Fee (0%):</span>
                    <span>₹0</span>
                  </div>
                  <div className="flex justify-between py-2 border-t border-gray-100 font-bold text-sm text-gray-900 mt-1">
                    <span>Total Amount:</span>
                    <span>{formatCurrency(escrow.escrowAmount)}</span>
                  </div>
                </div>
              </div>

              {/* Legal Footer */}
              <div className="mt-8 pt-4 border-t border-dashed border-gray-200 text-[9px] text-gray-400 text-center">
                This is a digitally generated invoice facilitated by SponZilla. Payments are secured and released using performance-based escrows. Any legal claims must reference Sponsorship Request ID: {escrow.sponsorshipRequestId}.
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
