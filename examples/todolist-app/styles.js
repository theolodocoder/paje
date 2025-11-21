// Modular styles for Todo App - Elegant, Awards-worthy Design

export const styles = {
  // Global/App Container
  body: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    background: "linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #16213e 100%)",
    minHeight: "100vh",
    margin: "0",
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  appContainer: {
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    borderRadius: "24px",
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15), 0 0 1px rgba(255, 255, 255, 0.5) inset",
    padding: "48px",
    maxWidth: "540px",
    width: "100%",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },

  // Header/Title
  appTitle: {
    color: "#0f0f1e",
    fontSize: "36px",
    fontWeight: "800",
    marginBottom: "8px",
    textAlign: "center",
    letterSpacing: "-1px",
    lineHeight: "1.2",
  },

  // Subtitle/Description
  appSubtitle: {
    color: "#8892b0",
    fontSize: "14px",
    textAlign: "center",
    marginBottom: "40px",
    fontWeight: "500",
    letterSpacing: "0.5px",
  },

  // Create Todo Section
  createTodoSection: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "40px",
    paddingBottom: "40px",
    borderBottom: "1px solid #e5e7eb",
  },

  createTodoLabel: {
    fontSize: "11px",
    fontWeight: "700",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: "1.5px",
    marginLeft: "2px",
  },

  createTodoInput: {
    padding: "16px 18px",
    fontSize: "16px",
    border: "1.5px solid #e5e7eb",
    borderRadius: "12px",
    fontFamily: "inherit",
    boxSizing: "border-box",
    outline: "none",
    background: "white",
    color: "#1f2937",
  },

  createTodoBtn: {
    padding: "12px 24px",
    fontSize: "14px",
    fontWeight: "700",
    color: "white",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    textTransform: "uppercase",
    letterSpacing: "0.6px",
    boxShadow: "0 10px 30px rgba(102, 126, 234, 0.2)",
  },

  createTodoBtnDisabled: {
    opacity: "0.5",
    cursor: "not-allowed",
  },

  // Todo List
  todoList: {
    listStyle: "none",
    margin: "0",
    padding: "0",
  },

  todoEmptyState: {
    color: "#d1d5db",
    textAlign: "center",
    padding: "40px 16px",
    fontSize: "15px",
    listStyle: "none",
    fontWeight: "500",
  },

  // Todo Item (Normal Mode)
  todoItem: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "18px 20px",
    marginBottom: "12px",
    background: "linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)",
    borderRadius: "14px",
    borderLeft: "4px solid #667eea",
    listStyle: "none",
    border: "1px solid #e5e7eb",
    borderLeftWidth: "4px",
  },

  todoText: {
    flex: "1",
    fontSize: "15px",
    color: "#1f2937",
    cursor: "pointer",
    padding: "0",
    wordBreak: "break-word",
    fontWeight: "500",
    lineHeight: "1.5",
  },

  todoDoneBtn: {
    padding: "9px 16px",
    fontSize: "12px",
    fontWeight: "700",
    color: "white",
    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    whiteSpace: "nowrap",
    textTransform: "uppercase",
    letterSpacing: "0.4px",
    boxShadow: "0 8px 24px rgba(245, 87, 108, 0.25)",
  },

  // Todo Item (Edit Mode)
  todoItemEdit: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "18px 20px",
    marginBottom: "12px",
    background: "linear-gradient(135deg, #fffbf0 0%, #fef3c7 100%)",
    borderRadius: "14px",
    borderLeft: "4px solid #f59e0b",
    listStyle: "none",
    border: "1px solid #fde68a",
    borderLeftWidth: "4px",
  },

  todoEditInput: {
    flex: "1",
    padding: "12px 16px",
    fontSize: "15px",
    border: "1.5px solid #fcd34d",
    borderRadius: "10px",
    fontFamily: "inherit",
    boxSizing: "border-box",
    outline: "none",
    background: "white",
    color: "#1f2937",
    fontWeight: "500",
  },

  todoEditBtn: {
    padding: "9px 16px",
    fontSize: "12px",
    fontWeight: "700",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    whiteSpace: "nowrap",
    textTransform: "uppercase",
    letterSpacing: "0.4px",
  },

  todoSaveBtn: {
    color: "white",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    boxShadow: "0 8px 24px rgba(102, 126, 234, 0.25)",
  },

  todoCancelBtn: {
    color: "#6b7280",
    background: "#f3f4f6",
    border: "1.5px solid #e5e7eb",
  },
};

// Helper to merge style objects
export const mergeStyles = (...styleObjects) => {
  return Object.assign({}, ...styleObjects);
};
