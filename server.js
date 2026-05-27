const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const p = url.parse(req.url, true).query;

  const reportID = p.reportID || "";
  const projectID = p.projectID || "";
  const reportType = p.reportType || "";
  const period = p.period || "";
  const progressSummary = p.progressSummary || "";
  const totalCost = p.totalCost || "";
  const approvalStatus = p.approvalStatus || "";
  const createdAt = p.createdAt || "";
  const projectName = p.projectName || "";
  const location = p.location || "";
  const client = p.client || "";
  const contractor = p.contractor || "";
  const budget = p.budget || "";
  const budgetSpent = p.budgetSpent || "";
  const status = p.status || "";
  const type = p.type || "";

  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: Arial, sans-serif; padding: 40px; color: #1e293b; background: #f8fafc; }
  .container { background: white; padding: 40px; max-width: 800px; margin: auto; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.08); }
  .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; }
  .logo { font-size: 28px; font-weight: bold; color: #1e293b; }
  .logo span { color: #f97316; }
  .logo p { font-size: 12px; color: #94a3b8; font-weight: normal; margin-top: 2px; }
  .header-right { text-align: right; font-size: 13px; color: #475569; }
  hr { border: 2px solid #1e293b; margin-bottom: 30px; }
  .section-title { font-size: 13px; font-weight: bold; color: #1e293b; letter-spacing: 1px; margin-bottom: 15px; margin-top: 25px; }
  .field { border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px 15px; margin-bottom: 10px; background: #f8fafc; border-left: 4px solid #f97316; }
  .field label { font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; }
  .field p { font-size: 15px; font-weight: bold; color: #1e293b; margin-top: 3px; }
  .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .badge { display: inline-block; padding: 5px 14px; border-radius: 20px; font-size: 13px; font-weight: 600; background: #fef3c7; color: #92400e; }
  .financial-box { border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-top: 10px; }
  .fin-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
  .fin-label { font-size: 12px; color: #94a3b8; text-transform: uppercase; }
  .fin-value { font-size: 22px; font-weight: bold; color: #1e293b; }
  .fin-id { font-size: 18px; font-weight: bold; color: #f97316; }
  .signatures { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 40px; }
  .sig { border-top: 1px dashed #94a3b8; padding-top: 10px; font-size: 13px; color: #475569; }
  .sig strong { display: block; margin-top: 5px; color: #1e293b; }
  .footer { display: flex; justify-content: space-between; margin-top: 30px; font-size: 11px; color: #94a3b8; border-top: 2px solid #1e293b; padding-top: 10px; }
  @media print { body { background: white; } .container { box-shadow: none; } }
</style>
</head>
<body>
<div class="container">
  <div class="header">
    <div class="logo">Smart<span>Build</span><p>Construction Project Management</p></div>
    <div class="header-right"><strong>Printed:</strong> ${createdAt}<br><strong>ID:</strong> ${reportID}</div>
  </div>
  <hr>
  <div class="section-title">PROJECT DETAILS</div>
  <div class="field"><label>Project Name</label><p>${projectName}</p></div>
  <div class="field"><label>Client</label><p>${client}</p></div>
  <div class="field"><label>Contractor</label><p>${contractor}</p></div>
  <div class="grid2">
    <div class="field"><label>Location</label><p>${location}</p></div>
    <div class="field"><label>Type</label><p>${type}</p></div>
  </div>
  <div class="grid2">
    <div class="field"><label>Project Status</label><p>${status}</p></div>
    <div class="field"><label>Project ID</label><p>${projectID}</p></div>
  </div>
  <div class="section-title">PROJECT REPORT</div>
  <div class="field"><label>Report Type</label><p>${reportType}</p></div>
  <div class="grid2">
    <div class="field"><label>Report Period</label><p>${period}</p></div>
    <div class="field"><label>Approval Status</label><p><span class="badge">${approvalStatus}</span></p></div>
  </div>
  <div class="section-title">PROJECT SUMMARY</div>
  <div class="field"><label>Progress Summary</label><p style="font-weight:normal;line-height:1.6">${progressSummary}</p></div>
  <div class="section-title">FINANCIAL SUMMARY</div>
  <div class="financial-box">
    <div class="fin-row">
      <div>
        <div class="fin-label">Total Cost</div>
        <div class="fin-value">TZS ${totalCost}</div>
      </div>
      <div class="fin-id">${projectID}</div>
    </div>
    <div class="grid2">
      <div class="field"><label>Budget</label><p>${budget}</p></div>
      <div class="field"><label>Budget Spent</label><p>${budgetSpent}</p></div>
    </div>
  </div>
  <div class="signatures">
    <div class="sig">Prepared By<strong>Site Engineer</strong></div>
    <div class="sig">Approved By<strong>Project Manager</strong></div>
  </div>
  <div class="footer">
    <span>Generated by <strong>SmartBuild</strong></span>
    <span>Confidential • For authorized use only</span>
  </div>
</div>
<script>window.onload = function(){ window.print(); }</script>
</body>
</html>`;

  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(html);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
