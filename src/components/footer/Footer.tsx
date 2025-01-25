import type React from "react"

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: "#f0f0f0",
        padding: "20px",
        textAlign: "center",
        position: "fixed",
        bottom: 0,
        width: "100%",
      }}
    >
      <p>&copy; 2025 Todo App. All rights reserved.</p>
    </footer>
  )
}

export default Footer

