import Database from 'better-sqlite3';
import * as path from 'path';
import { app } from 'electron';

let db: Database.Database;

export interface Document {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export function initDatabase() {
  // Store database in user data directory
  const userDataPath = app.getPath('userData');
  const dbPath = path.join(userDataPath, 'typed.db');

  console.log('Database path:', dbPath);

  db = new Database(dbPath);

  // Create tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS documents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log('Database initialized successfully');
}

export function saveDocument(title: string, content: string): number {
  const stmt = db.prepare(`
    INSERT INTO documents (title, content)
    VALUES (?, ?)
  `);

  const result = stmt.run(title, content);
  return result.lastInsertRowid as number;
}

export function getDocument(id: number): Document | undefined {
  const stmt = db.prepare(`
    SELECT * FROM documents WHERE id = ?
  `);

  return stmt.get(id) as Document | undefined;
}

export function getAllDocuments(): Document[] {
  const stmt = db.prepare(`
    SELECT * FROM documents ORDER BY updated_at DESC
  `);

  return stmt.all() as Document[];
}

export function updateDocument(id: number, title: string, content: string): void {
  const stmt = db.prepare(`
    UPDATE documents 
    SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `);

  stmt.run(title, content, id);
}

export function deleteDocument(id: number): void {
  const stmt = db.prepare(`
    DELETE FROM documents WHERE id = ?
  `);

  stmt.run(id);
}
