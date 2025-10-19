import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import isDev from "electron-is-dev";
import {
    initDatabase,
    saveDocument,
    getDocument,
    getAllDocuments,
    deleteDocument,
    updateDocument,
} from "./database";

let mainWindow: BrowserWindow | null = null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,

        minWidth: 800,
        minHeight: 600,

        // Frameless window for clean interface
        titleBarStyle: "hidden", // Mac: hides title bar but keeps traffic lights
        frame: process.platform !== "darwin", // Windows/Linux: remove frame entirely
        titleBarOverlay:
            process.platform === "win32"
                ? {
                      color: "#00000000", // Transparent
                      symbolColor: "#ffffff",
                  }
                : undefined,

        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    if (isDev) {
        // In development, load from Next.js dev server
        mainWindow.loadURL("http://localhost:3000");
        mainWindow.webContents.openDevTools();
    } else {
        // In production, load from built files
        mainWindow.loadFile(path.join(__dirname, "../out/index.html"));
    }

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}

// Initialize app
app.whenReady().then(() => {
    // Initialize database
    initDatabase();

    // Set up IPC handlers
    setupIpcHandlers();

    // Create window
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

// IPC Handlers for database operations
function setupIpcHandlers() {
    // Save document
    ipcMain.handle(
        "db:saveDocument",
        async (_, document: { title: string; content: string }) => {
            try {
                const id = saveDocument(document.title, document.content);
                return { success: true, id };
            } catch (error) {
                console.error("Error saving document:", error);
                return { success: false, error: (error as Error).message };
            }
        }
    );

    // Get single document
    ipcMain.handle("db:getDocument", async (_, id: number) => {
        try {
            const document = getDocument(id);
            return { success: true, document };
        } catch (error) {
            console.error("Error getting document:", error);
            return { success: false, error: (error as Error).message };
        }
    });

    // Get all documents
    ipcMain.handle("db:getAllDocuments", async () => {
        try {
            const documents = getAllDocuments();
            return { success: true, documents };
        } catch (error) {
            console.error("Error getting documents:", error);
            return { success: false, error: (error as Error).message };
        }
    });

    // Update document
    ipcMain.handle(
        "db:updateDocument",
        async (_, id: number, title: string, content: string) => {
            try {
                updateDocument(id, title, content);
                return { success: true };
            } catch (error) {
                console.error("Error updating document:", error);
                return { success: false, error: (error as Error).message };
            }
        }
    );

    // Delete document
    ipcMain.handle("db:deleteDocument", async (_, id: number) => {
        try {
            deleteDocument(id);
            return { success: true };
        } catch (error) {
            console.error("Error deleting document:", error);
            return { success: false, error: (error as Error).message };
        }
    });
}
