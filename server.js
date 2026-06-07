const http = require('http');
const url = require('url');

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const p = parsedUrl.query;

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // PDF Report route
  if (path === '/' || path === '') {
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
    const images = p.images || "";

    const imageHTML = images ? `
    <div style="margin-top:15px;">
      <label style="font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">Site Image</label>
      <br>
      <img src="${images}" style="width:100%;max-height:300px;object-fit:cover;border-radius:8px;margin-top:8px;" />
    </div>` : "";

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
  ${imageHTML}
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
    return;
  }

  // AI Assistant route
  if (path === '/ai') {
    const projectName = p.projectName || "Unknown";
    const status = p.status || "Unknown";
    const budget = p.budget || "0";
    const budgetSpent = p.budgetSpent || "0";
    const timeProgress = p.timeProgress || "0";
    const overallProgress = p.overallProgress || "0";
    const advice = p.advice || "";

    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>AI Assistant - SmartBuild</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: Arial, sans-serif; background: #0f172a; color: #e2e8f0; height: 100vh; display: flex; flex-direction: column; }
  .header { background: #1e293b; padding: 15px 20px; border-bottom: 1px solid #334155; }
  .header .logo { font-size: 18px; font-weight: bold; color: white; }
  .header .logo span { color: #f97316; }
  .header .project-name { font-size: 13px; color: #94a3b8; }
  .project-card { background: #1e293b; margin: 15px; border-radius: 10px; padding: 15px; border: 1px solid #334155; }
  .project-card h3 { font-size: 14px; color: #f97316; margin-bottom: 10px; }
  .stats { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .stat { background: #0f172a; border-radius: 8px; padding: 10px; }
  .stat label { font-size: 10px; color: #64748b; text-transform: uppercase; }
  .stat p { font-size: 16px; font-weight: bold; color: white; margin-top: 3px; }
  .advice-box { background: #1e3a2f; border: 1px solid #16a34a; border-radius: 8px; padding: 12px; margin-top: 10px; font-size: 13px; color: #86efac; }
  .chat-container { flex: 1; overflow-y: auto; padding: 15px; display: flex; flex-direction: column; gap: 10px; }
  .message { max-width: 85%; padding: 12px 15px; border-radius: 12px; font-size: 14px; line-height: 1.5; }
  .message.user { background: #f97316; color: white; align-self: flex-end; border-bottom-right-radius: 4px; }
  .message.ai { background: #1e293b; color: #e2e8f0; align-self: flex-start; border-bottom-left-radius: 4px; }
  .message.loading { background: #1e293b; color: #64748b; align-self: flex-start; }
  .input-area { background: #1e293b; padding: 15px; border-top: 1px solid #334155; display: flex; gap: 10px; }
  .input-area input { flex: 1; background: #0f172a; border: 1px solid #334155; border-radius: 25px; padding: 12px 18px; color: white; font-size: 14px; outline: none; }
  .input-area input::placeholder { color: #64748b; }
  .input-area button { background: #f97316; border: none; border-radius: 50%; width: 45px; height: 45px; color: white; font-size: 20px; cursor: pointer; }
  .suggestions { display: flex; gap: 8px; flex-wrap: wrap; padding: 10px 15px; }
  .suggestion { background: #1e293b; border: 1px solid #334155; border-radius: 20px; padding: 6px 12px; font-size: 12px; color: #94a3b8; cursor: pointer; }
  .suggestion:hover { border-color: #f97316; color: #f97316; }
</style>
</head>
<body>
<div class="header">
  <div class="logo">Smart<span>Build</span> AI</div>
  <div class="project-name">${projectName}</div>
</div>

<div class="project-card">
  <h3>📊 Project Overview</h3>
  <div class="stats">
    <div class="stat"><label>Status</label><p>${status}</p></div>
    <div class="stat"><label>Progress</label><p>${overallProgress}%</p></div>
    <div class="stat"><label>Budget</label><p>${budget}</p></div>
    <div class="stat"><label>Spent</label><p>${budgetSpent}</p></div>
  </div>
  <div class="advice-box">${advice || "✅ Project data loaded. Ask me anything!"}</div>
</div>

<div class="suggestions">
  <div class="suggestion" onclick="askQuestion('Why is my project delayed?')">Why delayed?</div>
  <div class="suggestion" onclick="askQuestion('How can I improve progress?')">Improve progress</div>
  <div class="suggestion" onclick="askQuestion('Is my budget on track?')">Budget status</div>
  <div class="suggestion" onclick="askQuestion('What tasks should I prioritize?')">Priorities</div>
</div>

<div class="chat-container" id="chat"></div>

<div class="input-area">
  <input type="text" id="userInput" placeholder="Ask about your project..." onkeypress="if(event.key==='Enter') sendMessage()" />
  <button onclick="sendMessage()">➤</button>
</div>

<script>
const projectData = {
  name: "${projectName}",
  status: "${status}",
  budget: "${budget}",
  budgetSpent: "${budgetSpent}",
  timeProgress: "${timeProgress}",
  overallProgress: "${overallProgress}",
  advice: "${advice}"
};

const GEMINI_API_KEY = "AQ.Ab8RN6I4qWof9A4DCxMyT74DJL80jIr9git-635L4DfQ6-LNvg";

async function sendMessage() {
  const input = document.getElementById('userInput');
  const question = input.value.trim();
  if (!question) return;
  input.value = '';
  addMessage(question, 'user');
  addMessage('Thinking...', 'loading', 'loading-msg');

  const prompt = "You are an AI assistant for SmartBuild construction app. Project: " + projectData.name + ", Status: " + projectData.status + ", Budget: " + projectData.budget + ", Spent: " + projectData.budgetSpent + ", Progress: " + projectData.overallProgress + "%. Question: " + question + ". Give a short practical answer.";

  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + GEMINI_API_KEY, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    const data = await response.json();
    if (data.candidates && data.candidates[0]) {
      const reply = data.candidates[0].content.parts[0].text;
      document.getElementById('loading-msg').remove();
      addMessage(reply, 'ai');
    } else {
      document.getElementById('loading-msg').remove();
      addMessage('Error: ' + JSON.stringify(data), 'ai');
    }
  } catch(e) {
    document.getElementById('loading-msg').remove();
    addMessage('Error: ' + e.message, 'ai');
  }
}

function askQuestion(q) {
  document.getElementById('userInput').value = q;
  sendMessage();
}

function addMessage(text, type, id) {
  const chat = document.getElementById('chat');
  const msg = document.createElement('div');
  msg.className = 'message ' + type;
  if (id) msg.id = id;
  msg.textContent = text;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}
</script>
</body>
</html>`;

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
