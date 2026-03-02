import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("circleflake.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS channels (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    channelId TEXT NOT NULL,
    userId TEXT NOT NULL,
    userName TEXT NOT NULL,
    content TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    threadId TEXT,
    isAgent BOOLEAN DEFAULT 0,
    metadata TEXT
  );

  CREATE TABLE IF NOT EXISTS cms_assets (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    status TEXT DEFAULT 'draft',
    lastModified DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Seed initial data if empty
const channelCount = db.prepare("SELECT count(*) as count FROM channels").get() as { count: number };
if (channelCount.count === 0) {
  db.prepare("INSERT INTO channels (id, name) VALUES (?, ?)").run("general", "General");
  db.prepare("INSERT INTO channels (id, name) VALUES (?, ?)").run("announcements", "Announcements");
  db.prepare("INSERT INTO channels (id, name) VALUES (?, ?)").run("cms-updates", "CMS Updates");
  
  db.prepare("INSERT INTO cms_assets (id, title, content) VALUES (?, ?, ?)")
    .run("welcome-post", "Welcome to Circleflake", "# Welcome\n\nThis is your first CMS asset. You can edit it in real-time.");
}

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/channels", (req, res) => {
    const channels = db.prepare("SELECT * FROM channels").all();
    res.json(channels);
  });

  app.get("/api/messages/:channelId", (req, res) => {
    const messages = db.prepare("SELECT * FROM messages WHERE channelId = ? ORDER BY timestamp ASC").all(req.params.channelId);
    res.json(messages);
  });

  app.get("/api/cms/assets", (req, res) => {
    const assets = db.prepare("SELECT * FROM cms_assets").all();
    res.json(assets);
  });

  app.get("/api/cms/assets/:id", (req, res) => {
    const asset = db.prepare("SELECT * FROM cms_assets WHERE id = ?").get(req.params.id);
    res.json(asset);
  });

  app.post("/api/cms/assets", (req, res) => {
    const { id, title, content } = req.body;
    db.prepare("INSERT OR REPLACE INTO cms_assets (id, title, content, lastModified) VALUES (?, ?, ?, CURRENT_TIMESTAMP)")
      .run(id, title, content);
    res.json({ success: true });
  });

  // Socket.io logic
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join-channel", (channelId) => {
      socket.join(channelId);
      console.log(`User ${socket.id} joined channel ${channelId}`);
    });

    socket.on("send-message", (data) => {
      const { id, channelId, userId, userName, content, threadId, isAgent, metadata } = data;
      
      db.prepare("INSERT INTO messages (id, channelId, userId, userName, content, threadId, isAgent, metadata) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
        .run(id, channelId, userId, userName, content, threadId || null, isAgent ? 1 : 0, metadata ? JSON.stringify(metadata) : null);
      
      io.to(channelId).emit("new-message", data);

      // Simple Agent Logic (Simulated MCP/Agent-Awareness)
      if (!isAgent && content.startsWith("/")) {
        setTimeout(() => {
          handleAgentCommand(data, io);
        }, 800);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

function handleAgentCommand(messageData: any, io: Server) {
  const { content, channelId, id: userMsgId } = messageData;
  const command = content.split(" ")[0].substring(1);
  const args = content.split(" ").slice(1).join(" ");

  let responseContent = "";
  let metadata = {};

  if (command === "cms") {
    const assets = db.prepare("SELECT id, title FROM cms_assets").all() as any[];
    responseContent = "Here are the current CMS assets:\n" + assets.map(a => `- ${a.title} (ID: ${a.id})`).join("\n");
  } else if (command === "fetch_asset" && args) {
    const asset = db.prepare("SELECT * FROM cms_assets WHERE id = ?").get(args) as any;
    if (asset) {
      responseContent = `Fetched asset: **${asset.title}**\n\n${asset.content}`;
      metadata = { type: "cms-preview", assetId: asset.id };
    } else {
      responseContent = `Asset with ID "${args}" not found.`;
    }
  } else if (command === "help") {
    responseContent = "Available commands:\n- `/cms`: List all CMS assets\n- `/fetch_asset <id>`: Pull an asset into the chat\n- `/publish <id>`: (Simulated) Publish an asset";
  } else {
    responseContent = `Unknown command: /${command}. Type /help for assistance.`;
  }

  const agentMsg = {
    id: `agent-${Date.now()}`,
    channelId,
    userId: "agent-1",
    userName: "CircleBot",
    content: responseContent,
    threadId: userMsgId, // Thread-first architecture
    isAgent: true,
    timestamp: new Date().toISOString(),
    metadata
  };

  db.prepare("INSERT INTO messages (id, channelId, userId, userName, content, threadId, isAgent, metadata) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
    .run(agentMsg.id, agentMsg.channelId, agentMsg.userId, agentMsg.userName, agentMsg.content, agentMsg.threadId, 1, JSON.stringify(metadata));

  io.to(channelId).emit("new-message", agentMsg);
}

startServer();
